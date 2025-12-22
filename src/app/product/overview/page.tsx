import { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "What is Airtel SmartConnect? | 5G Router Overview",
  description: "Learn about the Airtel SmartConnect 5G router - its features, capabilities, and how it can enhance your internet connectivity.",
  keywords: "Airtel SmartConnect, 5G router, signal amplification, high-gain antenna, Kenya",
  openGraph: {
    title: "What is Airtel SmartConnect? | 5G Router Overview",
    description: "Learn about the Airtel SmartConnect 5G router and its capabilities.",
    type: "website",
  },
};

export default function ProductOverviewPage() {
  return (
    <div className={`min-h-screen bg-neutral-900 text-white ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
            What is Airtel SmartConnect?
          </h1>
          <p className="text-lg text-neutral-300">
            Learn about the Airtel SmartConnect 5G router and its capabilities.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-neutral-200">
          <section>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-3">Overview</h2>
            <p className="leading-relaxed">
              The Airtel SmartConnect is a high-performance 5G router designed to provide reliable, 
              high-speed internet connectivity. It combines advanced signal amplification technology 
              with a weather-resistant design to deliver consistent internet access in various conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-3">Key Features</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Signal amplification for stable connectivity</li>
              <li>High-gain antenna for strong indoor coverage</li>
              <li>Weather-resistant design for all conditions</li>
              <li>Flexible mounting options for easy installation</li>
            </ul>
          </section>

          {/* Placeholder for future content */}
          <section className="mt-8 p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
            <p className="text-neutral-400 italic">
              More detailed content will be added here. This is a placeholder page.
            </p>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <a
            href="/mobile"
            className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/40 rounded-lg text-yellow-400 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}

