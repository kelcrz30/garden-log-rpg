// src/components/QuestCard.jsx
import React from 'react';

const RARITY_STYLES = {
  common: "border-slate-400 text-slate-300 shadow-sm",
  rare: "border-blue-500 text-blue-100 shadow-[0_0_10px_rgba(59,130,246,0.5)]",
  epic: "border-purple-500 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.6)]",
  legendary: "border-orange-500 text-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.8)] animate-pulse",
};

export default function QuestCard({ quest, onComplete }) {
  return (
    <div className={`p-4 mb-4 border-2 rounded-lg bg-slate-900 transition-all hover:scale-[1.02] ${RARITY_STYLES[quest.rarity]}`}>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest opacity-70">
            {quest.rarity} Quest
          </span>
          <h3 className="text-xl font-bold font-serif">{quest.title}</h3>
          <p className="text-sm opacity-80 mt-1 italic text-slate-400">
            Reward: {quest.xp} XP
          </p>
        </div>
        
        <button 
          onClick={() => onComplete(quest.id, quest.xp)}
          className="bg-slate-800 hover:bg-white hover:text-black border border-white/20 px-4 py-2 rounded font-bold transition-colors"
        >
          COMPLETE
        </button>
      </div>
    </div>
  );
}