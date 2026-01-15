export default function GardenStage({ currentSteps, isWatering }) {
  const progressInLevel = (currentSteps % 10000) / 10000;
  const treeScale = 0.6 + (progressInLevel * 0.9);
  
  return (
    <div className="relative h-72 w-full bg-gradient-to-b from-sky-100 to-emerald-50 flex items-center justify-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 w-full h-16 bg-emerald-200/50" />
      <div className="absolute bottom-4 flex gap-12 opacity-20 text-2xl">
        <span>🌱</span><span>🌱</span><span>🌱</span><span>🌱</span>
      </div>
      
      {/* The Tree */}
      <div 
        className={`text-[120px] transition-all duration-1000 ease-out transform z-10 ${isWatering ? 'animate-bounce' : ''}`}
        style={{ transform: `scale(${treeScale})` }}
      >
        {progressInLevel < 0.2 ? '🌱' : progressInLevel < 0.6 ? '🌿' : '🌳'}
      </div>

      {/* Water Drops */}
      {isWatering && (
        <div className="absolute inset-0 flex justify-center pointer-events-none">
          <div className="text-4xl animate-[ping_1s_infinite] mt-10">💧</div>
          <div className="text-4xl animate-[ping_1.2s_infinite] mt-20 ml-10">💧</div>
          <div className="text-4xl animate-[ping_0.8s_infinite] mt-12 mr-10">💧</div>
        </div>
      )}

      {/* Progress Label */}
      <div className="absolute bottom-4 right-4 bg-white/50 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-emerald-700">
        GROWTH: {Math.round(progressInLevel * 100)}%
      </div>
    </div>
  );
}