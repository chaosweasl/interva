import { useRef, useState, useEffect } from "react";
import { usePomodoroSettings } from "../context/PomodoroSettingsContext";

enum TimerState {
  FOCUS = "FOCUS",
  SHORT_BREAK = "SHORT_BREAK",
  LONG_BREAK = "LONG_BREAK",
}

const STORAGE_KEYS = {
  VOLUME: "interva-volume",
  TIME_LEFT: "interva-timeLeft",
  CURRENT_ROUND: "interva-currentRound",
  TIMER_STATE: "interva-timerState",
  SETTINGS: "interva-settings",
} as const;

const AUDIO_FILES = {
  pause: "/sounds/pause.mp3",
  unpause: "/sounds/unpause.mp3",
  timerEnd: "/sounds/timerEnd.mp3",
  reset: "/sounds/reset.mp3",
  soundOn: "/sounds/soundOn.mp3",
  focusOver: "/sounds/focusOver.mp3",
  breakOver: "/sounds/breakOver.mp3",
  longBreakOver: "/sounds/longBreakOver.mp3",
  longBreakReached: "/sounds/longBreakReached.mp3",
  ticking: "/sounds/ticking.flac",
} as const;

export function useInterva() {
  const { focusTime, breakTime, longBreakTime, rounds, tickingEnabled } =
    usePomodoroSettings();

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem(STORAGE_KEYS.VOLUME);
    return savedVolume ? parseInt(savedVolume, 10) : 100;
  });
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TIME_LEFT);
    return saved ? parseInt(saved, 10) : focusTime * 60;
  });
  const [currentRound, setCurrentRound] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_ROUND);
    return saved ? parseInt(saved, 10) : 1;
  });
  const [timerState, setTimerState] = useState<TimerState>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TIMER_STATE) as TimerState;
    return Object.values(TimerState).includes(saved) ? saved : TimerState.FOCUS;
  });

  const intervalRef = useRef<number>();
  const volumeTimeoutRef = useRef<number | null>(null);

  // Initialize audio refs
  const audio = {
    pause: useRef(new Audio(AUDIO_FILES.pause)),
    unpause: useRef(new Audio(AUDIO_FILES.unpause)),
    timerEnd: useRef(new Audio(AUDIO_FILES.timerEnd)),
    reset: useRef(new Audio(AUDIO_FILES.reset)),
    soundOn: useRef(new Audio(AUDIO_FILES.soundOn)),
    focusOver: useRef(new Audio(AUDIO_FILES.focusOver)),
    breakOver: useRef(new Audio(AUDIO_FILES.breakOver)),
    longBreakOver: useRef(new Audio(AUDIO_FILES.longBreakOver)),
    longBreakReached: useRef(new Audio(AUDIO_FILES.longBreakReached)),
    ticking: useRef(new Audio(AUDIO_FILES.ticking)),
  };

  // Update audio volumes
  useEffect(() => {
    const vol = volume / 100;
    Object.values(audio).forEach((audioRef) => {
      audioRef.current.volume = vol;
    });
    // Adjust specific volumes
    audio.reset.current.volume = vol / 4;
    audio.longBreakReached.current.volume = vol / 4;
    audio.ticking.current.volume = vol / 6;

    localStorage.setItem(STORAGE_KEYS.VOLUME, volume.toString());
  }, [volume]);

  // Timer interval effect
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

  // Debounce localStorage writes for timer state
  const localStorageDebounceRef = useRef<number | null>(null);
  const localStorageStateRef = useRef({
    timeLeft,
    currentRound,
    timerState,
  });

  // Update ref on state change
  useEffect(() => {
    localStorageStateRef.current = { timeLeft, currentRound, timerState };
    if (localStorageDebounceRef.current) {
      clearTimeout(localStorageDebounceRef.current);
    }
    // Debounce writes to 500ms after last change
    localStorageDebounceRef.current = window.setTimeout(() => {
      localStorage.setItem(
        STORAGE_KEYS.TIME_LEFT,
        String(localStorageStateRef.current.timeLeft)
      );
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_ROUND,
        String(localStorageStateRef.current.currentRound)
      );
      localStorage.setItem(
        STORAGE_KEYS.TIMER_STATE,
        localStorageStateRef.current.timerState
      );
    }, 500);
  }, [timeLeft, currentRound, timerState]);

  // Clean up debounce timer on unmount
  useEffect(() => {
    return () => {
      if (localStorageDebounceRef.current) {
        clearTimeout(localStorageDebounceRef.current);
      }
    };
  }, []);

  // Reset timer when settings change
  useEffect(() => {
    const hasSavedState = localStorage.getItem(STORAGE_KEYS.TIME_LEFT);
    if (!hasSavedState) {
      setTimeLeft(focusTime * 60);
      setCurrentRound(1);
      setTimerState(TimerState.FOCUS);
    }
  }, [focusTime, breakTime, longBreakTime, rounds]);

  function handleTimerComplete() {
    setIsPlaying(false);

    if (timerState === TimerState.FOCUS) {
      if (currentRound === rounds) {
        audio.longBreakReached.current.currentTime = 0.2;
        audio.longBreakReached.current.play();
        setTimerState(TimerState.LONG_BREAK);
        setTimeLeft(longBreakTime * 60);
      } else {
        audio.focusOver.current.currentTime = 0.2;
        audio.focusOver.current.play();
        setTimerState(TimerState.SHORT_BREAK);
        setTimeLeft(breakTime * 60);
      }
    } else {
      if (timerState === TimerState.LONG_BREAK) {
        setCurrentRound(1);
        audio.longBreakOver.current.currentTime = 0.2;
        audio.longBreakOver.current.play();
      } else {
        audio.breakOver.current.currentTime = 0.1;
        audio.breakOver.current.play();
        setCurrentRound((round) => round + 1);
      }
      setTimerState(TimerState.FOCUS);
      setTimeLeft(focusTime * 60);
    }

    // Auto-start the next timer only if we haven't just completed a long break
    if (timerState !== TimerState.LONG_BREAK) {
      setTimeout(() => {
        setIsPlaying(true);
      }, 1000);
    }
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
      audio.soundOn.current.currentTime = 0.15;
      audio.soundOn.current.play();
    } else {
      setVolume(0);
    }
  }

  function handlePlay() {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        audio.unpause.current.currentTime = 0.2;
        audio.unpause.current.play();
      } else {
        audio.pause.current.currentTime = 0.2;
        audio.pause.current.play();
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
    setTimerState(TimerState.FOCUS);
    setTimeLeft(focusTime * 60);
    localStorage.removeItem(STORAGE_KEYS.TIME_LEFT);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_ROUND);
    localStorage.removeItem(STORAGE_KEYS.TIMER_STATE);
    audio.reset.current.currentTime = 0.025;
    audio.reset.current.play();
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(+e.target.value);
    audio.soundOn.current.currentTime = 0;
    audio.soundOn.current.play();
  }

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  useEffect(() => {
    let tickingTimeout: number;

    if (isPlaying && tickingEnabled) {
      // Delay the start of ticking by 1 second to sync with the timer
      tickingTimeout = window.setTimeout(() => {
        audio.ticking.current.loop = true;
        audio.ticking.current.currentTime = 0;
        audio.ticking.current.play();
      }, 400);
    } else {
      audio.ticking.current.pause();
      audio.ticking.current.currentTime = 0;
    }

    return () => {
      if (tickingTimeout) {
        clearTimeout(tickingTimeout);
      }
      audio.ticking.current.pause();
      audio.ticking.current.currentTime = 0;
    };
  }, [isPlaying, tickingEnabled]);

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
