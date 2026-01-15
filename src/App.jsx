import { useState, useEffect } from 'react'
import GardenStage from './components/GardenStage'


function App() {
  // --- CORE STATE ---
  const [totalSteps, setTotalSteps] = useState(() => {
    const saved = localStorage.getItem('totalSteps');
    return saved ? parseInt(saved) : 0;
  });
  
  const [sessionSteps, setSessionSteps] = useState('');
  const [level, setLevel] = useState(1);
  const [isWatering, setIsWatering] = useState(false);

  // --- PERSISTENCE: Save progress automatically ---
  useEffect(() => {
    localStorage.setItem('totalSteps', totalSteps);
    // Calculate level based on steps (Level up every 10k steps)
    const currentLevel = Math.floor(totalSteps / 10000) + 1;
    setLevel(currentLevel);
  }, [totalSteps]);

  // --- LOGIC: Syncing Steps ---
  const handleSync = (e) => {
    e.preventDefault();
    const steps = parseInt(sessionSteps);
    if (isNaN(steps) || steps <= 0) return;

    setIsWatering(true); // Trigger animation
    
    // Add steps to total
    setTotalSteps(prev => prev + steps);
    setSessionSteps('');

    // Stop animation after 2 seconds
    setTimeout(() => setIsWatering(false), 2000);
  };

  // Progress to next level (0-100%)
  const levelProgress = (totalSteps % 10000) / 100;

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-800 font-sans pb-20">
      {/* HEADER: Progress Bar */}
      <header className="max-w-md mx-auto p-6 sticky top-0 z-50 bg-[#f0f9ff]/80 backdrop-blur-md">
        <div className="flex justify-between items-end mb-2">
          <h1 className="text-2xl font-black text-emerald-700 tracking-tighter">GARDEN LOG</h1>
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">LVL {level}</span>
        </div>
        <div className="h-4 w-full bg-emerald-100 rounded-full overflow-hidden border border-emerald-200">
          <div 
            className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
            style={{ width: `${levelProgress}%` }}
          />
        </div>
        <p className="text-[10px] text-emerald-600 mt-1 font-bold uppercase tracking-widest text-right">
          {totalSteps % 10000} / 10000 steps to next expansion
        </p>
      </header>

      <main className="max-w-md mx-auto px-6 space-y-8">
        
        {/* THE GARDEN STAGE */}
        <section className="rounded-3xl shadow-xl shadow-emerald-200/50 overflow-hidden border-4 border-white">
          <GardenStage currentSteps={totalSteps} isWatering={isWatering} />
        </section>

        {/* STATS CARD */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50">
            <p className="text-xs text-slate-400 font-bold uppercase">Lifetime Steps</p>
            <p className="text-2xl font-black text-emerald-600">{totalSteps.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50">
            <p className="text-xs text-slate-400 font-bold uppercase">Trees Grown</p>
            <p className="text-2xl font-black text-emerald-600">{level - 1}</p>
          </div>
        </div>

        {/* INPUT SECTION */}
        <form onSubmit={handleSync} className="bg-white p-6 rounded-3xl shadow-lg border border-emerald-50 space-y-4">
          <h3 className="text-center font-bold text-slate-500 text-sm">Sync Your Movement</h3>
          <input 
            type="number"
            value={sessionSteps}
            onChange={(e) => setSessionSteps(e.target.value)}
            placeholder="0000"
            className="w-full text-center text-4xl font-black p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-400 outline-none transition-all text-emerald-600"
          />
          <button 
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95"
          >
            WATER MY TREE 💧
          </button>
        </form>

      </main>
    </div>
  );
}

export default App;