export default function interva() {
  const value = 100;
  const state = "FOCUS";

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base-100 overflow-hidden">
      {/* For TSX uncomment the commented types below */}
      <div
        className="radial-progress text-primary -mt-20"
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
    </div>
  );
}
