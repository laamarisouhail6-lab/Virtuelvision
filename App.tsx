
import React, { useState, useEffect } from 'react';
import { AppMode } from './types';
import CameraView from './components/CameraView';
import ArtFeed from './components/ArtFeed';
import MapView from './components/MapView';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import { Shield, Sparkles, UserCheck } from 'lucide-react';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.FEED);
  const [isPro] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="flex flex-col h-screen max-w-md mx-auto bg-[#0a0a0a] items-center justify-center animate-pulse">
        <Logo size={180} />
      </div>
    );
  }

  const renderContent = () => {
    switch (currentMode) {
      case AppMode.CAMERA:
        return <CameraView isPro={isPro} />;
      case AppMode.FEED:
        return (
          <div className="flex flex-col flex-1 h-full overflow-hidden">
             <div className="p-4 flex justify-center border-b border-white/5 bg-black/20">
                <Logo showText={false} size={40} />
             </div>
             <ArtFeed />
          </div>
        );
      case AppMode.MAP:
        return <MapView />;
      case AppMode.PROFILE:
        return (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-neutral-950 text-center gap-6 overflow-y-auto pb-32">
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 p-1">
              <img src="https://picsum.photos/seed/me/200/200" className="w-full h-full rounded-full object-cover border-4 border-black" />
            </div>
            <div>
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                Yassin Mansour <UserCheck className="text-cyan-500" size={20} />
              </h2>
              <p className="text-neutral-500 mt-1">AR Artist • Cairo</p>
            </div>
            
            <div className="flex gap-8 w-full justify-center">
              <div className="text-center">
                <div className="text-xl font-bold">128</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Works</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">4.2k</div>
                <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Followers</div>
              </div>
            </div>

            <div className="w-full space-y-3 mt-4">
              <button className="w-full py-4 bg-white text-black font-bold rounded-2xl active:scale-95 transition-transform shadow-xl">
                Edit Profile
              </button>
              <button className="w-full py-4 glass text-white font-bold rounded-2xl flex items-center justify-center gap-2 group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <Sparkles size={18} className="text-amber-400" />
                <span>Upgrade to Pro ($24 / month)</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full mt-4">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="aspect-square rounded-xl bg-neutral-900 overflow-hidden">
                   <img src={`https://picsum.photos/seed/work${i}/300/300`} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                 </div>
               ))}
            </div>
          </div>
        );
      case AppMode.CHAT:
        return (
          <div className="flex-1 flex flex-col bg-neutral-950">
            <div className="p-6">
              <h1 className="text-3xl font-bold">Messages</h1>
            </div>
            <div className="px-4 space-y-4">
              <div className="glass p-4 rounded-3xl flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-neutral-800" />
                <div className="flex-1">
                  <div className="font-bold text-white">Souhail Lamari</div>
                  <div className="text-sm text-neutral-500">I loved your latest design!</div>
                </div>
                <div className="text-[10px] text-neutral-600">5m ago</div>
              </div>
              <div className="glass p-4 rounded-3xl flex items-center gap-4 opacity-60">
                <div className="w-14 h-14 rounded-full bg-neutral-800 flex items-center justify-center">
                  <Logo showText={false} size={30} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white">VirtualVision System</div>
                  <div className="text-sm text-neutral-500">Your new location has been successfully reserved...</div>
                </div>
                <div className="text-[10px] text-neutral-600">2h ago</div>
              </div>
            </div>
          </div>
        );
      default:
        return <ArtFeed />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto relative shadow-2xl border-x border-white/5 overflow-hidden">
      {renderContent()}
      <Navigation currentMode={currentMode} setMode={setCurrentMode} />
    </div>
  );
};

export default App;
