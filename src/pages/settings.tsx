import { usePomodoroSettings } from "../context/PomodoroSettingsContext";

export default function Settings() {
  const {
    focus,
    breakTime,
    longBreak,
    rounds,
    setFocus,
    setBreakTime,
    setLongBreak,
    setRounds,
  } = usePomodoroSettings();

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-base-100 overflow-hidden">
      <div className="flex flex-col items-center mt-20">
        <label className="text-xl font-bold mb-4">Pomodoro Settings</label>
        <ul>
          <li>
            <h1 className="block mb-2">Focus Time</h1>
            <input
              type="number"
              value={focus}
              onChange={(e) => setFocus(Number(e.target.value))}
              className="input input-bordered w-full max-w-xs mb-4"
            />
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
              value={longBreak}
              onChange={(e) => setLongBreak(Number(e.target.value))}
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
