"use client";

import Header from "@/components/layout/Header";
import { useData } from "@/lib/data-context";
import { Users, Award, Target } from "lucide-react";

export default function CoachingStaffPage() {
  const { coaches, isLoading } = useData();

  if (isLoading) return <main className="min-h-screen bg-brand-white flex items-center justify-center"><div className="text-brand-darkGray">Loading coaching staff...</div></main>;

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          Coaching <span className="text-brand-yellow">Staff</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          Meet the experienced professionals guiding our players to success.
        </p>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-brand-lightGray border-b border-brand-yellow/20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-brand-black mb-2">{coaches.length}</div>
            <div className="text-brand-darkGray font-medium">Expert Coaches</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-brand-black mb-2">18+</div>
            <div className="text-brand-darkGray font-medium">Years Combined Experience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-extrabold text-brand-black mb-2">4</div>
            <div className="text-brand-darkGray font-medium">Age Groups Coached</div>
          </div>
        </div>
      </section>

      {/* Coaches Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {coaches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <div key={coach.id} className="bg-brand-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-brand-yellow/10">
                <div className="relative aspect-[4/5] bg-brand-black">
                  <img 
                    src={coach.image || "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=400&h=500&fit=crop"} 
                    alt={coach.firstName} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-transparent p-6 pt-20">
                    <h3 className="text-2xl font-bold text-brand-white leading-tight">
                      {coach.firstName} {coach.lastName}
                    </h3>
                    <p className="text-brand-yellow font-medium mt-1">{coach.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  {coach.bio && <p className="text-brand-darkGray text-sm leading-relaxed mb-4">{coach.bio}</p>}
                  <div className="space-y-2 text-sm">
                    {coach.license && (
                      <div className="flex items-center gap-2 text-brand-darkGray">
                        <Award size={16} className="text-brand-yellow" />
                        <span className="font-medium">{coach.license}</span>
                      </div>
                    )}
                    {coach.experience && (
                      <div className="flex items-center gap-2 text-brand-darkGray">
                        <Users size={16} className="text-brand-yellow" />
                        <span>{coach.experience}</span>
                      </div>
                    )}
                    {coach.specialties && (
                      <div className="flex items-center gap-2 text-brand-darkGray">
                        <Target size={16} className="text-brand-yellow" />
                        <span>{coach.specialties}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-lightGray rounded-2xl border-2 border-dashed border-brand-yellow/30">
            <Users className="w-16 h-16 text-brand-yellow mx-auto mb-4" />
            <p className="text-brand-darkGray font-semibold text-lg">Coaching staff information coming soon.</p>
          </div>
        )}
      </section>
    </main>
  );
}
