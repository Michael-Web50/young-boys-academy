"use client";

import { useParams, useRouter } from "next/navigation";
import { useData } from "@/lib/data-context";
import Header from "@/components/layout/Header";
import { ArrowLeft, Trophy, Ruler, Calendar, Flag, Hash } from "lucide-react";

export default function PlayerProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const { players, isLoading } = useData();

  if (isLoading) return <main className="min-h-screen bg-brand-white flex items-center justify-center"><div className="text-brand-darkGray">Loading profile...</div></main>;

  const player = players.find(p => p.id === id);

  if (!player) {
    return (
      <main className="min-h-screen bg-brand-white flex flex-col items-center justify-center p-4">
        <Header />
        <h1 className="text-3xl font-bold text-brand-black mt-20">Player not found</h1>
        <button onClick={() => router.back()} className="mt-4 text-brand-yellow font-bold hover:underline">Go back to Teams</button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      {/* Profile Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-brand-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-brand-white/70 hover:text-brand-yellow transition-colors mb-8">
            <ArrowLeft size={20} /> Back to Teams
          </button>

          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Player Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-yellow rounded-full blur-3xl opacity-20"></div>
              <img 
                src={player.image || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop"} 
                alt={player.firstName} 
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-brand-yellow shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-brand-yellow text-brand-black w-20 h-20 rounded-full flex items-center justify-center font-extrabold text-3xl shadow-lg border-4 border-brand-black">
                {player.shirtNumber}
              </div>
            </div>

            {/* Player Info */}
            <div className="text-center md:text-left flex-1">
              <p className="text-brand-yellow font-bold uppercase tracking-widest mb-2">{player.ageGroup} Squad</p>
              <h1 className="text-5xl md:text-7xl font-extrabold text-brand-white mb-4 leading-tight">
                {player.firstName} <span className="text-brand-yellow">{player.lastName}</span>
              </h1>
              <p className="text-2xl text-brand-white/80 font-medium mb-6">{player.position}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-brand-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-brand-white/20">
                  <p className="text-brand-white/60 text-xs uppercase font-bold">Nationality</p>
                  <p className="text-brand-white font-semibold">{player.nationality}</p>
                </div>
                <div className="bg-brand-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-brand-white/20">
                  <p className="text-brand-white/60 text-xs uppercase font-bold">Height</p>
                  <p className="text-brand-white font-semibold">{player.height || "N/A"}</p>
                </div>
                <div className="bg-brand-white/10 backdrop-blur-sm px-6 py-3 rounded-xl border border-brand-white/20">
                  <p className="text-brand-white/60 text-xs uppercase font-bold">Date of Birth</p>
                  <p className="text-brand-white font-semibold">{player.dateOfBirth ? new Date(player.dateOfBirth).toLocaleDateString() : "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Player Stats / Bio Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-brand-lightGray p-8 rounded-2xl border-l-4 border-brand-yellow">
            <h2 className="text-3xl font-bold text-brand-black mb-4">About the Player</h2>
            <p className="text-brand-darkGray leading-relaxed text-lg">
              {player.firstName} is a dedicated {player.position.toLowerCase()} for the Young Boys {player.ageGroup} team. 
              Wearing the number {player.shirtNumber} jersey, they bring skill, discipline, and hardwork to every training session and match.
            </p>
          </div>
          
          <div className="bg-brand-black p-8 rounded-2xl text-brand-white">
            <h3 className="text-xl font-bold text-brand-yellow mb-6">Player Details</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3"><Hash className="text-brand-yellow" size={20} /><span className="font-medium">Jersey #{player.shirtNumber}</span></li>
              <li className="flex items-center gap-3"><Trophy className="text-brand-yellow" size={20} /><span className="font-medium">{player.position}</span></li>
              <li className="flex items-center gap-3"><Flag className="text-brand-yellow" size={20} /><span className="font-medium">{player.nationality}</span></li>
              <li className="flex items-center gap-3"><Ruler className="text-brand-yellow" size={20} /><span className="font-medium">{player.height || "Not specified"}</span></li>
              <li className="flex items-center gap-3"><Calendar className="text-brand-yellow" size={20} /><span className="font-medium">{player.dateOfBirth ? new Date(player.dateOfBirth).getFullYear() : "N/A"}</span></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
