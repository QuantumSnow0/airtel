"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Poppins } from "next/font/google";
import "swiper/css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const carouselSlides = [
  {
    image: "/airtelcarousel1.jpg",
    title: "Signal Amplification",
    description:
      "Enhances signal strength for stable, uninterrupted connectivity.",
  },
  {
    image: "/airtelcarousel2.jpeg",
    title: "High-Gain Antenna",
    description: "Offers strong and consistent indoor coverage.",
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
        height: "clamp(250px, 45vw, 40vh)",
        overflow: "hidden",
      }}
    >
      {/* Title Section - Overlay on top of carousel */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center px-4 py-1"
        style={{
          zIndex: 100,
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span
              className="text-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
              }}
            >
              Airt
            </span>
            <img
              src="/icon.png"
              alt="Airtel 5G Icon"
              className="w-8 h-8 object-contain block"
              style={{
                marginLeft: "-8px",
                marginRight: "-8px",
                filter: "drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))",
              }}
            />
            <span
              className="text-2xl font-bold"
              style={{
                background: "linear-gradient(135deg, #ffffff, #fbbf24)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 20px rgba(251, 191, 36, 0.3)",
              }}
            >
              l
            </span>
          </div>
          <div className="h-6 w-px bg-white/30 mx-1" />
          <span
            className="text-xl font-bold tracking-wide"
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
      </div>

      {/* Swiper Carousel Container */}
      <div className="relative w-full h-full" style={{ zIndex: 1 }}>
        {/* Navigation Arrows */}
        {activeIndex > 0 && (
          <button
            onClick={() => {
              handleTouchStart();
              swiper?.slidePrev();
            }}
            className="absolute left-2 top-1/3 transform -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center transition-all duration-300"
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
        {activeIndex < carouselSlides.length - 1 && (
          <button
            onClick={() => {
              handleTouchStart();
              swiper?.slideNext();
            }}
            className="absolute right-2 top-1/3 transform -translate-y-1/2 z-50 w-10 h-10 flex items-center justify-center transition-all duration-300"
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
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
          onTouchStart={handleTouchStart}
          className="h-full"
          style={{ height: "100%" }}
        >
          {carouselSlides.map((slide, index) => (
            <SwiperSlide key={index} style={{ height: "100%" }}>
              <div className="w-full h-full relative">
                {/* Image Section */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition:
                        index === 3
                          ? "center"
                          : index === 0
                          ? "center"
                          : "bottom",
                    }}
                  />
                  {/* Black Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "rgba(0, 0, 0, 0.4)",
                      zIndex: 1,
                    }}
                  />
                  {/* Gradient Fade at Bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 pointer-events-none"
                    style={{
                      height: "60px",
                      background:
                        "linear-gradient(to bottom, transparent, rgb(15, 23, 42))",
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
                  <div className="relative px-3 pb-6 pt-8">
                    <h3
                      className={`text-xl text-white mb-2 drop-shadow-[0_2px_8px_rgba(255,0,0,0.8)] leading-snug ${poppins.variable}`}
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                        letterSpacing: "0.01em",
                        fontWeight: 600,
                      }}
                    >
                      {slide.title}
                    </h3>
                    <p
                      className={`text-sm text-white/95 leading-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] ${poppins.variable}`}
                      style={{
                        fontFamily: "var(--font-poppins), sans-serif",
                        letterSpacing: "0.01em",
                        fontWeight: 300,
                        lineHeight: "1.5",
                        wordWrap: "break-word",
                        hyphens: "auto",
                      }}
                    >
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
