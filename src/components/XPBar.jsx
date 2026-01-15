// src/components/XPBar.jsx
export default function XPBar({ currentXp, requiredXp, level }) {
  const progress = (currentXp / requiredXp) * 100;

  return (
    <div className="w-full bg-slate-800 p-6 rounded-b-2xl border-b-4 border-slate-950">
      <div className="flex justify-between mb-2 items-end">
        <span className="text-2xl font-black italic text-white">LVL {level}</span>
        <span className="text-sm text-slate-400">{currentXp} / {requiredXp} XP</span>
      </div>
      
      {/* The Track */}
      <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden border border-white/10">
        {/* The Fill */}
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 transition-all duration-500 ease-out shadow-[0_0_10px_#22d3ee]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}