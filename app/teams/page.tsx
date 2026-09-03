"use client";

import Header from "@/components/layout/Header";
import { useData } from "@/lib/data-context";
import Link from "next/link";
import { Users, Filter } from "lucide-react";
import { useState } from "react";

export default function TeamsPage() {
  const { players, isLoading } = useData();
  const [filter, setFilter] = useState("All");

  const ageGroups = ["All", "U12", "U15", "U17", "U20"];
  const filteredPlayers = filter === "All" ? players : players.filter(p => p.ageGroup === filter);

  if (isLoading) return <main className="min-h-screen bg-brand-white flex items-center justify-center"><div className="text-brand-darkGray">Loading teams...</div></main>;

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          Our <span className="text-brand-yellow">Teams</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          Meet the future stars of Young Boys Football Academy.
        </p>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {ageGroups.map((group) => (
            <button
              key={group}
              onClick={() => setFilter(group)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                filter === group 
                  ? "bg-brand-yellow text-brand-black shadow-lg" 
                  : "bg-brand-lightGray text-brand-darkGray hover:bg-brand-black hover:text-brand-white"
              }`}
            >
              {group === "All" && <Filter size={16} />}
              {group}
            </button>
          ))}
        </div>

        {filteredPlayers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPlayers.map((player) => (
              <Link 
                href={`/teams/${player.id}`} 
                key={player.id} 
                className="group bg-brand-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-brand-yellow/10 hover:-translate-y-2"
              >
                <div className="relative aspect-[3/4] bg-brand-black overflow-hidden">
                  <img 
                    src={player.image || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=500&fit=crop"} 
                    alt={player.firstName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-brand-yellow text-brand-black w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-xl shadow-lg">
                    {player.shirtNumber}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent p-6 pt-20">
                    <p className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-1">{player.ageGroup} • {player.position}</p>
                    <h3 className="text-2xl font-bold text-brand-white leading-tight">
                      {player.firstName} <span className="text-brand-yellow">{player.lastName}</span>
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-lightGray rounded-2xl border-2 border-dashed border-brand-yellow/30">
            <Users className="w-16 h-16 text-brand-yellow mx-auto mb-4" />
            <p className="text-brand-darkGray font-semibold text-lg">No players found in this category.</p>
          </div>
        )}
      </section>
    </main>
  );
}
