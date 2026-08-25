"use client";

import Header from "@/components/layout/Header";
import CoachCard from "@/components/ui/CoachCard";
import { useData } from "@/lib/data-context";
import { Users, Award } from "lucide-react";

export default function CoachingStaffPage() {
  const { coaches } = useData();

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full px-4 py-1.5 mb-6">
            <Award className="w-4 h-4 text-brand-yellow" />
            <span className="text-brand-yellow text-sm font-semibold tracking-wide">OUR COACHING TEAM</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
            Meet Our <span className="text-brand-yellow">Coaches</span>
          </h1>
          <p className="text-xl text-brand-white/80">
            Experienced, licensed, and passionate about developing the next generation of football champions in Surulere.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-brand-lightGray border-b border-brand-yellow/20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-brand-black">{coaches.length}</div>
            <p className="text-sm text-brand-darkGray/70 mt-1">Expert Coaches</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-brand-black">50+</div>
            <p className="text-sm text-brand-darkGray/70 mt-1">Years Combined Experience</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-brand-black">4</div>
            <p className="text-sm text-brand-darkGray/70 mt-1">Age Groups Coached</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-brand-black">CAF/FIFA</div>
            <p className="text-sm text-brand-darkGray/70 mt-1">Licensed Professionals</p>
          </div>
        </div>
      </section>

      {/* Coaches Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        {coaches.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <CoachCard
                key={coach.id}
                firstName={coach.firstName}
                lastName={coach.lastName}
                role={coach.role}
                image={coach.image}
                bio={coach.bio}
                license={coach.license}
                experience={coach.experience}
                specialties={coach.specialties}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-brand-yellow mx-auto mb-4" />
            <p className="text-brand-darkGray text-xl">Coaching staff information coming soon.</p>
          </div>
        )}
      </section>

      {/* Join the Team CTA */}
      <section className="py-16 px-4 bg-brand-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-brand-white mb-4">
            Are You a <span className="text-brand-yellow">Licensed Coach?</span>
          </h2>
          <p className="text-brand-white/70 mb-8">
            We are always looking for passionate, qualified coaches to join our team. If you share our vision of discipline, hardwork, and consistency, we want to hear from you.
          </p>
          <a
            href="/support"
            className="inline-block bg-brand-yellow text-brand-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
