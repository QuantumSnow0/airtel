"use client";

import { usePackage } from "../contexts/PackageContext";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function PricingCards() {
  const { selectedPackage, setSelectedPackage } = usePackage();

  const handleCardClick = (packageName: string) => {
    setSelectedPackage(packageName);
    // Form is on the same page, so no redirect needed
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shine {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(200%) translateY(200%) rotate(45deg);
          }
        }
        .shine-effect::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 70%
          );
          animation: shine 3s infinite;
          pointer-events: none;
          z-index: 1;
        }
      `,
        }}
      />
      {/* Pricing Cards - Mobile Style for All Screens */}
      <div className={`${poppins.variable}`}>
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2">
          {/* Package 1 - Standard - Renders immediately */}
          <div
            className={`group relative rounded-lg bg-neutral-900/90 backdrop-blur-sm border-2 transition-all duration-300 w-full ${
              selectedPackage === "standard"
                ? "border-yellow-400/60 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                : "border-neutral-800/50 hover:border-neutral-700"
            }`}
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            {/* Clickable Overlay - Covers entire card */}
            <div
              className="absolute inset-0 cursor-pointer z-20"
              onClick={() => handleCardClick("standard")}
              onTouchStart={() => handleCardClick("standard")}
            />

            {/* Price - Top Left with border cut effect */}
            <div
              className="absolute left-2 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              {/* Transparent div to cut the border - positioned at the border line */}
              <div
                className="absolute left-0"
                style={{
                  top: "0px",
                  background: "rgb(38, 38, 38)",
                  height: "2px",
                  width: "calc(100% + 8px)",
                  marginLeft: "-4px",
                  borderTopLeftRadius: "8px",
                }}
              />
              {/* Price text */}
              <div
                className="px-1.5 relative"
                style={{ top: "-50%", transform: "translateY(-50%)" }}
              >
                <div
                  className="text-lg font-extrabold leading-tight"
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ksh. 1,999
                </div>
              </div>
            </div>

            {/* Radio Button */}
            <div className="absolute top-2 right-2 z-30 pointer-events-none">
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedPackage === "standard"
                    ? "border-yellow-400 bg-yellow-400/20"
                    : "border-neutral-600"
                }`}
              >
                {selectedPackage === "standard" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-2.5 pt-4 relative z-10 pointer-events-none">
              <div className="flex flex-col gap-2">
                {/* Top Section - Package Name and Speed */}
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src="/icon.png"
                      alt="5G Icon"
                      className="w-full h-full object-contain p-1"
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))",
                      }}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div
                      className="text-sm font-bold text-white leading-tight"
                      style={{
                        background:
                          selectedPackage === "standard"
                            ? "linear-gradient(135deg, #ffffff, #fbbf24)"
                            : "none",
                        WebkitBackgroundClip:
                          selectedPackage === "standard" ? "text" : "unset",
                        WebkitTextFillColor:
                          selectedPackage === "standard"
                            ? "transparent"
                            : "#ffffff",
                        backgroundClip:
                          selectedPackage === "standard" ? "text" : "unset",
                      }}
                    >
                      Standard
                    </div>
                    <div className="text-[10px] text-neutral-200 mt-0.5">
                      15 Mbps
                    </div>
                  </div>
                </div>

                {/* Installation Section */}
                <div className="flex items-center gap-1 text-[10px] text-neutral-200">
                  <svg
                    className="w-3 h-3 text-yellow-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>
                    Installation:{" "}
                    <span className="font-semibold text-yellow-400">
                      Ksh. 1,000
                    </span>
                  </span>
                </div>

                {/* Bottom Section - Features */}
                <div className="pt-1.5 border-t border-neutral-800/50">
                  <div className="flex items-center gap-1 text-[10px] text-neutral-200">
                    <svg
                      className="w-3 h-3 text-yellow-400 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>30 days validity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Package 2 - Premium - Renders immediately */}
          <div
            className={`group relative rounded-lg bg-gradient-to-br from-neutral-900/90 to-neutral-950/90 backdrop-blur-sm border-2 transition-all duration-300 w-full ${
              selectedPackage === "premium"
                ? "border-yellow-400/80 shadow-[0_0_25px_rgba(251,191,36,0.4)]"
                : "border-neutral-800/50 hover:border-neutral-700"
            }`}
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            {/* Clickable Overlay - Covers entire card */}
            <div
              className="absolute inset-0 cursor-pointer z-20"
              onClick={() => handleCardClick("premium")}
              onTouchStart={() => handleCardClick("premium")}
            />

            {/* Price - Top Left with border cut effect */}
            <div
              className="absolute left-2 pointer-events-none"
              style={{ zIndex: 30, top: "-2px" }}
            >
              {/* Transparent div to cut the border - positioned at the border line */}
              <div
                className="absolute left-0"
                style={{
                  top: "0px",
                  background: "rgb(38, 38, 38)",
                  height: "2px",
                  width: "calc(100% + 8px)",
                  marginLeft: "-4px",
                  borderTopLeftRadius: "8px",
                }}
              />
              {/* Price text */}
              <div
                className="px-1.5 relative"
                style={{ top: "-50%", transform: "translateY(-50%)" }}
              >
                <div
                  className="text-lg font-extrabold leading-tight"
                  style={{
                    background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ksh. 2,999
                </div>
              </div>
            </div>

            {/* Radio Button */}
            <div className="absolute top-2 right-2 z-30 pointer-events-none">
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center transition-all ${
                  selectedPackage === "premium"
                    ? "border-yellow-400 bg-yellow-400/20"
                    : "border-neutral-600"
                }`}
              >
                {selectedPackage === "premium" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-2.5 pt-4 relative z-10 pointer-events-none">
              <div className="flex flex-col gap-2">
                {/* Top Section - Package Name and Speed */}
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400/30 to-yellow-500/20 border border-yellow-400/50 flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-yellow-400/20">
                    <img
                      src="/icon.png"
                      alt="5G Icon"
                      className="w-full h-full object-contain p-1"
                      style={{
                        filter: "drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))",
                      }}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div
                      className="text-sm font-bold text-white leading-tight"
                      style={{
                        background:
                          selectedPackage === "premium"
                            ? "linear-gradient(135deg, #ffffff, #fbbf24)"
                            : "none",
                        WebkitBackgroundClip:
                          selectedPackage === "premium" ? "text" : "unset",
                        WebkitTextFillColor:
                          selectedPackage === "premium"
                            ? "transparent"
                            : "#ffffff",
                        backgroundClip:
                          selectedPackage === "premium" ? "text" : "unset",
                      }}
                    >
                      Premium
                    </div>
                    <div className="text-[10px] text-neutral-200 mt-0.5">
                      30 Mbps
                    </div>
                  </div>
                </div>

                {/* Installation Section */}
                <div className="flex items-center gap-1 text-[10px] text-neutral-200">
                  <svg
                    className="w-3 h-3 text-yellow-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>
                    Installation:{" "}
                    <span className="font-semibold text-yellow-400">
                      Ksh. 1,000
                    </span>
                  </span>
                </div>

                {/* Bottom Section - Features */}
                <div className="pt-1.5 border-t border-neutral-800/50">
                  <div className="flex items-center gap-1 text-[10px] text-neutral-200">
                    <svg
                      className="w-3 h-3 text-yellow-400 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>30 days validity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
