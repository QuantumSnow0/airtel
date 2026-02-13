"use client";

/** Small decorative flower for Valentine's - rose/pink, optional size and position. */
export function FlowerDecoration({
  className = "",
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Petals - simple rose style */}
        <circle cx="12" cy="9" r="4" fill="#f472b6" opacity={0.95} />
        <circle cx="15.5" cy="12" r="3.5" fill="#fb7185" opacity={0.9} />
        <circle cx="12" cy="15" r="4" fill="#f472b6" opacity={0.95} />
        <circle cx="8.5" cy="12" r="3.5" fill="#fb7185" opacity={0.9} />
        <circle cx="10" cy="10" r="3.2" fill="#f9a8d4" opacity={0.85} />
        <circle cx="14" cy="10" r="3.2" fill="#f9a8d4" opacity={0.85} />
        <circle cx="14" cy="14" r="3.2" fill="#f9a8d4" opacity={0.85} />
        <circle cx="10" cy="14" r="3.2" fill="#f9a8d4" opacity={0.85} />
        {/* Center */}
        <circle cx="12" cy="12" r="2.5" fill="#fbbf24" opacity={0.9} />
      </svg>
    </span>
  );
}

/** Tiny blossom (smaller, simpler). */
export function FlowerBlossom({
  className = "",
  size = 16,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="8" r="3" fill="#f472b6" opacity={0.9} />
        <circle cx="16" cy="12" r="2.8" fill="#fb7185" opacity={0.85} />
        <circle cx="12" cy="16" r="3" fill="#f472b6" opacity={0.9} />
        <circle cx="8" cy="12" r="2.8" fill="#fb7185" opacity={0.85} />
        <circle cx="12" cy="12" r="2" fill="#fbbf24" opacity={0.9} />
      </svg>
    </span>
  );
}
