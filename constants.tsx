
import React from 'react';
import { Sparkles, Zap, Mountain, Wind, Flame } from 'lucide-react';
import { BrushType, GeoRule } from './types';

export const BRUSH_CONFIGS = [
  { id: BrushType.NEON, name: 'Neon', icon: <Zap size={20} />, color: '#00f2ff', description: 'Glows in the dark' },
  { id: BrushType.SPRAY, name: 'Spray', icon: <Sparkles size={20} />, color: '#ff007b', description: 'Classic graffiti' },
  { id: BrushType.STONE, name: 'Stone', icon: <Mountain size={20} />, color: '#a1a1aa', description: 'For heritage sites' },
  { id: BrushType.PARTICLE, name: 'Particles', icon: <Flame size={20} />, color: '#ff7e00', description: 'Kinetic effects' },
  { id: BrushType.LIGHT_TRAIL, name: 'Light Trails', icon: <Wind size={20} />, color: '#bc00ff', description: 'Glowing paths' },
];

export const GEO_ZONES = [
  { name: 'Downtown', rule: GeoRule.FREE, color: '#10b981' },
  { name: 'Art Complex', rule: GeoRule.ARTIST_ONLY, color: '#3b82f6' },
  { name: 'National Museum', rule: GeoRule.HERITAGE, color: '#f59e0b' },
];

export const MOCK_FEED: any[] = [
  {
    id: '1',
    artistName: 'Souhail Lamari',
    imageUrl: 'https://picsum.photos/seed/art1/800/1200',
    description: 'Neon sketch in the streets of Old Cairo #AR #VirtuelVision',
    likes: 1240,
    comments: 45,
    timestamp: Date.now() - 3600000,
    avatar: 'https://picsum.photos/seed/user1/100/100'
  },
  {
    id: '2',
    artistName: 'Yassin Mansour',
    imageUrl: 'https://picsum.photos/seed/art2/800/1200',
    description: 'AR reimagining of Bab al-Mutawalli',
    likes: 850,
    comments: 22,
    timestamp: Date.now() - 7200000,
    isHeritage: true,
    avatar: 'https://picsum.photos/seed/user2/100/100'
  }
];
