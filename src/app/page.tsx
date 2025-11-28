import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Mobile: Background Image with Overlay */}
        <div className="md:hidden absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/airtel.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/80 to-black/85" />
        </div>

        {/* Desktop: Split Layout */}
        <div className="hidden md:grid md:grid-cols-2 absolute inset-0">
          {/* Left Side - Image */}
                  <div className="relative">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/airtel.png')" }}
            />
          </div>
          {/* Right Side - Content Background */}
          <div className="bg-gradient-to-b from-slate-50 to-white" />
              </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-8 py-8 md:py-0">
          <div className="max-w-7xl mx-auto">
            <div className="md:grid md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
              {/* Mobile: Content on top of overlay */}
              <div className="md:hidden text-white space-y-6 pt-4">
                <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
                  5G Smart Connect
                </h1>
                
                <div className="space-y-4 text-base sm:text-lg leading-relaxed">
                  <div className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-rose-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-rose-500 mb-1">
                        Weather-Resistant Design
                      </p>
                      <p className="text-slate-200">
                        Built to perform reliably in all conditions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-rose-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-rose-500 mb-1">
                        High-Gain Antenna
                      </p>
                      <p className="text-slate-200">
                        Offers strong and consistent indoor coverage.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-rose-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-rose-500 mb-1">
                        Signal Amplification
                      </p>
                      <p className="text-slate-200">
                        Enhances signal strength for stable, uninterrupted connectivity.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <svg
                      className="h-6 w-6 text-rose-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                      />
                    </svg>
                    <div>
                      <p className="font-semibold text-rose-500 mb-1">
                        Flexible Mounting Options
                      </p>
                      <p className="text-slate-200">
                        Easily install on walls, poles, or rooftops.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Link
                    href="/request-installation"
                    className="block w-full text-center rounded-xl bg-rose-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition hover:bg-rose-500 active:scale-95"
                  >
                    Get Connected
                  </Link>
                          </div>
                        </div>

              {/* Desktop: Content on right side */}
              <div className="hidden md:block text-slate-900 space-y-6">
                <h1 className="text-4xl lg:text-5xl font-bold">
                  5G Smart Connect - Outdoor Unit
                </h1>
                <div className="space-y-4 text-base lg:text-lg text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">
                      Weather-Resistant Design
                    </span>{" "}
                    - Built to perform reliably in all conditions.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      High-Gain Antenna
                    </span>{" "}
                    - Offers strong and consistent indoor coverage
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      Signal Amplification
                    </span>{" "}
                    - Enhances signal strength to ensure stable and uninterrupted
                    connectivity.
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      Flexible Mounting Options
                    </span>{" "}
                    - Easily install on walls, poles, or rooftops to suit your
                    setup and location.
                  </p>
                      </div>
                <Link
                  href="/request-installation"
                  className="inline-block mt-6 rounded-xl bg-rose-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:bg-rose-500"
                >
                  Get Connected
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
