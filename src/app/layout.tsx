import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { PackageProvider } from "./contexts/PackageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.airtel5grouter.co.ke"),
  title: {
    default:
      "Airtel 5G Smart Connect | High-Speed 5G Internet Installation | Kenya",
    template: "%s | Airtel Kenya",
  },
  description:
    "Get Airtel 5G Smart Connect - High-speed 5G internet for your home in Kenya. Weather-resistant outdoor unit with high-gain antenna. Request installation today. Available in all 47 counties.",
  keywords: [
    "Airtel 5G router",
    "5G Smart Connect",
    "Airtel Kenya 5G",
    "5G internet Kenya",
    "Smart Connect installation",
    "5G outdoor unit",
    "Airtel 5G packages",
    "high-speed internet Kenya",
    "5G connectivity Kenya",
    "Airtel broadband",
    "5G router installation",
    "Smart Connect ODU",
    "Airtel 5G plans",
    "Cheap internet",
    "fast internet Kenya",
  ],
  authors: [{ name: "Airtel Kenya" }],
  creator: "Airtel Kenya",
  publisher: "Airtel Kenya",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://www.airtel5grouter.co.ke",
    siteName: "Airtel 5G Smart Connect",
    title:
      "Airtel 5G Smart Connect | High-Speed 5G Internet Installation | Kenya",
    description:
      "Get Airtel 5G Smart Connect - High-speed 5G internet for your home in Kenya. Weather-resistant outdoor unit with high-gain antenna. Request installation today. Available in all 47 counties.",
    images: [
      {
        url: "https://www.airtel5grouter.co.ke/airtel.png",
        width: 1200,
        height: 630,
        alt: "Airtel 5G Smart Connect Outdoor Unit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Airtel 5G Smart Connect | High-Speed 5G Internet Installation",
    description:
      "Get Airtel 5G Smart Connect - High-speed 5G internet for your home in Kenya. Weather-resistant outdoor unit with high-gain antenna. Available in all 47 counties.",
    images: ["https://www.airtel5grouter.co.ke/airtel.png"],
  },
  alternates: {
    canonical: "https://www.airtel5grouter.co.ke",
  },
  category: "Telecommunications",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Airtel 5G Smart Connect Installation Request",
    description:
      "Request your Airtel 5G Smart Connect Outdoor Unit installation. Get high-speed 5G internet with weather-resistant design and reliable performance.",
    url: "https://www.airtel5grouter.co.ke",
    applicationCategory: "Telecommunications",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "2999",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "Organization",
      name: "Airtel Kenya",
      url: "https://www.airtel.co.ke",
      logo: "https://www.airtel5grouter.co.ke/airtel.png",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Airtel Kenya",
    url: "https://www.airtel.co.ke",
    logo: "https://www.airtel5grouter.co.ke/airtel.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      areaServed: "KE",
      availableLanguage: "en",
    },
    sameAs: ["https://www.airtel.co.ke"],
  };

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "5G Smart Connect - Outdoor Unit",
    description:
      "Airtel 5G Smart Connect Outdoor Unit with weather-resistant design, high-gain antenna, signal amplification, and flexible mounting options.",
    brand: {
      "@type": "Brand",
      name: "Airtel",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Airtel Kenya",
    },
    offers: [
      {
        "@type": "Offer",
        name: "5G 15Mbps 30 days",
        price: "2999",
        priceCurrency: "KES",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        name: "5G 30Mbps 30 days",
        price: "3999",
        priceCurrency: "KES",
        availability: "https://schema.org/InStock",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
    },
  };

  return (
    <html lang="en">
      <head>
        {/* Status Bar Theme - Dark Neutral to match theme */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="msapplication-navbutton-color" content="#0a0a0a" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productStructuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C897PVBGSR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C897PVBGSR');
          `}
        </Script>
        <PackageProvider>{children}</PackageProvider>
      </body>
    </html>
  );
}
