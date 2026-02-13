"use client";

/**
 * Valentine's Day input decorations - pink lines with hearts showing field numbers.
 * Set ENABLED to false to revert instantly (one-line change).
 */
const ENABLED = true;

function HeartWithNumber({
  number,
  className = "",
}: {
  number: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      aria-hidden="true"
    >
      <span className="relative">
        {/* Heart SVG */}
        <svg
          width="28"
          height="26"
          viewBox="0 0 24 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill="#ec4899"
            fillOpacity={0.95}
          />
        </svg>
        {/* Number overlay */}
        <span
          className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white"
          style={{ textShadow: "0 1px 2px rgba(0,0,0,0.3)" }}
        >
          {number}
        </span>
      </span>
    </span>
  );
}

export function ValentineInputDecoration({ number }: { number: number }) {
  if (!ENABLED) return null;

  return (
    <div
      className="flex items-center gap-2 mb-3"
      role="presentation"
      aria-hidden="true"
    >
      <div
        className="flex-1 h-0.5 shrink min-w-[20px]"
        style={{ backgroundColor: "#ec4899" }}
      />
      <HeartWithNumber number={number} />
      <div
        className="flex-1 h-0.5 shrink min-w-[20px]"
        style={{ backgroundColor: "#ec4899" }}
      />
    </div>
  );
}
