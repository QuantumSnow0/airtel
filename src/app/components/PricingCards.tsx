"use client";

import { useRouter } from "next/navigation";
import { usePackage } from "../contexts/PackageContext";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function PricingCards() {
  const router = useRouter();
  const { selectedPackage, setSelectedPackage } = usePackage();

  // Map package selection to form package option
  const packageMap: Record<string, string> = {
    standard: "5G_15Mbps_30days at Ksh.2999",
    premium: "5G_30Mbps_30days at Ksh.3999",
  };

  const handleCardClick = (packageName: string) => {
    setSelectedPackage(packageName);
    const packageOption = packageMap[packageName] || packageMap.premium;
    router.push(
      `/request-installation?package=${encodeURIComponent(packageOption)}`
    );
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
      {/* Mobile Pricing Cards */}
      <div className={`md:hidden space-y-3 ${poppins.variable}`}>
        <div className="flex flex-col gap-3">
          {/* Package 1 - Standard */}
          <label
            className={`group relative overflow-hidden rounded-xl bg-slate-800/90 backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer w-full ${
              selectedPackage === "standard"
                ? "border-yellow-400/60 shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                : "border-slate-700/50 hover:border-slate-600"
            }`}
            onClick={() => handleCardClick("standard")}
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            <div className="p-3">
              {/* Radio Button */}
              <div className="absolute top-2.5 right-2.5 z-20">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPackage === "standard"
                      ? "border-yellow-400 bg-yellow-400/20"
                      : "border-slate-500"
                  }`}
                >
                  {selectedPackage === "standard" && (
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2.5">
                {/* Top Section - Package Name and Speed */}
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 border border-yellow-400/30 flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src="/icon.png"
                      alt="5G Icon"
                      className="w-full h-full object-contain p-1.5"
                      style={{
                        filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))",
                      }}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div
                      className="text-base font-bold text-white leading-tight"
                      style={{
                        background:
                          selectedPackage === "standard"
                            ? "linear-gradient(135deg, #ffffff, #fbbf24)"
                            : "none",
                        WebkitBackgroundClip:
                          selectedPackage === "standard" ? "text" : "unset",
                        WebkitTextFillColor:
                          selectedPackage === "standard" ? "transparent" : "#ffffff",
                        backgroundClip:
                          selectedPackage === "standard" ? "text" : "unset",
                      }}
                    >
                      Standard
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      15 Mbps
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1.5">
                    <div
                      className="text-2xl font-extrabold leading-tight"
                      style={{
                        background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Ksh. 1,999
                    </div>
                    <div className="text-xs text-slate-400">/month</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <svg
                      className="w-3.5 h-3.5 text-yellow-400 shrink-0"
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
                </div>

                {/* Bottom Section - Features */}
                <div className="pt-2 border-t border-slate-700/50">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <svg
                      className="w-3.5 h-3.5 text-yellow-400 shrink-0"
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
          </label>

          {/* Package 2 - Premium */}
          <label
            className={`group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 transition-all duration-300 cursor-pointer w-full ${
              selectedPackage === "premium"
                ? "border-yellow-400/80 shadow-[0_0_25px_rgba(251,191,36,0.4)]"
                : "border-slate-700/50 hover:border-slate-600"
            }`}
            onClick={() => handleCardClick("premium")}
            style={{ fontFamily: "var(--font-poppins), sans-serif" }}
          >
            {/* Premium Badge */}
            <div className="absolute top-2 left-2 z-10">
              <div
                className="px-1.5 py-0.5 rounded text-[10px] font-bold"
                style={{
                  background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                  color: "#000000",
                }}
              >
                POPULAR
              </div>
            </div>

            <div className="p-3">
              {/* Radio Button */}
              <div className="absolute top-2.5 right-2.5 z-20">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedPackage === "premium"
                      ? "border-yellow-400 bg-yellow-400/20"
                      : "border-slate-500"
                  }`}
                >
                  {selectedPackage === "premium" && (
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2.5">
                {/* Top Section - Package Name and Speed */}
                <div className="flex items-center gap-2.5 mt-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400/30 to-yellow-500/20 border border-yellow-400/50 flex items-center justify-center overflow-hidden shrink-0 shadow-lg shadow-yellow-400/20">
                    <img
                      src="/icon.png"
                      alt="5G Icon"
                      className="w-full h-full object-contain p-1.5"
                      style={{
                        filter: "drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))",
                      }}
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div
                      className="text-base font-bold text-white leading-tight"
                      style={{
                        background:
                          selectedPackage === "premium"
                            ? "linear-gradient(135deg, #ffffff, #fbbf24)"
                            : "none",
                        WebkitBackgroundClip:
                          selectedPackage === "premium" ? "text" : "unset",
                        WebkitTextFillColor:
                          selectedPackage === "premium" ? "transparent" : "#ffffff",
                        backgroundClip:
                          selectedPackage === "premium" ? "text" : "unset",
                      }}
                    >
                      Premium
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5">
                      30 Mbps
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1.5">
                    <div
                      className="text-2xl font-extrabold leading-tight"
                      style={{
                        background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Ksh. 2,999
                    </div>
                    <div className="text-xs text-slate-400">/month</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <svg
                      className="w-3.5 h-3.5 text-yellow-400 shrink-0"
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
                </div>

                {/* Bottom Section - Features */}
                <div className="pt-2 border-t border-slate-700/50">
                  <div className="flex items-center gap-1.5 text-xs text-slate-300">
                    <svg
                      className="w-3.5 h-3.5 text-yellow-400 shrink-0"
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
          </label>
        </div>
      </div>

      {/* Desktop Pricing Cards */}
      <div className="hidden md:block mb-8">
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Choose Your Package
          </h2>
          <p className="text-slate-600">
            Select the perfect plan for your needs
          </p>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {/* Package 1 */}
          <label
            className="group relative rounded-2xl border-2 border-slate-200 bg-white p-6 hover:border-rose-300 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            onClick={() => handleCardClick("standard")}
          >
            <div className="absolute top-4 left-4 z-10">
              <input
                type="radio"
                name="package-desktop"
                value="standard"
                checked={selectedPackage === "standard"}
                onChange={() => setSelectedPackage("standard")}
                className="w-5 h-5 border-2 border-slate-300 rounded-full focus:outline-none focus:ring-0 cursor-pointer"
              />
            </div>
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 group-hover:bg-rose-100 transition-colors mb-3 overflow-hidden">
                  <img
                    src="/icon.png"
                    alt="5G Icon"
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>
              <div className="text-4xl font-extrabold text-slate-900 mb-1">
                Ksh. 1,999
              </div>
              <div className="text-sm font-medium text-rose-600 mb-4">
                per month
              </div>
              <div className="text-xl font-bold text-slate-900 mb-2">
                15 Mbps
              </div>
              <div className="text-sm text-slate-500 mb-4">High-speed 5G</div>
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="text-sm text-slate-600">30 days validity</div>
                <div className="text-xs text-slate-500">
                  Installation:{" "}
                  <span className="font-semibold text-slate-700">
                    Ksh. 1,000
                  </span>
                </div>
              </div>
            </div>
          </label>

          {/* Package 2 - Popular */}
          <label
            className="group relative rounded-2xl border-3 border-rose-500 bg-gradient-to-br from-rose-50 via-white to-rose-50/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shine-effect cursor-pointer"
            onClick={() => handleCardClick("premium")}
          >
            <div className="absolute top-4 left-4 z-10">
              <input
                type="radio"
                name="package-desktop"
                value="premium"
                checked={selectedPackage === "premium"}
                onChange={() => setSelectedPackage("premium")}
                className="w-5 h-5 border-2 border-rose-400 rounded-full focus:outline-none focus:ring-0 cursor-pointer"
              />
            </div>
            <div className="text-center pt-3">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 to-red-600 shadow-lg mb-3 overflow-hidden">
                  <img
                    src="/icon.png"
                    alt="5G Icon"
                    className="w-full h-full object-contain p-2 brightness-0 invert"
                  />
                </div>
              </div>
              <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-red-600 mb-1">
                Ksh. 2,999
              </div>
              <div className="text-sm font-medium text-rose-600 mb-4">
                per month
              </div>
              <div className="text-xl font-bold text-slate-900 mb-2">
                30 Mbps
              </div>
              <div className="text-sm text-slate-500 mb-4">Ultra-fast 5G</div>
              <div className="pt-4 border-t border-rose-200 space-y-2">
                <div className="text-sm font-semibold text-rose-600">
                  30 days validity
                </div>
                <div className="text-xs text-slate-600">
                  Installation:{" "}
                  <span className="font-semibold text-slate-700">
                    Ksh. 1,000
                  </span>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </>
  );
}
