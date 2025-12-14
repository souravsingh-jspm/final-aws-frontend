import React, { useEffect, useRef, useState } from "react";

type DatePickerProps = {
  value: Date | null;
  onChange: (d: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  placeholder?: string;
  inputId?: string;
  locale?: string;
  formatDate?: (d: Date) => string;
};

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function addMonths(date: Date, n: number) {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}
function sameDay(a?: Date | null, b?: Date | null) {
  if (!a || !b) return false;
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
function clampDate(date: Date | null, min?: Date | null, max?: Date | null) {
  if (!date) return date;
  if (min && date < min) return min;
  if (max && date > max) return max;
  return date;
}

export default function DatePicker({
  value = null,
  onChange,
  minDate = null,
  maxDate = null,
  placeholder = "Select date",
  inputId = "datepicker-input",
  locale,
  formatDate = (d: Date) => d.toLocaleDateString(locale),
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date | null>(value);
  const [viewDate, setViewDate] = useState<Date>(
    value ? startOfMonth(value) : startOfMonth(new Date())
  );
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setInternalDate(value);
    if (value) setViewDate(startOfMonth(value));
  }, [value]);

  useEffect(() => {
    function onDoc(e: MouseEvent | TouchEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("touchstart", onDoc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("touchstart", onDoc);
    };
  }, []);

  useEffect(() => {
    if (open) {
      const firstButton = ref.current?.querySelector("[data-day]");
      (firstButton as HTMLElement | null)?.focus();
    }
  }, [open]);

  function handleSelect(day: number) {
    const chosen = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const clamped = clampDate(chosen, minDate ?? null, maxDate ?? null);
    setInternalDate(clamped);
    onChange(clamped);
    setOpen(false);
  }

  function buildCalendar(date: Date) {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const firstWeekday = start.getDay(); // 0 (Sun) - 6 (Sat)
    const days: (number | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) days.push(null);
    for (let d = 1; d <= end.getDate(); d++) days.push(d);
    return days;
  }

  const days = buildCalendar(viewDate);
  const monthLabel = viewDate.toLocaleString(locale || undefined, {
    month: "long",
    year: "numeric",
  });

  function prevMonth() {
    setViewDate((v) => addMonths(v, -1));
  }
  function nextMonth() {
    setViewDate((v) => addMonths(v, 1));
  }

  function onKeyDownCalendar(e: React.KeyboardEvent) {
    const focused = document.activeElement;
    if (!focused) return;
    const day = focused.getAttribute("data-day");
    if (!day) return;
    const dayNum = parseInt(day, 10);
    if (isNaN(dayNum)) return;

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const el = ref.current?.querySelector<HTMLElement>(
        `[data-day='${dayNum + 1}']`
      );
      el?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const el = ref.current?.querySelector<HTMLElement>(
        `[data-day='${dayNum - 1}']`
      );
      el?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const el = ref.current?.querySelector<HTMLElement>(
        `[data-day='${dayNum + 7}']`
      );
      el?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const el = ref.current?.querySelector<HTMLElement>(
        `[data-day='${dayNum - 7}']`
      );
      el?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(dayNum);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="relative inline-block" ref={ref}>
      <div className="flex items-center space-x-2">
        <input
          id={inputId}
          ref={inputRef}
          type="text"
          readOnly
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="datepicker-popover"
          className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44 cursor-pointer bg-white"
          placeholder={placeholder}
          value={internalDate ? formatDate(internalDate) : ""}
          onClick={() => setOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "Enter") setOpen(true);
          }}
        />
        <button
          type="button"
          aria-label="clear date"
          className="px-2 py-2 rounded-md border hover:bg-gray-50"
          onClick={() => {
            setInternalDate(null);
            onChange(null);
          }}
        >
          Clear
        </button>
      </div>

      {open && (
        <div
          id="datepicker-popover"
          role="dialog"
          aria-modal="false"
          className="mt-2 w-72 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-3 z-50"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">{monthLabel}</div>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={prevMonth}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Previous month"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="p-1 rounded hover:bg-gray-100"
                aria-label="Next month"
              >
                ›
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-xs text-center mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="font-medium text-gray-500">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1" onKeyDown={onKeyDownCalendar}>
            {days.map((d, idx) => {
              if (d === null) return <div key={`blank-${idx}`} />;
              const dateObj = new Date(
                viewDate.getFullYear(),
                viewDate.getMonth(),
                d
              );
              const disabled =
                (minDate && dateObj < minDate) ||
                (maxDate && dateObj > maxDate);
              const selected = internalDate && sameDay(internalDate, dateObj);

              return (
                <button
                  key={d}
                  data-day={d}
                  type="button"
                  onClick={() => handleSelect(d)}
                  disabled={disabled}
                  className={`p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    disabled
                      ? "cursor-not-allowed text-gray-300"
                      : "hover:bg-gray-100"
                  } ${selected ? "bg-indigo-600 text-white" : ""}`}
                  aria-pressed={selected}
                >
                  <span className="sr-only">{dateObj.toDateString()}</span>
                  <span aria-hidden>{d}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-sm">
            <div>
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  const clamped = clampDate(
                    today,
                    minDate ?? null,
                    maxDate ?? null
                  );
                  setInternalDate(clamped);
                  onChange(clamped);
                  setViewDate(startOfMonth(clamped || today));
                  setOpen(false);
                }}
                className="px-2 py-1 rounded hover:bg-gray-100"
              >
                Today
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-2 py-1 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
