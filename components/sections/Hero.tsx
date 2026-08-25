"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fallback Background Image (Shows while video loads or if it fails) */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1920')" 
        }}
      />

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
      >
        {/* Using a highly reliable, fast-loading Pexels stock video */}
        <source
          src="https://videos.pexels.com/video-files/5325493/5325493-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-brand-black/75 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40 text-sm font-semibold tracking-wider mb-6">
            SURULERE, LAGOS
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-white mb-6 leading-tight">
            FORGING THE NEXT <br />
            <span className="text-brand-yellow">GENERATION OF CHAMPIONS</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-white/90 mb-4 font-medium">
            Discipline. Hardwork. Consistency.
          </p>
          
          <p className="text-base md:text-lg text-brand-white/70 mb-10 max-w-2xl mx-auto">
            Join the Young Boys Football Academy. We nurture talent across our U12, U15, U17, and U20 teams with world-class training methods right here at Sanya Street, Surulere.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="flex items-center gap-2 bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
              Join the Academy
              <ArrowRight size={20} />
            </button>
            
            <button className="flex items-center gap-2 bg-transparent border-2 border-brand-white text-brand-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-white hover:text-brand-black transition-all duration-300">
              <Play size={20} fill="currentColor" />
              Watch Our Story
            </button>
          </div>
        </motion.div>
      </div>

      {/* Training Days Badge */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-10 left-4 md:left-10 z-20 hidden md:block"
      >
        <div className="bg-brand-black/80 backdrop-blur-md border-l-4 border-brand-yellow p-4 rounded-r-lg">
          <p className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-1">Training Days</p>
          <p className="text-brand-white font-semibold">Tuesday • Thursday • Saturday</p>
        </div>
      </motion.div>
    </section>
  );
}
