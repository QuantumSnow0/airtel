"use client";

import { useState, useEffect } from "react";
import Model3DViewer from "./Model3DViewer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const featureTexts = [
  {
    title: "Signal Amplification",
    description:
      "Enhances signal strength for stable, uninterrupted connectivity.",
  },
  {
    title: "High-Gain Antenna",
    description: "Offers strong and consistent indoor coverage.",
  },
  {
    title: "Weather-Resistant Design",
    description: "Built to perform reliably in all conditions.",
  },
  {
    title: "Flexible Mounting Options",
    description: "Easily install on walls, poles, or rooftops.",
  },
];

export default function Model3DWithText() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate through feature texts
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featureTexts.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentFeature = featureTexts[activeIndex];

  return (
    <div
      className="relative w-full"
      style={{
        height: "clamp(320px, 52vw, 55vh)",
        overflow: "hidden",
      }}
    >
      {/* Title Section - Overlay on top */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 md:hidden"
        style={{
          zIndex: 100,
        }}
      >
        {/* Title on the left */}
        <div className="flex items-center gap-1">
          <img
            src="/icon.png"
            alt="Airtel"
            className="h-8 w-8 object-contain"
            style={{
              filter: "drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))",
              margin: 0,
              padding: 0,
              display: "block",
              flexShrink: 0,
              lineHeight: 0,
            }}
          />
          <span
            className="text-base font-bold"
            style={{
              background: "linear-gradient(135deg, #ffffff, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
            }}
          >
            Airtel
          </span>
          <div className="h-4 w-px bg-white/30 mx-1" />
          <span
            className="text-sm font-bold tracking-wide"
            style={{
              background: "linear-gradient(135deg, #ffffff, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.05em",
              textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
            }}
          >
            SmartConnect
          </span>
        </div>

        {/* Phone number on the right */}
        <a
          href="tel:0789457580"
          className="flex items-center gap-1.5 transition-colors"
          style={{
            textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            style={{
              filter: "drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))",
            }}
          >
            <defs>
              <linearGradient
                id="phoneGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
            <path
              stroke="url(#phoneGradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span
            className="text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #ffffff, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
            }}
          >
            0789457580
          </span>
        </a>
      </div>

      {/* 3D Model Viewer */}
      <div className="relative w-full h-full" style={{ zIndex: 1 }}>
        <Model3DViewer
          modelPath="/model/3DModel.gltf"
          height="100%"
          enableControls={true}
          autoRotate={true}
          backgroundColor="#0a0a0a"
          modelPosition={[0, 0, 0]}
          modelScale={1.8}
        />
      </div>

      {/* Feature Text Overlay at Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 3 }}
      >
        {/* Gradient Fade at Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "120px",
            background:
              "linear-gradient(to bottom, transparent, rgb(10, 10, 10))",
            zIndex: 1,
          }}
        />
        {/* Content */}
        <div className="relative px-3 pb-6 pt-8" style={{ zIndex: 2 }}>
          <h3
            className={`text-xl mb-2 leading-snug ${poppins.variable}`}
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              letterSpacing: "0.01em",
              fontWeight: 600,
              background: "linear-gradient(135deg, #ffffff, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {currentFeature.title}
          </h3>
          <p
            className={`text-sm text-white/95 leading-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] ${poppins.variable}`}
            style={{
              fontFamily: "var(--font-poppins), sans-serif",
              letterSpacing: "0.01em",
              fontWeight: 300,
              lineHeight: "1.5",
              wordWrap: "break-word",
              hyphens: "auto",
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            {currentFeature.description}
          </p>

          {/* Dots Indicator */}
          <div className="flex gap-2 mt-4 justify-center">
            {featureTexts.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="pointer-events-auto"
                aria-label={`Go to feature ${index + 1}`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-yellow-400" : "bg-white/40"
                  }`}
                  style={{
                    width: index === activeIndex ? "24px" : "8px",
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
