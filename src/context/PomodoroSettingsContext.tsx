import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type PomodoroSettings = {
  theme: string;
  focus: number;
  breakTime: number;
  longBreak: number;
  rounds: number;
  setTheme: (theme: string) => void;
  setFocus: (value: number) => void;
  setBreakTime: (value: number) => void;
  setLongBreak: (value: number) => void;
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
  const [focus, setFocus] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [rounds, setRounds] = useState(4);
  const [theme, setTheme] = useState("sunset");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Load timer state from localStorage on mount
  useEffect(() => {
    const storedFocus = localStorage.getItem("focus");
    const storedBreakTime = localStorage.getItem("breakTime");
    const storedLongBreak = localStorage.getItem("longBreak");
    const storedRounds = localStorage.getItem("rounds");
    const storedTheme = localStorage.getItem("theme");
    if (storedFocus) setFocus(Number(storedFocus));
    if (storedBreakTime) setBreakTime(Number(storedBreakTime));
    if (storedLongBreak) setLongBreak(Number(storedLongBreak));
    if (storedRounds) setRounds(Number(storedRounds));
    if (storedTheme) setTheme(storedTheme);
  }, []);

  // Save timer state to localStorage when changed
  useEffect(() => {
    localStorage.setItem("focus", String(focus));
  }, [focus]);
  useEffect(() => {
    localStorage.setItem("breakTime", String(breakTime));
  }, [breakTime]);
  useEffect(() => {
    localStorage.setItem("longBreak", String(longBreak));
  }, [longBreak]);
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
        focus,
        breakTime,
        longBreak,
        rounds,
        setTheme,
        setFocus,
        setBreakTime,
        setLongBreak,
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
