import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import Marquee from "@/components/marquee/Marquee";
import "./Header.css";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/sign-in", { replace: true });
  };



  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="app-header sticky top-0 z-99999 bg-white border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="header-row">

        {/* LEFT — Sidebar Toggle */}
        <div className="header-left">
          <button
            onClick={handleToggle}
            aria-label="Toggle Sidebar"
            className="header-icon-btn"
          >
            {isMobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                <path
                  d="M1 1H17M1 6H17M1 11H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>

        {/* CENTER — Marquee */}
        <div className="header-center">
          <Marquee />
        </div>

        {/* RIGHT — Logout */}
        <div className="header-right">
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10 17L15 12L10 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M15 12H3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Logout
          </button>
        </div>

      </div>
    </header>
  );
};

export default AppHeader;
