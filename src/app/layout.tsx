import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PackageProvider } from "./contexts/PackageContext";
import Script from "next/script";
import Footer from "./components/Footer";
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
      "Airtel 5G Router | Airtel 5G Smart Connect | High-Speed Internet Kenya",
    template: "%s | Airtel Kenya",
  },
  description:
    "Airtel 5G router for high-speed internet in Kenya. Get Airtel 5G Smart Connect with weather-resistant outdoor unit and WiFi 6 router. Fast, reliable 5G internet for home and office. Request installation today.",
  keywords: [
    "Airtel 5G router",
    "airtel 5g router",
    "Airtel 5G",
    "airtel 5g",
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
      "Airtel 5G Router | Airtel 5G Smart Connect | High-Speed Internet Kenya",
    description:
      "Airtel 5G router for high-speed internet in Kenya. Get Airtel 5G Smart Connect with weather-resistant outdoor unit and WiFi 6 router. Fast, reliable 5G internet for home and office. Request installation today.",
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
      price: "1999",
      priceCurrency: "KES",
      availability: "https://schema.org/InStock",
    },
    provider: {
      "@type": "Organization",
      name: "Airtel Kenya",
      url: "https://www.airtelkenya.com",
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
    url: "https://www.airtelkenya.com",
    logo: "https://www.airtel5grouter.co.ke/airtel.png",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      areaServed: "KE",
      availableLanguage: "en",
    },
    sameAs: ["https://www.airtelkenya.com"],
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: "0",
        currency: "KES",
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
      refundType: "https://schema.org/FullRefund",
    },
  };

  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "5G Smart Connect - Outdoor Unit",
    description:
      "Airtel 5G Smart Connect Outdoor Unit with weather-resistant design, high-gain antenna, signal amplification, and flexible mounting options.",
    image: "https://www.airtel5grouter.co.ke/airtel.png",
    url: "https://www.airtel5grouter.co.ke",
    sku: "AIRTEL-5G-SC-ODU",
    mpn: "AIRTEL-5G-SC-ODU",
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
        price: 1999,
        priceCurrency: "KES",
        availability: "https://schema.org/InStock",
        url: "https://www.airtel5grouter.co.ke",
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        seller: {
          "@type": "Organization",
          name: "Airtel Kenya",
        },
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
          refundType: "https://schema.org/FullRefund",
        },
      },
      {
        "@type": "Offer",
        name: "5G 30Mbps 30 days",
        price: 3999,
        priceCurrency: "KES",
        availability: "https://schema.org/InStock",
        url: "https://www.airtel5grouter.co.ke",
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        seller: {
          "@type": "Organization",
          name: "Airtel Kenya",
        },
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
          refundType: "https://schema.org/FullRefund",
        },
      },
    ],
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
        reviewBody: "Excellent 5G router with reliable connectivity. The outdoor unit provides strong signal even in remote areas. Highly recommended for home and office use.",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17792435351"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-17792435351');
  `}
        </Script>
        <PackageProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow relative">{children}</main>
            <Footer />
          </div>
        </PackageProvider>
      </body>
    </html>
  );
}
