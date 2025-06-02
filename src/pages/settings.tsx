import { usePomodoroSettings } from "../context/PomodoroSettingsContext";

export default function Settings() {
  const {
    focusTime,
    breakTime,
    longBreakTime,
    rounds,
    setFocusTime,
    setBreakTime,
    setLongBreakTime,
    setRounds,
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
      <div className="flex flex-col items-center w-full h-full p-5 pt-20 pb-10">
        <label className="text-xl font-bold mb-4">Pomodoro Settings</label>
        <ul className="w-full gap-2 flex flex-col">
          <li className="flex justify-center items-center flex-col gap-1">
            <h1 className="block text-lg font-light text-primary tracking-wide uppercase drop-shadow-sm">
              Focus Time
            </h1>

            <fieldset>
              <div className="w-15 h-8 text-center badge badge-primary badge-soft">
                {focusTime}:00
              </div>
            </fieldset>

            <div className="flex items-center w-full">
              <div className="relative w-full">
                {/* Range */}
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={focusTime}
                  onChange={(e) => handleFocusChange(Number(e.target.value))}
                  className="range range-xs range-primary w-full"
                />
              </div>
            </div>
          </li>
          <li className="flex justify-center items-center flex-col gap-1">
            <h1 className="block text-lg font-light text-accent tracking-wide uppercase drop-shadow-sm">
              Break Time
            </h1>

            <fieldset>
              <div className="w-15 h-8 text-center badge badge-accent badge-soft">
                {breakTime}:00
              </div>
            </fieldset>

            <div className="flex items-center w-full">
              <div className="relative w-full">
                {/* Range */}
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={breakTime}
                  onChange={(e) => handleBreakChange(Number(e.target.value))}
                  className="range range-xs range-accent w-full"
                />
              </div>
            </div>
          </li>
          <li className="flex justify-center items-center flex-col gap-1">
            <h1 className="block text-lg font-light text-secondary tracking-wide uppercase drop-shadow-sm">
              Long Break Time
            </h1>

            <fieldset>
              <div className="w-15 h-8 text-center badge badge-secondary badge-soft">
                {longBreakTime}:00
              </div>
            </fieldset>

            <div className="flex items-center w-full">
              <div className="relative w-full">
                {/* Range */}
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={longBreakTime}
                  onChange={(e) =>
                    handleLongBreakChange(Number(e.target.value))
                  }
                  className="range range-xs range-secondary w-full"
                />
              </div>
            </div>
          </li>
          <li className="flex justify-center items-center flex-col gap-1">
            <h1 className="block text-lg font-light text-neutral-content tracking-wide uppercase drop-shadow-sm">
              Rounds
            </h1>

            <fieldset>
              <div className="w-15 h-8 text-center badge badge-neutral-content badge-soft">
                {rounds}
              </div>
            </fieldset>

            <div className="flex items-center w-full">
              <div className="relative w-full">
                {/* Range */}
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={rounds}
                  onChange={(e) => handleRoundsChange(Number(e.target.value))}
                  className="range range-xs range-neutral-content w-full"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
