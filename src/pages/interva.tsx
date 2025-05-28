import { Pause, Play } from "lucide-react";
import { useState } from "react";

export default function interva() {
  const value = 100;
  const state = "FOCUS";
  const [isPlaying, setIsPlaying] = useState(false);

  function handlePlayButton() {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100 overflow-hidden">
      {/* For TSX uncomment the commented types below */}
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
          onClick={() => handlePlayButton()}
        >
          {isPlaying ? (
            <Pause className="w-7 h-7" />
          ) : (
            <Play className="w-7 h-7" />
          )}
        </button>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="ml-10">a</div>
        <div className="mr-10">b</div>
      </div>
    </div>
  );
}
