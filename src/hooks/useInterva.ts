import { useRef, useState, useEffect } from "react";

export function useInterva() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeTimeoutRef = useRef<number | null>(null);

  const pauseSound = useRef(new Audio("/sounds/pause.mp3"));
  const unpauseSound = useRef(new Audio("/sounds/unpause.mp3"));
  const timerEndSound = useRef(new Audio("/sounds/timerEnd.mp3"));
  const resetSound = useRef(new Audio("/sounds/reset.mp3"));
  const soundOnSound = useRef(new Audio("/sounds/soundOn.mp3"));

  useEffect(() => {
    const vol = volume / 100;
    pauseSound.current.volume = vol;
    unpauseSound.current.volume = vol;
    timerEndSound.current.volume = vol;
    resetSound.current.volume = vol / 2; // divided because otherwise it's too loud
    soundOnSound.current.volume = vol;
  }, [volume]);

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

  function handleSkip() {
    timerEndSound.current.currentTime = 0;
    timerEndSound.current.play();
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

  function handleReset() {
    setIsPlaying(false);
    resetSound.current.currentTime = 0;
    resetSound.current.play();
    // Reset logic can be added here
  }

  return {
    isPlaying,
    volume,
    showVolumeSlider,
    handleVolumeMouseEnter,
    handleVolumeMouseLeave,
    handleVolumeClick,
    handleSkip,
    handlePlay,
    handleReset,
    setVolume,
  };
}
