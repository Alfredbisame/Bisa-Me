"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Slides {
  id: number;
  image: string;
  link?: string;
}

const slides: Slides[] = [
  {
    id: 1,
    image: "/new-banner-bisame.jpeg",
    link: "https://www.youtube.com/playlist?list=PLJjIVI_prrBaAKS4VwE_Xb0-x4toDoDrp",
  },
  {
    id: 2,
    image: "/new-banner.jpeg",
    link: "https://youtube.com/playlist?list=PLJjIVI_prrBbJn9T_Tduwi9QZ9GCGxp2t&si=urAobMChBQo7Cjqx",
  },
  { id: 3, image: "/B2.webp" },
  { id: 4, image: "/B3.webp" },
  { id: 5, image: "/B4.webp" },
];

export default function MainBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleImageLink = (url: string) => {
    window.location.href = url;
  };

  const active = useMemo(() => slides[currentSlide], [currentSlide]);

  return (
    <div className="relative w-full overflow-hidden h-[220px] sm:h-[300px] md:h-full rounded-lg">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active.id} // stable key per slide (not index)
          className="absolute inset-0 rounded-lg" // lock layer size/position
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          {active.link ? (
            <Link href={active.link} target="_blank">
              <Image
                src={active.image}
                alt="Bisame Banner"
                fill
                sizes="100vw"
                className={`object-cover rounded-lg cursor-pointer`}
                priority={currentSlide === 0}
              />
            </Link>
          ) : (
            <Image
              src={active.image}
              alt="Bisame Banner"
              fill
              sizes="100vw"
              className={`object-cover rounded-lg`}
              priority={currentSlide === 0}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center">
        {slides.map((_, index) => (
          <button
            key={`slide-${index}`}
            onClick={() => handleSlideChange(index)}
            className={`h-2 w-2 rounded-full mr-2 transition-all duration-300 ${
              currentSlide === index ? "bg-white w-4" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
