import { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Airtel 5G Router | Airtel SmartConnect 5G Home & Office WiFi Guide | Kenya",
  description: "Complete guide to Airtel 5G router and Airtel SmartConnect 5G Home & Office WiFi. Fixed Wireless Access system with outdoor 5G modem and indoor WiFi 6 router. Perfect for homes and offices in Kenya. 1TB data cap, portable, no contract required.",
  keywords: [
    "Airtel 5G router",
    "airtel 5g router",
    "Airtel 5G",
    "airtel 5g",
    "Airtel 5G router price",
    "airtel 5g router cost",
    "Airtel 5G router price Kenya",
    "Airtel SmartConnect price",
    "Airtel 5G router installation cost",
    "Airtel SmartConnect 5G",
    "Airtel 5G router Kenya",
    "Fixed Wireless Access Kenya",
    "5G Home WiFi Kenya",
    "Airtel SmartConnect overview",
    "ZLT X17M W304VA PRO",
    "5G FWA Kenya",
    "wireless internet Kenya",
    "home internet Kenya",
    "office WiFi Kenya",
    "5G router features",
    "Airtel internet Kenya",
    "how to resubscribe airtel 5g router",
    "airtel 5g router resubscribe",
    "renew airtel 5g data plan",
    "airtel 5g router data plan renewal",
    "airtel smartconnect resubscribe",
    "airtel 5g router USSD resubscribe",
    "airtel 5g router my airtel app",
    "airtel 5g router top up",
    "airtel 5g router buy data",
    "airtel 5g router add data",
    "airtel 5g router extend plan",
    "airtel 5g router reactivate",
    "airtel 5g router activate again",
    "airtel router no airtel line",
    "airtel router without airtel sim",
    "airtel router renew data",
    "airtel router purchase data",
    "airtel router add bundle",
    "airtel router buy bundle",
    "airtel router recharge",
    "airtel router reload",
  ].join(", "),
  openGraph: {
    title: "Airtel 5G Router | Airtel SmartConnect 5G Home & Office WiFi Guide",
    description: "Complete guide to Airtel 5G router and Airtel SmartConnect 5G - Fixed Wireless Access system perfect for homes and offices in Kenya. Learn about features, specifications, and benefits.",
    type: "website",
    url: "https://www.airtel5grouter.co.ke/product/overview",
    images: [
      {
        url: "https://www.airtel5grouter.co.ke/5grouter.png",
        width: 1200,
        height: 630,
        alt: "Airtel SmartConnect 5G Home & Office WiFi Router",
      },
    ],
    locale: "en_KE",
    siteName: "Airtel 5G Router Kenya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Airtel 5G Router | Airtel SmartConnect 5G Home & Office WiFi Guide",
    description: "Complete guide to Airtel 5G router and Airtel SmartConnect 5G - Fixed Wireless Access system perfect for homes and offices in Kenya.",
    images: ["https://www.airtel5grouter.co.ke/5grouter.png"],
  },
  alternates: {
    canonical: "https://www.airtel5grouter.co.ke/product/overview",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function ProductOverviewPage() {
  // Product Schema for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Airtel SmartConnect 5G Home & Office WiFi",
    description: "Fixed Wireless Access (FWA) system consisting of outdoor 5G modem (ZLT X17M) and indoor WiFi 6 router (ZLT W304VA PRO) for reliable home and office internet connectivity in Kenya.",
    brand: {
      "@type": "Brand",
      name: "Airtel",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Airtel Kenya",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Customer",
        },
        datePublished: "2024-12-01",
        reviewBody: "Excellent 5G router system with reliable connectivity. The outdoor unit provides strong signal even in remote areas. Perfect for both home and office use.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Customer",
        },
        datePublished: "2024-11-15",
        reviewBody: "Great value for money. Fast internet speeds and easy installation. The WiFi 6 router provides excellent coverage throughout the house.",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "4",
          bestRating: "5",
        },
      },
    ],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "1999",
      priceCurrency: "KES",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "KES",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "KE",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          },
          cutoffTime: "14:00",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 3,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "KE",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Airtel SmartConnect 5G Home & Office WiFi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Airtel SmartConnect 5G Home & Office WiFi is a Fixed Wireless Access (FWA) system consisting of two units: an outdoor 5G modem (ZLT X17M) with integrated directional antennas, and an indoor WiFi 6 router (ZLT W304VA PRO) for local network distribution. It provides reliable internet access in areas where cable-based internet is difficult or unavailable.",
        },
      },
      {
        "@type": "Question",
        name: "How does Airtel SmartConnect work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The outdoor unit connects to Airtel's 5G network (with 4G/3G fallback) and receives the signal. It then transmits the connection to the indoor router via Ethernet cable with POE power. The indoor router creates a WiFi 6 network for your devices. The system operates automatically once installed.",
        },
      },
      {
        "@type": "Question",
        name: "What is the data cap for Airtel SmartConnect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Airtel SmartConnect has a data cap of 1TB (1,000 GB). After reaching the cap, users continue browsing at reduced speeds of 2 Mbps. Additional data bundles can be purchased to restore higher speeds.",
        },
      },
      {
        "@type": "Question",
        name: "Is Airtel SmartConnect portable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, unlike cable-based internet, Airtel SmartConnect is portable and can be moved to another location, as long as the new location is within Airtel network coverage.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a contract for Airtel SmartConnect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No, there is no long-term contract required. Users can add extra data bundles and change plans when needed, providing flexibility.",
        },
      },
      {
        "@type": "Question",
        name: "Where can I use Airtel SmartConnect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Airtel SmartConnect is currently available in selected areas with adequate Airtel coverage. The service can fall back to 4G and 3G when 5G coverage is not available. Check availability in your area before ordering.",
        },
      },
      {
        "@type": "Question",
        name: "Does Airtel SmartConnect use a SIM card?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Airtel SmartConnect requires an Airtel 5G SIM card to work. The SIM card comes with the device and is installed by the professional installer during first installation. The SIM card is inserted into the outdoor unit's SIM slot.",
        },
      },
      {
        "@type": "Question",
        name: "How many devices can connect to Airtel SmartConnect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Airtel SmartConnect can support up to 64 devices simultaneously. However, for optimal performance, we recommend connecting up to 32 devices at a time. More devices share the available internet speed, so keeping it to 32 or fewer ensures better performance for each device.",
        },
      },
    ],
  };

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What is Airtel SmartConnect 5G Home & Office WiFi? Complete Guide",
    description: "Complete guide to Airtel SmartConnect 5G Home & Office WiFi - Fixed Wireless Access system with outdoor 5G modem and indoor WiFi 6 router. Learn about features, specifications, installation, and benefits for homes and offices in Kenya.",
    image: [
      "https://www.airtel5grouter.co.ke/5grouter.png",
      "https://www.airtel5grouter.co.ke/antenna.png",
    ],
    author: {
      "@type": "Organization",
      name: "Airtel Kenya",
      url: "https://www.airtelkenya.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Airtel Kenya",
      logo: {
        "@type": "ImageObject",
        url: "https://www.airtel5grouter.co.ke/airtel.png",
      },
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.airtel5grouter.co.ke/product/overview",
    },
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.airtel5grouter.co.ke",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Product Overview",
                item: "https://www.airtel5grouter.co.ke/product/overview",
              },
            ],
          }),
        }}
      />

      <div className={`min-h-screen bg-neutral-900 text-white ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Breadcrumbs */}
          <nav className="mb-4 text-sm text-neutral-400" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/mobile" className="hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-neutral-300">Product Overview</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <header className="mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              What is Airtel SmartConnect 5G Home & Office WiFi?
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 mb-4 sm:mb-6 leading-relaxed">
              Fixed Wireless Access (FWA) system providing reliable, high-speed internet for homes and offices in Kenya
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/mobile"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-neutral-900 font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                Order Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="/product/troubleshooting"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-yellow-400/50 text-yellow-400 font-semibold rounded-lg transition-all"
              >
                Troubleshooting Guide
              </Link>
            </div>
          </header>

          {/* Quick Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 sm:mb-12">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">1 TB</div>
              <div className="text-sm sm:text-base text-neutral-300">Data Cap Per Month</div>
            </div>
            <div className="p-4 sm:p-5 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">5G/4G</div>
              <div className="text-sm sm:text-base text-neutral-300">Network Technology</div>
            </div>
            <div className="p-4 sm:p-5 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">WiFi 6</div>
              <div className="text-sm sm:text-base text-neutral-300">Indoor Router</div>
            </div>
            <div className="p-4 sm:p-5 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">No Contract</div>
              <div className="text-sm sm:text-base text-neutral-300">Flexible Plans</div>
            </div>
          </section>

          {/* What It Is Section */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                01
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">What is Airtel SmartConnect?</h2>
            </div>
            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <p>
                <strong className="text-yellow-400">Airtel SmartConnect 5G Home & Office WiFi</strong> is a wireless internet solution that brings high-speed internet to your home or office without needing cables like fiber or DSL. Think of it as a bridge between Airtel's cellular network and your devices - it receives internet signal wirelessly from Airtel's cell towers and creates a WiFi network in your home or office.
              </p>
              <p>
                This is perfect for areas where traditional cable internet (like fiber optic cables) is difficult or impossible to install - such as rural areas, remote locations, or places where digging cables isn't practical. Instead of waiting for cable infrastructure, you get internet through Airtel's existing cellular network.
              </p>
              <p>
                The system consists of <strong>two components</strong> that work together:
              </p>
              <div className="grid md:grid-cols-2 gap-4 my-4">
                <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                  <div className="mb-3 flex justify-center">
                    <div className="relative w-full max-w-[200px] h-[150px]">
                      <Image
                        src="/antenna.png"
                        alt="Airtel SmartConnect 5G Outdoor Unit ZLT X17M - Weather-resistant 5G modem antenna for home and office WiFi"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 200px"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-yellow-400 mb-2 text-lg">Outdoor Unit (ODU)</h3>
                  <p className="text-sm sm:text-base text-neutral-300 mb-2">
                    <strong>Model: ZLT X17M</strong>
                  </p>
                  <p className="text-sm text-neutral-400">
                    A weather-resistant 5G modem with integrated directional antennas that connects to Airtel's cellular network. Installed outside for optimal signal reception. <Link href="/product/troubleshooting#led-indicators" className="text-yellow-400 hover:text-yellow-300 underline text-xs">Learn about LED indicators</Link>
                  </p>
                </div>
                <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                  <div className="mb-3 flex justify-center">
                    <div className="relative w-full max-w-[200px] h-[150px]">
                      <Image
                        src="/5grouter.png"
                        alt="Airtel SmartConnect 5G Indoor Unit ZLT W304VA PRO - WiFi 6 router for home and office internet"
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 200px"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-yellow-400 mb-2 text-lg">Indoor Unit (IDU)</h3>
                  <p className="text-sm sm:text-base text-neutral-300 mb-2">
                    <strong>Model: ZLT W304VA PRO</strong>
                  </p>
                  <p className="text-sm text-neutral-400">
                    A WiFi 6 router that creates your local network. Connects to the outdoor unit via Ethernet cable and distributes internet to all your devices. <Link href="/product/troubleshooting#router-settings" className="text-yellow-400 hover:text-yellow-300 underline text-xs">Access router settings</Link>
                  </p>
                </div>
              </div>
              <div className="p-4 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                <p className="text-sm sm:text-base">
                  <strong className="text-yellow-400">Important:</strong> This is <strong>not a signal booster or amplifier</strong>. It is a complete internet access solution that works independently, providing internet where cable-based services are unavailable.
                </p>
              </div>
            </div>
          </section>

          {/* Problem It Solves */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                02
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Problem It Solves</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 sm:p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl">The Challenge</h3>
                <p className="text-neutral-300 mb-4 text-sm sm:text-base leading-relaxed">
                  In Kenya, both urban and rural users face the challenge of accessing reliable, affordable internet. Cable-based internet (fiber or DSL) is often difficult or impossible to deploy in many areas, especially in rural locations.
                </p>
                <p className="text-neutral-300 mb-4 text-sm sm:text-base leading-relaxed">
                  Without a solution like Airtel SmartConnect, users are forced to rely on mobile data, which becomes expensive for continuous or heavy internet use.
                </p>
                <h3 className="font-semibold text-yellow-400 mb-3 text-lg sm:text-xl">The Solution</h3>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                  Airtel SmartConnect provides wireless internet access that doesn't require cable installation. It's perfect for areas where traditional internet infrastructure is unavailable, offering a cost-effective alternative to expensive mobile data plans.
                </p>
              </div>
            </div>
          </section>

          {/* Key Features */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                03
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Key Features & Benefits</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Feature Cards */}
              <div className="p-5 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-all">
                <div className="text-3xl mb-3">📡</div>
                <h3 className="font-semibold text-white mb-2 text-lg">5G/4G Connectivity</h3>
                <p className="text-sm text-neutral-300">
                  Connects to Airtel's 5G network with automatic fallback to 4G and 3G when 5G is unavailable. Uses bands including n41 (5G) and B1, B3, B20 (4G).
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-all">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-semibold text-white mb-2 text-lg">1 TB Data Cap</h3>
                <p className="text-sm text-neutral-300">
                  Generous 1TB monthly data allowance. After reaching the cap, continue browsing at 2 Mbps. Purchase additional bundles to restore full speeds.
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-all">
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-semibold text-white mb-2 text-lg">WiFi 6 Technology</h3>
                <p className="text-sm text-neutral-300">
                  Indoor router supports WiFi 6 (802.11ax) standard, providing faster speeds, better performance with multiple devices, and improved efficiency. <Link href="/product/troubleshooting#wifi-password" className="text-yellow-400 hover:text-yellow-300 underline">Find WiFi password</Link>
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-all">
                <div className="text-3xl mb-3">🌧️</div>
                <h3 className="font-semibold text-white mb-2 text-lg">Weather Resistant</h3>
                <p className="text-sm text-neutral-300">
                  Outdoor unit operates from -30°C to +60°C, making it suitable for Kenya's climate. Weather-resistant design ensures reliable operation in all conditions.
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-all">
                <div className="text-3xl mb-3">📦</div>
                <h3 className="font-semibold text-white mb-2 text-lg">Portable</h3>
                <p className="text-sm text-neutral-300">
                  Unlike cable-based internet, you can move Airtel SmartConnect to another location (within Airtel coverage). Perfect for renters or those who relocate.
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-all">
                <div className="text-3xl mb-3">🔌</div>
                <h3 className="font-semibold text-white mb-2 text-lg">POE Power</h3>
                <p className="text-sm text-neutral-300">
                  Outdoor unit receives power through the Ethernet cable (Power over Ethernet), simplifying installation and reducing cable clutter.
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-all">
                <div className="text-3xl mb-3">🔋</div>
                <h3 className="font-semibold text-white mb-2 text-lg">Rechargeable Battery</h3>
                <p className="text-sm text-neutral-300">
                  Device includes a rechargeable battery for backup power. Battery requires recharging when depleted.
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-all">
                <div className="text-3xl mb-3">📱</div>
                <h3 className="font-semibold text-white mb-2 text-lg">NFC OneHop</h3>
                <p className="text-sm text-neutral-300">
                  Quick WiFi connection using NFC-enabled Android devices. Tap the NFC area on the router to connect without entering passwords. <Link href="/product/troubleshooting#nfc-function" className="text-yellow-400 hover:text-yellow-300 underline">NFC setup guide</Link>
                </p>
              </div>

              <div className="p-5 bg-gradient-to-br from-neutral-800/50 to-neutral-800/30 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-all">
                <div className="text-3xl mb-3">⚙️</div>
                <h3 className="font-semibold text-white mb-2 text-lg">Easy Management</h3>
                <p className="text-sm text-neutral-300">
                  Manage your router via web interface (192.168.1.1) or TZLink mobile app. Simple setup and configuration for non-technical users. <Link href="/product/troubleshooting#router-settings" className="text-yellow-400 hover:text-yellow-300 underline">Setup guide</Link>
                </p>
              </div>
            </div>
          </section>

          {/* Technical Specifications */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                04
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Technical Specifications</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="font-semibold text-yellow-400 mb-4 text-xl">Outdoor Unit (ZLT X17M)</h3>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300">
                  <li>• <strong className="text-yellow-400">Operating Temperature:</strong> -30°C to +60°C</li>
                  <li>• <strong className="text-yellow-400">Relative Humidity:</strong> 5% to 95%</li>
                  <li>• <strong className="text-yellow-400">Dimensions:</strong> 195mm × 110mm × 42mm</li>
                  <li>• <strong className="text-yellow-400">Weight:</strong> Approximately 600g</li>
                  <li>• <strong className="text-yellow-400">Network:</strong> 5G NSA, 4G LTE, 3G fallback</li>
                  <li>• <strong className="text-yellow-400">Power:</strong> POE (Power over Ethernet) - <Link href="/product/troubleshooting#router-ports" className="text-yellow-400 hover:text-yellow-300 underline text-xs">Learn about ports</Link></li>
                  <li>• <strong className="text-yellow-400">Antenna:</strong> Integrated directional antennas - <Link href="/product/troubleshooting#led-indicators" className="text-yellow-400 hover:text-yellow-300 underline text-xs">LED guide</Link></li>
                </ul>
              </div>
              <div className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="font-semibold text-yellow-400 mb-4 text-xl">Indoor Unit (ZLT W304VA PRO)</h3>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300">
                  <li>• <strong className="text-yellow-400">Working Temperature:</strong> 0°C to +40°C</li>
                  <li>• <strong className="text-yellow-400">Relative Humidity:</strong> 5% to 95%</li>
                  <li>• <strong className="text-yellow-400">Power Supply:</strong> AC 100V-240V, 50Hz-60Hz</li>
                  <li>• <strong className="text-yellow-400">Output:</strong> DC 12V/2A</li>
                  <li>• <strong className="text-yellow-400">Dimensions:</strong> 230mm × 140mm × 150mm</li>
                  <li>• <strong className="text-yellow-400">Weight:</strong> 470g</li>
                  <li>• <strong className="text-yellow-400">WiFi:</strong> WiFi 6 (802.11ax) - <Link href="/product/troubleshooting#wifi-password" className="text-yellow-400 hover:text-yellow-300 underline text-xs">WiFi password guide</Link></li>
                  <li>• <strong className="text-yellow-400">Ports:</strong> WAN (POE), 3× LAN, USB - <Link href="/product/troubleshooting#router-ports" className="text-yellow-400 hover:text-yellow-300 underline text-xs">Port details</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
              <h3 className="font-semibold text-yellow-400 mb-3 text-lg">Network Bands (Observed)</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base text-neutral-300">
                <div>
                  <strong className="text-yellow-400">4G LTE Bands:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• Band 1 (2100 MHz)</li>
                    <li>• Band 3 (1800 MHz)</li>
                    <li>• Band 20 (800 MHz)</li>
                  </ul>
                </div>
                <div>
                  <strong className="text-yellow-400">5G NR Bands:</strong>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• n41 (~2.5 GHz)</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-3">
                <strong>Note:</strong> Band availability depends on Airtel network deployment in your area. The device automatically selects the best available band.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                05
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">How It Works</h2>
            </div>
            <div className="space-y-6">
              <div className="p-5 sm:p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="font-semibold text-white mb-4 text-lg sm:text-xl">Installation Process</h3>
                <ol className="space-y-3 text-sm sm:text-base text-neutral-300">
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-400 font-bold shrink-0">1</span>
                    <span><strong className="text-yellow-400">Professional Installation:</strong> A properly trained Airtel installer performs the first installation. The outdoor unit is mounted outside (rooftop, wall, or pole) for optimal signal reception.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-400 font-bold shrink-0">2</span>
                    <span><strong className="text-yellow-400">Connection:</strong> The outdoor and indoor units are connected via Ethernet cable (CAT5E or CAT6) with waterproof protection. The cable provides both data and power (POE) to the outdoor unit.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-400 font-bold shrink-0">3</span>
                    <span><strong className="text-yellow-400">SIM Card:</strong> An Airtel 5G SIM card is inserted into the outdoor unit's SIM slot (located at the bottom, requires opening screws). <Link href="/product/troubleshooting#sim-card" className="text-yellow-400 hover:text-yellow-300 underline">See SIM installation guide</Link></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-400 font-bold shrink-0">4</span>
                    <span><strong className="text-yellow-400">Power On:</strong> The indoor router is connected to power. The system boots automatically and connects to Airtel's network.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400/20 text-yellow-400 font-bold shrink-0">5</span>
                    <span><strong className="text-yellow-400">Ready to Use:</strong> Once installed, the device operates as plug-and-play. Connect your devices to the WiFi network using the default password (found on the router label). <Link href="/product/troubleshooting#device-label" className="text-yellow-400 hover:text-yellow-300 underline">Find default password</Link></span>
                  </li>
                </ol>
              </div>
              <div className="p-5 sm:p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl">Operation</h3>
                <p className="text-neutral-300 mb-3 text-sm sm:text-base leading-relaxed">
                  Once installed, Airtel SmartConnect works automatically:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300 ml-4">
                  <li>• The outdoor unit connects to Airtel's 5G network (or 4G/3G if 5G unavailable)</li>
                  <li>• Signal is transmitted to the indoor router via Ethernet cable</li>
                  <li>• The indoor router creates a WiFi 6 network for your devices</li>
                  <li>• All your devices (phones, laptops, smart TVs, etc.) connect to the WiFi</li>
                  <li>• No ongoing maintenance required - it's "set it and forget it"</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                06
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Who Is This For?</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-5 sm:p-6 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
                <div className="text-3xl mb-3">🏠</div>
                <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl">Home Users</h3>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300">
                  <li>• Netflix streaming and video entertainment</li>
                  <li>• Online gaming</li>
                  <li>• General browsing and social media</li>
                  <li>• Work from home</li>
                  <li>• Video calls and conferencing</li>
                  <li>• Smart home devices</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
                <div className="text-3xl mb-3">🏢</div>
                <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl">Business & Office</h3>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300">
                  <li>• Office internet connectivity</li>
                  <li>• Video conferencing and remote meetings</li>
                  <li>• Cloud services and file sharing</li>
                  <li>• Point of Sale (POS) systems</li>
                  <li>• Email and business applications</li>
                  <li>• Multiple device connectivity</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
              <h3 className="font-semibold text-yellow-400 mb-3 text-lg">Ideal For:</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-sm sm:text-base text-neutral-300">
                <ul className="space-y-2">
                  <li>✅ Areas without cable internet infrastructure</li>
                  <li>✅ Rural locations</li>
                  <li>✅ Urban areas with weak signal</li>
                  <li>✅ Renters who need portable internet</li>
                </ul>
                <ul className="space-y-2">
                  <li>✅ Users seeking cost-effective internet</li>
                  <li>✅ Those who want to avoid expensive mobile data</li>
                  <li>✅ Homes and offices needing reliable connectivity</li>
                  <li>✅ Users who want flexibility (no long-term contract)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                07
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Key Benefits</h2>
            </div>
            <div className="space-y-4">
              <div className="p-5 sm:p-6 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
                <h3 className="font-semibold text-yellow-400 mb-2 text-lg sm:text-xl">💰 Cost Savings</h3>
                <p className="text-sm sm:text-base text-neutral-300">
                  Save on data costs compared to mobile data plans. With 1TB monthly allowance, you can browse frequently without constantly worrying about running out of data or expensive overage charges.
                </p>
              </div>
              <div className="p-5 sm:p-6 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
                <h3 className="font-semibold text-yellow-400 mb-2 text-lg sm:text-xl">🆓 Freedom to Browse</h3>
                <p className="text-sm sm:text-base text-neutral-300">
                  Browse the internet whenever and as much as you want without worrying about data usage or expiry. Enjoy streaming, gaming, and working online without restrictions.
                </p>
              </div>
              <div className="p-5 sm:p-6 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
                <h3 className="font-semibold text-yellow-400 mb-2 text-lg sm:text-xl">📦 Portability</h3>
                <p className="text-sm sm:text-base text-neutral-300">
                  Unlike cable-based internet, you can move Airtel SmartConnect to another location (within Airtel coverage). Perfect for renters, temporary locations, or if you relocate.
                </p>
              </div>
              <div className="p-5 sm:p-6 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
                <h3 className="font-semibold text-yellow-400 mb-2 text-lg sm:text-xl">🔓 No Long-Term Contract</h3>
                <p className="text-sm sm:text-base text-neutral-300">
                  No contract required. Add extra data bundles and change plans when needed. Complete flexibility to adjust your service based on your needs.
                </p>
              </div>
            </div>
          </section>

          {/* Requirements & Compatibility */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                08
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Requirements & Compatibility</h2>
            </div>
            <div className="space-y-4">
              <div className="p-5 sm:p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl">Network Requirements</h3>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300">
                  <li>• <strong className="text-yellow-400">Network Lock:</strong> Device is locked to Airtel network only</li>
                  <li>• <strong className="text-yellow-400">Coverage:</strong> Requires Airtel network coverage in your area - <Link href="/product/troubleshooting#no-signal" className="text-yellow-400 hover:text-yellow-300 underline text-xs">Signal troubleshooting</Link></li>
                  <li>• <strong className="text-yellow-400">Fallback:</strong> Automatically falls back to 4G and 3G when 5G is unavailable</li>
                  <li>• <strong className="text-yellow-400">Availability:</strong> Currently available in selected areas with adequate Airtel coverage</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl">Installation Requirements</h3>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300">
                  <li>• <strong className="text-yellow-400">Location:</strong> Outdoor unit must be installed outside for better and more stable connectivity</li>
                  <li>• <strong className="text-yellow-400">Height:</strong> Works best when installed at higher points (rooftop, upper floor)</li>
                  <li>• <strong className="text-yellow-400">Safety:</strong> Proper safety precautions should be observed during installation</li>
                  <li>• <strong className="text-yellow-400">Professional Installation:</strong> First installation is carried out by a properly trained Airtel installer</li>
                  <li>• <strong className="text-yellow-400">Power:</strong> Requires standard AC power outlet for indoor unit</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                <p className="text-sm sm:text-base text-neutral-300">
                  <strong className="text-yellow-400">⚠️ Important:</strong> Service availability and performance depend on Airtel network coverage in your area. Not suitable for areas experiencing heavy or persistent Airtel network issues. Check availability before ordering.
                </p>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                09
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Airtel 5G Router Price & Costs in Kenya</h2>
            </div>
            <p className="text-neutral-300 mb-6 text-sm sm:text-base">
              Find out the complete Airtel 5G router price, installation cost, and monthly data package prices. The Airtel SmartConnect device is provided free - you only pay for installation and your chosen data plan.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 sm:p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl">Device & Installation Cost</h3>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300">
                  <li>• <strong className="text-yellow-400">Airtel 5G Router Device:</strong> Free (provided at no cost)</li>
                  <li>• <strong className="text-yellow-400">Installation Cost:</strong> 1,000 KES (one-time fee)</li>
                  <li>• <strong className="text-yellow-400">SIM Card:</strong> Included with device (no extra cost)</li>
                  <li>• <strong className="text-yellow-400">Professional Setup:</strong> Included in installation fee</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl">Monthly Data Package Prices</h3>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300">
                  <li>• <strong className="text-yellow-400">15Mbps Plan Price:</strong> 1,999 KES/month</li>
                  <li>• <strong className="text-yellow-400">30Mbps Plan Price:</strong> 2,999 KES/month</li>
                  <li>• <strong className="text-yellow-400">Data Cap:</strong> 1TB per month included</li>
                  <li>• <strong className="text-yellow-400">After Cap:</strong> 2 Mbps unlimited (no extra charges)</li>
                </ul>
              </div>
            </div>
            <div className="p-4 sm:p-5 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <p className="text-sm sm:text-base text-neutral-300 mb-2">
                <strong className="text-yellow-400">Total Airtel 5G Router Cost Breakdown:</strong> The Airtel SmartConnect 5G router device is completely free. You only pay 1,000 KES for professional installation (one-time fee) plus your chosen monthly data package (1,999 KES for 15Mbps or 2,999 KES for 30Mbps). No long-term contracts required - you can change plans or add extra data bundles as needed.
              </p>
              <p className="text-sm sm:text-base text-neutral-300">
                <strong className="text-yellow-400">Best Value:</strong> Compared to expensive mobile data plans, Airtel 5G router offers cost-effective internet with 1TB monthly data allowance. Perfect for homes and offices in Kenya looking for affordable high-speed internet.
              </p>
            </div>
          </section>

          {/* Data & Plans */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                10
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Data & Plans</h2>
            </div>
            <div className="space-y-4">
              <div className="p-5 sm:p-6 bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20 rounded-lg">
                <h3 className="font-semibold text-yellow-400 mb-3 text-lg sm:text-xl">Data Cap: 1 TB (1,000 GB)</h3>
                <p className="text-sm sm:text-base text-neutral-300 mb-3">
                  Each month, you receive 1TB of high-speed data. This generous allowance is perfect for:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300 ml-4">
                  <li>• Streaming hundreds of hours of video</li>
                  <li>• Online gaming</li>
                  <li>• Working from home</li>
                  <li>• Multiple devices connected simultaneously</li>
                  <li>• Heavy internet usage without worry</li>
                </ul>
              </div>
              <div className="p-5 sm:p-6 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <h3 className="font-semibold text-white mb-3 text-lg sm:text-xl">After Data Cap</h3>
                <p className="text-sm sm:text-base text-neutral-300 mb-3">
                  Once you reach the 1TB data cap:
                </p>
                <ul className="space-y-2 text-sm sm:text-base text-neutral-300 ml-4">
                  <li>• <strong className="text-yellow-400">Speed Reduction:</strong> Automatically reduced to 2 Mbps</li>
                  <li>• <strong className="text-yellow-400">Continued Access:</strong> You can still browse, but at slower speeds</li>
                  <li>• <strong className="text-yellow-400">Additional Bundles:</strong> Purchase extra data bundles to restore higher speeds</li>
                  <li>• <strong className="text-yellow-400">Flexibility:</strong> Add data as needed, no contract restrictions</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                11
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-400">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              <details className="p-2 sm:p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  Does Airtel SmartConnect use a SIM card?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    Yes, Airtel SmartConnect requires an Airtel 5G SIM card to work. The SIM card is inserted into the outdoor unit (the antenna that's installed outside).
                  </p>
                  <p>
                    <strong className="text-yellow-400">SIM card included:</strong> When you order Airtel SmartConnect, the SIM card comes with the device and is already activated with your chosen data plan. You don't need to purchase a separate SIM card or worry about getting one - it's all included.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Professional installation:</strong> During your first installation, the professional Airtel installer will insert the SIM card into the outdoor unit for you. The SIM card slot is located at the bottom of the outdoor unit, and the installer knows exactly how to access it and install it correctly. You don't need to do anything - the installer handles the entire setup, including SIM card installation. <Link href="/product/troubleshooting#sim-card" className="text-yellow-400 hover:text-yellow-300 underline">See SIM installation guide</Link>
                  </p>
                  <p>
                    <strong className="text-yellow-400">How it works:</strong> Just like your phone needs a SIM card to connect to the network, the outdoor unit uses the Airtel SIM card to receive internet signal from Airtel's cell towers. The SIM card must have an active Airtel data plan, which is already set up when you order the service. If you experience SIM card issues, see our <Link href="/product/troubleshooting#sim-card-issues" className="text-yellow-400 hover:text-yellow-300 underline">SIM card troubleshooting guide</Link>.
                  </p>
                </div>
              </details>

              <details className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  How many devices can connect to Airtel SmartConnect?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    Airtel SmartConnect can support up to <strong className="text-yellow-400">64 devices</strong> simultaneously. However, for optimal performance, we recommend connecting <strong className="text-yellow-400">up to 32 devices</strong> at a time.
                  </p>
                  <p>
                    <strong className="text-yellow-400">What you can connect:</strong> You can connect all your devices to the WiFi network created by the indoor router - smartphones, laptops, tablets, smart TVs, gaming consoles, smart home devices, and more. Each device connects wirelessly to the router, just like connecting to any WiFi network.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Why 32 is recommended:</strong> While the router can technically handle 64 devices, connecting 32 or fewer devices ensures better performance for each device. When more devices share the connection, the available internet speed is divided among them. For example, if many devices are streaming videos or downloading files simultaneously, each device will get a smaller portion of the total speed. Keeping it to 32 devices or fewer ensures everyone gets good speeds.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Wired connections:</strong> The indoor router also has 3 LAN ports for wired connections. Wired connections (using Ethernet cables) are typically faster and more stable than WiFi, so you can connect computers, gaming consoles, or smart TVs directly via cable for the best performance. <Link href="/product/troubleshooting#router-ports" className="text-yellow-400 hover:text-yellow-300 underline">Learn about router ports</Link>
                  </p>
                  <p>
                    <strong className="text-yellow-400">Performance tip:</strong> If you experience slow speeds with many devices connected, see our <Link href="/product/troubleshooting#slow-internet" className="text-yellow-400 hover:text-yellow-300 underline">slow internet troubleshooting guide</Link> for solutions.
                  </p>
                </div>
              </details>

              <details className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  Is Airtel SmartConnect a signal booster?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    No, Airtel SmartConnect is <strong>not a signal booster or amplifier</strong>. It's a complete internet access solution that works independently.
                  </p>
                  <p>
                    <strong className="text-yellow-400">The difference:</strong> A signal booster takes an existing weak signal and makes it stronger. Airtel SmartConnect is different - it's a complete system that connects directly to Airtel's cellular network (like your phone does) and creates a WiFi network in your home or office. It doesn't need an existing internet connection to work.
                  </p>
                  <p>
                    <strong className="text-yellow-400">How it works:</strong> The outdoor unit connects to Airtel's 5G/4G network using a SIM card, receives internet signal from cell towers, and sends it to the indoor router. The indoor router then creates a WiFi network for all your devices. It's a standalone internet solution, perfect for areas where cable internet isn't available. Check the <Link href="/product/troubleshooting#led-indicators" className="text-yellow-400 hover:text-yellow-300 underline">LED indicators guide</Link> to understand device status.
                  </p>
                </div>
              </details>

              <details className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  Can I use Airtel SmartConnect with my existing router?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    Airtel SmartConnect is a complete, standalone router system - it works on its own and doesn't need another router. However, if you want to use it alongside an existing router, you can.
                  </p>
                  <p>
                    <strong className="text-yellow-400">How to connect:</strong> You can connect Airtel SmartConnect to your existing router using an Ethernet cable. Plug one end into one of the LAN ports on the Airtel SmartConnect indoor router, and the other end into your existing router. This allows you to expand your network or use both routers together. <Link href="/product/troubleshooting#router-ports" className="text-yellow-400 hover:text-yellow-300 underline">See router ports guide</Link>
                  </p>
                  <p>
                    <strong className="text-yellow-400">Most common use:</strong> Most people use Airtel SmartConnect as their main router, replacing or supplementing their existing internet connection. You don't need another router - Airtel SmartConnect creates its own WiFi network that all your devices can connect to. If you have WiFi connection issues, see our <Link href="/product/troubleshooting#wifi-issues" className="text-yellow-400 hover:text-yellow-300 underline">WiFi troubleshooting guide</Link>.
                  </p>
                </div>
              </details>

              <details className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  What happens when I use all 1TB of data?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    Each month, you get 1TB (1,000 GB) of high-speed data. That's a lot - enough for hundreds of hours of video streaming, online gaming, working from home, and more.
                  </p>
                  <p>
                    <strong className="text-yellow-400">After reaching 1TB:</strong> Once you've used all 1TB for the month, your internet speed automatically slows down to 2 Mbps. This happens automatically - you don't need to do anything. At 2 Mbps, you can still browse websites, check email, and use social media, but video streaming and large downloads will be slower.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Getting faster speeds again:</strong> If you need faster speeds before the next month starts, you can purchase additional data bundles. Once you buy extra data, your speeds return to normal immediately. You're not cut off from the internet - it just runs at a slower speed until you add more data or the new month begins.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Monthly reset:</strong> Your 1TB allowance resets at the start of each new month, so you get a fresh 1TB to use again.
                  </p>
                </div>
              </details>

              <details className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  Can I move Airtel SmartConnect to a different location?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    Yes! Airtel SmartConnect is portable, which is one of its big advantages over cable-based internet.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Moving to a new location:</strong> Unlike fiber or DSL internet that's tied to a specific address, you can uninstall Airtel SmartConnect and take it with you when you move. This makes it perfect for renters, people who relocate frequently, or those who need internet at multiple locations.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Important requirement:</strong> The new location must be within Airtel network coverage. Before moving, make sure Airtel has good signal strength in the new area. The device needs to connect to Airtel's cell towers, so if there's no Airtel coverage, it won't work.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Reinstallation:</strong> When you move, you'll need to reinstall the outdoor unit at the new location (preferably outside, at a high point for best signal). The indoor router can be placed anywhere inside the building. You may want to contact Airtel for professional reinstallation to ensure optimal setup. If you experience signal issues after moving, see our <Link href="/product/troubleshooting#no-signal" className="text-yellow-400 hover:text-yellow-300 underline">no signal troubleshooting guide</Link>.
                  </p>
                </div>
              </details>

              <details className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  Do I need to sign a long-term contract?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    No, there is <strong>no long-term contract required</strong> with Airtel SmartConnect. This gives you complete flexibility and freedom.
                  </p>
                  <p>
                    <strong className="text-yellow-400">What this means:</strong> You're not locked into a 12-month or 24-month contract. You can use the service month-to-month, and if your needs change or you want to cancel, you have that option without penalty fees.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Flexibility:</strong> You can add extra data bundles whenever you need them, change your data plan, or adjust your service based on your usage. There's no commitment - you pay for what you use, when you use it.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Perfect for:</strong> This flexibility makes Airtel SmartConnect ideal for renters, temporary locations, seasonal use, or anyone who doesn't want to be tied to a long-term contract.
                  </p>
                </div>
              </details>

              <details className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  What if I need help with installation or have technical problems?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    <strong className="text-yellow-400">Professional Installation:</strong> Don't worry about installation - your first installation is done by a properly trained Airtel installer. They'll mount the outdoor unit in the best location, connect everything properly, and make sure it's working before they leave.
                  </p>
                  <p>
                    <strong className="text-yellow-400">If you have problems:</strong> If something isn't working or you have questions, help is available:
                  </p>
                  <ul className="ml-4 space-y-2 list-disc">
                    <li>Visit our comprehensive <Link href="/product/troubleshooting" className="text-yellow-400 hover:text-yellow-300 underline">troubleshooting guide</Link> - it covers common issues like no signal, slow speeds, WiFi problems, and more, with step-by-step solutions</li>
                    <li>Contact Airtel customer care at <a href="tel:0733100500" className="text-yellow-400 hover:text-yellow-300 underline">0733 100 500</a> for personalized assistance</li>
                    <li>Check the LED indicators on your devices - they show you what's working and what might need attention</li>
                  </ul>
                  <p>
                    Most issues can be resolved quickly using the troubleshooting guide, which includes visual guides, step-by-step instructions, and solutions for all common problems.
                  </p>
                </div>
              </details>

              <details className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  Is there a warranty on the device?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    <strong className="text-yellow-400">Device cost:</strong> The Airtel SmartConnect device itself is provided at no cost. You only pay for the installation service and your chosen data package.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Warranty status:</strong> No warranty is currently provided on the device. However, Airtel support is available to help with any issues you might encounter.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Support available:</strong> Even without a warranty, you can get help through Airtel customer care (<a href="tel:0733100500" className="text-yellow-400 hover:text-yellow-300 underline">0733 100 500</a>) or by using the <Link href="/product/troubleshooting" className="text-yellow-400 hover:text-yellow-300 underline">troubleshooting guide</Link> for common problems and solutions.
                  </p>
                </div>
              </details>

              <details className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  How do I renew or resubscribe to my Airtel SmartConnect data plan?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-3 sm:space-y-4 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p className="mb-4">
                    You can renew, resubscribe, top up, or buy a new data bundle for your Airtel SmartConnect 5G router using two methods. <strong className="text-yellow-400">Method 1 (USSD) requires an Airtel phone line</strong>, while <strong className="text-yellow-400">Method 2 (My Airtel App) works on any phone</strong> - even without an Airtel SIM card. Choose the method that works best for you:
                  </p>

                  {/* Method 1: USSD */}
                  <details className="p-2 sm:p-4 bg-neutral-900/50 rounded-lg border border-neutral-700 mb-4">
                    <summary className="font-semibold text-yellow-400 cursor-pointer text-base sm:text-lg mb-2 sm:mb-3">
                      Method 1: Using USSD Code (*400#) - Requires Airtel Phone Line
                    </summary>
                    <div className="mt-4 sm:mt-3 space-y-5 sm:space-y-4">
                      <div className="p-4 sm:p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                        <p className="text-sm leading-relaxed">
                          <strong className="text-yellow-400">⚠️ Important:</strong> This USSD method requires an <strong>Airtel phone line</strong>. You must use an Airtel SIM card in your phone to dial <code className="bg-neutral-900 px-2 py-1 rounded text-yellow-400">*400#</code>. If you don't have an Airtel line, use Method 2 (My Airtel App) below.
                        </p>
                      </div>
                      <p className="text-sm">
                        Follow these step-by-step instructions:
                      </p>
                      
                      <div className="space-y-5 sm:space-y-4">
                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 1: Dial the USSD Code</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">Open your phone dialer and enter <code className="bg-neutral-900 px-2 py-1 rounded text-yellow-400">*400#</code>, then press the green Call button.</p>
                          <div className="mt-3 sm:mt-2 p-3 sm:p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-ussd-1.jpeg" alt="Step 1: Dial USSD code *400# to resubscribe Airtel 5G router data plan on phone dialer" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 2: Select 5G Smart Connect</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">From the Airtel Home menu, select option <strong>1</strong> for "5G Smart Connect".</p>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-ussd-2.jpeg" alt="Step 2: Select 5G Smart Connect from Airtel Home menu to resubscribe Airtel 5G router" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 3: Choose Unlimited Plans</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">Select option <strong>1</strong> for "5G Smart Connect Unlimited Plans".</p>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-ussd-3.jpeg" alt="Step 3: Select 5G Smart Connect Unlimited Plans for Airtel 5G router resubscription" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 4: Enter Your Router Number</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">
                            Enter your 5G Smart Connect Router Number. This is the SIM card number that was inserted into your router during the first installation. The number was provided to you when the device was set up. If you can't remember it, check your Airtel SMS messages - Airtel typically sends this number in confirmation messages after installation or when your plan is active.
                          </p>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-ussd-4.jpeg" alt="Step 4: Enter Airtel 5G router number to resubscribe data plan" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                          <div className="mt-3 sm:mt-2 p-3 sm:p-2 bg-yellow-400/10 border border-yellow-400/20 rounded">
                            <Image src="/resubscribe/resubscribe-router-number-reference.jpeg.jpeg" alt="Example Airtel SMS showing Airtel 5G router number for resubscription reference" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                            <p className="text-sm sm:text-xs text-neutral-400 mt-2 sm:mt-1 text-center">Example: Check your Airtel SMS messages to find your router number</p>
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 5: Select Your Plan</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">Choose your preferred data plan:</p>
                          <ul className="ml-4 space-y-2 sm:space-y-1 mb-3 sm:mb-2 text-sm">
                            <li>• Option <strong>1</strong>: 15Mbps at 1,999 KES/month</li>
                            <li>• Option <strong>2</strong>: 30Mbps at 2,999 KES/month</li>
                            <li>• Option <strong>3</strong>: Booster Pack (300GB) at 1,000 KES</li>
                            <li>• Option <strong>4</strong>: Check Plan status</li>
                          </ul>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-ussd-5.jpeg" alt="Step 5: Select Airtel 5G router data plan for resubscription" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 6: Choose Payment Method</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">Select your preferred payment method:</p>
                          <ul className="ml-4 space-y-2 sm:space-y-1 mb-3 sm:mb-2 text-sm">
                            <li>• Option <strong>1</strong>: Airtime</li>
                            <li>• Option <strong>2</strong>: Airtel Money</li>
                            <li>• Option <strong>3</strong>: M-Pesa</li>
                          </ul>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-ussd-6.jpeg" alt="Step 6: Select payment method for Airtel 5G router resubscription" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 7: Complete Payment (M-Pesa)</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">If you selected M-Pesa:</p>
                          <ol className="ml-4 space-y-2 sm:space-y-1 mb-3 sm:mb-2 text-sm">
                            <li>1. Enter your M-Pesa phone number when prompted</li>
                            <li>2. A payment prompt will be sent to your M-Pesa number</li>
                            <li>3. Enter your M-Pesa PIN to complete the payment</li>
                            <li>4. Your resubscription is complete!</li>
                          </ol>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-ussd-7.jpeg" alt="Step 7: Enter M-Pesa number to pay for Airtel 5G router data plan resubscription" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                          <p className="mt-3 sm:mt-2 text-sm sm:text-xs text-neutral-400 leading-relaxed">
                            <strong>Note:</strong> Payment steps may vary slightly for Airtime and Airtel Money. Follow the on-screen prompts for your selected payment method.
                          </p>
                        </div>
                      </div>
                    </div>
                  </details>

                  {/* Method 2: My Airtel App */}
                  <details className="p-2 sm:p-4 bg-neutral-900/50 rounded-lg border border-neutral-700">
                    <summary className="font-semibold text-yellow-400 cursor-pointer text-base sm:text-lg mb-2 sm:mb-3">
                      Method 2: Using My Airtel App - Works Without Airtel Line
                    </summary>
                    <div className="mt-4 sm:mt-3 space-y-5 sm:space-y-4">
                      <p className="text-sm leading-relaxed">
                        <strong className="text-yellow-400">This method works on any phone - you don't need an Airtel SIM card or Airtel phone line.</strong> Perfect if you don't have an Airtel line or want to resubscribe, renew, top up, or buy data bundles from any phone. Download the app from <a href="https://play.google.com/store/apps/details?id=com.airtel.africa.selfcare" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline">Google Play Store</a>.
                      </p>
                      
                      <div className="space-y-5 sm:space-y-4">
                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 1: Install My Airtel App</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">Download and install the My Airtel app from <a href="https://play.google.com/store/apps/details?id=com.airtel.africa.selfcare" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline">Google Play Store</a>.</p>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-myairtel-1.jpeg" alt="Step 1: Install My Airtel app to resubscribe Airtel 5G router data plan" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 2: Open Airtel 4G/5G WiFi</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">Open the My Airtel app and tap "Airtel 4G/5G WiFi" in the Quick Actions section on the home screen.</p>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-myairtel-2.png" alt="Step 2: Tap Airtel 4G/5G WiFi to resubscribe Airtel 5G router in My Airtel app" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 3: Open Menu</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">Tap the MENU icon (hamburger menu) on the right side of the screen.</p>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-myairtel-3.png" alt="Step 3: Tap MENU icon to resubscribe Airtel 5G router data plan" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 4: Navigate to Data Bundle</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">In the menu, navigate through: Tap "Pay & Recharge" → Tap "Prepaid" → Tap "Data Bundle".</p>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-myairtel-4.png" alt="Step 4: Navigate to Data Bundle to resubscribe Airtel 5G router in My Airtel app" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 5: Enter Router Number</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">
                            Enter your 5G Smart Connect Router Number in the mobile number field. This is the SIM card number that was inserted into your router during the first installation. The number was provided to you when the device was set up. If you can't remember it, check your Airtel SMS messages - Airtel typically sends this number in confirmation messages after installation or when your plan is active. <strong className="text-yellow-400">See Step 4 above</strong> for detailed explanation on finding your router number.
                          </p>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-myairtel-5.jpg" alt="Step 5: Enter Airtel 5G router number to resubscribe data plan in My Airtel app" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                          <div className="mt-3 sm:mt-2 p-3 sm:p-2 bg-yellow-400/10 border border-yellow-400/20 rounded">
                            <Image src="/resubscribe/resubscribe-router-number-reference.jpeg.jpeg" alt="Example Airtel SMS showing Airtel 5G router number for resubscription reference" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                            <p className="text-sm sm:text-xs text-neutral-400 mt-2 sm:mt-1 text-center">Example: Check your Airtel SMS messages to find your router number</p>
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 6: Select Your Bundle</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">Choose your preferred data bundle:</p>
                          <ul className="ml-4 space-y-2 sm:space-y-1 mb-3 sm:mb-2 text-sm">
                            <li>• <strong>5G_15Mbps_30days</strong>: 15.0 MBPS, 30 Day validity - KES 1,999</li>
                            <li>• <strong>5G_30Mbps_30days</strong>: 30.0 MBPS, 30 Day validity - KES 2,999</li>
                            <li>• <strong>5G_Boosterpack</strong>: 300.0 GB - KES 1,000</li>
                          </ul>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-myairtel-6.jpeg" alt="Step 6: Select Airtel 5G router data bundle for resubscription" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 7: Choose Payment Method</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">Select your preferred payment method:</p>
                          <ul className="ml-4 space-y-2 sm:space-y-1 mb-3 sm:mb-2 text-sm">
                            <li>• <strong>Airtel Money</strong>: Enter your Airtel Money phone number</li>
                            <li>• <strong>Debit/Credit Card</strong>: Select payment gateway and enter email</li>
                            <li>• <strong>M-Pesa</strong>: Enter your M-Pesa phone number</li>
                          </ul>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-myairtel-7.jpeg" alt="Step 7: Choose payment method for Airtel 5G router data plan resubscription" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                        </div>

                        <div className="pb-4 sm:pb-0">
                          <h4 className="font-semibold text-yellow-400 mb-3 sm:mb-2 text-sm">Step 8: Complete Payment (M-Pesa)</h4>
                          <p className="mb-3 sm:mb-2 text-sm leading-relaxed">If you selected M-Pesa:</p>
                          <ol className="ml-4 space-y-2 sm:space-y-1 mb-3 sm:mb-2 text-sm">
                            <li>1. A payment confirmation dialog will appear</li>
                            <li>2. Enter your M-Pesa PIN when prompted</li>
                            <li>3. Tap "Send" to complete the payment</li>
                            <li>4. Your resubscription is complete!</li>
                          </ol>
                          <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                            <Image src="/resubscribe/resubscribe-myairtel-8.jpeg" alt="Step 8: Enter M-Pesa PIN to complete Airtel 5G router resubscription payment" width={300} height={200} className="rounded w-full h-auto max-w-[300px] mx-auto" />
                          </div>
                          <p className="mt-2 text-xs text-neutral-400">
                            <strong>Note:</strong> Payment steps may vary slightly for Airtel Money and Debit/Credit Card. Follow the on-screen prompts for your selected payment method.
                          </p>
                        </div>
                      </div>
                    </div>
                  </details>

                  <div className="mt-5 sm:mt-4 p-4 sm:p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                    <p className="text-sm leading-relaxed">
                      <strong className="text-yellow-400">💡 Tip:</strong> Method 1 (USSD) requires an Airtel phone line, while Method 2 (My Airtel App) works on any phone - even without an Airtel SIM card. Use Method 2 if you don't have an Airtel line. Both methods allow you to resubscribe, renew, top up, or buy new data bundles. For help or alternative methods, contact Airtel customer care at <a href="tel:0733100500" className="text-yellow-400 hover:text-yellow-300 underline">0733 100 500</a> or visit our <Link href="/product/troubleshooting" className="text-yellow-400 hover:text-yellow-300 underline">troubleshooting guide</Link>.
                    </p>
                  </div>
                </div>
              </details>

              <details className="p-5 bg-neutral-800/50 rounded-lg border border-neutral-700">
                <summary className="font-semibold text-white cursor-pointer text-lg sm:text-xl">
                  Where is Airtel SmartConnect available in Kenya?
                </summary>
                <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-300 leading-relaxed">
                  <p>
                    Airtel SmartConnect is currently available in <strong>selected areas</strong> where Airtel has adequate network coverage.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Coverage requirement:</strong> The device needs to connect to Airtel's cellular network, so it only works in areas where Airtel has good signal strength. Availability depends on Airtel's network deployment in your specific location. Check signal strength using the <Link href="/product/troubleshooting#led-indicators" className="text-yellow-400 hover:text-yellow-300 underline">LED indicators guide</Link>.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Check before ordering:</strong> It's important to check availability in your area before placing an order. You can contact us or Airtel to verify if your location has coverage. The service works best in areas with strong Airtel 5G or 4G signal. If you experience signal problems, see our <Link href="/product/troubleshooting#no-signal" className="text-yellow-400 hover:text-yellow-300 underline">signal troubleshooting guide</Link>.
                  </p>
                  <p>
                    <strong className="text-yellow-400">Network fallback:</strong> Even if 5G isn't available in your area, the device can still work using 4G or 3G networks, as long as Airtel has coverage there. This makes it available in more areas than 5G-only services.
                  </p>
                </div>
              </details>
            </div>
          </section>

          {/* Important Notes */}
          <section className="mb-8 sm:mb-12">
            <div className="p-5 sm:p-6 bg-yellow-400/10 border border-yellow-400/30 rounded-lg">
              <h3 className="font-semibold text-yellow-400 mb-3 text-lg sm:text-xl">Important Notes</h3>
              <ul className="space-y-2 text-sm sm:text-base text-neutral-300">
                <li>• <strong className="text-yellow-400">Performance varies by location:</strong> Performance will vary depending on Airtel network coverage in your area</li>
                <li>• <strong className="text-yellow-400">Network hiccups:</strong> The network may occasionally experience hiccups, which is normal for wireless services</li>
                <li>• <strong className="text-yellow-400">Not suitable for:</strong> Areas experiencing heavy or persistent Airtel network issues</li>
                <li>• <strong className="text-yellow-400">Reseller service:</strong> This service is provided through an authorized Airtel reseller. We assist with availability checks, installation coordination, and after-sales guidance</li>
                <li>• <strong className="text-yellow-400">Highly recommended:</strong> For both home and office use in areas with good Airtel coverage</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-8">
            <div className="relative overflow-hidden rounded-xl border border-neutral-700 bg-neutral-800/30">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(251, 191, 36, 0.3) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }}></div>
              </div>
              
              <div className="relative p-6 sm:p-8">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full"></div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        Get Started Today
                      </h2>
                    </div>
                    <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
                      Ready to experience reliable 5G internet? Order your Airtel SmartConnect router and get professional installation included.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <Link
                      href="/mobile"
                      className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-yellow-400 hover:bg-yellow-500 text-neutral-900 font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-yellow-400/30 active:scale-95"
                    >
                      <span className="relative z-10">Order Now</span>
                      <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link
                      href="/product/troubleshooting"
                      className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-800/60 hover:bg-neutral-800 border border-neutral-700 hover:border-yellow-400/30 text-neutral-300 hover:text-yellow-400 font-medium rounded-lg transition-all duration-200 backdrop-blur-sm"
                    >
                      <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <span>Need Help?</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Links */}
          <section className="mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-neutral-300 mb-4">Related Resources</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/product/troubleshooting"
                className="flex items-center gap-3 p-4 bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-all group"
              >
                <div className="text-2xl">🔧</div>
                <div>
                  <div className="font-semibold text-yellow-400 group-hover:text-yellow-300">Troubleshooting Guide</div>
                  <div className="text-sm text-neutral-400">Complete guide to fixing common issues</div>
                </div>
                <svg className="w-5 h-5 text-yellow-400 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </section>

          {/* Back Button */}
          <div className="mt-8">
            <Link
              href="/mobile"
              className="inline-flex items-center gap-2 px-4 py-2 text-neutral-400 hover:text-yellow-400 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
