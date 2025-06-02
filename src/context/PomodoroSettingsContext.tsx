import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Rename context values for consistency
type PomodoroSettings = {
  theme: string;
  focusTime: number;
  breakTime: number;
  longBreakTime: number;
  rounds: number;
  setTheme: (theme: string) => void;
  setFocusTime: (value: number) => void;
  setBreakTime: (value: number) => void;
  setLongBreakTime: (value: number) => void;
  setRounds: (value: number) => void;
};

const PomodoroSettingsContext = createContext<PomodoroSettings | undefined>(
  undefined
);

export const PomodoroSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [rounds, setRounds] = useState(4);
  const [theme, setTheme] = useState("sunset");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Load timer state from localStorage on mount
  useEffect(() => {
    const storedFocus = localStorage.getItem("focusTime");
    const storedBreakTime = localStorage.getItem("breakTime");
    const storedLongBreak = localStorage.getItem("longBreakTime");
    const storedRounds = localStorage.getItem("rounds");
    const storedTheme = localStorage.getItem("theme");
    if (storedFocus) setFocusTime(Number(storedFocus));
    if (storedBreakTime) setBreakTime(Number(storedBreakTime));
    if (storedLongBreak) setLongBreakTime(Number(storedLongBreak));
    if (storedRounds) setRounds(Number(storedRounds));
    if (storedTheme) setTheme(storedTheme);
  }, []);

  // Save timer state to localStorage when changed
  useEffect(() => {
    localStorage.setItem("focusTime", String(focusTime));
  }, [focusTime]);
  useEffect(() => {
    localStorage.setItem("breakTime", String(breakTime));
  }, [breakTime]);
  useEffect(() => {
    localStorage.setItem("longBreakTime", String(longBreakTime));
  }, [longBreakTime]);
  useEffect(() => {
    localStorage.setItem("rounds", String(rounds));
  }, [rounds]);
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <PomodoroSettingsContext.Provider
      value={{
        theme,
        focusTime,
        breakTime,
        longBreakTime,
        rounds,
        setTheme,
        setFocusTime,
        setBreakTime,
        setLongBreakTime,
        setRounds,
      }}
    >
      {children}
    </PomodoroSettingsContext.Provider>
  );
};

export const usePomodoroSettings = () => {
  const context = useContext(PomodoroSettingsContext);
  if (!context)
    throw new Error(
      "usePomodoroSettings must be used within PomodoroSettingsProvider"
    );
  return context;
};
