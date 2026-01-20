
import React, { useEffect, useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import { GEO_ZONES } from '../constants';

const MapView: React.FC = () => {
  const [userLocation, setUserLocation] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation(pos.coords),
      (err) => console.error(err)
    );
  }, []);

  return (
    <div className="flex-1 relative bg-neutral-900">
      <div className="absolute top-4 left-4 right-4 z-10 flex gap-2">
        <div className="flex-1 glass rounded-2xl flex items-center px-4 py-3 gap-3">
          <Search size={20} className="text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search for art or places..." 
            className="bg-transparent border-none outline-none text-white text-sm w-full"
          />
        </div>
        <button className="glass p-3 rounded-2xl text-cyan-400">
          <Navigation size={24} />
        </button>
      </div>

      <div className="w-full h-full bg-[#1e1e1e] flex items-center justify-center overflow-hidden">
        <div className="relative w-[800px] h-[800px] bg-neutral-800 rounded-full opacity-20 border border-neutral-700 animate-pulse" />
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 opacity-5">
           {[...Array(144)].map((_, i) => <div key={i} className="border border-white" />)}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-4 h-4 bg-cyan-500 rounded-full border-2 border-white shadow-[0_0_15px_rgba(6,182,212,0.5)] z-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cyan-500/20 rounded-full animate-ping" />
          </div>

          <div className="absolute top-1/4 right-1/3 group cursor-pointer">
            <div className="bg-purple-500 p-2 rounded-xl text-white shadow-xl group-hover:scale-110 transition-transform">
              <MapPin size={20} />
            </div>
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-lg text-[10px] whitespace-nowrap hidden group-hover:block">
              "Dance of Light" - Souhail Lamari
            </div>
          </div>

          <div className="absolute bottom-1/3 left-1/4 group cursor-pointer">
            <div className="bg-amber-500 p-2 rounded-xl text-white shadow-xl group-hover:scale-110 transition-transform">
              <MapPin size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 left-4 right-4 z-10 flex flex-col gap-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {GEO_ZONES.map((zone) => (
            <div key={zone.name} className="glass px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-xs">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.color }} />
              <span className="text-white/80">{zone.name}</span>
            </div>
          ))}
        </div>
        <div className="glass p-4 rounded-3xl flex items-center justify-between">
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-xs text-neutral-500">Nearby Art</div>
              <div className="text-lg font-bold text-white">12</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center">
              <div className="text-xs text-neutral-500">Active Artists</div>
              <div className="text-lg font-bold text-white">4</div>
            </div>
          </div>
          <button className="bg-cyan-500 text-white px-6 py-2 rounded-2xl text-sm font-bold shadow-lg shadow-cyan-500/30">
            Go to Site
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapView;
