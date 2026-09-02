"use client";

import Link from "next/link";
import { Shield, Target, Users, Trophy, ArrowRight, Play, Clock, MapPin, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black">
      {/* HERO SECTION WITH VIDEO BACKGROUND */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background - African Football Training */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1920&h=1080&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/4090372/4090372-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/60 to-brand-black/90" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
            <Star className="w-4 h-4 text-brand-yellow" />
            <span className="text-brand-yellow text-sm font-semibold tracking-wider uppercase">Surulere, Lagos • Est. 2020</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-brand-white mb-6 leading-tight">
            YOUNG BOYS<br />
            <span className="text-brand-yellow">FOOTBALL ACADEMY</span>
          </h1>

          <p className="text-xl md:text-2xl text-brand-white/90 mb-4 font-light max-w-3xl mx-auto">
            Forging the next generation of football champions
          </p>

          <p className="text-lg text-brand-yellow font-bold tracking-widest uppercase mb-12">
            Discipline • Hardwork • Consistency
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/teams"
              className="group bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 flex items-center gap-2 shadow-2xl"
            >
              Meet Our Teams
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/support"
              className="group bg-transparent border-2 border-brand-white text-brand-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-white hover:text-brand-black transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Become a Sponsor
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-brand-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-brand-yellow rounded-full" />
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="py-24 px-4 bg-brand-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full px-4 py-1.5 mb-4">
              <Shield className="w-4 h-4 text-brand-yellow" />
              <span className="text-brand-yellow text-sm font-semibold tracking-wide uppercase">OUR FOUNDATION</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-black mb-4">
              Why Choose <span className="text-brand-yellow">Young Boys?</span>
            </h2>
            <p className="text-xl text-brand-darkGray max-w-2xl mx-auto">
              We don't just train footballers. We build character, discipline, and future leaders through the beautiful game.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="group bg-brand-lightGray p-8 rounded-2xl border-t-4 border-brand-yellow hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-yellow transition-colors">
                <Shield className="w-8 h-8 text-brand-yellow group-hover:text-brand-black transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-brand-black mb-3">Discipline</h3>
              <p className="text-brand-darkGray leading-relaxed">
                Structure builds champions. Our players learn punctuality, respect, and commitment both on and off the pitch.
              </p>
            </div>

            {/* Value 2 */}
            <div className="group bg-brand-lightGray p-8 rounded-2xl border-t-4 border-brand-yellow hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-yellow transition-colors">
                <Target className="w-8 h-8 text-brand-yellow group-hover:text-brand-black transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-brand-black mb-3">Hardwork</h3>
              <p className="text-brand-darkGray leading-relaxed">
                Talent is nothing without effort. We push every player to exceed their limits through rigorous, professional training.
              </p>
            </div>

            {/* Value 3 */}
            <div className="group bg-brand-lightGray p-8 rounded-2xl border-t-4 border-brand-yellow hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-yellow transition-colors">
                <Trophy className="w-8 h-8 text-brand-yellow group-hover:text-brand-black transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-brand-black mb-3">Consistency</h3>
              <p className="text-brand-darkGray leading-relaxed">
                Champions are made in the daily grind. We build habits that last a lifetime, season after season.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INFO STRIP */}
      <section className="py-16 px-4 bg-brand-black border-y border-brand-yellow/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <Clock className="w-12 h-12 text-brand-yellow flex-shrink-0" />
            <div>
              <h4 className="text-brand-white font-bold text-lg">Training Schedule</h4>
              <p className="text-brand-white/70">Tue, Thu & Sat • 4PM - 6PM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <MapPin className="w-12 h-12 text-brand-yellow flex-shrink-0" />
            <div>
              <h4 className="text-brand-white font-bold text-lg">Location</h4>
              <p className="text-brand-white/70">Sanya Street, Surulere, Lagos</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Users className="w-12 h-12 text-brand-yellow flex-shrink-0" />
            <div>
              <h4 className="text-brand-white font-bold text-lg">Age Groups</h4>
              <p className="text-brand-white/70">U12 • U15 • U17 • U20</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 px-4 bg-gradient-to-br from-brand-yellow to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-black mb-6">
            Ready to Join the Academy?
          </h2>
          <p className="text-xl text-brand-black/80 mb-10 max-w-2xl mx-auto">
            Trials are ongoing for all age groups. Bring your boots, your passion, and your willingness to work hard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/support"
              className="bg-brand-black text-brand-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-darkGray transition-all duration-300 shadow-2xl"
            >
              Register for Trials
            </Link>
            <Link
              href="/training"
              className="bg-transparent border-2 border-brand-black text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-black hover:text-brand-white transition-all duration-300"
            >
              View Training Programs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
// Force new Vercel deployment
