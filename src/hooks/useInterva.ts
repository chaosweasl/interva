import { useRef, useState, useEffect } from "react";

export function useInterva() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeTimeoutRef = useRef<number | null>(null);

  const pauseSound = useRef(new Audio("/pause.mp3"));
  const unpauseSound = useRef(new Audio("/unpause.mp3"));
  const timerEndSound = useRef(new Audio("/timerEnd.mp3"));

  useEffect(() => {
    const vol = volume / 100;
    pauseSound.current.volume = vol;
    unpauseSound.current.volume = vol;
    timerEndSound.current.volume = vol;
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
    } else {
      setVolume(0);
    }
  }

  function handleSkip() {
    timerEndSound.current.currentTime = 0.4;
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
