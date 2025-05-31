import { useRef, useState, useEffect } from "react";
import { usePomodoroSettings } from "../context/PomodoroSettingsContext";

const VOLUME_STORAGE_KEY = "interva-volume";

export function useInterva() {
  const { focus, breakTime, longBreak, rounds } = usePomodoroSettings();

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
    return savedVolume ? parseInt(savedVolume, 10) : 100;
  });
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem("interva-timeLeft");
    return saved ? parseInt(saved, 10) : focus * 60;
  });
  const [currentRound, setCurrentRound] = useState(() => {
    const saved = localStorage.getItem("interva-currentRound");
    return saved ? parseInt(saved, 10) : 1;
  });
  const [timerState, setTimerState] = useState<
    "FOCUS" | "SHORT_BREAK" | "LONG_BREAK"
  >(() => {
    const saved = localStorage.getItem("interva-timerState");
    if (
      saved === "FOCUS" ||
      saved === "SHORT_BREAK" ||
      saved === "LONG_BREAK"
    ) {
      return saved;
    }
    return "FOCUS";
  });

  const intervalRef = useRef<number>();
  const volumeTimeoutRef = useRef<number | null>(null);

  const pauseSound = useRef(new Audio("/sounds/pause.mp3"));
  const unpauseSound = useRef(new Audio("/sounds/unpause.mp3"));
  const timerEndSound = useRef(new Audio("/sounds/timerEnd.mp3"));
  const resetSound = useRef(new Audio("/sounds/reset.mp3"));
  const soundOnSound = useRef(new Audio("/sounds/soundOn.mp3"));
  const focusOverSound = useRef(new Audio("/sounds/focusOver.mp3"));
  const breakOverSound = useRef(new Audio("/sounds/breakOver.mp3"));

  useEffect(() => {
    // side note: some audios were too loud, so I divided the volume
    const vol = volume / 100;
    pauseSound.current.volume = vol;
    unpauseSound.current.volume = vol;
    timerEndSound.current.volume = vol;
    resetSound.current.volume = vol / 4;
    soundOnSound.current.volume = vol;
    focusOverSound.current.volume = vol;
    breakOverSound.current.volume = vol;
    localStorage.setItem(VOLUME_STORAGE_KEY, volume.toString());
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            handleTimerComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  // --- Persist timer state to localStorage ---
  // Only load from localStorage on mount if there is a saved state AND the settings match
  useEffect(() => {
    const storedSettings = localStorage.getItem("interva-settings");
    const currentSettings = JSON.stringify({
      focus,
      breakTime,
      longBreak,
      rounds,
    });
    if (storedSettings === currentSettings) {
      const storedTimeLeft = localStorage.getItem("interva-timeLeft");
      const storedCurrentRound = localStorage.getItem("interva-currentRound");
      const storedTimerState = localStorage.getItem("interva-timerState");

      if (storedTimeLeft && !isNaN(Number(storedTimeLeft)))
        setTimeLeft(Number(storedTimeLeft));
      if (storedCurrentRound && !isNaN(Number(storedCurrentRound)))
        setCurrentRound(Number(storedCurrentRound));
      if (
        storedTimerState === "FOCUS" ||
        storedTimerState === "SHORT_BREAK" ||
        storedTimerState === "LONG_BREAK"
      ) {
        setTimerState(storedTimerState);
      }
    } else {
      // If settings changed, reset timer
      setTimeLeft(focus * 60);
      setCurrentRound(1);
      setTimerState("FOCUS");
      localStorage.removeItem("interva-timeLeft");
      localStorage.removeItem("interva-currentRound");
      localStorage.removeItem("interva-timerState");
      localStorage.setItem("interva-settings", currentSettings);
    }
  }, [focus, breakTime, longBreak, rounds]);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("interva-timeLeft", String(timeLeft));
  }, [timeLeft]);
  useEffect(() => {
    localStorage.setItem("interva-currentRound", String(currentRound));
  }, [currentRound]);
  useEffect(() => {
    localStorage.setItem("interva-timerState", timerState);
  }, [timerState]);
  useEffect(() => {
    localStorage.setItem(
      "interva-settings",
      JSON.stringify({ focus, breakTime, longBreak, rounds })
    );
  }, [focus, breakTime, longBreak, rounds]);

  function handleTimerComplete() {
    setIsPlaying(false);

    if (timerState === "FOCUS") {
      focusOverSound.current.currentTime = 0.2;
      focusOverSound.current.play();
      if (currentRound === rounds) {
        setTimerState("LONG_BREAK");
        setTimeLeft(longBreak * 60);
      } else {
        setTimerState("SHORT_BREAK");
        setTimeLeft(breakTime * 60);
      }
    } else {
      breakOverSound.current.currentTime = 0.05;
      breakOverSound.current.play();
      if (timerState === "LONG_BREAK") {
        setCurrentRound(1);
      } else {
        setCurrentRound((round) => round + 1);
      }
      setTimerState("FOCUS");
      setTimeLeft(focus * 60);
    }

    // Auto-start the next timer after a short delay (without sound)
    setTimeout(() => {
      setIsPlaying(true);
    }, 1000);
  }

  function handleVolumeMouseEnter() {
    setShowVolumeSlider(true);
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
      volumeTimeoutRef.current = null;
    }
  }

  function handleVolumeMouseLeave() {
    setShowVolumeSlider(true);
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
    volumeTimeoutRef.current = window.setTimeout(() => {
      setShowVolumeSlider(false);
    }, 500);
  }

  function handleVolumeClick() {
    if (volume === 0) {
      setVolume(100);
      soundOnSound.current.currentTime = 0.15;
      soundOnSound.current.play();
    } else {
      setVolume(0);
    }
  }

  function handlePlay() {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        unpauseSound.current.currentTime = 0.2;
        unpauseSound.current.play();
      } else {
        pauseSound.current.currentTime = 0.2;
        pauseSound.current.play();
      }
      return next;
    });
  }

  function handleSkip() {
    handleTimerComplete();
  }

  function handleReset() {
    setIsPlaying(false);
    setCurrentRound(1);
    setTimerState("FOCUS");
    setTimeLeft(focus * 60);
    resetSound.current.currentTime = 0.025;
    resetSound.current.play();
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(+e.target.value);
    soundOnSound.current.currentTime = 0;
    soundOnSound.current.play();
  }

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return {
    isPlaying,
    volume,
    showVolumeSlider,
    currentRound,
    totalRounds: rounds,
    timerState,
    hours,
    minutes,
    seconds,
    handleVolumeMouseEnter,
    handleVolumeMouseLeave,
    handleVolumeClick,
    handleVolumeChange,
    handleSkip,
    handlePlay,
    handleReset,
  };
}
