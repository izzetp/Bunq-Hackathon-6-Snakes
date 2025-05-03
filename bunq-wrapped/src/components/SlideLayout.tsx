"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { slides } from "@/lib/slides";
import IntroSlide from "@/components/slides/IntroSlide"; // NEW

export default function SlideLayout() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    if (index >= slides.length - 1) return;
    setDirection(1);
    setIndex((i) => i + 1);
  };

  const back = () => {
    if (index <= 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  };

  const handleClick = (e: React.MouseEvent) => {
    const x = e.clientX;
    const width = window.innerWidth;

    if (!started) {
      setStarted(true);
      return;
    }

    x < width / 2 ? back() : next();
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  return (
    <div
      className="w-full h-screen bg-black text-white overflow-hidden relative"
      onClick={handleClick}
    >
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={started ? index : "intro"}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full h-full flex items-center justify-center px-4"
        >
          {started ? (
            slides[index]
          ) : (
            <IntroSlide onStart={() => setStarted(true)} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators only if started */}
      {started && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-50">
          {slides.map((_, i) => (
            <motion.div
              key={`indicator-${i}`}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === index ? "bg-white scale-125" : "bg-white/30"
              }`}
              animate={
                i === index
                  ? {
                      scale: [1, 1.3, 1],
                      transition: { duration: 0.5 },
                    }
                  : {}
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
