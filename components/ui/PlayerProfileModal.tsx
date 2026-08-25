"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shirt, Trophy, MapPin, Calendar } from "lucide-react";
import { useEffect } from "react";

interface PlayerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: {
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;
    shirtNumber: number;
    nameOnShirt: string;
    ageGroup: string;
    dateOfBirth?: string;
    nationality?: string;
    height?: string;
    image?: string;
  };
}

export default function PlayerProfileModal({ isOpen, onClose, player }: PlayerProfileModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const playerImage = player.image || `https://i.pravatar.cc/400?u=${player.shirtNumber}`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-3xl bg-brand-black rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-yellow/30 my-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-brand-black/80 hover:bg-brand-yellow hover:text-brand-black text-brand-white rounded-full transition-all duration-300 border border-brand-yellow/40"
          >
            <X size={24} />
          </button>

          {/* Header with Image */}
          <div className="relative h-80 bg-gradient-to-br from-brand-darkGray to-brand-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-brand-yellow shadow-2xl">
                <img
                  src={playerImage}
                  alt={`${player.firstName} ${player.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Jersey Number Badge */}
            <div className="absolute bottom-4 right-8 w-20 h-20 bg-brand-yellow rounded-full flex items-center justify-center shadow-xl border-4 border-brand-black">
              <span className="text-brand-black font-bold text-3xl">{player.shirtNumber}</span>
            </div>
          </div>

          {/* Player Details */}
          <div className="p-8">
            {/* Name Section */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-brand-white mb-2">
                {player.firstName} {player.middleName} {player.lastName}
              </h2>
              <p className="text-brand-yellow text-xl font-semibold mb-1">{player.nameOnShirt}</p>
              <span className="inline-block px-4 py-1 bg-brand-yellow/20 text-brand-yellow rounded-full text-sm font-bold">
                {player.ageGroup}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-brand-darkGray/50 p-6 rounded-xl border border-brand-yellow/20">
                <div className="flex items-center gap-3 mb-2">
                  <Shirt className="w-5 h-5 text-brand-yellow" />
                  <span className="text-brand-white/60 text-sm">Position</span>
                </div>
                <p className="text-brand-white text-lg font-bold">{player.position}</p>
              </div>

              <div className="bg-brand-darkGray/50 p-6 rounded-xl border border-brand-yellow/20">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy className="w-5 h-5 text-brand-yellow" />
                  <span className="text-brand-white/60 text-sm">Jersey Number</span>
                </div>
                <p className="text-brand-white text-lg font-bold">#{player.shirtNumber}</p>
              </div>

              {player.dateOfBirth && (
                <div className="bg-brand-darkGray/50 p-6 rounded-xl border border-brand-yellow/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-brand-yellow" />
                    <span className="text-brand-white/60 text-sm">Date of Birth</span>
                  </div>
                  <p className="text-brand-white text-lg font-bold">{player.dateOfBirth}</p>
                </div>
              )}

              {player.nationality && (
                <div className="bg-brand-darkGray/50 p-6 rounded-xl border border-brand-yellow/20">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-brand-yellow" />
                    <span className="text-brand-white/60 text-sm">Nationality</span>
                  </div>
                  <p className="text-brand-white text-lg font-bold">{player.nationality}</p>
                </div>
              )}

              {player.height && (
                <div className="bg-brand-darkGray/50 p-6 rounded-xl border border-brand-yellow/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Trophy className="w-5 h-5 text-brand-yellow" />
                    <span className="text-brand-white/60 text-sm">Height</span>
                  </div>
                  <p className="text-brand-white text-lg font-bold">{player.height}</p>
                </div>
              )}
            </div>

            {/* Academy Info */}
            <div className="mt-8 p-6 bg-brand-yellow/10 rounded-xl border border-brand-yellow/30 text-center">
              <p className="text-brand-yellow font-bold text-lg mb-1">Young Boys Football Academy</p>
              <p className="text-brand-white/70">Discipline. Hardwork. Consistency.</p>
              <p className="text-brand-white/50 text-sm mt-2">Sanya Street, Surulere, Lagos</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
