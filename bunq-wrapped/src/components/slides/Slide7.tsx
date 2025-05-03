"use client";

import { motion } from "framer-motion";
import { FloatingCircles } from "@/lib/slides";
import { useReportData } from "@/hook/reportService";

export default function Slide7() {
  const { organizedData } = useReportData();

  // Get the first place or use defaults if not available
  const placeName = organizedData.places[0]?.place || "Supermarket";
  const visits = organizedData.places[0]?.nr_visits || 127;
  const amount = organizedData.places[0]?.amount || 3840;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white px-6 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/40 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <FloatingCircles colors={["blue", "indigo", "sky", "slate"]} />

      {/* Centered Header */}
      <motion.div
        className="absolute top-20 text-center z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">Your Favorite Place</h1>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 mt-2 rounded-full" />
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
              className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="text-3xl">📍</span>
            </motion.div>
          </div>

          <motion.h2
            className="text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.span
              className="text-blue-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
            >
              {placeName}
            </motion.span>
          </motion.h2>

          <motion.div
            className="flex justify-between mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl mb-2">🛒</div>
              <p className="text-sm text-gray-300">Visits</p>
              <p className="text-3xl font-bold text-blue-400">{visits}</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <p className="text-sm text-gray-300">Total Spent</p>
              <p className="text-3xl font-bold text-blue-400">
                ${amount.toLocaleString()}
              </p>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <p className="text-sm text-gray-400 text-center mb-4">
              Your spending habits at {placeName}:
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Groceries</span>
                  <span className="text-sm text-blue-400">42%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: "42%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Snacks</span>
                  <span className="text-sm text-blue-400">35%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: "35%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Household</span>
                  <span className="text-sm text-blue-400">23%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: "23%" }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
