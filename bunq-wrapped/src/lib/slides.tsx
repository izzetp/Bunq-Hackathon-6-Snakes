"use client";

import { motion } from "framer-motion";
import Slide1 from "@/components/slides/Slide1";
import Slide2 from "@/components/slides/Slide2";
import Slide3 from "@/components/slides/Slide3";
import Slide4 from "@/components/slides/Slide4";
import Slide5 from "@/components/slides/Slide5";
import Slide6 from "@/components/slides/Slide6";
import Slide7 from "@/components/slides/Slide7";
import Slide8 from "@/components/slides/Slide8";
import Slide9 from "@/components/slides/Slide9";
import Slide10 from "@/components/slides/Slide10";

// --- FloatingCircles ---
export const FloatingCircles = ({
  colors = ["pink", "purple", "blue", "green"],
}: {
  colors?: string[];
}) => {
  const circles = [
    {
      size: "w-32 h-32",
      color: `bg-${colors[0]}-500/20`,
      x: "left-[-5%]",
      y: "top-[15%]",
      delay: 0.2,
    },
    {
      size: "w-40 h-40",
      color: `bg-${colors[1]}-500/15`,
      x: "right-[-10%]",
      y: "top-[10%]",
      delay: 0.5,
    },
    {
      size: "w-24 h-24",
      color: `bg-${colors[2]}-500/20`,
      x: "left-[5%]",
      y: "bottom-[20%]",
      delay: 0.8,
    },
    {
      size: "w-36 h-36",
      color: `bg-${colors[3]}-500/15`,
      x: "right-[5%]",
      y: "bottom-[10%]",
      delay: 1.1,
    },
    {
      size: "w-28 h-28",
      color: `bg-${colors[0]}-500/10`,
      x: "left-[20%]",
      y: "top-[5%]",
      delay: 1.3,
    },
    {
      size: "w-20 h-20",
      color: `bg-${colors[2]}-500/15`,
      x: "right-[15%]",
      y: "bottom-[30%]",
      delay: 0.9,
    },
  ];

  return (
    <>
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full backdrop-blur-xl ${circle.size} ${circle.color} ${circle.x} ${circle.y}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.8,
            transition: {
              duration: 1.5,
              delay: circle.delay,
              ease: "easeOut",
            },
          }}
          whileInView={{
            x: [0, 10, -5, 0],
            y: [0, -10, 5, 0],
            transition: {
              duration: 8 + index * 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      ))}
    </>
  );
};

// --- AnimatedIcon ---
export const AnimatedIcon = ({
  emoji,
  color = "pink",
  position = "mb-8",
}: {
  emoji: string;
  color?: string;
  position?: string;
}) => {
  return (
    <motion.div
      className={`relative ${position}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
        delay: 0.2,
      }}
    >
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-br from-${color}-500 to-${color}-600 blur-xl opacity-70 scale-110`}
      />
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`relative w-20 h-20 rounded-full bg-gradient-to-br from-${color}-500 to-${color}-600 flex items-center justify-center shadow-2xl`}
      >
        <span className="text-3xl">{emoji}</span>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

// --- ScatteredEmojis ---
export type ScatteredEmoji = {
  emoji: string;
  position: string;
  delay: number;
  animation: {
    y?: number[];
    rotate?: number[];
  };
};

export const ScatteredEmojis = ({
  emojis,
  baseDelay = 0,
}: {
  emojis: ScatteredEmoji[];
  baseDelay?: number;
}) => {
  return (
    <>
      {emojis.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute text-2xl ${item.position}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: baseDelay + item.delay,
          }}
        >
          <motion.div
            animate={item.animation}
            transition={{
              duration: 4 + (index % 3),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.emoji}
          </motion.div>
        </motion.div>
      ))}
    </>
  );
};

// --- Slide Array ---
export const slides = [
  <Slide1 key="slide1" />,
  <Slide2 key="slide2" />,
  <Slide3 key="slide3" />,
  <Slide4 key="slide4" />,
  <Slide5 key="slide5" />,
  <Slide6 key="slide6" />,
  <Slide7 key="slide7" />,
  <Slide8 key="slide8" />,
  <Slide9 key="slide9" />,
  <Slide10 key="slide10" />,
];
