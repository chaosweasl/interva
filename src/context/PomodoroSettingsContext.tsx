import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { enable, isEnabled, disable } from "@tauri-apps/plugin-autostart";

// Rename context values for consistency
type PomodoroSettings = {
  focusTime: number;
  breakTime: number;
  longBreakTime: number;
  rounds: number;
  autoStart: boolean;
  theme: string;
  tickingEnabled: boolean;
  setFocusTime: (value: number) => void;
  setBreakTime: (value: number) => void;
  setLongBreakTime: (value: number) => void;
  setRounds: (value: number) => void;
  setTheme: (theme: string) => void;
  toggleAutoStart: () => Promise<void>;
  resetToDefaults: () => void;
  setTickingEnabled: (enabled: boolean) => void;
};

const PomodoroSettingsContext = createContext<PomodoroSettings | undefined>(
  undefined
);

export const PomodoroSettingsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Define default values as constants
  const DEFAULT_FOCUS_TIME = 25;
  const DEFAULT_BREAK_TIME = 5;
  const DEFAULT_LONG_BREAK_TIME = 15;
  const DEFAULT_ROUNDS = 4;
  const DEFAULT_STARTUP = false;
  const DEFAULT_THEME = "dark";
  const DEFAULT_TICKING_ENABLED = true;

  const [focusTime, setFocusTime] = useState(DEFAULT_FOCUS_TIME);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
  const [longBreakTime, setLongBreakTime] = useState(DEFAULT_LONG_BREAK_TIME);
  const [rounds, setRounds] = useState(DEFAULT_ROUNDS);
  const [autoStart, setAutoStart] = useState(false);
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || DEFAULT_THEME;
  });
  const [tickingEnabled, setTickingEnabled] = useState(() => {
    const stored = localStorage.getItem("tickingEnabled");
    return stored ? JSON.parse(stored) : DEFAULT_TICKING_ENABLED;
  });

  // Load timer state from localStorage on mount
  useEffect(() => {
    const storedFocus = localStorage.getItem("focusTime");
    const storedBreakTime = localStorage.getItem("breakTime");
    const storedLongBreak = localStorage.getItem("longBreakTime");
    const storedRounds = localStorage.getItem("rounds");
    const storedAutoStart = localStorage.getItem("autoStart");

    // Only update if values are different from current state
    if (storedFocus && Number(storedFocus) !== focusTime) {
      setFocusTime(Number(storedFocus));
    }
    if (storedBreakTime && Number(storedBreakTime) !== breakTime) {
      setBreakTime(Number(storedBreakTime));
    }
    if (storedLongBreak && Number(storedLongBreak) !== longBreakTime) {
      setLongBreakTime(Number(storedLongBreak));
    }
    if (storedRounds && Number(storedRounds) !== rounds) {
      setRounds(Number(storedRounds));
    }
    if (storedAutoStart) {
      setAutoStart(JSON.parse(storedAutoStart));
    }
  }, []); // Only run on mount

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
    localStorage.setItem("autoStart", JSON.stringify(autoStart));
  }, [autoStart]);
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("tickingEnabled", JSON.stringify(tickingEnabled));
  }, [tickingEnabled]);

  // Check initial autostart status on mount
  useEffect(() => {
    const checkAutoStart = async () => {
      try {
        const enabled = await isEnabled();
        setAutoStart(enabled);
      } catch (error) {
        console.error("Failed to check autostart status:", error);
      }
    };
    checkAutoStart();
  }, []);

  const toggleAutoStart = async () => {
    try {
      if (autoStart) {
        await disable();
      } else {
        await enable();
      }
      const newState = await isEnabled();
      setAutoStart(newState);
      localStorage.setItem("autoStart", JSON.stringify(newState));
    } catch (error) {
      console.error("Failed to toggle autostart:", error);
    }
  };

  const resetToDefaults = () => {
    setFocusTime(DEFAULT_FOCUS_TIME);
    setBreakTime(DEFAULT_BREAK_TIME);
    setLongBreakTime(DEFAULT_LONG_BREAK_TIME);
    setRounds(DEFAULT_ROUNDS);
    setAutoStart(DEFAULT_STARTUP);
  };

  return (
    <PomodoroSettingsContext.Provider
      value={{
        focusTime,
        breakTime,
        longBreakTime,
        rounds,
        autoStart,
        theme,
        tickingEnabled,
        setFocusTime,
        setBreakTime,
        setLongBreakTime,
        setRounds,
        setTheme,
        toggleAutoStart,
        resetToDefaults,
        setTickingEnabled,
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
