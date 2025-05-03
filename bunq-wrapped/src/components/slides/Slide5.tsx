"use client";

import { motion } from "framer-motion";
import { FloatingCircles, ScatteredEmojis } from "@/lib/slides";
import { useReportData } from "@/hook/reportService"; // Import the hook

export default function Slide5() {
  // Fetch the data using the custom hook
  const { organizedData, loading, error } = useReportData();

  // Handle loading and error states
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

  // Extract the song list from the fetched report data
  const playlist =
    organizedData.songLists.length > 0 ? organizedData.songLists[0].songs : [];

  const musicEmojis = [
    {
      emoji: "🎵",
      position: "top-[20%] left-[15%]",
      delay: 0.3,
      animation: { y: [0, -10, 0], rotate: [0, 10, 0] },
    },
    {
      emoji: "🎧",
      position: "top-[30%] right-[20%]",
      delay: 0.5,
      animation: { y: [0, -8, 0], rotate: [0, -5, 0] },
    },
    {
      emoji: "🎸",
      position: "bottom-[25%] left-[25%]",
      delay: 0.7,
      animation: { y: [0, -12, 0], rotate: [0, 8, 0] },
    },
    {
      emoji: "🎹",
      position: "bottom-[35%] right-[15%]",
      delay: 0.9,
      animation: { y: [0, -15, 0], rotate: [0, -10, 0] },
    },
    {
      emoji: "🎷",
      position: "top-[50%] right-[10%]",
      delay: 1.1,
      animation: { y: [0, -10, 0], rotate: [0, 15, 0] },
    },
    {
      emoji: "🎼",
      position: "bottom-[15%] right-[30%]",
      delay: 1.3,
      animation: { y: [0, -8, 0], rotate: [0, -8, 0] },
    },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white px-6 relative overflow-hidden">
      {/* Background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black via-fuchsia-950/40 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <FloatingCircles colors={["fuchsia", "pink", "purple", "violet"]} />
      <ScatteredEmojis emojis={musicEmojis} />

      {/* Absolute center header above the card */}
      <motion.div
        className="absolute top-20 text-center z-10"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-white">
          If Your Spending Was a Playlist
        </h1>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-fuchsia-500 to-pink-500 mt-2 rounded-full"></div>
      </motion.div>

      {/* Card section */}
      <div className="flex flex-col items-center justify-center relative z-10 w-full max-w-md mx-auto mt-32">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              className="w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <span className="text-3xl">🎵</span>
            </motion.div>
          </div>

          <motion.h2
            className="text-2xl font-bold mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Your 2024 Money Mixtape
          </motion.h2>

          {/* Playlist tracks */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {playlist.map((track, i) => (
              <motion.div
                key={i}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.4 }}
              >
                <div className="flex items-center">
                  <div className="w-6 text-fuchsia-400 mr-3">{i + 1}</div>
                  <div>
                    <p className="font-medium">{track}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-6 pt-6 border-t border-white/20 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          ></motion.div>
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
