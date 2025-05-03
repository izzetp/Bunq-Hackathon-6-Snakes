"use client";
import { motion } from "framer-motion";
import { FloatingCircles, ScatteredEmojis } from "@/lib/slides";
import { useReportData } from "@/hook/reportService";

export default function Slide11() {
  const { organizedData } = useReportData();

  // Get data from the hook with fallback defaults
  const mostExpensiveDay = organizedData.dateAmounts[0]?.amount
    ? `€${organizedData.dateAmounts[0].amount}`
    : "€412";

  const mostUsedMerchant = organizedData.expenses[0]?.expense || "Albert Heijn";

  const transferInfo = organizedData.transferInfos[0] || {
    name: "Sam",
    nr_transfers: 12,
  };

  const fastestBurn = organizedData.descriptions[1]?.desc || "2.7 days";

  const mashupEmojis = [
    {
      emoji: "💸",
      position: "top-[20%] left-[15%]",
      delay: 0.3,
      animation: { y: [0, -10, 0], rotate: [0, 10, 0] },
    },
    {
      emoji: "🛒",
      position: "top-[30%] right-[20%]",
      delay: 0.5,
      animation: { y: [0, -8, 0], rotate: [0, -5, 0] },
    },
    {
      emoji: "📤",
      position: "bottom-[25%] left-[25%]",
      delay: 0.7,
      animation: { y: [0, -12, 0], rotate: [0, 8, 0] },
    },
    {
      emoji: "🔥",
      position: "bottom-[35%] right-[15%]",
      delay: 0.9,
      animation: { y: [0, -15, 0], rotate: [0, -10, 0] },
    },
    {
      emoji: "📊",
      position: "top-[50%] right-[10%]",
      delay: 1.1,
      animation: { y: [0, -10, 0], rotate: [0, 15, 0] },
    },
    {
      emoji: "💰",
      position: "bottom-[15%] right-[30%]",
      delay: 1.3,
      animation: { y: [0, -8, 0], rotate: [0, -8, 0] },
    },
  ];

  const confettiColors = ["pink", "purple", "yellow", "green", "blue"];

  return (
    <div className="w-full h-full flex flex-col items-center justify-start text-white px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/40 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <FloatingCircles colors={["purple", "pink", "fuchsia", "violet"]} />
      <ScatteredEmojis emojis={mashupEmojis} />

      {/* Confetti animation */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-${
            confettiColors[i % confettiColors.length]
          }-500`}
          initial={{
            top: "-10%",
            left: `${Math.random() * 100}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            top: `${100 + Math.random() * 20}%`,
            opacity: [0, 1, 0],
            scale: [0, 1, 0.5],
            rotate: Math.random() * 360,
            x: Math.random() > 0.5 ? 100 : -100,
          }}
          transition={{
            duration: 2.5 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        className="w-full text-center pt-12 pb-6 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
          Your 2024 Money Mashup
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-purple-600 mt-2 rounded-full mx-auto"></div>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-md mx-auto">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center"
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="text-3xl">🎯</span>
            </motion.div>
          </div>

          <motion.h2
            className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Your Financial Highlights
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {[
              {
                icon: "💸",
                label: "Most Expensive Night",
                value: mostExpensiveDay,
                bg: "pink",
                delay: 0.8,
              },
              {
                icon: "🛒",
                label: "Most Used Merchant",
                value: mostUsedMerchant,
                bg: "blue",
                delay: 1.0,
              },
              {
                icon: "📤",
                label: "Most Transfers",
                value: `${transferInfo.name} (${transferInfo.nr_transfers} times)`,
                bg: "orange",
                delay: 1.2,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/5 p-4 rounded-lg flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: item.delay, duration: 0.4 }}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <div
                  className={`w-10 h-10 rounded-full bg-${item.bg}-500/30 flex items-center justify-center text-xl`}
                >
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-400">{item.label}</p>
                  <p className="font-bold text-white">{item.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-medium relative overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 w-full h-full bg-white/30"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "100%", opacity: 0.3 }}
              transition={{ duration: 0.8 }}
            />
            Share My Year
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              📱
            </motion.span>
          </motion.button>
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
