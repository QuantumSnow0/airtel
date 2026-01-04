"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const carouselSlides = [
  {
    image: "/airtelcarousel1.jpeg",
    title: "What is it?",
    description:
      "Learn about the Airtel SmartConnect 5G router and its capabilities.",
    link: "/product/overview",
  },
  {
    image: "/airtelcarousel2.jpeg",
    title: "Troubleshooting",
    description: "Common issues and solutions to get your device working perfectly.",
    link: "/product/troubleshooting",
  },
  {
    image: "/aitelcarousel3.jpg",

    title: "Weather-Resistant Design",
    description: "Built to perform reliably in all conditions.",
  },
  {
    image: "/aitelcarousel4.jpeg",
    title: "Flexible Mounting Options",
    description: "Easily install on walls, poles, or rooftops.",
  },
];

export default function ProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const goToSlide = (index: number) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  const handleTouchStart = () => {
    if (swiper && swiper.autoplay) {
      // Pause autoplay
      swiper.autoplay.stop();

      // Clear any existing timeout
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      // Resume after 10 seconds
      pauseTimeoutRef.current = setTimeout(() => {
        if (swiper && swiper.autoplay) {
          swiper.autoplay.start();
        }
      }, 10000);
    }
  };

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative w-full"
      style={{
        height: "clamp(280px, 50vw, 50vh)",
        overflow: "hidden",
      }}
    >
      {/* Title Section - Overlay on top of carousel */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 md:hidden"
        style={{
          zIndex: 100,
        }}
      >
        {/* Title on the left */}
          <div className="flex items-center gap-1">
            <Image
              src="/icon.png"
              alt="Airtel"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
              style={{
                filter: "drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))",
                margin: 0,
                padding: 0,
                display: "block",
                flexShrink: 0,
                lineHeight: 0,
              }}
              priority
            />
            <span
              className="text-base font-bold"
              style={{
                background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
              }}
            >
            Airtel
            </span>
          <div className="h-4 w-px bg-white/30 mx-1" />
          <span
            className="text-sm font-bold tracking-wide"
            style={{
              background: "linear-gradient(135deg, #ffffff, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.05em",
              textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
            }}
          >
            SmartConnect
          </span>
        </div>

        {/* Phone number on the right */}
        <a
          href="tel:0789457580"
          className="flex items-center gap-1.5 transition-colors"
          style={{
            textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            style={{
              filter: "drop-shadow(0 0 4px rgba(251, 191, 36, 0.5))",
            }}
          >
            <defs>
              <linearGradient
                id="phoneGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
            <path
              stroke="url(#phoneGradient)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span
            className="text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #ffffff, #fbbf24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
            }}
          >
            0789457580
          </span>
        </a>
      </div>

      {/* Swiper Carousel Container */}
      <div className="relative w-full h-full" style={{ zIndex: 1 }}>
        {/* Static first slide for instant LCP - renders before Swiper loads */}
        {!swiperReady && (
          <div className="absolute inset-0 w-full h-full">
            <div className="w-full h-full relative">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={carouselSlides[0].image}
                  alt={carouselSlides[0].title}
                  fill
                  className="object-cover sm:object-stretch"
                  style={{ objectPosition: "center" }}
                  priority
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  quality={75}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "rgba(0, 0, 0, 0.1)",
                    zIndex: 1,
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 pointer-events-none"
                  style={{
                    height: "120px",
                    background:
                      "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))",
                    zIndex: 2,
                  }}
                />
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{ zIndex: 3 }}
              >
                <div className="relative px-4 pb-6 pt-10">
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)",
                      backdropFilter: "blur(1px)",
                      zIndex: -1,
                      borderRadius: "0 0 12px 12px",
                    }}
                  />
                  <h3
                    className={`text-2xl mb-3 leading-tight font-bold text-yellow-400 ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                      letterSpacing: "0.01em",
                      textShadow: "0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(251, 191, 36, 0.6)",
                      filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))",
                    }}
                  >
                    {carouselSlides[0].title}
                  </h3>
                  <p
                    className={`text-base text-white font-medium leading-relaxed ${poppins.variable}`}
                    style={{
                      fontFamily: "var(--font-poppins), sans-serif",
                      letterSpacing: "0.01em",
                      lineHeight: "1.6",
                      wordWrap: "break-word",
                      hyphens: "auto",
                      textShadow: "0 2px 8px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.8)",
                      filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.9))",
                    }}
                  >
                    {carouselSlides[0].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Arrows */}
        {activeIndex > 0 && swiperReady && (
          <button
            onClick={() => {
              handleTouchStart();
              swiper?.slidePrev();
            }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center transition-all duration-300"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
        {activeIndex < carouselSlides.length - 1 && swiperReady && (
          <button
            onClick={() => {
              handleTouchStart();
              swiper?.slideNext();
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center transition-all duration-300"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiperInstance) => {
            setSwiper(swiperInstance);
            // Mark Swiper as ready after initialization
            setSwiperReady(true);
          }}
          onSlideChange={handleSlideChange}
          onTouchStart={handleTouchStart}
          className="h-full"
          style={{ height: "100%", opacity: swiperReady ? 1 : 0 }}
        >
          {carouselSlides.map((slide, index) => {
            const slideContent = (
              <div className="w-full h-full relative">
                <div className="w-full h-full relative">
                  {/* Image Section */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover sm:object-stretch"
                      style={{
                        objectPosition:
                          index === 3
                            ? "center"
                            : index === 0
                            ? "center"
                            : "bottom",
                      }}
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                      quality={75}
                    />
                    {/* Black Overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "rgba(0, 0, 0, 0.1)",
                        zIndex: 1,
                      }}
                    />
                    {/* Gradient Fade at Bottom - Enhanced for better text visibility */}
                    <div
                      className="absolute bottom-0 left-0 right-0 pointer-events-none"
                      style={{
                        height: "120px",
                        background:
                          "linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9))",
                        zIndex: 2,
                      }}
                    />
                  </div>
                  {/* Title and Description - Overlay at Bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 pointer-events-none"
                    style={{ zIndex: 3 }}
                  >
                    {/* Content */}
                    <div className="relative px-4 pb-6 pt-10">
                      {/* Semi-transparent background for text readability - smooth gradient */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)",
                          backdropFilter: "blur(1px)",
                          zIndex: -1,
                          borderRadius: "0 0 12px 12px",
                        }}
                      />
                      <h3
                        className={`text-2xl mb-3 leading-tight font-bold text-yellow-400 ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                          letterSpacing: "0.01em",
                          textShadow: "0 2px 8px rgba(0, 0, 0, 0.9), 0 0 20px rgba(251, 191, 36, 0.6)",
                          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))",
                        }}
                      >
                        {slide.title}
                      </h3>
                      <p
                        className={`text-base text-white font-medium leading-relaxed ${poppins.variable}`}
                        style={{
                          fontFamily: "var(--font-poppins), sans-serif",
                          letterSpacing: "0.01em",
                          lineHeight: "1.6",
                          wordWrap: "break-word",
                          hyphens: "auto",
                          textShadow: "0 2px 8px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.8)",
                          filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.9))",
                        }}
                      >
                        {slide.description}
                        {/* Badge - Learn More for slides with link */}
                        {slide.link && (
                          <>
                            <span className="inline-block w-full" style={{ textAlign: "right" }}>
                              <span className="ml-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/40 rounded-full align-middle">
                                <span
                                  className={`text-xs font-semibold text-yellow-400 ${poppins.variable}`}
                                  style={{
                                    fontFamily: "var(--font-poppins), sans-serif",
                                    letterSpacing: "0.05em",
                                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.8)",
                                  }}
                                >
                                  Learn More
                                </span>
                                <svg
                                  className="w-3.5 h-3.5 text-yellow-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  style={{
                                    filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8))",
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </span>
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );

            return (
              <SwiperSlide key={index} style={{ height: "100%" }}>
                {slide.link ? (
                  <Link 
                    href={slide.link} 
                    className="block w-full h-full cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    {slideContent}
                  </Link>
                ) : (
                  slideContent
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
