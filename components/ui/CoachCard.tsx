"use client";

import { Award, Briefcase, Star } from "lucide-react";

interface CoachCardProps {
  firstName: string;
  lastName: string;
  role: string;
  image: string;
  bio: string;
  license: string;
  experience: string;
  specialties: string;
}

export default function CoachCard({ firstName, lastName, role, image, bio, license, experience, specialties }: CoachCardProps) {
  return (
    <div className="group bg-brand-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-brand-yellow/10">
      {/* Coach Image */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={image}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
        
        {/* Role Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-brand-yellow text-brand-black px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            {role}
          </span>
        </div>

        {/* Name Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-extrabold text-brand-white mb-1">
            {firstName} <span className="text-brand-yellow">{lastName}</span>
          </h3>
        </div>
      </div>

      {/* Coach Details */}
      <div className="p-6">
        {/* Credentials */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-1.5 bg-brand-lightGray px-3 py-1.5 rounded-full">
            <Award size={14} className="text-brand-yellow" />
            <span className="text-xs font-semibold text-brand-black">{license}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-brand-lightGray px-3 py-1.5 rounded-full">
            <Briefcase size={14} className="text-brand-yellow" />
            <span className="text-xs font-semibold text-brand-black">{experience}</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-brand-darkGray text-sm leading-relaxed mb-4 line-clamp-4">
          {bio}
        </p>

        {/* Specialties */}
        <div className="pt-4 border-t border-brand-yellow/10">
          <div className="flex items-center gap-2 mb-2">
            <Star size={14} className="text-brand-yellow" />
            <span className="text-xs font-bold text-brand-black uppercase tracking-wide">Specialties</span>
          </div>
          <p className="text-sm text-brand-darkGray/80">{specialties}</p>
        </div>
      </div>
    </div>
  );
}
