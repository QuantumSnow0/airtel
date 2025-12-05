"use client";

import { useState, useEffect } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const loadingMessages = [
  "Fetching 3D model...",
  "Loading textures...",
  "Initializing scene...",
  "Preparing render...",
  "Almost ready...",
];

export default function Model3DLoader() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        }
        return prev; // Stay on last message
      });
    }, 800); // Change message every 800ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      style={{
        zIndex: 20,
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(4px)",
      }}
    >
      {/* Loading spinner */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-yellow-400/20 border-t-yellow-400 animate-spin" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-r-yellow-400/40 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>

      {/* Loading message */}
      <div className="text-center px-4">
        <p
          className={`text-lg font-semibold ${poppins.variable}`}
          style={{
            fontFamily: "var(--font-poppins), sans-serif",
            background: "linear-gradient(135deg, #ffffff, #fbbf24)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {loadingMessages[currentMessageIndex]}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-2 mt-4">
        {loadingMessages.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index <= currentMessageIndex
                ? "bg-yellow-400"
                : "bg-white/20"
            }`}
            style={{
              width: index === currentMessageIndex ? "24px" : "8px",
            }}
          />
        ))}
      </div>

    </div>
  );
}

