import { usePomodoroSettings } from "../context/PomodoroSettingsContext";

const themes = [
  "light",
  "dark",
  "synthwave",
  "halloween",
  "forest",
  "aqua",
  "black",
  "luxury",
  "dracula",
  "business",
  "night",
  "coffee",
  "cyberpunk",
  "dim",
  "sunset",
  "abyss",
  "cupcake",
  "emerald",
  "corporate",
  "bumblebee",
  "retro",
  "valentine",
  "pastel",
  "garden",
  "fantasy",
  "wireframe",
  "lofi",
  "autumn",
  "lemonade",
  "winter",
  "acid",
  "cmyk",
  "nord",
  "caramellatte",
  "silk",
];

export default function Themes() {
  const { theme, setTheme } = usePomodoroSettings();

  return (
    <div className="flex flex-col items-center min-h-screen bg-base-100 p-8 mt-12">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-5">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`flex flex-col items-center rounded-lg border-2 transition-all duration-200 shadow-md p-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/60 ${
                theme === t
                  ? "border-primary ring-2 ring-primary/60"
                  : "border-base-200"
              }`}
              aria-label={`Select ${t} theme`}
            >
              <div className="w-full h-full bg-base-200 flex items-center justify-center rounded mb-3">
                {/* Replace src with your own theme preview images, e.g. /themes/dark.png */}
                <img
                  loading="lazy"
                  src={`/themes/${t}.png`}
                  alt={`${t} theme preview`}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-base font-medium capitalize text-base-content">
                {t}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
