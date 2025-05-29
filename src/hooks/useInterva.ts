import { useRef, useState, useEffect } from "react";

const VOLUME_STORAGE_KEY = "interva-volume";

// Timer constants in minutes
export const FOCUS_TIME = 25;
export const SHORT_BREAK = 5;
export const LONG_BREAK = 15;
export const ROUNDS_BEFORE_LONG_BREAK = 4;

export function useInterva() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
    return savedVolume ? parseInt(savedVolume, 10) : 100;
  });
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME * 60); // in seconds
  const [currentRound, setCurrentRound] = useState(1);
  const [timerState, setTimerState] = useState<
    "FOCUS" | "SHORT_BREAK" | "LONG_BREAK"
  >("FOCUS");

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

  function handleTimerComplete() {
    setIsPlaying(false);

    if (timerState === "FOCUS") {
      focusOverSound.current.currentTime = 0;
      focusOverSound.current.play();
      if (currentRound === ROUNDS_BEFORE_LONG_BREAK) {
        setTimerState("LONG_BREAK");
        setTimeLeft(LONG_BREAK * 60);
      } else {
        setTimerState("SHORT_BREAK");
        setTimeLeft(SHORT_BREAK * 60);
      }
    } else {
      breakOverSound.current.currentTime = 0;
      breakOverSound.current.play();
      if (timerState === "LONG_BREAK") {
        setCurrentRound(1);
      } else {
        setCurrentRound((round) => round + 1);
      }
      setTimerState("FOCUS");
      setTimeLeft(FOCUS_TIME * 60);
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
      soundOnSound.current.currentTime = 0;
      soundOnSound.current.play();
    } else {
      setVolume(0);
    }
  }

  function handlePlay() {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        unpauseSound.current.currentTime = 0;
        unpauseSound.current.play();
      } else {
        pauseSound.current.currentTime = 0;
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
    setTimeLeft(FOCUS_TIME * 60);
    resetSound.current.currentTime = 0;
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
    totalRounds: ROUNDS_BEFORE_LONG_BREAK,
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
