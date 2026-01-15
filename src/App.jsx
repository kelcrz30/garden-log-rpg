import { useState, useEffect } from 'react'
import GardenStage from './components/GardenStage'

function App() {
  // --- PWA & IOS STATE ---
  const [showIosModal, setShowIosModal] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if the app is already "installed" and running as an app
    if (window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true);
    }
  }, []);

  // --- GARDEN LOGIC STATE ---
  const [totalSteps, setTotalSteps] = useState(() => {
    const saved = localStorage.getItem('totalSteps');
    return saved ? parseInt(saved) : 0;
  });
  const [sessionSteps, setSessionSteps] = useState('');
  const [level, setLevel] = useState(1);
  const [isWatering, setIsWatering] = useState(false);

  useEffect(() => {
    localStorage.setItem('totalSteps', totalSteps);
    const currentLevel = Math.floor(totalSteps / 10000) + 1;
    setLevel(currentLevel);
  }, [totalSteps]);

  const handleSync = (e) => {
    e.preventDefault();
    const steps = parseInt(sessionSteps);
    if (isNaN(steps) || steps <= 0) return;
    setIsWatering(true);
    setTotalSteps(prev => prev + steps);
    setSessionSteps('');
    setTimeout(() => setIsWatering(false), 2000);
  };

  const levelProgress = (totalSteps % 10000) / 100;

  return (
    <div className="min-h-screen bg-[#f0f9ff] text-slate-800 font-sans pb-24">
      {/* HEADER */}
      <header className="max-w-md mx-auto p-6 sticky top-0 z-40 bg-[#f0f9ff]/80 backdrop-blur-md">
        <div className="flex justify-between items-end mb-2">
          <h1 className="text-2xl font-black text-emerald-700 tracking-tighter">GARDEN LOG</h1>
          <div className="flex flex-col items-end">
            {!isStandalone && (
              <button 
                onClick={() => setShowIosModal(true)}
                className="text-[10px] bg-slate-900 text-white px-2 py-1 rounded mb-2 font-bold animate-pulse"
              >
                INSTALL APP 📲
              </button>
            )}
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">LVL {level}</span>
          </div>
        </div>
        <div className="h-4 w-full bg-emerald-100 rounded-full overflow-hidden border border-emerald-200">
          <div className="h-full bg-emerald-500 transition-all duration-1000 ease-out" style={{ width: `${levelProgress}%` }} />
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 space-y-8">
        {/* STAGE */}
        <section className="rounded-3xl shadow-xl shadow-emerald-200/50 overflow-hidden border-4 border-white bg-white">
          <GardenStage currentSteps={totalSteps} isWatering={isWatering} />
        </section>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Lifetime Steps</p>
            <p className="text-2xl font-black text-emerald-600">{totalSteps.toLocaleString()}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">Trees Grown</p>
            <p className="text-2xl font-black text-emerald-600">{level - 1}</p>
          </div>
        </div>

        {/* INPUT */}
        <form onSubmit={handleSync} className="bg-white p-6 rounded-3xl shadow-lg border border-emerald-50 space-y-4">
          <h3 className="text-center font-bold text-slate-500 text-sm italic">"Every step feeds the forest"</h3>
          <input 
            type="number"
            inputMode="numeric"
            value={sessionSteps}
            onChange={(e) => setSessionSteps(e.target.value)}
            placeholder="Steps walked..."
            className="w-full text-center text-4xl font-black p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-emerald-400 outline-none transition-all text-emerald-600"
          />
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 rounded-2xl shadow-lg active:scale-95 transition-transform">
            WATER MY TREE 💧
          </button>
        </form>
      </main>

      {/* iOS INSTALL INSTRUCTION MODAL */}
      {showIosModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-10 bg-black/40 backdrop-blur-sm" onClick={() => setShowIosModal(false)}>
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative animate-in fade-in slide-in-from-bottom-10" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowIosModal(false)} className="absolute top-4 right-4 text-slate-400 text-xl font-bold">×</button>
            <h2 className="text-xl font-black text-slate-800 mb-2">Install Garden Log</h2>
            <p className="text-slate-600 mb-6">Install this app on your iPhone for full screen mode and easy access.</p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                <p className="text-sm font-medium">Tap the <span className="bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded inline-flex items-center">Share icon 📤</span> below</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                <p className="text-sm font-medium">Select <span className="font-bold">"Add to Home Screen"</span></p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex justify-center">
               <div className="animate-bounce text-2xl">👇</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;