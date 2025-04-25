import { useEffect } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { X } from "lucide-react";
import { Minus } from "lucide-react";
import { Menu } from "lucide-react";

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
        <button className="btn btn-ghost btn-circle">
          <Menu />
        </button>
      </div>
      <div data-tauri-drag-region className="navbar-center">
        <a data-tauri-drag-region className="text-xl">
          interva
        </a>
      </div>
      <div data-tauri-drag-region className="navbar-end">
        <button className="btn btn-ghost btn-circle" id="titlebar-minimize">
          <Minus />
        </button>
        <button className="btn btn-ghost btn-circle" id="titlebar-close">
          <X />
        </button>
      </div>
    </div>
  );
}
