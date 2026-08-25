"use client";

import Image from "next/image";

interface PlayerCardProps {
  name: string;
  position: string;
  ageGroup: string;
  number: number;
  image?: string;
  onClick?: () => void;
}

export default function PlayerCard({ name, position, ageGroup, number, image, onClick }: PlayerCardProps) {
  // Generate a consistent random image based on player number
  const playerImage = image || `https://i.pravatar.cc/400?u=${number}`;

  return (
    <div 
      onClick={onClick}
      className="group relative bg-brand-black rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-brand-yellow/20 cursor-pointer"
    >
      {/* Player Image */}
      <div className="relative w-full h-64 overflow-hidden">
        <Image
          src={playerImage}
          alt={name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          unoptimized
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent" />
        
        {/* Jersey Number Badge */}
        <div className="absolute top-4 right-4 w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg">
          <span className="text-brand-black font-bold text-lg">{number}</span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-brand-yellow/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-brand-black font-bold text-lg">View Profile</p>
        </div>
      </div>

      {/* Player Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-brand-yellow text-sm font-bold uppercase tracking-wider">{ageGroup}</span>
        </div>
        <h3 className="text-xl font-bold text-brand-white mb-1">{name}</h3>
        <p className="text-brand-yellow font-semibold">{position}</p>
      </div>
    </div>
  );
}
