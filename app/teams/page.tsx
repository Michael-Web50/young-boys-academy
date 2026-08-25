"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import PlayerCard from "@/components/ui/PlayerCard";
import PlayerProfileModal from "@/components/ui/PlayerProfileModal";
import { useData } from "@/lib/data-context";

export default function TeamsPage() {
  const { players } = useData();
  const [activeCategory, setActiveCategory] = useState("U12");
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["U12", "U15", "U17", "U20"];
  const currentPlayers = players.filter((p) => p.ageGroup === activeCategory);

  const handlePlayerClick = (player: any) => {
    setSelectedPlayer(player);
    setIsModalOpen(true);
  };

  const positionLabels: Record<string, string> = {
    "ST": "Striker",
    "CF": "Center Forward",
    "SS": "Second Striker",
    "LW": "Left Winger",
    "RW": "Right Winger",
    "AM": "Attacking Midfielder",
    "CM": "Central Midfielder",
    "CAM": "Central Attacking Midfielder",
    "CDM": "Central Defensive Midfielder",
    "CB": "Center Back",
    "LB": "Left Back",
    "RB": "Right Back",
    "LWB": "Left Wing Back",
    "RWB": "Right Wing Back",
    "GK": "Goalkeeper"
  };

  return (
    <>
      <main className="min-h-screen bg-brand-white">
        <Header />
        
        <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
            Our <span className="text-brand-yellow">Teams</span>
          </h1>
          <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
            Meet the future stars of Nigerian football. Discipline, Hardwork, and Consistency in every player.
          </p>
        </section>

        <section className="py-12 px-4 bg-brand-lightGray border-b border-brand-yellow/20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-brand-yellow text-brand-black shadow-lg transform scale-105"
                      : "bg-brand-black text-brand-white hover:bg-brand-darkGray"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-brand-black mb-2">
              {activeCategory} Squad
            </h2>
            <p className="text-brand-darkGray">
              {currentPlayers.length} Players Ready to Compete
            </p>
          </div>

          {currentPlayers.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {currentPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  name={`${player.firstName} ${player.lastName}`}
                  position={positionLabels[player.position] || player.position}
                  ageGroup={player.ageGroup}
                  number={player.shirtNumber}
                  image={player.image}
                  onClick={() => handlePlayerClick(player)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-brand-darkGray text-xl">No players in this category yet.</p>
              <p className="text-brand-darkGray/60 mt-2">Add players through the admin dashboard.</p>
            </div>
          )}
        </section>
      </main>

      {selectedPlayer && (
        <PlayerProfileModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          player={{
            firstName: selectedPlayer.firstName,
            middleName: selectedPlayer.middleName,
            lastName: selectedPlayer.lastName,
            position: positionLabels[selectedPlayer.position] || selectedPlayer.position,
            shirtNumber: selectedPlayer.shirtNumber,
            nameOnShirt: selectedPlayer.nameOnShirt,
            ageGroup: selectedPlayer.ageGroup,
            dateOfBirth: selectedPlayer.dateOfBirth,
            nationality: selectedPlayer.nationality,
            height: selectedPlayer.height,
            image: selectedPlayer.image,
          }}
        />
      )}
    </>
  );
}
