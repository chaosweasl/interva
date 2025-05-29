import { Pause, Play, SkipForward, Volume2, VolumeX } from "lucide-react";
import React from "react";
import {
  useInterva,
  FOCUS_TIME,
  SHORT_BREAK,
  LONG_BREAK,
} from "../hooks/useInterva";

export default function interva() {
  const {
    isPlaying,
    volume,
    showVolumeSlider,
    currentRound,
    totalRounds,
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
  } = useInterva();
  // Calculate total seconds based on hours, minutes, and seconds
  const currentTotalSeconds = hours * 3600 + minutes * 60 + seconds;
  const totalSeconds =
    timerState === "FOCUS"
      ? FOCUS_TIME * 60
      : timerState === "SHORT_BREAK"
      ? SHORT_BREAK * 60
      : LONG_BREAK * 60;

  // Calculate progress (100 means full, 0 means empty)
  const progressValue = (currentTotalSeconds / totalSeconds) * 100;

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-base-100 overflow-hidden">
      <div className="flex flex-col items-center mt-25">
        <div
          className="radial-progress text-primary"
          style={
            {
              "--value": `${progressValue}`,
              "--size": "13rem",
              "--thickness": "0.5rem",
            } as React.CSSProperties
          }
          role="progressbar"
        >
          <div className="justify-center items-center flex flex-col">
            <div className="font-mono text-4xl">
              {hours > 0 && (
                <>
                  <span aria-live="polite">
                    {hours.toString().padStart(2, "0")}
                  </span>
                  :
                </>
              )}
              <span aria-live="polite">
                {minutes.toString().padStart(2, "0")}
              </span>
              :
              <span aria-live="polite">
                {seconds.toString().padStart(2, "0")}
              </span>
            </div>
            <span className="text-xl">{timerState.replace("_", " ")}</span>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="btn btn-ghost btn-circle btn-outline w-15 h-15"
            onClick={() => handlePlay()}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full mb-5">
        <div className="ml-5">
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-lg font-semibold">
              {currentRound}/{totalRounds}
            </h2>
            <div className="tooltip tooltip-right" data-tip="Reset rounds">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => handleReset()}
              >
                <h1 className="text-base">Reset</h1>
              </button>
            </div>
          </div>
        </div>
        <div className="mr-5 flex justify-center items-center gap-3">
          <button
            className="btn btn-ghost btn-circle"
            onClick={() => handleSkip()}
          >
            <SkipForward />
          </button>
          <div
            className="relative flex flex-col items-center"
            onMouseEnter={handleVolumeMouseEnter}
            onMouseLeave={handleVolumeMouseLeave}
          >
            {showVolumeSlider && (
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="absolute bottom-full mb-15 range range-xs range-primary rotate-[-90deg] w-32"
              />
            )}
            <button
              className="btn btn-ghost btn-circle"
              onClick={() => handleVolumeClick()}
            >
              {volume ? <Volume2 /> : <VolumeX />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
