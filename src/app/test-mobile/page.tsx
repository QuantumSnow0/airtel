import ProductCarousel from "./ProductCarousel";
import PricingCards from "../components/PricingCards";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function TestMobilePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <ProductCarousel />

      {/* Step 1: Choose Your Package */}
      <section className="px-3 py-2" style={{ marginTop: "0" }}>
        <div className="w-full">
          <div className="text-center mb-6">
            <h2
              className={`text-xl font-bold text-white mb-2 ${poppins.variable}`}
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Step 1: Choose Your Package
            </h2>
            <p
              className={`text-sm text-white/70 ${poppins.variable}`}
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Select the perfect plan for your needs
            </p>
          </div>
          <PricingCards />
        </div>
      </section>

      {/* Step 2: Almost There */}
      <section className="px-3 py-2">
        <div className="w-full">
          <div className="text-center mb-6">
            <h2
              className={`text-xl font-bold text-white mb-2 ${poppins.variable}`}
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
                background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Step 2: Almost There
            </h2>
            <p
              className={`text-sm text-white/70 ${poppins.variable}`}
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Just a few details and our certified technician will schedule your
              installation
            </p>
          </div>

          {/* Sample Form Field - Customer Name */}
          <div className="mb-4">
            <label
              className={`block text-sm font-medium text-white/90 mb-2 ${poppins.variable}`}
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            >
              Customer Name <span className="text-yellow-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-lg bg-slate-800/90 backdrop-blur-sm border-2 border-slate-700/50 text-white placeholder:text-slate-400 focus:outline-none focus:border-yellow-400/60 focus:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all duration-300 ${poppins.variable}`}
              style={{
                fontFamily: "var(--font-poppins), sans-serif",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
