import { Minus, Settings2, X, Pin, PinOff } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { Link } from "react-router-dom";
import { useState } from "react";

// when using `"withGlobalTauri": true`, you may use
// const { getCurrentWindow } = window.__TAURI__.window;

export default function Navbar() {
  const appWindow = getCurrentWindow();
  const [isPinned, setIsPinned] = useState(false);

  async function minimizeApp() {
    await appWindow.minimize();
  }

  async function closeApp() {
    await appWindow.close();
  }

  async function togglePin() {
    try {
      await appWindow.setAlwaysOnTop(!isPinned);
      setIsPinned(!isPinned);
    } catch (error) {
      console.error("Failed to toggle always on top:", error);
    }
  }

  return (
    <div
      data-tauri-drag-region
      className="fixed top-0 left-0 right-0 z-50 navbar bg-base-100 shadow-sm min-h-14"
    >
      <div data-tauri-drag-region className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-25 p-2 shadow"
          >
            <li>
              <Link to="/">Interva</Link>
            </li>
            <li>
              <Link to="/themes">Themes</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </div>
        <Link to="/settings" className="btn btn-ghost btn-circle">
          <Settings2 className="w-6 h-6" />
        </Link>
      </div>
      <div data-tauri-drag-region className="navbar-center">
        <Link to="/" className="btn btn-sm btn-ghost font-semibold text-xl">
          interva
        </Link>
      </div>
      <div data-tauri-drag-region className="navbar-end">
        <div className="tooltip tooltip-bottom" data-tip="Pin to top">
          <button onClick={togglePin} className="btn btn-ghost btn-circle">
            {isPinned ? (
              <PinOff className="w-5 h-5" />
            ) : (
              <Pin className="w-5 h-5" />
            )}
          </button>
        </div>

        <button onClick={minimizeApp} className="btn btn-ghost btn-circle">
          <Minus />
        </button>

        <button onClick={closeApp} className="btn btn-ghost btn-circle">
          <X />
        </button>
      </div>
    </div>
  );
}
