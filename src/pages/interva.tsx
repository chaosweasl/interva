import { Pause, Play, SkipForward, Volume2, VolumeX } from "lucide-react";
import React from "react";
import { useInterva } from "../hooks/useInterva";

export default function interva() {
  const value = 100;
  const state = "FOCUS";
  const currentRound = 1;
  const totalRounds = 4;

  const {
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
  } = useInterva();

  return (
    <div className="flex flex-col justify-between items-center h-screen bg-base-100 overflow-hidden">
      <div className="flex flex-col items-center mt-25">
        <div
          className="radial-progress text-primary"
          style={
            {
              "--value": `${value}`,
              "--size": "13rem",
              "--thickness": "0.5rem",
            } as React.CSSProperties
          }
          role="progressbar"
        >
          <div className="justify-center items-center flex flex-col">
            {/* For TSX uncomment the commented types below */}
            <span className="countdown font-mono text-4xl">
              <span
                style={{ "--value": 10 } as React.CSSProperties}
                aria-live="polite"
              >
                10
              </span>
              :
              <span
                style={{ "--value": 24 } as React.CSSProperties}
                aria-live="polite"
              >
                24
              </span>
              :
              <span
                style={{ "--value": 59 } as React.CSSProperties}
                aria-live="polite"
              >
                59
              </span>
            </span>
            <span className="text-xl">{state}</span>
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
                onChange={(e) => setVolume(+e.target.value)}
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
