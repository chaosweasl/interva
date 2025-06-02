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
  autoStart: boolean; // Make sure this matches
  setFocusTime: (value: number) => void;
  setBreakTime: (value: number) => void;
  setLongBreakTime: (value: number) => void;
  setRounds: (value: number) => void;
  toggleAutoStart: () => Promise<void>;
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
  const [autoStart, setAutoStart] = useState(false);

  // Load timer state from localStorage on mount
  useEffect(() => {
    const storedFocus = localStorage.getItem("focusTime");
    const storedBreakTime = localStorage.getItem("breakTime");
    const storedLongBreak = localStorage.getItem("longBreakTime");
    const storedRounds = localStorage.getItem("rounds");
    const storedAutoStart = localStorage.getItem("autoStart");
    if (storedFocus) setFocusTime(Number(storedFocus));
    if (storedBreakTime) setBreakTime(Number(storedBreakTime));
    if (storedLongBreak) setLongBreakTime(Number(storedLongBreak));
    if (storedRounds) setRounds(Number(storedRounds));
    if (storedAutoStart) setAutoStart(JSON.parse(storedAutoStart));
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
    localStorage.setItem("autoStart", JSON.stringify(autoStart));
  }, [autoStart]);

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

  return (
    <PomodoroSettingsContext.Provider
      value={{
        focusTime,
        breakTime,
        longBreakTime,
        rounds,
        autoStart,
        setFocusTime,
        setBreakTime,
        setLongBreakTime,
        setRounds,
        toggleAutoStart,
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
