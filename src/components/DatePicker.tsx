import { useEffect, useRef, useState } from "react";

type DatePickerProps = {
  value: Date | null;
  onChange: (d: Date | null) => void;
  minDate?: Date | null;
  maxDate?: Date | null;
  allowPastDates?: boolean;
  placeholder?: string;
  inputId?: string;
  locale?: string;
  formatDate?: (d: Date) => string;
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function startOfMonth(date: any) {
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
  value,
  onChange,
  minDate = null,
  maxDate = null,
  allowPastDates = false, // ✅ FIX
  placeholder = "Select date",
  inputId = "datepicker-input",
  locale,
  formatDate = (d: Date) => d.toLocaleDateString(locale),
}: DatePickerProps) {
  const today = startOfDay(new Date());

  const effectiveMinDate = allowPastDates
    ? minDate
      ? startOfDay(minDate)
      : null
    : minDate
    ? startOfDay(minDate) > today
      ? startOfDay(minDate)
      : today
    : today;

  const initialDate = value
    ? clampDate(startOfDay(value), effectiveMinDate, maxDate)
    : today;

  const [open, setOpen] = useState(false);
  const [internalDate, setInternalDate] = useState<Date | null>(initialDate);
  const [viewDate, setViewDate] = useState<Date>(startOfMonth(initialDate));

  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // ✅ Auto-select today if value is null
  useEffect(() => {
    if (!value) {
      setInternalDate(today);
      onChange(today);
      setViewDate(startOfMonth(today));
    } else {
      const clamped = clampDate(startOfDay(value), effectiveMinDate, maxDate);
      setInternalDate(clamped);
      setViewDate(startOfMonth(clamped || today));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function handleSelect(day: number) {
    const chosen = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const clamped = clampDate(startOfDay(chosen), effectiveMinDate, maxDate);
    if (!clamped) return;
    setInternalDate(clamped);
    onChange(clamped);
    setOpen(false);
  }

  function buildCalendar(date: Date) {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const firstWeekday = start.getDay();
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

  return (
    <div className="relative inline-block" ref={ref}>
      <div className="flex items-center space-x-2">
        <input
          id={inputId}
          ref={inputRef}
          type="text"
          readOnly
          className="px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 w-44 cursor-pointer bg-white"
          placeholder={placeholder}
          value={internalDate ? formatDate(internalDate) : ""}
          onClick={() => setOpen((o) => !o)}
        />
      </div>

      {open && (
        <div className="mt-2 w-72 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-3 z-50">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">{monthLabel}</div>
            <div className="flex items-center space-x-1">
              <button onClick={() => setViewDate((v) => addMonths(v, -1))}>
                ‹
              </button>
              <button onClick={() => setViewDate((v) => addMonths(v, 1))}>
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

          <div className="grid grid-cols-7 gap-1">
            {days.map((d, idx) => {
              if (d === null) return <div key={idx} />;
              const dateObj = new Date(
                viewDate.getFullYear(),
                viewDate.getMonth(),
                d
              );
              const disabled = effectiveMinDate
                ? dateObj < effectiveMinDate
                : false;
              const selected = internalDate && sameDay(internalDate, dateObj);

              return (
                <button
                  key={d}
                  disabled={disabled}
                  onClick={() => handleSelect(d)}
                  className={`p-2 rounded ${
                    disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : "hover:bg-indigo-300"
                  } ${selected ? "bg-indigo-600 text-white" : ""}`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
