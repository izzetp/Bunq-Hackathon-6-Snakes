"use client";

import { motion } from "framer-motion";
import { FloatingCircles, ScatteredEmojis } from "@/lib/slides";
import { organizeReportData, useReportData } from "@/hook/reportService";
import { useEffect, useState } from "react";

export default function Slide1() {
  const { reportData, loading, error } = useReportData();
  const [amount, setAmount] = useState<number | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    if (reportData) {
      const organized = organizeReportData(reportData);

      // Get the first date-amount pair from the organized data
      if (organized.dateAmounts.length > 0) {
        setAmount(organized.dateAmounts[0].amount);
        setDate(organized.dateAmounts[0].date);
      }
    }
  }, [reportData]);

  const nightEmojis = [
    {
      emoji: "🍸",
      position: "top-[20%] left-[15%]",
      delay: 0.3,
      animation: { y: [0, -10, 0], rotate: [0, 10, 0] },
    },
    {
      emoji: "🍹",
      position: "top-[30%] right-[20%]",
      delay: 0.5,
      animation: { y: [0, -8, 0], rotate: [0, -5, 0] },
    },
    {
      emoji: "🥂",
      position: "bottom-[25%] left-[25%]",
      delay: 0.7,
      animation: { y: [0, -12, 0], rotate: [0, 8, 0] },
    },
    {
      emoji: "🍻",
      position: "bottom-[35%] right-[15%]",
      delay: 0.9,
      animation: { y: [0, -15, 0], rotate: [0, -10, 0] },
    },
    {
      emoji: "🎵",
      position: "top-[50%] right-[10%]",
      delay: 1.1,
      animation: { y: [0, -10, 0], rotate: [0, 15, 0] },
    },
    {
      emoji: "💃",
      position: "bottom-[15%] right-[30%]",
      delay: 1.3,
      animation: { y: [0, -8, 0], rotate: [0, -8, 0] },
    },
  ];

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-purple-500 border-white/20 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
          <p className="text-gray-300">{error}</p>
          <p className="text-sm text-gray-400 mt-4">
            Please check if your FastAPI server is running at
            http://127.0.0.1:8000/report
          </p>
        </div>
      </div>
    );
  }

  // No data state
  if (!amount || !date) {
    return (
      <div className="w-full h-full flex items-center justify-center text-white">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-2xl font-bold mb-2">No Data Available</h2>
          <p className="text-gray-300">
            No date or amount information found in the report data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start text-white px-6 relative overflow-hidden">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/40 to-black z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Floating Circles with color props */}
      <div className="absolute inset-0 z-0">
        <FloatingCircles colors={["purple", "violet", "fuchsia", "pink"]} />
      </div>

      <ScatteredEmojis emojis={nightEmojis} />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-md mx-auto">
        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-center">
            Most Expensive Night Out
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 mt-2 rounded-full"></div>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="text-3xl">🎉</span>
            </motion.div>
          </div>

          <motion.h2
            className="text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.span
              className="text-purple-400 inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            >
              €{amount.toFixed(0)}
            </motion.span>{" "}
            in 8 hours
          </motion.h2>

          <motion.p
            className="text-xl text-gray-300 text-center mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            On {date}
          </motion.p>

          <motion.p
            className="text-lg text-gray-400 text-center italic mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            We won't ask why, but you know why...
          </motion.p>

          <motion.div
            className="flex justify-center my-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          >
            <motion.div
              className="relative flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="text-5xl">🕒</div>
              <motion.div
                className="absolute top-0 left-1/2 h-[40%] w-1 bg-purple-500 origin-bottom rounded-t-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "bottom center" }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-6 pt-6 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <p className="text-sm text-gray-400 text-center">
              The damage breakdown:
            </p>
            <div className="flex justify-between mt-3">
              {[
                {
                  icon: "🍸",
                  label: "Cocktails",
                  amount: `€${Math.round(amount * 0.5)}`,
                },
                {
                  icon: "🍔",
                  label: "Late Night Food",
                  amount: `€${Math.round(amount * 0.25)}`,
                },
                {
                  icon: "🚕",
                  label: "Taxi",
                  amount: `€${Math.round(amount * 0.25)}`,
                },
              ].map((item, i) => (
                <div className="text-center" key={i}>
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <p className="text-xs">{item.label}</p>
                  <p className="text-purple-400 text-sm font-medium">
                    {item.amount}
                  </p>
                </div>
              ))}
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
