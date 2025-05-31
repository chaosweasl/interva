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
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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
