"use client";

import { motion } from "framer-motion";
import { FloatingCircles, ScatteredEmojis } from "@/lib/slides";
import { useReportData } from "@/hook/reportService";

export default function Slide6() {
  const { organizedData, loading } = useReportData();

  // Get the first hourly insight (or use a default if none exists)
  const hourlyInsight = organizedData.hourlyInsights[0] || {
    hour: "12:00 PM",
    desc: "No spending data available",
  };

  // Daytime-themed emojis
  const daytimeEmojis = [
    {
      emoji: "☀️",
      position: "top-[15%] left-[20%]",
      delay: 0.3,
      animation: { y: [0, -10, 0], rotate: [0, 20, 0] },
    },
    {
      emoji: "🌤️",
      position: "top-[25%] right-[15%]",
      delay: 0.5,
      animation: { y: [0, -8, 0], rotate: [0, -10, 0] },
    },
    {
      emoji: "🛍️",
      position: "bottom-[30%] left-[20%]",
      delay: 0.7,
      animation: { y: [0, -5, 0], rotate: [0, 15, 0] },
    },
    {
      emoji: "🏙️",
      position: "bottom-[25%] right-[20%]",
      delay: 0.9,
      animation: { y: [0, -7, 0], rotate: [0, -5, 0] },
    },
    {
      emoji: "🍽️",
      position: "top-[60%] right-[10%]",
      delay: 1.1,
      animation: { y: [0, -6, 0], rotate: [0, 10, 0] },
    },
    {
      emoji: "🚗",
      position: "bottom-[15%] right-[30%]",
      delay: 1.3,
      animation: { y: [0, -8, 0], rotate: [0, -15, 0] },
    },
  ];

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-red-950/40 to-black z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <FloatingCircles colors={["yellow", "amber", "orange", "slate"]} />
      <ScatteredEmojis emojis={daytimeEmojis} />

      {/* Centered Header */}
      <motion.div
        className="absolute top-20 text-center z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">
          Your Prime Spending Hour
        </h1>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-yellow-500 to-orange-500 mt-2 rounded-full" />
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-md mx-auto mt-32">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="text-3xl">⏰</span>
            </motion.div>
          </div>

          <motion.h2
            className="text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.span
              className="text-yellow-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            >
              {hourlyInsight.hour}
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {hourlyInsight.desc}
          </motion.p>

          <motion.div
            className="flex justify-center my-4 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="w-32 h-32 rounded-full border-4 border-yellow-500/30 flex items-center justify-center relative">
              {/* Clock center dot */}
              <div className="absolute z-10 w-4 h-4 rounded-full bg-yellow-500"></div>

              {/* Hour hand */}
              <div
                className="absolute z-10 w-1.5 h-8 bg-yellow-400 rounded-full origin-bottom"
                style={{
                  transform: "translate(-10%, -115%) rotate(30deg)",
                  top: "50%",
                  left: "50%",
                  transformOrigin: "bottom center",
                }}
              ></div>

              {/* Minute hand */}
              <div
                className="absolute w-1 h-8 bg-orange-400 rounded-full origin-bottom"
                style={{
                  transform: "translate(-60%, -90%) rotate(180deg)",
                  top: "50%",
                  left: "50%",
                  transformOrigin: "bottom center",
                }}
              ></div>

              {/* Clock marks */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                (deg, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-2 bg-yellow-400 rounded-full"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-56px)`,
                      top: "50%",
                      left: "50%",
                      transformOrigin: "bottom center",
                    }}
                  ></div>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            className="mt-6 pt-6 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-sm text-gray-400 text-center">
              Your {hourlyInsight.hour.toLowerCase()} purchases:
            </p>
            <div className="flex justify-between mt-3">
              <div className="text-center">
                <div className="text-2xl mb-1">🛍️</div>
                <p className="text-xs">Online Shopping</p>
                <p className="text-yellow-400 text-sm font-medium">42%</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🍕</div>
                <p className="text-xs">Lunch Break</p>
                <p className="text-yellow-400 text-sm font-medium">35%</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🎮</div>
                <p className="text-xs">Gaming & Apps</p>
                <p className="text-yellow-400 text-sm font-medium">23%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="w-full text-center pb-8 text-xs text-gray-500 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      ></motion.div>
    </div>
  );
}
