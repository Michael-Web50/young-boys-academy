import Header from "@/components/layout/Header";
import { MapPin, Trophy, Users, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          About <span className="text-brand-yellow">The Academy</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          More than just a football club. We are a family dedicated to forging the next generation of champions in the heart of Lagos.
        </p>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-brand-lightGray p-8 rounded-2xl border-t-4 border-brand-yellow shadow-lg">
            <Target className="w-12 h-12 text-brand-yellow mb-4" />
            <h3 className="text-2xl font-bold text-brand-black mb-3">Our Mission</h3>
            <p className="text-brand-darkGray leading-relaxed">
              To provide a structured, professional, and nurturing environment where young footballers can develop their skills, character, and tactical intelligence.
            </p>
          </div>

          {/* Core Values */}
          <div className="bg-brand-black p-8 rounded-2xl border-t-4 border-brand-yellow shadow-lg text-brand-white">
            <Trophy className="w-12 h-12 text-brand-yellow mb-4" />
            <h3 className="text-2xl font-bold text-brand-yellow mb-3">Core Values</h3>
            <ul className="space-y-2 text-brand-white/90">
              <li className="flex items-center gap-2">✓ <span className="font-semibold text-brand-yellow">Discipline</span> on and off the pitch.</li>
              <li className="flex items-center gap-2">✓ <span className="font-semibold text-brand-yellow">Hardwork</span> in every training session.</li>
              <li className="flex items-center gap-2">✓ <span className="font-semibold text-brand-yellow">Consistency</span> in our pursuit of excellence.</li>
            </ul>
          </div>

          {/* Community */}
          <div className="bg-brand-lightGray p-8 rounded-2xl border-t-4 border-brand-yellow shadow-lg">
            <Users className="w-12 h-12 text-brand-yellow mb-4" />
            <h3 className="text-2xl font-bold text-brand-black mb-3">Our Community</h3>
            <p className="text-brand-darkGray leading-relaxed">
              We proudly represent Surulere, Lagos. We believe in giving back to the community by providing accessible, high-quality football education to young boys.
            </p>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4 bg-brand-darkGray text-brand-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-yellow mb-6">Find Us</h2>
            <div className="flex items-start gap-4 mb-6">
              <MapPin className="w-8 h-8 text-brand-yellow flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Young Boys Football Academy</h3>
                <p className="text-brand-white/80 text-lg">Sanya Street, Surulere, Lagos, Nigeria</p>
                <p className="text-brand-white/60 mt-2">Landmark: Near the main Surulere community center.</p>
            </div>
            </div>
            <button className="bg-brand-yellow text-brand-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
              Get Directions
            </button>
          </div>
          
          {/* Placeholder for Map */}
          <div className="flex-1 w-full">
            <div className="w-full h-80 bg-brand-black rounded-xl border-2 border-brand-yellow/30 flex items-center justify-center">
              <p className="text-brand-white/50 font-medium">[ Interactive Google Map Embed Goes Here ]</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
