
export enum BrushType {
  NEON = 'NEON',
  SPRAY = 'SPRAY',
  STONE = 'STONE',
  PARTICLE = 'PARTICLE',
  LIGHT_TRAIL = 'LIGHT_TRAIL'
}

export enum AppMode {
  CAMERA = 'CAMERA',
  FEED = 'FEED',
  MAP = 'MAP',
  PROFILE = 'PROFILE',
  CHAT = 'CHAT'
}

export enum GeoRule {
  FREE = 'FREE',
  ARTIST_ONLY = 'ARTIST_ONLY',
  HERITAGE = 'HERITAGE',
  PRIVATE = 'PRIVATE'
}

export interface ArtPiece {
  id: string;
  artistId: string;
  artistName: string;
  imageUrl: string;
  location: { lat: number; lng: number };
  likes: number;
  comments: number;
  description: string;
  timestamp: number;
  isHeritage?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  bio: string;
  isPro: boolean;
  isArtist: boolean;
  avatar: string;
  followers: number;
}
