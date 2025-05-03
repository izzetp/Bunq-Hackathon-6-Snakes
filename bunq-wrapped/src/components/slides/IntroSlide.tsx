"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function IntroSlide({ onStart }: { onStart: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2200),
      setTimeout(() => setPhase(4), 3000),
    ];
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const titleVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const floatVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden cursor-pointer"
      onClick={onStart}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        transition: { duration: 0.8 },
      }}
    >
      {/* Background image and gradient overlay */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1, filter: "blur(6px)" }}
          animate={{ scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <img
            src="/images/bunq-bg.png"
            alt="bunq background"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      </div>

      {/* Animated 💰 Emoji + glow effect */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          className="relative w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-2xl"
          variants={floatVariants}
          animate="animate"
        >
          <span className="text-5xl">💰</span>

          {/* Animated glow rings */}
          <motion.div
            className="absolute inset-0 rounded-full border border-white/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border border-white/20"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{ duration: 3, delay: 0.5, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Text content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-20 space-y-6 pt-64">
        <motion.h1
          variants={titleVariant}
          initial="hidden"
          animate={phase >= 1 ? "visible" : "hidden"}
          className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 bg-clip-text text-transparent"
        >
          Bunq Wrapped
        </motion.h1>

        <motion.p
          variants={titleVariant}
          initial="hidden"
          animate={phase >= 2 ? "visible" : "hidden"}
          className="text-2xl"
        >
          🎉 Your 2024 in Money 🎉
        </motion.p>

        <motion.p
          variants={titleVariant}
          initial="hidden"
          animate={phase >= 3 ? "visible" : "hidden"}
          className="text-lg text-gray-300"
        >
          Let’s relive the chaos.
        </motion.p>
      </div>

      {/* Tap anywhere */}
      {phase >= 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
          }}
          className="absolute bottom-10 w-full text-center z-30"
        >
          <motion.p
            animate={{
              scale: [1, 1.05, 1],
              transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
            }}
            className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm text-gray-200"
          >
            Tap anywhere to begin
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}
