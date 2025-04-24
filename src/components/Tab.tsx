import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export function Tab() {
  useEffect(() => {
    const appWindow = getCurrentWindow();

    const minimizeBtn = document.getElementById("titlebar-minimize");
    const closeBtn = document.getElementById("titlebar-close");

    // Minimize button event listener
    minimizeBtn?.addEventListener("click", () => appWindow.minimize());

    // Close button event listener
    closeBtn?.addEventListener("click", () => appWindow.close());

    // Optional cleanup
    return () => {
      minimizeBtn?.removeEventListener("click", () => appWindow.minimize());
      closeBtn?.removeEventListener("click", () => appWindow.close());
    };
  }, []);

  return (
    <div data-tauri-drag-region className="navbar bg-base-100 shadow-sm">
      <div data-tauri-drag-region className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
        </div>
      </div>
      <div data-tauri-drag-region className="navbar-center">
        <a data-tauri-drag-region className="text-xl">
          interva
        </a>
      </div>
      <div data-tauri-drag-region className="navbar-end">
        <button className="btn btn-ghost btn-circle" id="titlebar-minimize">
          <FontAwesomeIcon icon={faWindowMinimize} />
        </button>
        <button className="btn btn-ghost btn-circle" id="titlebar-close">
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
    </div>
  );
}
