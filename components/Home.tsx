
import React, { useState } from 'react';
import { Book, BookStatus, UserProfile } from '../types';

interface HomeProps {
  books: Book[];
  profile: UserProfile;
  updateProfile: (p: UserProfile) => void;
}

const Home: React.FC<HomeProps> = ({ books, profile, updateProfile }) => {
  const [isKittenModalOpen, setIsKittenModalOpen] = useState(false);
  const [tempKittenName, setTempKittenName] = useState(profile.kittenName);

  const recentBooks = [...books]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 7);

  const completedCount = books.filter(b => b.status === BookStatus.COMPLETED).length;
  
  // Level Logic
  let currentLevel = 1;
  let catEmoji = '🐾';
  let stageLabel = '아기 고양이';

  if (completedCount >= 10) {
    currentLevel = 3 + Math.floor((completedCount - 10) / 10);
    catEmoji = '🐈';
    stageLabel = '어른 고양이';
  } else if (completedCount >= 5) {
    currentLevel = 2;
    catEmoji = '🐱';
    stageLabel = '청소년 고양이';
  }

  // Toy Collection (Lv 4+)
  const allToys = ['🐟', '🐠', '🥣', '🧶', '🐭', '🎾', '🧸', '🔔'];
  const unlockedToysCount = Math.min(allToys.length, Math.max(0, currentLevel - 3));
  const myToys = allToys.slice(0, unlockedToysCount);

  // Next Goal Calculation
  let nextGoal = 5;
  if (completedCount >= 10) {
    nextGoal = 10 + (currentLevel - 2) * 10;
  } else if (completedCount >= 5) {
    nextGoal = 10;
  }
  const remaining = Math.max(0, nextGoal - completedCount);

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden">
      {/* Lowered header for iPhone notch */}
      <header className="px-8 pt-24 pb-12 shrink-0">
        <h1 className="text-3xl font-black text-achromatic-800 tracking-tight">
          {profile.id}님의 서재
        </h1>
        <p className="text-[10px] font-bold text-achromatic-300 uppercase tracking-[0.2em] mt-2 italic">with cat</p>
      </header>

      {/* Kitten Box with e5dade (lavender) shading */}
      <div className="px-8 mb-12 shrink-0">
        <div 
          onClick={() => setIsKittenModalOpen(true)}
          className="bg-lavender p-7 rounded-[2.5rem] border border-lavender relative overflow-hidden group shadow-sm active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl shadow-sm border border-lavender/20 transition-transform group-hover:scale-110">
                {catEmoji}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="text-base font-black text-achromatic-800 tracking-tight">
                    {profile.kittenName}
                  </p>
                  <div className="flex space-x-0.5">
                    {myToys.map((toy, i) => (
                      <span key={i} className="text-sm animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}>{toy}</span>
                    ))}
                  </div>
                </div>
                <div className="w-36 h-1.5 bg-white/60 rounded-full mt-2.5 overflow-hidden">
                  <div 
                    className="h-full bg-mint transition-all duration-1000" 
                    style={{ width: `${Math.min(((completedCount - (nextGoal - (currentLevel === 1 ? 5 : 10))) / (currentLevel === 1 ? 5 : 10)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-black text-mint block">LV.{currentLevel}</span>
              <span className="text-[10px] text-achromatic-400 font-bold uppercase tracking-widest">{stageLabel}</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 text-8xl opacity-[0.08] transform -rotate-12 pointer-events-none text-achromatic-800">🐾</div>
        </div>
      </div>

      {/* Simplified Straight-Line Bookshelf Visualization */}
      <div className="flex-1 flex flex-col px-8 mb-8 overflow-hidden">
        <div className="flex-1 flex flex-col justify-end">
          <div className="flex justify-between items-center mb-6 px-2">
            <h3 className="text-[10px] font-bold text-achromatic-300 uppercase tracking-widest italic">RECENT ARCHIVE</h3>
            <div className="flex-1 ml-4 h-[1px] bg-achromatic-100"></div>
          </div>

          <div className="relative">
             {/* The actual books */}
             <div className="flex items-end justify-center gap-1.5 px-2 relative z-10">
                {recentBooks.map((book) => (
                  <div 
                    key={book.id}
                    className="w-12 h-48 bg-white shadow-md border-l border-white/40 relative overflow-hidden flex flex-col items-center group transition-transform hover:translate-y-[-8px] cursor-pointer origin-bottom"
                    style={{
                       backgroundColor: book.spineUrl ? 'transparent' : `hsl(${(book.title.length * 50) % 360}, 15%, 96%)`
                    }}
                  >
                    {book.spineUrl ? (
                      <img src={book.spineUrl} className="w-full h-full object-cover" alt={book.title} />
                    ) : (
                      <div className="w-full h-full p-2 flex flex-col items-center justify-center">
                        <span className="text-[8px] font-bold text-achromatic-400 writing-vertical tracking-tighter leading-none text-center h-36 overflow-hidden">
                          {book.title}
                        </span>
                      </div>
                    )}
                    <div className="absolute top-0 bottom-0 left-0 w-[1.5px] bg-black/5"></div>
                  </div>
                ))}
                
                {recentBooks.length === 0 && (
                  <div className="h-48 w-full flex flex-col items-center justify-center text-achromatic-200 text-xs italic opacity-40">
                    <span className="text-[9px] uppercase tracking-[0.4em]">Shelf Empty</span>
                  </div>
                )}
             </div>

             {/* Minimalist Straight Line Shelf */}
             <div className="h-[2px] bg-achromatic-300 w-full relative z-0 mt-[-1px]"></div>
          </div>

          <div className="mt-8 mb-4 px-2">
             <div className="flex justify-between items-center text-[10px] text-achromatic-400 font-bold tracking-widest">
               <span className="bg-achromatic-50 px-4 py-1.5 rounded-full border border-achromatic-100">ARCHIVE: {books.length}</span>
               <div className="flex items-center space-x-2">
                 <span className="w-1.5 h-1.5 bg-mint rounded-full animate-pulse"></span>
                 <span className="text-mint font-black">나의 서재</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="pb-20 flex items-center justify-center space-x-2 shrink-0">
         <span className="text-[10px] font-black text-achromatic-200 tracking-[0.4em] uppercase">Private Archive</span>
      </div>

      {/* Kitten Modal */}
      {isKittenModalOpen && (
        <div className="fixed inset-0 bg-achromatic-900/30 backdrop-blur-sm z-[200] flex items-end justify-center">
          <div className="bg-white w-full rounded-t-[3.5rem] p-10 pb-16 shadow-2xl transition-all animate-slide-up max-w-md">
            <div className="w-12 h-1.5 bg-achromatic-100 rounded-full mx-auto mb-10"></div>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-lavender rounded-full flex items-center justify-center text-6xl mb-8 border border-lavender shadow-inner">
                {catEmoji}
              </div>
              <p className="text-xs font-black text-mint uppercase tracking-widest mb-2">{stageLabel} LV.{currentLevel}</p>
              <h2 className="text-3xl font-black text-achromatic-800 mb-8">{profile.kittenName}</h2>
              
              <div className="w-full bg-achromatic-50 rounded-[2.5rem] p-8 mb-10 text-left border border-achromatic-100 shadow-sm">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-[11px] font-black text-achromatic-400 uppercase tracking-widest">Growth Progress</span>
                    <span className="text-[11px] font-black text-mint">{completedCount} / {nextGoal}</span>
                 </div>
                 <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-achromatic-100">
                    <div 
                      className="h-full bg-mint transition-all" 
                      style={{ width: `${Math.min(((completedCount - (nextGoal - (currentLevel === 1 ? 5 : 10))) / (currentLevel === 1 ? 5 : 10)) * 100, 100)}%` }}
                    />
                 </div>
              </div>

              {unlockedToysCount > 0 && (
                <div className="w-full mb-10">
                  <p className="text-[11px] font-black text-achromatic-400 uppercase tracking-widest text-left ml-4 mb-4">Toy Box</p>
                  <div className="flex flex-wrap gap-4 px-2">
                    {allToys.map((toy, i) => (
                      <div key={i} className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all ${i < unlockedToysCount ? 'bg-lavender border border-lavender shadow-sm' : 'bg-achromatic-50 opacity-20 border border-achromatic-100'}`}>
                        {toy}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="w-full space-y-6">
                <div className="flex flex-col text-left">
                  <label className="text-[11px] font-black text-achromatic-400 uppercase tracking-widest ml-4 mb-3">Partner Name</label>
                  <input 
                    type="text" 
                    value={tempKittenName}
                    onChange={(e) => setTempKittenName(e.target.value)}
                    className="w-full bg-white border border-achromatic-200 rounded-2xl px-6 py-5 text-center text-xl font-bold outline-none focus:border-mint shadow-sm"
                    placeholder="Partner Name"
                  />
                </div>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setIsKittenModalOpen(false)}
                    className="flex-1 py-5 bg-achromatic-100 text-achromatic-400 rounded-full font-bold text-sm"
                  >
                    닫기
                  </button>
                  <button 
                    onClick={() => {
                      updateProfile({ ...profile, kittenName: tempKittenName });
                      setIsKittenModalOpen(false);
                    }}
                    className="flex-[2] py-5 bg-mint text-white rounded-full font-bold text-sm shadow-xl shadow-mint/20"
                  >
                    저장하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
