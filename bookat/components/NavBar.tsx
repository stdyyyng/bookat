
import React from 'react';
import { TabType } from '../types';

interface NavBarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const NavBar: React.FC<NavBarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'bookshelf', label: '책장', icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5c0 .8.7 1.5 1.5 1.5H20V4H5.5C4.7 4 4 4.7 4 5.5v14Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h4"/></svg>
    )},
    { id: 'home', label: '홈', icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10L12 3L3 10Z"/><path d="M9 23v-8h6v8"/></svg>
    )},
    { id: 'collection', label: '수집', icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z"/><circle cx="12" cy="10" r="2"/></svg>
    )},
    { id: 'account', label: '계정', icon: (color: string) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M18 7a4 4 0 0 0-3-3.87"/></svg>
    )},
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-achromatic-100 safe-area-bottom z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const color = isActive ? '#00A19B' : '#D1D1D1';
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className="flex flex-col items-center justify-center space-y-1 w-full h-full transition-all duration-300"
            >
              <div className={`${isActive ? 'scale-110' : 'scale-100 opacity-70'} transition-all`}>
                {tab.icon(color)}
              </div>
              <span className={`text-[9px] font-bold tracking-tight ${isActive ? 'text-mint' : 'text-achromatic-300'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
