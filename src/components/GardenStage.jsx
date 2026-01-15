// src/components/GardenStage.jsx
import { motion, AnimatePresence } from 'framer-motion';

export default function GardenStage({ currentSteps, isWatering }) {
  // Logic to determine tree size
  const getTreeData = () => {
    if (currentSteps < 2000) return { img: "🌱", label: "Seedling", size: "text-6xl" };
    if (currentSteps < 5000) return { img: "🌿", label: "Sprout", size: "text-7xl" };
    if (currentSteps < 15000) return { img: "🌳", label: "Young Tree", size: "text-8xl" };
    if (currentSteps < 50000) return { img: "🌲", label: "Mature Oak", size: "text-[120px]" };
    return { img: "🍄🌲🌿", label: "Ancient Forest", size: "text-[120px]" };
  };

  const stage = getTreeData();

  return (
    <div className="relative h-80 w-full bg-gradient-to-b from-sky-300 to-emerald-400 flex flex-col items-center justify-center pt-10">
      
      {/* CLOUDS */}
      <motion.div 
        animate={{ x: [-20, 20, -20] }} 
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-10 left-10 text-white opacity-40 text-4xl"
      >
        ☁️
      </motion.div>

      {/* WATERING EFFECT */}
      <AnimatePresence>
        {isWatering && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 text-4xl z-20"
          >
            💧 💧 💧
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE TREE */}
      <motion.div
        key={stage.label}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: isWatering ? [1, 1.1, 1] : 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`${stage.size} z-10 drop-shadow-2xl cursor-default`}
      >
        {stage.img}
      </motion.div>

      {/* THE GROUND */}
      <div className="absolute bottom-0 w-full h-16 bg-[#5d4037] border-t-8 border-[#8d6e63]" />
      
      {/* STAGE LABEL */}
      <div className="absolute bottom-4 z-20 bg-white/30 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-tighter">
        Stage: {stage.label}
      </div>
    </div>
  );
}