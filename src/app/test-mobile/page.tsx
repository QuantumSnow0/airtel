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
      <section className="px-4 py-8" style={{ marginTop: "-232px" }}>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2
              className={`text-2xl font-bold text-white mb-2 ${poppins.variable}`}
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
    </div>
  );
}
