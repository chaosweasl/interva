import { usePomodoroSettings } from "../context/PomodoroSettingsContext";

export default function Settings() {
  const {
    focusTime,
    breakTime,
    longBreakTime,
    rounds,
    autoStart,
    tickingEnabled,
    setFocusTime,
    setBreakTime,
    setLongBreakTime,
    setRounds,
    toggleAutoStart,
    setTickingEnabled,
    resetToDefaults,
  } = usePomodoroSettings();

  // Handler to reset rounds when focus time changes
  const handleFocusChange = (value: number) => {
    setFocusTime(value);
  };

  const handleBreakChange = (value: number) => {
    setBreakTime(value);
  };

  const handleLongBreakChange = (value: number) => {
    setLongBreakTime(value);
  };

  const handleRoundsChange = (value: number) => {
    setRounds(value);
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-base-100">
      <div className="flex flex-col items-center w-full max-w-xl h-full p-5 pt-15 pb-10">
        {/* Timer Settings Section */}
        <div className="w-full">
          <div className="flex justify-between items-center w-full mb-6">
            <h2 className="text-xl font-bold">Timer Settings</h2>
            <button
              onClick={resetToDefaults}
              className="btn btn-ghost btn-sm gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              Reset defaults
            </button>
          </div>

          <div className="grid gap-6">
            {/* Focus Time */}
            <div className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-primary">
                    Focus Time
                  </h3>
                  <div className="badge badge-primary badge-lg">
                    {focusTime}:00
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={focusTime}
                  onChange={(e) => handleFocusChange(Number(e.target.value))}
                  className="range range-sm range-primary"
                />
                <div className="w-full flex justify-between text-xs px-2">
                  <span>1:00</span>
                  <span>120:00</span>
                </div>
              </div>
            </div>

            {/* Break Time - Similar structure */}
            <div className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-accent">
                    Break Time
                  </h3>
                  <div className="badge badge-accent badge-lg">
                    {breakTime}:00
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={breakTime}
                  onChange={(e) => handleBreakChange(Number(e.target.value))}
                  className="range range-sm range-accent"
                />
                <div className="w-full flex justify-between text-xs px-2">
                  <span>1:00</span>
                  <span>120:00</span>
                </div>
              </div>
            </div>

            {/* Long Break Time - Similar structure */}
            <div className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold text-secondary">
                    Long Break
                  </h3>
                  <div className="badge badge-secondary badge-lg">
                    {longBreakTime}:00
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={longBreakTime}
                  onChange={(e) =>
                    handleLongBreakChange(Number(e.target.value))
                  }
                  className="range range-sm range-secondary"
                />
                <div className="w-full flex justify-between text-xs px-2">
                  <span>1:00</span>
                  <span>120:00</span>
                </div>
              </div>
            </div>

            {/* Rounds - Similar structure */}
            <div className="card bg-base-200">
              <div className="card-body p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-base font-semibold">Rounds</h3>
                  <div className="badge badge-neutral badge-lg">{rounds}</div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={rounds}
                  onChange={(e) => handleRoundsChange(Number(e.target.value))}
                  className="range range-sm range-neutral"
                />
                <div className="w-full flex justify-between text-xs px-2">
                  <span>1</span>
                  <span>8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* App Settings Section */}
        <div className="w-full mt-8">
          <h2 className="text-xl font-bold mb-4">App Settings</h2>
          <div className="card bg-base-200">
            <div className="card-body p-4 space-y-4">
              <label className="flex cursor-pointer gap-4">
                <span className="flex-1">Open on Startup</span>
                <input
                  type="checkbox"
                  checked={autoStart}
                  onChange={toggleAutoStart}
                  className="toggle toggle-primary"
                />
              </label>
              <label className="flex cursor-pointer gap-4">
                <span className="flex-1">Ticking Sound</span>
                <input
                  type="checkbox"
                  checked={tickingEnabled}
                  onChange={(e) => setTickingEnabled(e.target.checked)}
                  className="toggle toggle-primary"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
