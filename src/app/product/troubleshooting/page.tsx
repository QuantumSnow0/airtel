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
  title: "Airtel SmartConnect 5G Router Troubleshooting - Default Password, Admin Login, LED Guide | Kenya",
  description: "Complete Airtel SmartConnect 5G Router troubleshooting guide. Find default username and password (admin/admin), IP address 192.168.1.1, LED indicator meanings, factory reset, SIM card installation, and fix all common issues.",
  keywords: [
    "Airtel SmartConnect troubleshooting",
    "Airtel 5G router default password",
    "Airtel router admin login",
    "Airtel router default username and password",
    "Airtel 5G default password",
    "Airtel router admin",
    "192.168.1.1 Airtel",
    "Airtel router IP address",
    "Airtel router login",
    "Airtel router default password",
    "Airtel router admin password",
    "Airtel SmartConnect factory reset",
    "Airtel router LED indicators",
    "Airtel router SIM card installation",
    "Airtel router not working",
    "Airtel router red light",
    "Airtel router green light",
    "Airtel router signal LED",
    "router signal issues",
    "WiFi connection problems",
    "router troubleshooting Kenya",
    "Airtel router reset",
    "Airtel router W/LAN1 port",
  ].join(", "),
  openGraph: {
    title: "Airtel SmartConnect 5G Router Troubleshooting - Default Password & Admin Login",
    description: "Complete troubleshooting guide: default password (admin/admin), IP 192.168.1.1, LED meanings, factory reset, and fix all Airtel router issues.",
    type: "website",
    url: "https://www.airtel5grouter.co.ke/product/troubleshooting",
  },
  alternates: {
    canonical: "https://www.airtel5grouter.co.ke/product/troubleshooting",
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

export default function TroubleshootingPage() {
  // FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the default username and password for Airtel SmartConnect 5G Router?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The default username is 'admin' and the default password is 'admin' for Airtel SmartConnect 5G Router. You can find this information on the label at the back of the router.",
        },
      },
      {
        "@type": "Question",
        name: "What is the IP address to access Airtel router settings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The default IP address to access Airtel SmartConnect router settings is 192.168.1.1. Open this in your web browser while connected to the router's WiFi network.",
        },
      },
      {
        "@type": "Question",
        name: "How do I factory reset my Airtel SmartConnect router?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To factory reset Airtel SmartConnect router: 1) Open the two screws at the bottom of the antenna, 2) Locate the small reset button inside, 3) Press with a pin or needle until side LEDs start blinking, 4) Release and wait for reboot. This will restore default SSID and password.",
        },
      },
      {
        "@type": "Question",
        name: "What do the LED colors mean on Airtel router antenna?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "On the Airtel SmartConnect antenna, the signal LED shows: Green = excellent signal (best), Orange = good signal (acceptable), Red = poor/no signal (needs repositioning). The router LED shows: Red = booting, Blue = connecting, Green = powered on and ready.",
        },
      },
      {
        "@type": "Question",
        name: "How do I reset my Airtel router to factory settings?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To factory reset Airtel SmartConnect: 1) Open two screws at bottom of antenna, 2) Locate reset button inside, 3) Press with pin until LEDs blink, 4) Release and wait for reboot. This restores default WiFi password and admin password (admin/admin).",
        },
      },
      {
        "@type": "Question",
        name: "Where is the SIM card slot on Airtel SmartConnect router?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The SIM card slot is located at the bottom of the antenna (outdoor unit). You must open two screws at the bottom to access it. The SIM card should be inserted with correct orientation as shown in the slot.",
        },
      },
      {
        "@type": "Question",
        name: "What port do I connect the antenna to on Airtel router?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Connect the ethernet cable from the antenna to the W/LAN1 port on the router. This is the first port, specifically for antenna connection. Do NOT use regular LAN ports - the router won't receive signal.",
        },
      },
    ],
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                name: "Troubleshooting",
                item: "https://www.airtel5grouter.co.ke/product/troubleshooting",
              },
            ],
          }),
        }}
      />
      {/* HowTo Schema for Factory Reset */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Factory Reset Airtel SmartConnect 5G Router",
            description: "Step-by-step guide to factory reset your Airtel SmartConnect router to restore default settings including WiFi password and admin credentials.",
            image: "https://www.airtel5grouter.co.ke/router/antenna-reset-button.png",
            totalTime: "PT5M",
            tool: [
              {
                "@type": "HowToTool",
                name: "Small pin, needle, or paperclip",
              },
            ],
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Locate the antenna",
                text: "Locate the antenna (the device that's usually mounted outside). The reset button is inside the antenna, not on the router.",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Open the antenna compartment",
                text: "Open the two small screws at the bottom of the antenna to access the internal compartment.",
                image: "https://www.airtel5grouter.co.ke/router/antenna-bottom-screws.png",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Locate the reset button",
                text: "Inside, you'll see a small reset button (a small dot/button). This is the factory reset button.",
                image: "https://www.airtel5grouter.co.ke/router/antenna-reset-button.png",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Press and hold reset button",
                text: "Using a small pin, needle, or paperclip, carefully press and hold the reset button.",
              },
              {
                "@type": "HowToStep",
                position: 5,
                name: "Wait for LED indication",
                text: "Continue holding until you see the side LEDs on the antenna start blinking. This indicates the reset process has started.",
              },
              {
                "@type": "HowToStep",
                position: 6,
                name: "Release and wait",
                text: "Release the reset button and wait for the device to complete the reboot cycle. This may take 2-3 minutes.",
              },
              {
                "@type": "HowToStep",
                position: 7,
                name: "Verify reset",
                text: "After reboot, the device will have restored to factory defaults. Your WiFi SSID and password will be back to the defaults shown on the device label.",
              },
            ],
          }),
        }}
      />
      {/* HowTo Schema for SIM Card Installation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Install SIM Card in Airtel SmartConnect 5G Router",
            description: "Step-by-step guide to properly install your Airtel 5G SIM card into the SmartConnect router antenna.",
            image: "https://www.airtel5grouter.co.ke/router/antenna-sim-slot.png",
            totalTime: "PT3M",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Locate the antenna",
                text: "Locate the antenna (the device mounted outside). You'll need to access the bottom of the antenna.",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Open the compartment",
                text: "Open the two small screws at the bottom of the antenna to access the SIM card compartment.",
                image: "https://www.airtel5grouter.co.ke/router/antenna-bottom-screws.png",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Locate SIM card slot",
                text: "With the antenna facing upside down, locate the SIM card slot inside the compartment.",
                image: "https://www.airtel5grouter.co.ke/router/antenna-upside-down.png",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Check SIM orientation",
                text: "Ensure your Airtel 5G SIM card is facing the correct orientation as shown. The SIM card should match the orientation in the slot.",
                image: "https://www.airtel5grouter.co.ke/router/airtel-5g-sim.png",
              },
              {
                "@type": "HowToStep",
                position: 5,
                name: "Insert SIM card",
                text: "Gently insert the SIM card into the slot until it clicks into place. Do not force it.",
                image: "https://www.airtel5grouter.co.ke/router/antenna-sim-slot.png",
              },
              {
                "@type": "HowToStep",
                position: 6,
                name: "Close compartment",
                text: "Close the compartment and tighten the screws.",
              },
              {
                "@type": "HowToStep",
                position: 7,
                name: "Verify installation",
                text: "Wait for the device to detect the SIM card. Check the antenna signal LED - it should show green or orange (not red) if the SIM is detected and has signal.",
              },
            ],
          }),
        }}
      />
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Airtel SmartConnect 5G Router Troubleshooting Guide",
            description: "Complete troubleshooting guide for Airtel SmartConnect 5G Router including default passwords, admin login, LED indicators, factory reset, and solutions to common problems.",
            image: "https://www.airtel5grouter.co.ke/router/router-back-details.png",
            author: {
              "@type": "Organization",
              name: "Airtel 5G Router Support",
            },
            publisher: {
              "@type": "Organization",
              name: "Airtel 5G Router Support",
            },
            datePublished: "2024-01-01",
            dateModified: new Date().toISOString().split("T")[0],
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.airtel5grouter.co.ke/product/troubleshooting",
            },
          }),
        }}
      />

      <div className={`min-h-screen bg-neutral-900 text-white ${poppins.variable}`} style={{ fontFamily: "var(--font-poppins), sans-serif" }}>
        <div className="max-w-4xl mx-auto px-2 py-6 sm:py-8">
          {/* Breadcrumbs */}
          <nav className="mb-4 text-sm text-neutral-400" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/mobile" className="hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-neutral-300">Troubleshooting</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
              Airtel SmartConnect 5G Router Troubleshooting Guide
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-neutral-300 mb-2">
              Complete troubleshooting guide for your Airtel SmartConnect 5G Router. Find default passwords, admin login details, LED indicator meanings, factory reset instructions, and solutions to all common problems.
            </p>
            <p className="text-xs sm:text-sm md:text-base text-neutral-400 mb-4">
              This guide covers device-specific information including default credentials, IP addresses, LED status indicators, SIM card installation, and step-by-step solutions for Kenya users.
            </p>
            <div className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
              <p className="text-xs sm:text-sm text-neutral-300">
                <strong className="text-yellow-400">Need a new router?</strong> We offer fast delivery of Airtel SmartConnect 5G routers. <Link href="/mobile" className="text-yellow-400 hover:text-yellow-300 underline font-semibold">Order now</Link> for quick setup and reliable connection.
              </p>
            </div>
          </header>

          {/* Quick Navigation / Table of Contents */}
          <section className="mb-8 py-3 sm:py-4 border-b border-neutral-700/50 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                01
              </div>
              <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 flex items-center gap-2">
                <span>🔍</span> Quick Navigation
              </h2>
            </div>
            
            {/* Common Problems - Quick Links */}
            <div className="mb-4">
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Common Problems</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link href="#no-signal" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">📶</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">No Signal / Weak Signal</span>
                </Link>
                <Link href="#slow-internet" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">🐌</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">Slow Internet</span>
                </Link>
                <Link href="#wifi-issues" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">📡</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">WiFi Connection Issues</span>
                </Link>
                <Link href="#power-issues" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">🔌</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">Power & Battery Issues</span>
                </Link>
                <Link href="#sim-card-issues" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">📱</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">SIM Card Issues</span>
                </Link>
                <Link href="#configuration-issues" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">⚙️</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">Configuration Issues</span>
                </Link>
              </div>
            </div>

            {/* Reference Guides */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-3">Reference Guides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link href="#led-indicators" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">💡</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">LED Indicators Guide</span>
                </Link>
                <Link href="#device-label" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">🏷️</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">Default Passwords & Settings</span>
                </Link>
                <Link href="#factory-reset" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">🔄</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">Factory Reset Guide</span>
                </Link>
                <Link href="#sim-card" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">📱</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">SIM Card Installation</span>
                </Link>
                <Link href="#router-settings" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">⚙️</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">Access Router Settings</span>
                </Link>
                <Link href="#wifi-password" className="flex items-center gap-2 p-2.5 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-700 hover:border-yellow-400/50 rounded-lg transition-colors group">
                  <span className="text-lg">🔐</span>
                  <span className="text-xs sm:text-sm text-neutral-300 group-hover:text-yellow-400">Find WiFi Password</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Quick Reference - Default Credentials (SEO Optimized) */}
          <section className="mb-8 py-3 sm:py-4 border-b border-neutral-700/50 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                02
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 flex items-center gap-2">
                <span>🔑</span> Airtel 5G Router Default Username and Password
              </h2>
            </div>
            <p className="text-neutral-300 mb-3 text-xs sm:text-sm">
              Looking for the default login credentials for your Airtel SmartConnect 5G Router? Here's everything you need to access the admin panel and configure your device.
            </p>
            <div className="grid md:grid-cols-2 gap-3 text-neutral-200">
              <div className="space-y-2">
                <p className="font-semibold text-yellow-400 text-sm sm:text-base">Default Admin Login Credentials:</p>
                <div className="p-2 sm:p-3">
                  <ul className="space-y-1.5">
                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                      <strong className="text-yellow-400 text-xs sm:text-sm">Username:</strong> 
                      <code className="bg-neutral-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-yellow-400 font-mono text-xs sm:text-sm">admin</code>
                    </li>
                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                      <strong className="text-yellow-400 text-xs sm:text-sm">Password:</strong> 
                      <code className="bg-neutral-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-yellow-400 font-mono text-xs sm:text-sm">admin</code>
                    </li>
                  </ul>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Use these credentials to login at 192.168.1.1 or in the TZLink mobile app
                </p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-yellow-400 text-sm sm:text-base">Router Access Information:</p>
                <div className="p-2 sm:p-3">
                  <ul className="space-y-1.5">
                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                      <strong className="text-yellow-400 text-xs sm:text-sm">IP Address:</strong> 
                      <code className="bg-neutral-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded text-yellow-400 font-mono text-xs sm:text-sm">192.168.1.1</code>
                    </li>
                    <li className="flex flex-col sm:flex-row items-start gap-1 sm:gap-2">
                      <strong className="text-yellow-400 text-xs sm:text-sm">Mobile App:</strong> 
                      <span className="text-xs sm:text-sm">
                        <a href="https://play.google.com/store/apps/details?id=com.tozed.TZLink" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline">TZLink</a> (available on <a href="https://play.google.com/store/apps/details?id=com.tozed.TZLink" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline">Google Play Store</a> & Apple App Store)
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Access router settings via web browser or mobile app
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-neutral-400">
              💡 <strong>Tip:</strong> All default information (WiFi passwords, SSID, IP address, admin credentials) is printed on the label at the back of your router. See the <Link href="#device-label" className="text-yellow-400 hover:underline">Device Label section</Link> below for details.
            </p>
          </section>

          {/* LED Indicators Guide */}
          <section id="led-indicators" className="mb-8 py-3 sm:py-4 border-b border-neutral-700/50 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                03
              </div>
              <h2 className="text-2xl font-semibold text-yellow-400 flex items-center gap-2">
                <span>💡</span> Understanding LED Indicators
              </h2>
            </div>
            <p className="text-neutral-300 mb-6">
              LED indicators are your first clue to diagnosing router issues. Here's what each LED color and pattern means for your Airtel SmartConnect 5G Router.
            </p>

            <div className="space-y-5">
              {/* Router LED */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Router LED (Center Button)</h3>
                <p className="text-neutral-300 mb-3 text-sm sm:text-base">
                  The router has a single LED at the center button that shows the boot sequence and power status:
                </p>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-start gap-3 py-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 overflow-hidden">
                      <Image src="/router/router-red-light.jpeg" alt="Airtel router red LED - initial boot" width={80} height={80} className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1 text-sm sm:text-base">Red LED - Initial Boot</p>
                      <p className="text-neutral-300 text-xs sm:text-sm">Router is starting up. This is normal during power-on. The LED will quickly change to purple/violet (mixed color), where most of the boot time is spent.</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start gap-3 py-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 overflow-hidden">
                      <Image src="/router/router-gradient-light.jpeg" alt="Airtel router purple/violet mixed LED - booting" width={80} height={80} className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1 text-sm sm:text-base">Purple/Violet LED (Mixed Color) - Booting</p>
                      <p className="text-neutral-300 text-xs sm:text-sm"><strong className="text-yellow-400">Most boot time is spent here.</strong> The LED shows a purple/violet mixed color (combination of red and blue). This is the main boot phase where the router is initializing its systems. This happens after red and before blue.</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start gap-3 py-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 overflow-hidden">
                      <Image src="/router/router-blue-light.jpeg" alt="Airtel router blue LED - connecting" width={80} height={80} className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1 text-sm sm:text-base">Blue LED - Connecting</p>
                      <p className="text-neutral-300 text-xs sm:text-sm"><strong className="text-yellow-400">Very brief - you might miss it!</strong> Router is establishing connection. This happens very quickly after the purple/violet phase, then rapidly switches to green. It's normal if you don't see this blue phase.</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start gap-3 py-2">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0 overflow-hidden">
                      <Image src="/router/router-green-light.jpeg" alt="Airtel router green LED - powered on" width={80} height={80} className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white mb-1 text-sm sm:text-base">Green LED - Powered On</p>
                      <p className="text-neutral-300 text-xs sm:text-sm">Router is fully booted and WiFi SSID is visible. <strong className="text-yellow-400">Important:</strong> Green router LED only means the router is on - it does NOT indicate good internet connection. Check the antenna signal LED below for actual connection status.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Antenna LEDs */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">Antenna Signal LED (Most Important)</h3>
                <p className="text-neutral-300 mb-3 text-sm sm:text-base">
                  The antenna has 5 LEDs total, but the <strong className="text-yellow-400">signal LED is the most important</strong> - it shows your actual internet connection quality. When the antenna boots, the power LED lights first, then all LEDs activate. Watch the signal LED specifically:
                </p>
                <div className="mb-4 p-2 bg-neutral-900/50 rounded-lg">
                  <Image src="/router/antenna.png" alt="Airtel SmartConnect antenna showing all 5 LEDs" width={200} height={150} className="rounded-lg mb-2 mx-auto" />
                  <p className="text-xs text-neutral-400 text-center">Airtel SmartConnect Antenna - 5 LEDs Total</p>
                </div>
                <div className="space-y-4">
                  <div className="py-3">
                    <div className="flex items-start gap-3">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center shrink-0 overflow-hidden">
                        <Image src="/router/antenna-green-signal.png" alt="Airtel antenna green signal LED - excellent connection" width={160} height={160} className="object-contain w-full h-full scale-150" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-green-400 mb-1.5 text-sm sm:text-base">🟢 Green Signal LED - EXCELLENT</p>
                        <p className="text-neutral-300 text-xs sm:text-sm mb-2">This is what you want! Green means you have excellent signal strength and the best possible connection. Your internet should work perfectly with fast speeds.</p>
                        <p className="text-xs text-neutral-400">✅ Optimal performance | ✅ Fast speeds | ✅ Stable connection</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center shrink-0 overflow-hidden">
                        <Image src="/router/antenna-orange-signal.png" alt="Airtel antenna orange signal LED - good connection" width={160} height={160} className="object-contain w-full h-full scale-150" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-orange-400 mb-1.5 text-sm sm:text-base">🟠 Orange Signal LED - GOOD</p>
                        <p className="text-neutral-300 text-xs sm:text-sm mb-2">Acceptable signal strength. Your connection should work, but speeds may be slower than with green. This is still usable for most internet activities.</p>
                        <p className="text-xs text-neutral-400">⚠️ Good performance | ⚠️ Moderate speeds | ✅ Connection stable</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center shrink-0 overflow-hidden">
                        <Image src="/router/antenna-red-signal.png" alt="Airtel antenna red signal LED - poor or no signal" width={160} height={160} className="object-contain w-full h-full scale-150" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-red-400 mb-1.5 text-sm sm:text-base">🔴 Red Signal LED - POOR/NO SIGNAL</p>
                        <p className="text-neutral-300 text-xs sm:text-sm mb-2"><strong className="text-red-400">Avoid this at all costs!</strong> Red means you're not receiving signal or have very weak signal. Internet will not work or will be extremely slow. You need to reposition the antenna.</p>
                        <p className="text-xs text-neutral-400 mb-2">❌ No/poor connection | ❌ Very slow or no internet | ⚠️ Needs repositioning</p>
                        <p className="text-xs sm:text-sm text-yellow-400">💡 <Link href="#no-signal" className="underline">See "No Signal" troubleshooting section</Link> for solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boot Sequence */}
              <div className="mt-5 p-3 sm:p-4">
                <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Normal Boot Sequence:</h4>
                <ol className="space-y-1.5 text-xs sm:text-sm text-neutral-300 ml-4">
                  <li>1. Router LED turns <span className="text-red-400">red</span> (initial boot - brief)</li>
                  <li>2. Router LED changes to <span className="text-purple-400">purple/violet</span> (mixed color - <strong>most boot time spent here</strong>)</li>
                  <li>3. Router LED changes to <span className="text-blue-400">blue</span> (connecting - very brief, you might miss it)</li>
                  <li>4. Router LED turns <span className="text-green-400">green</span> (router ready)</li>
                  <li>5. Antenna power LED lights on</li>
                  <li>6. Antenna signal LED shows connection status (<span className="text-green-400">green</span> = best, <span className="text-orange-400">orange</span> = good, <span className="text-red-400">red</span> = poor)</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Device Label Information */}
          <section id="device-label" className="mb-8 py-3 sm:py-4 border-b border-neutral-700/50 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                04
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 flex items-center gap-2">
                <span>🏷️</span> Device Label Information (Default Passwords & Settings)
              </h2>
            </div>
            <p className="text-neutral-300 mb-3 text-sm sm:text-base">
              All important default information is printed on a label located at the <strong>back of the router</strong>. This label contains all the credentials and settings you need:
            </p>
            <div className="mb-3 p-2 bg-neutral-900/50 rounded-lg">
              <Image src="/router/router-back-details.png" alt="Airtel router back label showing default WiFi passwords, SSID, IP address, and admin credentials" width={400} height={300} className="rounded-lg w-full h-auto" />
              <p className="text-xs text-neutral-400 mt-2 text-center">Router Back Label - Contains all default information</p>
            </div>
            <ul className="space-y-1.5 text-sm text-neutral-200 ml-4 mb-3">
              <li>• <strong>2.4GHz WiFi SSID</strong> (network name) and password</li>
              <li>• <strong>5GHz WiFi SSID</strong> (network name) and password</li>
              <li>• <strong>Default IP Address:</strong> 192.168.1.1</li>
              <li>• <strong>Default Admin Username:</strong> admin</li>
              <li>• <strong>Default Admin Password:</strong> admin</li>
              <li>• Input voltage specifications</li>
              <li>• MAC address and serial number</li>
            </ul>
            <div className="p-3">
              <p className="text-xs sm:text-sm text-yellow-200">
                <strong>💡 Pro Tip:</strong> If you've forgotten your WiFi password or changed the admin password, you can find the defaults on this label. If you've changed them and forgotten, you'll need to <Link href="#factory-reset" className="underline font-semibold">perform a factory reset</Link> to restore defaults.
              </p>
            </div>
          </section>

          {/* Factory Reset Guide */}
          <section id="factory-reset" className="mb-8 py-3 sm:py-4 border-b border-neutral-700/50 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                05
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 flex items-center gap-2">
                <span>🔄</span> How to Factory Reset Airtel SmartConnect Router
              </h2>
            </div>
            <p className="text-neutral-300 mb-3 text-sm sm:text-base">
              Factory reset restores your router to default settings (default WiFi password, default admin password, etc.). This is useful if you've forgotten your passwords or need to start fresh.
            </p>
            <div className="space-y-3">
              <div className="p-3">
                <p className="text-xs sm:text-sm text-red-200">
                  <strong>⚠️ Warning:</strong> Factory reset will erase all your custom settings including WiFi passwords, admin password changes, and network configurations. You'll need to set everything up again after reset.
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Step-by-Step Factory Reset Instructions:</h3>
                <ol className="space-y-3">
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 1:</strong> Locate the antenna (the device that's usually mounted outside). The reset button is inside the antenna, not on the router.
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 2:</strong> Open the two small screws at the bottom of the antenna to access the internal compartment.
                    <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                      <Image src="/router/antenna-bottom-screws.png" alt="Airtel antenna bottom showing two screws to open for factory reset" width={200} height={150} className="rounded w-full h-auto" />
                      <p className="text-xs text-neutral-400 mt-1 text-center">Step 2: Open the two screws at the bottom</p>
                    </div>
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 3:</strong> Inside, you'll see a small reset button (a small dot/button). This is the factory reset button.
                    <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                      <Image src="/router/antenna-reset-button.png" alt="Airtel antenna reset button location inside compartment" width={200} height={150} className="rounded w-full h-auto" />
                      <p className="text-xs text-neutral-400 mt-1 text-center">Step 3: Locate the reset button inside</p>
                    </div>
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 4:</strong> Using a small pin, needle, or paperclip, carefully press and hold the reset button.
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 5:</strong> Continue holding until you see the side LEDs on the antenna start blinking. This indicates the reset process has started.
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 6:</strong> Release the reset button and wait for the device to complete the reboot cycle. This may take 2-3 minutes.
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 7:</strong> After reboot, the device will have restored to factory defaults. Your WiFi SSID and password will be back to the defaults shown on the <Link href="#device-label" className="text-yellow-400 underline">device label</Link>.
                  </li>
                </ol>
              </div>
              <div className="p-3">
                <p className="text-xs sm:text-sm text-neutral-300">
                  <strong>After Reset:</strong> You'll need to reconnect all your devices to WiFi using the default password from the device label. You can also change the WiFi password again through the admin panel at <code className="bg-neutral-800 px-2 py-1 rounded">192.168.1.1</code> using username <code className="bg-neutral-800 px-2 py-1 rounded">admin</code> and password <code className="bg-neutral-800 px-2 py-1 rounded">admin</code>.
                </p>
              </div>
              <div className="mt-4 p-3 bg-neutral-800/30 border border-neutral-700/50 rounded-lg">
                <p className="text-xs sm:text-sm text-neutral-300">
                  <strong className="text-yellow-400">Need a replacement router?</strong> We offer fast delivery of new Airtel SmartConnect routers with easy setup. <Link href="/mobile" className="text-yellow-400 hover:text-yellow-300 underline font-semibold">Order a replacement router</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Router Ports & Connections */}
          <section id="router-ports" className="mb-8 py-3 sm:py-4 border-b border-neutral-700/50 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                06
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 flex items-center gap-2">
                <span>🔌</span> Router Ports & Connections
              </h2>
            </div>
            <p className="text-neutral-300 mb-3 text-sm sm:text-base">
              Understanding the router ports is essential for proper setup. Here's what each port does:
            </p>
            <div className="mb-3 p-2 bg-neutral-900/50 rounded-lg">
              <Image src="/router/router-ports.png" alt="Airtel router ports showing W/LAN1, LAN ports, USB, and power connections" width={400} height={300} className="rounded-lg w-full h-auto" />
              <p className="text-xs text-neutral-400 mt-2 text-center">Router Ports - W/LAN1, LAN ports, and USB</p>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">W/LAN1 Port (Most Important)</h3>
                <p className="text-neutral-300 text-xs sm:text-sm mb-2">
                  This is the <strong className="text-yellow-400">first port</strong> on the router, specifically designed to connect the antenna to the router. This is NOT a regular LAN port.
                </p>
                <div className="p-2 sm:p-3 mb-2">
                  <p className="text-xs sm:text-sm text-yellow-200">
                    <strong>⚠️ Critical:</strong> The ethernet cable from the antenna MUST be connected to the W/LAN1 port. If connected to a regular LAN port, the router won't receive signal from the antenna and you'll have no internet.
                  </p>
                </div>
                <div className="p-2 bg-neutral-900/50 rounded">
                  <Image src="/router/router-wlan-port.png" alt="Airtel router W/LAN1 port for antenna connection" width={200} height={150} className="rounded w-full h-auto" />
                  <p className="text-xs text-neutral-400 mt-1 text-center">W/LAN1 Port - Connect antenna here</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">LAN Ports (For Devices)</h3>
                <p className="text-neutral-300 text-xs sm:text-sm">
                  The router has <strong>3 additional LAN ports</strong> for connecting devices via ethernet cable (computers, smart TVs, gaming consoles, etc.). These provide faster, more stable connections than WiFi.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">USB Port</h3>
                <p className="text-neutral-300 text-xs sm:text-sm">
                  The router has a USB port for connecting external devices or storage. Check your router manual for supported USB device types.
                </p>
              </div>
            </div>
          </section>

          {/* SIM Card Installation */}
          <section id="sim-card" className="mb-8 py-3 sm:py-4 border-b border-neutral-700/50 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                07
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 flex items-center gap-2">
                <span>📱</span> SIM Card Installation Guide
              </h2>
            </div>
            <p className="text-neutral-300 mb-3 text-sm sm:text-base">
              The SIM card slot is located at the bottom of the antenna (the outdoor unit). Follow these steps to properly install your Airtel 5G SIM card.
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Step-by-Step SIM Card Installation:</h3>
                <ol className="space-y-3">
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 1:</strong> Locate the antenna (the device mounted outside). You'll need to access the bottom of the antenna.
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 2:</strong> Open the two small screws at the bottom of the antenna to access the SIM card compartment.
                    <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                      <Image src="/router/antenna-bottom-screws.png" alt="Airtel antenna bottom screws to open for SIM card access" width={200} height={150} className="rounded w-full h-auto" />
                      <p className="text-xs text-neutral-400 mt-1 text-center">Step 2: Open the two screws</p>
                    </div>
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 3:</strong> With the antenna facing upside down, locate the SIM card slot inside the compartment.
                    <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                      <Image src="/router/antenna-upside-down.png" alt="Airtel antenna upside down showing SIM card slot location" width={200} height={150} className="rounded w-full h-auto" />
                      <p className="text-xs text-neutral-400 mt-1 text-center">Step 3: Antenna upside down showing slot</p>
                    </div>
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 4:</strong> Ensure your Airtel 5G SIM card is facing the correct orientation as shown. The SIM card should match the orientation in the slot.
                    <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                      <Image src="/router/airtel-5g-sim.png" alt="Airtel 5G SIM card correct orientation for insertion" width={150} height={100} className="rounded w-full h-auto max-w-[200px] mx-auto" />
                      <p className="text-xs text-neutral-400 mt-1 text-center">Step 4: Correct SIM card orientation</p>
                    </div>
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 5:</strong> Gently insert the SIM card into the slot until it clicks into place. Do not force it.
                    <div className="mt-2 p-2 bg-neutral-900/50 rounded">
                      <Image src="/router/antenna-sim-slot.png" alt="Airtel antenna SIM card slot showing correct insertion point" width={200} height={150} className="rounded w-full h-auto" />
                      <p className="text-xs text-neutral-400 mt-1 text-center">Step 5: Insert SIM into slot</p>
                    </div>
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 6:</strong> Close the compartment and tighten the screws.
                  </li>
                  <li className="text-neutral-200 text-sm sm:text-base">
                    <strong className="text-yellow-400">Step 7:</strong> Wait for the device to detect the SIM card. Check the <Link href="#led-indicators" className="text-yellow-400 underline">antenna signal LED</Link> - it should show green or orange (not red) if the SIM is detected and has signal.
                  </li>
                </ol>
              </div>
              <div className="p-3">
                <p className="text-xs sm:text-sm text-yellow-200">
                  <strong>💡 Important:</strong> Make sure your SIM card has an active Airtel data plan. The device needs an active data subscription to work. If the signal LED is red after installation, check <Link href="#no-signal" className="underline font-semibold">No Signal troubleshooting</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Accessing Router Settings */}
          <section id="router-settings" className="mb-8 py-3 sm:py-4 border-b border-neutral-700/50 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                08
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 flex items-center gap-2">
                <span>⚙️</span> How to Access Router Settings (Admin Panel)
              </h2>
            </div>
            <p className="text-neutral-300 mb-3 text-sm sm:text-base">
              To change WiFi password, view connected devices, or configure advanced settings, you need to access the router's admin panel.
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Method 1: Mobile App (TZLink) - Recommended</h3>
                <div className="mb-3 p-2 bg-neutral-900/50 rounded-lg">
                  <Image src="/router/tzlinkapp.jpeg" alt="TZLink mobile app for Airtel router management" width={300} height={200} className="rounded-lg w-full h-auto max-w-[300px] mx-auto" />
                  <p className="text-xs text-neutral-400 mt-2 text-center">TZLink Mobile App</p>
                </div>
                <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                  <li>1. Download <strong>TZLink</strong> app from <a href="https://play.google.com/store/apps/details?id=com.tozed.TZLink" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline">Google Play Store</a> or Apple App Store</li>
                  <li>2. Open the app and connect to your router's WiFi network</li>
                  <li>3. The app should automatically detect your router</li>
                  <li>4. Use the same login credentials (admin/admin) if prompted</li>
                </ol>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 ml-4">
                  💡 <a href="https://play.google.com/store/apps/details?id=com.tozed.TZLink" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline">Download TZLink from Google Play Store</a>
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Method 2: Web Browser</h3>
                <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                  <li>1. Connect your device (phone, laptop, tablet) to the router's WiFi network</li>
                  <li>2. Open any web browser (Chrome, Safari, Firefox, etc.)</li>
                  <li>3. Type in the address bar: <code className="bg-neutral-900 px-2 py-1 rounded text-yellow-400">192.168.1.1</code></li>
                  <li>4. You'll see a login page. Enter the default credentials:</li>
                  <li className="ml-4">
                    • <strong>Username:</strong> <code className="bg-neutral-900 px-2 py-1 rounded">admin</code>
                  </li>
                  <li className="ml-4">
                    • <strong>Password:</strong> <code className="bg-neutral-900 px-2 py-1 rounded">admin</code>
                  </li>
                  <li>5. Click Login to access the admin panel</li>
                  <li className="text-xs sm:text-sm text-neutral-400 mt-2">💡 These default credentials are also printed on the <Link href="#device-label" className="text-yellow-400 underline">router label</Link> at the back</li>
                </ol>
              </div>
              <div className="p-3">
                <p className="text-xs sm:text-sm text-neutral-300">
                  <strong>Can't Access Admin Panel?</strong> Make sure you're connected to the router's WiFi network first. You cannot access 192.168.1.1 from outside the network. If you've changed the admin password and forgotten it, you'll need to <Link href="#factory-reset" className="text-yellow-400 underline">perform a factory reset</Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Finding WiFi Password */}
          <section id="wifi-password" className="mb-8 py-3 sm:py-4 border-b border-neutral-700/50 pb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                09
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 flex items-center gap-2">
                <span>🔐</span> How to Find Your WiFi Password
              </h2>
            </div>
            <p className="text-neutral-300 mb-3 text-sm sm:text-base">
              Forgot your WiFi password? Here are several ways to find or reset it.
            </p>
            <div className="space-y-3">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Method 1: Check Device Label (Default Password)</h3>
                <p className="text-neutral-300 mb-2 text-xs sm:text-sm">
                  If you haven't changed the WiFi password, it's printed on the label at the back of the router. Look for:
                </p>
                <div className="mb-3 p-2 bg-neutral-900/50 rounded-lg">
                  <Image src="/router/router-back-details.png" alt="Airtel router back label showing WiFi passwords and SSID" width={400} height={300} className="rounded-lg w-full h-auto" />
                  <p className="text-xs text-neutral-400 mt-1 text-center">Router Back Label - Shows WiFi SSID and Passwords</p>
                </div>
                <ul className="space-y-1 ml-4 text-neutral-200 text-xs sm:text-sm">
                  <li>• <strong>2.4G SSID</strong> and its password</li>
                  <li>• <strong>5G SSID</strong> and its password</li>
                </ul>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Method 2: View in Admin Panel</h3>
                <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                  <li>1. <Link href="#router-settings" className="text-yellow-400 underline">Access the router admin panel</Link> at 192.168.1.1</li>
                  <li>2. Login with username: <code className="bg-neutral-900 px-2 py-1 rounded">admin</code> and password: <code className="bg-neutral-900 px-2 py-1 rounded">admin</code></li>
                  <li>3. Navigate to WiFi settings or Wireless settings</li>
                  <li>4. You'll see the current WiFi password displayed (you can also change it here)</li>
                </ol>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Method 3: Factory Reset (Last Resort)</h3>
                <p className="text-neutral-300 mb-2 text-xs sm:text-sm">
                  If you've changed the password and can't remember it, and you can't access the admin panel, you'll need to <Link href="#factory-reset" className="text-yellow-400 underline">perform a factory reset</Link>. This will restore the default WiFi password from the device label.
                </p>
              </div>
            </div>
          </section>

          {/* Troubleshooting Sections */}
          <section id="troubleshooting" className="mb-8 border-b border-neutral-700/50 pb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 text-neutral-900 font-bold text-lg sm:text-xl shrink-0">
                10
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400">Common Problems & Solutions</h2>
            </div>
            
            {/* No Signal */}
            <article id="no-signal" className="mb-6 py-3 sm:py-4">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <span>📶</span> No Signal or Weak Signal
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Problem: Device shows no signal or red signal LED</h4>
                  <p className="text-neutral-300 mb-2 text-xs sm:text-sm">
                    If your antenna signal LED is <span className="text-red-400 font-semibold">red</span>, you're not receiving signal. Check the <Link href="#led-indicators" className="text-yellow-400 underline">LED indicators guide</Link> to understand what you're seeing.
                  </p>
                  <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                    <li><strong className="text-yellow-400">1.</strong> Check the <Link href="#sim-card" className="text-yellow-400 underline">SIM card installation</Link> - ensure it's properly inserted in the antenna. The SIM slot is at the bottom of the antenna (requires opening screws)</li>
                    <li><strong className="text-yellow-400">2.</strong> Verify your SIM card has an active Airtel data plan</li>
                    <li><strong className="text-yellow-400">3.</strong> Check antenna positioning - it should face the nearest Airtel cell tower</li>
                    <li><strong className="text-yellow-400">4.</strong> Move antenna to a higher location (rooftop, upper floor) for better signal</li>
                    <li><strong className="text-yellow-400">5.</strong> Remove obstructions between antenna and cell tower (trees, buildings, metal structures)</li>
                    <li><strong className="text-yellow-400">6.</strong> Ensure you're in an area with Airtel network coverage</li>
                    <li><strong className="text-yellow-400">7.</strong> Check the ethernet cable connection between antenna and router. The cable should be connected to the <strong>W/LAN1 port</strong> on the router (not the regular LAN ports)</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Problem: Weak or unstable signal (orange LED)</h4>
                  <p className="text-neutral-300 mb-2 text-xs sm:text-sm">
                    Orange signal LED means acceptable but not optimal signal. You can improve it:
                  </p>
                  <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                    <li><strong className="text-yellow-400">1.</strong> Reposition antenna to face the nearest cell tower more directly</li>
                    <li><strong className="text-yellow-400">2.</strong> Elevate the antenna higher (rooftop installation is best)</li>
                    <li><strong className="text-yellow-400">3.</strong> Remove any metal objects or thick walls blocking the signal path</li>
                    <li><strong className="text-yellow-400">4.</strong> Check if antenna is properly mounted and not loose</li>
                    <li><strong className="text-yellow-400">5.</strong> Ensure ethernet cable from antenna to router is securely connected to the W/LAN1 port (the first port, different from regular LAN ports)</li>
                  </ol>
                </div>
              </div>
            </article>

            {/* Slow Internet */}
            <article id="slow-internet" className="mb-6 py-3 sm:py-4">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <span>🐌</span> Slow Internet Speed
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Problem: Internet is slower than expected</h4>
                  <p className="text-neutral-300 mb-2 text-xs sm:text-sm">
                    Slow speeds can be caused by several factors. Check these in order:
                  </p>
                  <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                    <li><strong className="text-yellow-400">1.</strong> Check signal strength - if antenna LED is <span className="text-orange-400">orange</span> or <span className="text-red-400">red</span>, you'll have slower speeds. See <Link href="#no-signal" className="text-yellow-400 underline">signal troubleshooting</Link></li>
                    <li><strong className="text-yellow-400">2.</strong> Verify your data plan - check if you've reached your monthly data limit</li>
                    <li><strong className="text-yellow-400">3.</strong> Reduce number of connected devices - more devices share the available speed</li>
                    <li><strong className="text-yellow-400">4.</strong> Move closer to the router if using WiFi - distance affects WiFi speed</li>
                    <li><strong className="text-yellow-400">5.</strong> Check for background downloads or updates on connected devices</li>
                    <li><strong className="text-yellow-400">6.</strong> Restart the router - unplug power, wait 30 seconds, plug back in</li>
                    <li><strong className="text-yellow-400">7.</strong> Network congestion during peak hours (evenings) is normal - try during off-peak times</li>
                  </ol>
                </div>
              </div>
            </article>

            {/* WiFi Issues */}
            <article id="wifi-issues" className="mb-6 py-3 sm:py-4">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <span>📡</span> WiFi Connection Issues
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Problem: Cannot connect to WiFi</h4>
                  <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                    <li><strong className="text-yellow-400">1.</strong> Verify WiFi password is correct - check the <Link href="#wifi-password" className="text-yellow-400 underline">device label</Link> for default password</li>
                    <li><strong className="text-yellow-400">2.</strong> Check router LED is <span className="text-green-400">green</span> - router must be powered on</li>
                    <li><strong className="text-yellow-400">3.</strong> Restart your phone/computer and try connecting again</li>
                    <li><strong className="text-yellow-400">4.</strong> Forget the WiFi network on your device and reconnect with password</li>
                    <li><strong className="text-yellow-400">5.</strong> Move closer to the router - you may be out of WiFi range</li>
                    <li><strong className="text-yellow-400">6.</strong> Check if you're connecting to the correct network (2.4G or 5G SSID)</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Problem: WiFi keeps disconnecting</h4>
                  <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                    <li><strong className="text-yellow-400">1.</strong> Check signal strength - move closer to router</li>
                    <li><strong className="text-yellow-400">2.</strong> Reduce interference from other WiFi networks or electronic devices</li>
                    <li><strong className="text-yellow-400">3.</strong> Update your device's WiFi drivers (for computers)</li>
                    <li><strong className="text-yellow-400">4.</strong> Restart the router</li>
                    <li><strong className="text-yellow-400">5.</strong> Check if too many devices are connected - disconnect unused devices</li>
                  </ol>
                </div>
              </div>
            </article>

            {/* SIM Card Issues */}
            <article id="sim-card-issues" className="mb-6 py-3 sm:py-4">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <span>📱</span> SIM Card Issues
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Problem: SIM card not detected</h4>
                  <p className="text-neutral-300 mb-2 text-xs sm:text-sm">
                    If antenna signal LED is red and you've checked positioning, the SIM card may not be properly installed:
                  </p>
                  <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                    <li><strong className="text-yellow-400">1.</strong> Follow the <Link href="#sim-card" className="text-yellow-400 underline">SIM card installation guide</Link> to ensure proper insertion</li>
                    <li><strong className="text-yellow-400">2.</strong> Remove and reinsert the SIM card - check orientation is correct</li>
                    <li><strong className="text-yellow-400">3.</strong> Clean SIM card contacts with a dry cloth</li>
                    <li><strong className="text-yellow-400">4.</strong> Verify SIM card is active and has an Airtel data plan</li>
                    <li><strong className="text-yellow-400">5.</strong> Test SIM card in a phone to confirm it's working</li>
                    <li><strong className="text-yellow-400">6.</strong> Check if SIM card slot is damaged</li>
                  </ol>
                </div>
              </div>
            </article>

            {/* Configuration Issues */}
            <article id="configuration-issues" className="mb-6 py-3 sm:py-4">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <span>⚙️</span> Configuration & Setup Issues
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Problem: Cannot access router settings (192.168.1.1)</h4>
                  <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                    <li><strong className="text-yellow-400">1.</strong> Ensure you're connected to the router's WiFi network first</li>
                    <li><strong className="text-yellow-400">2.</strong> Try the IP address: <code className="bg-neutral-900 px-2 py-1 rounded">192.168.1.1</code></li>
                    <li><strong className="text-yellow-400">3.</strong> Use default login: username <code className="bg-neutral-900 px-2 py-1 rounded">admin</code>, password <code className="bg-neutral-900 px-2 py-1 rounded">admin</code></li>
                    <li><strong className="text-yellow-400">4.</strong> Try using the <a href="https://play.google.com/store/apps/details?id=com.tozed.TZLink" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline">TZLink mobile app</a> instead</li>
                    <li><strong className="text-yellow-400">5.</strong> Clear browser cache and try again</li>
                    <li><strong className="text-yellow-400">6.</strong> If you changed the admin password and forgot it, <Link href="#factory-reset" className="text-yellow-400 underline">factory reset</Link> is required</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Problem: Forgot WiFi password</h4>
                  <p className="text-neutral-300 mb-2 text-xs sm:text-sm">
                    See the <Link href="#wifi-password" className="text-yellow-400 underline">"How to Find Your WiFi Password"</Link> section above for detailed solutions.
                  </p>
                </div>
              </div>
            </article>

            {/* Power Issues */}
            <article id="power-issues" className="mb-6 py-3 sm:py-4">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                <span>🔌</span> Power & Battery Issues
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Problem: Device won't turn on</h4>
                  <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                    <li><strong className="text-yellow-400">1.</strong> Check power adapter is properly connected to router</li>
                    <li><strong className="text-yellow-400">2.</strong> Verify power outlet is working - try a different outlet</li>
                    <li><strong className="text-yellow-400">3.</strong> Check power cable for damage</li>
                    <li><strong className="text-yellow-400">4.</strong> Look for router LED - if no LED lights up, there's a power issue</li>
                    <li><strong className="text-yellow-400">5.</strong> Check the label on router back for correct input voltage</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Problem: Router LED stuck on red</h4>
                  <p className="text-neutral-300 mb-2 text-xs sm:text-sm">
                    If router LED stays red and doesn't progress to blue/green, the router may be stuck in boot:
                  </p>
                  <ol className="space-y-1.5 ml-4 text-neutral-200 text-xs sm:text-sm">
                    <li><strong className="text-yellow-400">1.</strong> Unplug power adapter, wait 30 seconds, plug back in</li>
                    <li><strong className="text-yellow-400">2.</strong> Check power adapter is providing correct voltage</li>
                    <li><strong className="text-yellow-400">3.</strong> Ensure ethernet cable from antenna is connected to the <strong>W/LAN1 port</strong> on the router (this is the first port, specifically for connecting the antenna - not the regular LAN ports for devices)</li>
                    <li><strong className="text-yellow-400">4.</strong> If still stuck, contact Airtel support - may need firmware update or replacement</li>
                  </ol>
                </div>
                <div className="mt-4 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                  <p className="text-xs sm:text-sm text-neutral-300 mb-2">
                    <strong className="text-yellow-400">Need a replacement router?</strong> We offer fast delivery of new Airtel SmartConnect routers.
                  </p>
                  <Link
                    href="/mobile"
                    className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-xs sm:text-sm font-semibold transition-colors"
                  >
                    Order a new router
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          </section>

          {/* Still Need Help */}
          <section className="mt-6 py-3 sm:py-4">
            <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 mb-3">
              Still Need Help?
            </h2>
            <p className="text-neutral-300 mb-4 text-sm sm:text-base">
              If you've tried all troubleshooting steps and your Airtel SmartConnect 5G Router is still not working, contact Airtel customer support for personalized assistance. Alternatively, if you need a replacement device, we offer fast delivery of new routers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a
                href="tel:0733100500"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-yellow-400/20 hover:bg-yellow-400/30 border border-yellow-400/40 rounded-lg text-yellow-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Support: 0733 100 500
              </a>
              <Link
                href="/mobile"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 hover:from-yellow-400/30 hover:to-amber-400/30 border border-yellow-400/40 rounded-lg text-yellow-400 font-semibold transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Order New Router
              </Link>
            </div>
            <Link
              href="/mobile"
              className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-yellow-400 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </section>

          {/* Related Topics */}
          <section className="mt-6 py-3 sm:py-4">
            <h2 className="text-base sm:text-lg font-semibold text-neutral-300 mb-3">
              Related Topics
            </h2>
            <div className="space-y-3">
              <Link
                href="/mobile"
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 hover:from-yellow-400/20 hover:to-amber-400/20 border border-yellow-400/30 rounded-lg transition-colors group"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400/20 group-hover:bg-yellow-400/30 transition-colors shrink-0">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    Order Airtel SmartConnect 5G Router
                  </p>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Fast delivery • Easy setup • Reliable connection
                  </p>
                </div>
                <svg className="w-5 h-5 text-yellow-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="/product/overview" className="hover:text-yellow-400 transition-colors flex items-center gap-2">
                    <span>→</span>
                    <span>Learn more about Airtel SmartConnect 5G Router</span>
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
