"use client";
import { motion } from "framer-motion";
import { FloatingCircles, ScatteredEmojis } from "@/lib/slides";
import { useReportData } from "@/hook/reportService";

export default function Slide10() {
  const { organizedData } = useReportData();

  // Get purchase stats or use defaults
  const nr_purchases = organizedData.purchaseStats?.nr_purchases || 1248;
  const avg_day = organizedData.purchaseStats?.avg_day || 3.4;

  const countEmojis = [
    {
      emoji: "🧮",
      position: "top-[20%] left-[15%]",
      delay: 0.3,
      animation: { y: [0, -10, 0], rotate: [0, 10, 0] },
    },
    {
      emoji: "🔢",
      position: "top-[30%] right-[20%]",
      delay: 0.5,
      animation: { y: [0, -8, 0], rotate: [0, -5, 0] },
    },
    {
      emoji: "📊",
      position: "bottom-[25%] left-[25%]",
      delay: 0.7,
      animation: { y: [0, -12, 0], rotate: [0, 8, 0] },
    },
    {
      emoji: "📈",
      position: "bottom-[35%] right-[15%]",
      delay: 0.9,
      animation: { y: [0, -15, 0], rotate: [0, -10, 0] },
    },
    {
      emoji: "🛍️",
      position: "top-[50%] right-[10%]",
      delay: 1.1,
      animation: { y: [0, -10, 0], rotate: [0, 15, 0] },
    },
    {
      emoji: "💳",
      position: "bottom-[15%] right-[30%]",
      delay: 1.3,
      animation: { y: [0, -8, 0], rotate: [0, -8, 0] },
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/40 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <FloatingCircles colors={["cyan", "sky", "teal", "blue"]} />
      <ScatteredEmojis emojis={countEmojis} />

      {/* Centered Header */}
      <motion.div
        className="absolute top-20 text-center z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">Your Purchase Count</h1>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-cyan-500 to-sky-500 mt-2 rounded-full" />
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-md mx-auto mt-32">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Icon */}
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-sky-500 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="text-3xl">🧮</span>
            </motion.div>
          </div>

          {/* Headline */}
          <motion.h2
            className="text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.span
              className="text-cyan-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            >
              {nr_purchases.toLocaleString()}
            </motion.span>{" "}
            purchases
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            That's {avg_day} purchases every day!
          </motion.p>

          {/* Counter */}
          <motion.div
            className="flex justify-center my-4 bg-white/5 rounded-lg p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.div
              className="text-5xl font-mono font-bold text-cyan-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {nr_purchases
                .toString()
                .split("")
                .map((char, index) => (
                  <span key={index}>{char === "," ? "," : char}</span>
                ))}
            </motion.div>
          </motion.div>

          {/* Breakdown */}
          <motion.div
            className="mt-6 pt-6 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-sm text-gray-400 text-center">
              Your purchase breakdown:
            </p>
            <div className="flex justify-between mt-3">
              <div className="text-center">
                <div className="text-2xl mb-1">🛒</div>
                <p className="text-xs">Groceries</p>
                <p className="text-cyan-400 text-sm font-medium">312</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">☕</div>
                <p className="text-xs">Coffee</p>
                <p className="text-cyan-400 text-sm font-medium">48</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🍽️</div>
                <p className="text-xs">Dining</p>
                <p className="text-cyan-400 text-sm font-medium">162</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="w-full text-center pb-8 text-xs text-gray-500 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      ></motion.div>
    </div>
  );
}
