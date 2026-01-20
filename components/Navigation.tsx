
import React from 'react';
import { Home, Map, Camera, User, MessageCircle } from 'lucide-react';
import { AppMode } from '../types';

interface NavigationProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentMode, setMode }) => {
  const tabs = [
    { id: AppMode.FEED, icon: <Home size={24} />, label: 'Home' },
    { id: AppMode.MAP, icon: <Map size={24} />, label: 'Map' },
    { id: AppMode.CAMERA, icon: <Camera size={32} />, label: 'Camera', main: true },
    { id: AppMode.CHAT, icon: <MessageCircle size={24} />, label: 'Chat' },
    { id: AppMode.PROFILE, icon: <User size={24} />, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 pb-6 pt-2 px-6 flex justify-between items-center rounded-t-[32px]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setMode(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all ${
            tab.main 
            ? 'bg-gradient-to-tr from-cyan-500 to-purple-500 p-4 -mt-12 rounded-full shadow-2xl shadow-cyan-500/40 text-white' 
            : currentMode === tab.id ? 'text-cyan-400' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          {tab.icon}
          {!tab.main && <span className="text-[10px] font-medium">{tab.label}</span>}
        </button>
      ))}
    </div>
  );
};

export default Navigation;
