import { useRef, useState, useEffect } from "react";

const VOLUME_STORAGE_KEY = "interva-volume";

export function useInterva() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem(VOLUME_STORAGE_KEY);
    return savedVolume ? parseInt(savedVolume, 10) : 100;
  });
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const volumeTimeoutRef = useRef<number | null>(null);

  const pauseSound = useRef(new Audio("/sounds/pause.mp3"));
  const unpauseSound = useRef(new Audio("/sounds/unpause.mp3"));
  const timerEndSound = useRef(new Audio("/sounds/timerEnd.mp3"));
  const resetSound = useRef(new Audio("/sounds/reset.mp3"));
  const soundOnSound = useRef(new Audio("/sounds/soundOn.mp3"));

  useEffect(() => {
    // side note: some audios were too loud, so I divided the volume
    const vol = volume / 100;
    pauseSound.current.volume = vol;
    unpauseSound.current.volume = vol;
    timerEndSound.current.volume = vol / 1.5;
    resetSound.current.volume = vol / 6;
    soundOnSound.current.volume = vol;
    localStorage.setItem(VOLUME_STORAGE_KEY, volume.toString());
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

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(+e.target.value);
    soundOnSound.current.currentTime = 0;
    soundOnSound.current.play();
  }

  return {
    isPlaying,
    volume,
    showVolumeSlider,
    handleVolumeMouseEnter,
    handleVolumeMouseLeave,
    handleVolumeClick,
    handleVolumeChange,
    handleSkip,
    handlePlay,
    handleReset,
  };
}
