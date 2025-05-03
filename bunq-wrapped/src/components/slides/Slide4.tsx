"use client";

import { motion } from "framer-motion";
import { FloatingCircles, ScatteredEmojis } from "@/lib/slides";
import { useReportData } from "@/hook/reportService"; // Update the path if necessary

export default function Slide4() {
  // Use the report data hook
  const { organizedData, loading, error } = useReportData();

  // Find the most painful single expense (expense with the highest amount)
  const mostPainfulExpense =
    !loading && organizedData.expenses.length > 0
      ? organizedData.expenses.reduce((prev, current) =>
          prev.amount > current.amount ? prev : current
        )
      : { amount: 0, expense: "Loading...", date: "" };

  // Emojis for the theme of pain
  const painEmojis = [
    {
      emoji: "😱",
      position: "top-[20%] left-[15%]",
      delay: 0.3,
      animation: { y: [0, -10, 0], rotate: [0, 10, 0] },
    },
    {
      emoji: "💸",
      position: "top-[30%] right-[20%]",
      delay: 0.5,
      animation: { y: [0, -8, 0], rotate: [0, -5, 0] },
    },
    {
      emoji: "😭",
      position: "bottom-[25%] left-[25%]",
      delay: 0.7,
      animation: { y: [0, -12, 0], rotate: [0, 8, 0] },
    },
    {
      emoji: "💔",
      position: "bottom-[35%] right-[15%]",
      delay: 0.9,
      animation: { y: [0, -15, 0], rotate: [0, -10, 0] },
    },
    {
      emoji: "🤕",
      position: "top-[50%] right-[10%]",
      delay: 1.1,
      animation: { y: [0, -10, 0], rotate: [0, 15, 0] },
    },
    {
      emoji: "💀",
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
        className="absolute inset-0 bg-gradient-to-b from-black via-red-950/40 to-black z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Floating circles */}
      <div className="absolute inset-0 z-0">
        <FloatingCircles colors={["red", "rose", "orange", "amber"]} />
      </div>

      <ScatteredEmojis emojis={painEmojis} />

      {/* Header */}
      <motion.div
        className="text-center mb-8 z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">Most Painful Single Expense</h1>
        <div className="h-1 w-20 mx-auto bg-gradient-to-r from-red-500 to-rose-500 mt-2 rounded-full" />
      </motion.div>

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col items-center justify-center">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="text-3xl">💔</span>
            </motion.div>
          </div>

          <motion.h2
            className="text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.span
              className="text-red-400 relative inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            >
              €
              {mostPainfulExpense.amount.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </motion.span>{" "}
            for {mostPainfulExpense.expense}
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 text-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            On {new Date(mostPainfulExpense.date).toLocaleDateString()}
          </motion.p>

          <motion.p
            className="text-2xl font-bold text-red-400 text-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: [0.9, 1.1, 1],
              rotate: [-2, 2, 0],
            }}
            transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
          >
            Emotional Damage.
          </motion.p>

          <motion.div
            className="flex justify-center my-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <motion.div
              className="text-6xl"
              animate={{
                scale: [1, 1.2, 0.9, 1],
                rotate: [-5, 5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            >
              🤕
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-6 pt-6 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-sm text-gray-400 text-center">The aftermath:</p>
            <div className="flex justify-between mt-3">
              <div className="text-center">
                <div className="text-2xl mb-1">😭</div>
                <p className="text-xs">Tears Shed</p>
                <p className="text-red-400 text-sm font-medium">Many</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🍜</div>
                <p className="text-xs">Ramen Dinners</p>
                <p className="text-red-400 text-sm font-medium">14 days</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">📉</div>
                <p className="text-xs">Account Balance</p>
                <p className="text-red-400 text-sm font-medium">Critical</p>
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
