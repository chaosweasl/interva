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
    setRounds(1);
  };

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-base-100 overflow-auto">
      <div className="flex flex-col items-center w-full h-full p-5 pt-20 pb-10">
        <label className="text-xl font-bold mb-4">Pomodoro Settings</label>
        <ul className="w-full max-w-md">
          <li className="flex justify-center items-center flex-col gap-2">
            <h1 className="block text-lg font-light text-primary tracking-wide uppercase drop-shadow-sm">
              Focus Time
            </h1>

            <fieldset>
              <div className="w-15 h-8 text-center badge badge-primary badge-soft">
                {focusTime}:00
              </div>
            </fieldset>

            <div className="flex items-center gap-2 w-full">
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
          <li>
            <h1 className="block mb-2">Break Time</h1>
            <input
              type="number"
              value={breakTime}
              onChange={(e) => setBreakTime(Number(e.target.value))}
              className="input input-bordered w-full max-w-xs mb-4"
            />
          </li>
          <li>
            <h1 className="block mb-2">Long Break</h1>
            <input
              type="number"
              value={longBreakTime}
              onChange={(e) => setLongBreakTime(Number(e.target.value))}
              className="input input-bordered w-full max-w-xs mb-4"
            />
          </li>
          <li>
            <h1 className="block mb-2">Rounds</h1>
            <input
              type="number"
              value={rounds}
              onChange={(e) => setRounds(Number(e.target.value))}
              className="input input-bordered w-full max-w-xs mb-4"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
