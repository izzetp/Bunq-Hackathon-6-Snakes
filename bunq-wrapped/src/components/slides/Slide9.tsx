"use client";
import { motion } from "framer-motion";
import { FloatingCircles, ScatteredEmojis } from "@/lib/slides";
import { useReportData } from "@/hook/reportService";

export default function Slide9() {
  const { organizedData } = useReportData();

  // Get the first description or use default if none exists
  const description =
    organizedData.descriptions[0]?.desc ||
    "A saga of lattes, regrets, and a suspicious number of IKEA visits.";

  const yearEmojis = [
    {
      emoji: "☕",
      position: "top-[20%] left-[15%]",
      delay: 0.3,
      animation: { y: [0, -10, 0], rotate: [0, 10, 0] },
    },
    {
      emoji: "😅",
      position: "top-[30%] right-[20%]",
      delay: 0.5,
      animation: { y: [0, -8, 0], rotate: [0, -5, 0] },
    },
    {
      emoji: "🛋️",
      position: "bottom-[25%] left-[25%]",
      delay: 0.7,
      animation: { y: [0, -12, 0], rotate: [0, 8, 0] },
    },
    {
      emoji: "🛒",
      position: "bottom-[35%] right-[15%]",
      delay: 0.9,
      animation: { y: [0, -15, 0], rotate: [0, -10, 0] },
    },
    {
      emoji: "💸",
      position: "top-[50%] right-[10%]",
      delay: 1.1,
      animation: { y: [0, -10, 0], rotate: [0, 15, 0] },
    },
    {
      emoji: "🏠",
      position: "bottom-[15%] right-[30%]",
      delay: 1.3,
      animation: { y: [0, -8, 0], rotate: [0, -8, 0] },
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white px-6 relative overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/40 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <FloatingCircles colors={["indigo", "violet", "purple", "blue"]} />
      <ScatteredEmojis emojis={yearEmojis} />

      {/* Centered Header */}
      <motion.div
        className="absolute top-[12%] text-center z-10 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">Your Year in One Line</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-violet-500 mt-2 rounded-full mx-auto"></div>
      </motion.div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center relative z-10 w-full max-w-md mx-auto">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-3xl">📝</span>
            </motion.div>
          </div>

          <motion.div
            className="relative py-6 px-4 bg-white/5 rounded-lg border border-white/10 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.p
              className="text-xl text-center italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              "{description}"
            </motion.p>
            <motion.div
              className="absolute -top-2 -left-2 w-4 h-4 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              "
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -right-2 w-4 h-4 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
            >
              "
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center gap-4 my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {["☕", "😅", "🛋️"].map((emoji, i) => (
              <motion.div
                key={i}
                className="text-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.4 + i * 0.2,
                  duration: 0.5,
                  type: "spring",
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-6 pt-6 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <p className="text-sm text-gray-400 text-center">
              Your year by the numbers:
            </p>
            <div className="flex justify-between mt-3">
              <div className="text-center">
                <div className="text-2xl mb-1">☕</div>
                <p className="text-xs">Lattes</p>
                <p className="text-indigo-400 text-sm font-medium">248</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">🛋️</div>
                <p className="text-xs">IKEA Visits</p>
                <p className="text-indigo-400 text-sm font-medium">17</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-1">😅</div>
                <p className="text-xs">Regrets</p>
                <p className="text-indigo-400 text-sm font-medium">Too many</p>
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
