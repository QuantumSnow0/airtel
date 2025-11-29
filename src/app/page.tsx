import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-white md:h-screen md:flex md:items-center">
        {/* Desktop: Background */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

        {/* Content */}
        <div className="relative z-10 w-full px-6 sm:px-8 lg:px-8 pt-8 pb-8 md:py-8 md:overflow-y-auto md:max-h-screen">
          <div className="max-w-7xl mx-auto">
            {/* Mobile: Zigzag Layout */}
            <div className="md:hidden space-y-6">
              {/* Title */}
              <h1
                className="text-2xl sm:text-5xl font-extrabold leading-tight text-center mb-3"
                style={{
                  background: "linear-gradient(135deg, #dc2626, #991b1b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Airtel Smart Connect 5G
              </h1>

              {/* Section 1: Feature on top, Image below */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-rose-600 shrink-0 mt-0.5"
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
                    <p className="font-semibold text-rose-600 mb-1 leading-tight">
                      Weather-Resistant Design
                    </p>
                    <p className="text-slate-700">
                      Built to perform reliably in all conditions.
                    </p>
                  </div>
                </div>
                <img
                  src="/airtel.png"
                  alt="5G Smart Connect Router"
                  className="w-full rounded-lg shadow-md"
                />
                <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 my-3">
                  <p className="text-slate-800 text-base text-center font-medium">
                    <span className="font-semibold text-rose-600">
                      Plan prices
                    </span>{" "}
                    – KES <span className="font-bold">1,999</span> for 15Mbps
                    and KES <span className="font-bold">2,999</span> for 30Mbps
                  </p>
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <p className="text-slate-700 text-sm text-center">
                      <span className="font-semibold">Total Amount</span>
                    </p>
                    <p className="text-slate-700 text-sm text-center mt-1">
                      Plan Price + KES <span className="font-bold">1,000</span>{" "}
                      Connection Fee
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Feature on top, Image below */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-rose-600 shrink-0 mt-0.5"
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
                    <p className="font-semibold text-rose-600 mb-1 leading-tight">
                      High-Gain Antenna
                    </p>
                    <p className="text-slate-700">
                      Offers strong and consistent indoor coverage.
                    </p>
                  </div>
                </div>
                <img
                  src="/airtel1.jpeg"
                  alt="5G Smart Connect Router"
                  className="w-full rounded-lg shadow-md"
                />
              </div>

              {/* Section 3: Feature on top, Image below */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-rose-600 shrink-0 mt-0.5"
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
                    <p className="font-semibold text-rose-600 mb-1 leading-tight">
                      Signal Amplification
                    </p>
                    <p className="text-slate-700">
                      Enhances signal strength for stable, uninterrupted
                      connectivity.
                    </p>
                  </div>
                </div>
                <img
                  src="/airtel2.jpeg"
                  alt="5G Smart Connect Router Installation"
                  className="w-full rounded-lg shadow-md"
                />
              </div>

              {/* Section 4: Feature only (no image) */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="h-5 w-5 text-rose-600 shrink-0 mt-0.5"
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
                    <p className="font-semibold text-rose-600 mb-1 leading-tight">
                      Flexible Mounting Options
                    </p>
                    <p className="text-slate-700">
                      Easily install on walls, poles, or rooftops.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: Full Layout */}
            <div className="hidden md:block">
              {/* Hero Section - Split Layout */}
              <div className="grid grid-cols-2 gap-8 lg:gap-12 items-start">
                {/* Left: Images Grid Carousel */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg overflow-hidden shadow-md aspect-square">
                    <img
                      src="/airtel.png"
                      alt="5G Smart Connect Router"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md aspect-square">
                    <img
                      src="/airtel1.jpeg"
                      alt="5G Smart Connect Router"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="rounded-lg overflow-hidden shadow-md aspect-video col-span-2">
                    <img
                      src="/airtel2.jpeg"
                      alt="5G Smart Connect Router Installation"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Right: Content */}
                <div className="space-y-4 mt-6">
                  <div>
                    <h1
                      className="text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight"
                      style={{
                        background: "linear-gradient(135deg, #dc2626, #991b1b)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      5G Smart Connect
                    </h1>
                    <p className="text-xl lg:text-2xl text-slate-600 font-medium mb-8">
                      Outdoor Unit - High-Speed Internet for Kenya
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <svg
                        className="h-6 w-6 text-rose-600 shrink-0 mt-1"
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
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          Weather-Resistant Design
                        </h3>
                        <p className="text-slate-700">
                          Built to perform reliably in all conditions.
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg px-6 py-4 mb-6">
                      <p className="text-slate-800 text-lg font-medium">
                        <span className="font-semibold text-rose-600">
                          Plan prices
                        </span>{" "}
                        – KES <span className="font-bold">1,999</span> for
                        15Mbps and KES <span className="font-bold">2,999</span>{" "}
                        for 30Mbps
                      </p>
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="text-slate-700 text-base text-center">
                          <span className="font-semibold">Total Amount</span>
                        </p>
                        <p className="text-slate-700 text-base text-center mt-1">
                          Plan Price + KES{" "}
                          <span className="font-bold">1,000</span> Connection
                          Fee
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <svg
                        className="h-6 w-6 text-rose-600 shrink-0 mt-1"
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
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          High-Gain Antenna
                        </h3>
                        <p className="text-slate-700">
                          Offers strong and consistent indoor coverage.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <svg
                        className="h-6 w-6 text-rose-600 shrink-0 mt-1"
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
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          Signal Amplification
                        </h3>
                        <p className="text-slate-700">
                          Enhances signal strength for stable, uninterrupted
                          connectivity.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <svg
                        className="h-6 w-6 text-rose-600 shrink-0 mt-1"
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
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          Flexible Mounting Options
                        </h3>
                        <p className="text-slate-700">
                          Easily install on walls, poles, or rooftops.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div>
                    <Link
                      href="/request-installation"
                      className="inline-block rounded-xl px-10 py-5 text-lg font-semibold text-white shadow-lg shadow-rose-500/50 transition hover:shadow-xl hover:shadow-rose-500/60"
                      style={{
                        background: "linear-gradient(135deg, #ff0033, #b80000)",
                      }}
                    >
                      Get Connected
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Button for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 shadow-lg">
        <Link
          href="/request-installation"
          className="block w-full text-center rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition active:scale-95"
          style={{
            background: "linear-gradient(135deg, #ff0033, #b80000)",
          }}
        >
          Get Connected
        </Link>
      </div>
    </div>
  );
}
