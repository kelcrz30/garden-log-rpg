// src/components/MissionCard.jsx
export default function MissionCard({ mission, currentSteps }) {
  const progress = (currentSteps / mission.targetSteps) * 100;

  return (
    <div className="p-4 border-2 border-slate-700 bg-slate-900 rounded-xl">
      <div className="flex justify-between mb-2 text-sm font-bold uppercase tracking-tighter">
        <span>{mission.title}</span>
        <span className="text-yellow-500">{currentSteps} / {mission.targetSteps} Steps</span>
      </div>
      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-yellow-500 transition-all duration-700"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}