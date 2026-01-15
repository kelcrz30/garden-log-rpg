import React from 'react';

export default function AddQuestModal({ isOpen, onClose, onAdd }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const rarity = formData.get('rarity');
    
    // Logic to determine XP based on rarity
    const xpTable = { common: 10, rare: 50, epic: 100, legendary: 500 };

    const newQuest = {
      id: Date.now(),
      title: formData.get('title'),
      xp: xpTable[rarity],
      rarity: rarity,
    };

    onAdd(newQuest);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border-2 border-yellow-500 p-8 rounded-xl max-w-md w-full shadow-[0_0_30px_rgba(234,179,8,0.3)]">
        <h2 className="text-2xl font-black mb-6 text-yellow-500 italic uppercase">Post a New Notice</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-2 uppercase tracking-widest text-slate-400">Quest Objective</label>
            <input name="title" required className="w-full bg-slate-800 border border-slate-700 p-3 rounded focus:border-yellow-500 outline-none text-white" placeholder="Slay the JavaScript Dragon..." />
          </div>

          <div>
            <label className="block text-xs font-bold mb-2 uppercase tracking-widest text-slate-400">Rarity</label>
            <select name="rarity" className="w-full bg-slate-800 border border-slate-700 p-3 rounded focus:border-yellow-500 outline-none text-white">
              <option value="common">Common</option>
              <option value="rare">Rare</option>
              <option value="epic">Epic</option>
              <option value="legendary">Legendary</option>
            </select>
          </div>

          <div className="flex gap-3 mt-8">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 text-slate-400 font-bold hover:text-white transition-colors">CANCEL</button>
            <button type="submit" className="flex-1 bg-yellow-500 text-black font-black py-3 rounded hover:bg-yellow-400 transition-transform active:scale-95">POST QUEST</button>
          </div>
        </form>
      </div>
    </div>
  );
}