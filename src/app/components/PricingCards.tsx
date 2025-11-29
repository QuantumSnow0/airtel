"use client";

import { useRouter } from "next/navigation";
import { usePackage } from "../contexts/PackageContext";

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
      <div className="md:hidden space-y-5 pt-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            Choose Your Package
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {/* Package 1 */}
          <label
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-rose-600 p-3 shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer w-full"
            onClick={() => handleCardClick("standard")}
          >
            <div className="absolute top-2 left-2 z-20">
              <input
                type="radio"
                name="package"
                value="standard"
                checked={selectedPackage === "standard"}
                onChange={() => setSelectedPackage("standard")}
                className="w-4 h-4 border-2 border-white/50 rounded-full focus:outline-none focus:ring-0 cursor-pointer shrink-0"
              />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
            <div className="relative flex flex-col h-full justify-between min-h-[140px] pt-5">
              {/* Top Row - Package Info and Price */}
              <div className="flex items-start justify-between gap-3">
                {/* Left: Icon, Name, Speed */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/icon.png"
                      alt="5G Icon"
                      className="w-full h-full object-contain p-1.5 brightness-0 invert"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-bold text-white leading-tight">
                      Standard
                    </div>
                    <div className="text-xs text-white/90 mt-0.5">15 Mbps</div>
                  </div>
                </div>

                {/* Right: Price */}
                <div className="flex flex-col items-end shrink-0">
                  <div className="text-2xl font-extrabold text-white leading-tight">
                    Ksh. 1,999
                  </div>
                  <div className="text-xs text-white/80 mt-1">per month</div>
                </div>
              </div>

              {/* Bottom Section - Validity and Installation */}
              <div className="pt-4 mt-auto border-t border-white/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-white/95">
                  <svg
                    className="w-4 h-4 text-white shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">30 days validity</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/90">
                  <svg
                    className="w-4 h-4 text-white shrink-0"
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
                    <span className="font-semibold">Ksh. 1,000</span>
                  </span>
                </div>
              </div>
            </div>
          </label>

          {/* Package 2 */}
          <label
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500 via-red-500 to-rose-600 p-3 shadow-2xl transition-all duration-300 transform hover:scale-[1.02] shine-effect cursor-pointer w-full"
            onClick={() => handleCardClick("premium")}
          >
            <div className="absolute top-2 left-2 z-20">
              <input
                type="radio"
                name="package"
                value="premium"
                checked={selectedPackage === "premium"}
                onChange={() => setSelectedPackage("premium")}
                className="w-4 h-4 border-2 border-white/50 rounded-full focus:outline-none focus:ring-0 cursor-pointer shrink-0"
              />
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
            <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px] pt-5">
              {/* Top Row - Package Info and Price */}
              <div className="flex items-start justify-between gap-3">
                {/* Left: Icon, Name, Speed */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                    <img
                      src="/icon.png"
                      alt="5G Icon"
                      className="w-full h-full object-contain p-1.5 brightness-0 invert"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-bold text-white leading-tight">
                      Premium
                    </div>
                    <div className="text-xs text-white/90 mt-0.5">30 Mbps</div>
                  </div>
                </div>

                {/* Right: Price */}
                <div className="flex flex-col items-end shrink-0">
                  <div className="text-2xl font-extrabold text-white leading-tight">
                    Ksh. 2,999
                  </div>
                  <div className="text-xs text-white/80 mt-1">per month</div>
                </div>
              </div>

              {/* Bottom Section - Validity and Installation */}
              <div className="pt-4 mt-auto border-t border-white/20 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-white/95">
                  <svg
                    className="w-4 h-4 text-white shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">30 days validity</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-white/90">
                  <svg
                    className="w-4 h-4 text-white shrink-0"
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
                    <span className="font-semibold">Ksh. 1,000</span>
                  </span>
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
