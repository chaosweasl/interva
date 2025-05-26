import { Minus, X } from "lucide-react";

export default function Navbar() {
  return (
    <div
      data-tauri-drag-region
      className="navbar bg-base-100 shadow-sm min-h-14"
    >
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-25 p-2 shadow"
          >
            <li>
              <a>Timer</a>
            </li>
            <li>
              <a>Themes</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div data-tauri-drag-region className="navbar-center">
        <a data-tauri-drag-region className="select-none font-semibold text-xl">
          interva
        </a>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <Minus />
        </button>
        <button className="btn btn-ghost btn-circle">
          <X />
        </button>
      </div>
    </div>
  );
}
