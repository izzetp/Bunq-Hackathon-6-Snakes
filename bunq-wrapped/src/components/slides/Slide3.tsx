"use client";

import { motion } from "framer-motion";
import { FloatingCircles, ScatteredEmojis } from "@/lib/slides";
import { useReportData } from "@/hook/reportService"; // Update with the correct path to your reportService.ts

export default function Slide3() {
  // Use the report data hook
  const { organizedData, loading, error } = useReportData();

  // Use nameAmounts2 array which should contain Matthew Palmer's data
  const matthewPalmer =
    !loading && organizedData.nameAmounts2.length > 0
      ? organizedData.nameAmounts2[0] // Since we're specifically targeting Matthew Palmer
      : { name: "Matthew Palmer", amount: 4256.0 }; // Fallback with the known data

  const receiveEmojis = [
    {
      emoji: "💰",
      position: "top-[20%] left-[15%]",
      delay: 0.3,
      animation: { y: [0, -10, 0], rotate: [0, 10, 0] },
    },
    {
      emoji: "📥",
      position: "top-[30%] right-[20%]",
      delay: 0.5,
      animation: { y: [0, -8, 0], rotate: [0, -5, 0] },
    },
    {
      emoji: "🎁",
      position: "bottom-[25%] left-[25%]",
      delay: 0.7,
      animation: { y: [0, -12, 0], rotate: [0, 8, 0] },
    },
    {
      emoji: "💝",
      position: "bottom-[35%] right-[15%]",
      delay: 0.9,
      animation: { y: [0, -15, 0], rotate: [0, -10, 0] },
    },
    {
      emoji: "📲",
      position: "top-[50%] right-[10%]",
      delay: 1.1,
      animation: { y: [0, -10, 0], rotate: [0, 15, 0] },
    },
    {
      emoji: "💵",
      position: "bottom-[15%] right-[30%]",
      delay: 1.3,
      animation: { y: [0, -8, 0], rotate: [0, -8, 0] },
    },
  ];

  // Show loading state or error
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <p>Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <p>Error loading data: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white px-6 relative overflow-hidden">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-teal-950/40 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Floating Circles with teal/cyan theme */}
      <div className="absolute inset-0 z-0">
        <FloatingCircles colors={["teal", "cyan", "sky", "emerald"]} />
        <FloatingCircles colors={["cyan", "teal", "emerald", "sky"]} />
      </div>

      <ScatteredEmojis emojis={receiveEmojis} />

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold">You Got the Most € from...</h1>
          <div className="h-1 w-20 bg-gradient-to-r from-teal-500 to-cyan-500 mt-2 mx-auto rounded-full" />
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="text-3xl">👨‍💼</span>
            </motion.div>
          </div>

          <motion.h2
            className="text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.span
              className="text-teal-400 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            >
              €
              {matthewPalmer.amount.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </motion.span>{" "}
            from {matthewPalmer.name}
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 text-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {matthewPalmer.name}'s financial support is still going strong!
          </motion.p>

          <motion.div
            className="flex justify-center items-center gap-10 my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.div className="text-3xl">👨‍💼</motion.div>
            <motion.div
              className="flex-1 relative h-2 bg-teal-900/50 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.3, duration: 1.5 }}
              />
              <motion.div
                className="absolute top-1/2 right-0 transform -translate-y-1/2 text-lg"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{
                  delay: 1.3,
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                💰
              </motion.div>
            </motion.div>
            <motion.div className="text-3xl">👤</motion.div>
          </motion.div>

          <motion.div
            className="mt-6 pt-6 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-sm text-gray-400 text-center">
              Top reasons for transfers:
            </p>
            <div className="flex justify-between mt-3">
              <div className="text-center">
                <div className="text-2xl mb-1">🏢</div>
                <p className="text-xs">Business</p>
                <p className="text-teal-400 text-sm font-medium">€2100</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">💻</div>
                <p className="text-xs">Consulting</p>
                <p className="text-teal-400 text-sm font-medium">€1100</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">📊</div>
                <p className="text-xs">Projects</p>
                <p className="text-teal-400 text-sm font-medium">€156</p>
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
      />
    </div>
  );
}
