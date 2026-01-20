
import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, ShieldCheck } from 'lucide-react';
import { MOCK_FEED } from '../constants';

const ArtFeed: React.FC = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-neutral-950 pb-20">
      <div className="p-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Public Gallery
        </h1>
        <p className="text-neutral-400 text-sm mt-1">Discover creations from artists worldwide</p>
      </div>

      <div className="space-y-8 px-4">
        {MOCK_FEED.map((post) => (
          <div key={post.id} className="group flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-cyan-500/30 overflow-hidden">
                  <img src={post.avatar} alt={post.artistName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm">{post.artistName}</span>
                    <ShieldCheck size={14} className="text-cyan-400" />
                  </div>
                  <span className="text-[10px] text-neutral-500">1h ago • Cairo</span>
                </div>
              </div>
              <button className="text-neutral-500"><MoreHorizontal size={20}/></button>
            </div>

            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black">
              <img src={post.imageUrl} alt="Art" className="w-full h-full object-cover" />
              {post.isHeritage && (
                <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] text-amber-400 border-amber-400/30 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-amber-400" />
                  Protected Heritage Site
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-sm text-white line-clamp-2">{post.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-1.5 text-neutral-300 hover:text-red-500 transition-colors">
                  <Heart size={24} />
                  <span className="text-xs font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-neutral-300 hover:text-cyan-400 transition-colors">
                  <MessageCircle size={24} />
                  <span className="text-xs font-medium">{post.comments}</span>
                </button>
                <button className="text-neutral-300 hover:text-purple-400">
                  <Share2 size={24} />
                </button>
              </div>
              <button className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-xl">
                View On-Site
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtFeed;
