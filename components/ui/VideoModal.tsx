"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const [videoError, setVideoError] = useState(false);

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

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-5xl bg-brand-black rounded-xl overflow-hidden shadow-2xl border-2 border-brand-yellow/30"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 bg-brand-black/80 hover:bg-brand-yellow hover:text-brand-black text-brand-white rounded-full transition-all duration-300 border border-brand-yellow/40"
          >
            <X size={24} />
          </button>

          {/* Video Container */}
          <div className="relative w-full h-[50vh] md:h-[70vh] bg-black flex items-center justify-center">
            {videoError ? (
              <div className="text-center p-8">
                <p className="text-brand-yellow text-lg font-bold mb-2">Video Unavailable</p>
                <p className="text-brand-white/70">The video could not be loaded. Please check your internet connection, or we will upload the official academy video soon.</p>
              </div>
            ) : (
              <video
                controls
                autoPlay
                muted
                playsInline
                className="w-full h-full object-contain"
                poster="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1920"
                onError={() => setVideoError(true)}
              >
                {/* Using a highly reliable, direct MP4 link */}
                <source
                  src="https://assets.mixkit.co/videos/preview/mixkit-soccer-player-training-on-the-field-43281-large.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Branding Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black via-brand-black/90 to-transparent p-6 pointer-events-none z-10">
            <h3 className="text-2xl font-bold text-brand-yellow mb-1">
              Young Boys Football Academy
            </h3>
            <p className="text-brand-white/80 text-sm">
              Discipline. Hardwork. Consistency. | Sanya Street, Surulere, Lagos
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
