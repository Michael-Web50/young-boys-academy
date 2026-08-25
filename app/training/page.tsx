import Header from "@/components/layout/Header";
import { Calendar, Clock, Shield, Brain, Activity } from "lucide-react";

export default function TrainingPage() {
  // Updated Schedule Data
  const schedule = [
    { day: "Tuesday", focus: "Fitness & Conditioning", type: "Physical Prep" },
    { day: "Thursday", focus: "Technical & Tactical", type: "Skills Session" },
    { day: "Saturday", focus: "Match Day / Scrimmage", type: "Game Time" },
  ];

  const ageGroups = [
    { name: "Under 12", focus: "Fundamentals & Fun", age: "Ages 9-11" },
    { name: "Under 15", focus: "Tactical Awareness", age: "Ages 12-14" },
    { name: "Under 17", focus: "Competitive Excellence", age: "Ages 15-16" },
    { name: "Under 20", focus: "Professional Readiness", age: "Ages 17-19" },
  ];

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          Training & <span className="text-brand-yellow">Methodology</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          World-class coaching tailored to every stage of a young player's development.
        </p>
      </section>

      {/* Schedule Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-brand-black mb-4">Weekly Training Schedule</h2>
          <p className="text-brand-darkGray">Consistency is the key to mastery. Join us on the pitch.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {schedule.map((item) => (
            <div key={item.day} className="bg-brand-black text-brand-white p-8 rounded-2xl text-center border-b-4 border-brand-yellow shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
              <Calendar className="w-10 h-10 text-brand-yellow mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">{item.day}</h3>
              <p className="text-brand-white/70 flex items-center justify-center gap-2">
                <Clock size={16} /> 4:00 PM - 6:30 PM
              </p>
              <p className="text-sm text-brand-yellow mt-4 font-semibold uppercase tracking-wide">
                {item.focus}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 px-4 bg-brand-lightGray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-12">Our Training Philosophy</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-white p-8 rounded-xl shadow-md">
              <Activity className="w-12 h-12 text-brand-yellow mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Physical Development</h3>
              <p className="text-brand-darkGray">Building agility, speed, stamina, and strength tailored to the growing bodies of young athletes, preventing injury and maximizing performance.</p>
            </div>
            
            <div className="bg-brand-white p-8 rounded-xl shadow-md">
              <Brain className="w-12 h-12 text-brand-yellow mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Tactical Intelligence</h3>
              <p className="text-brand-darkGray">Teaching players to read the game, understand spatial awareness, and make quick, smart decisions under pressure.</p>
            </div>
            
            <div className="bg-brand-white p-8 rounded-xl shadow-md">
              <Shield className="w-12 h-12 text-brand-yellow mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-3">Mental Resilience</h3>
              <p className="text-brand-darkGray">Instilling the core values of discipline and hard work. We build character that succeeds both on the football pitch and in life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-brand-black text-center mb-12">Age Group Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ageGroups.map((group) => (
            <div key={group.name} className="bg-brand-black p-6 rounded-xl border border-brand-yellow/30 text-center hover:border-brand-yellow transition-colors duration-300">
              <h3 className="text-2xl font-bold text-brand-yellow mb-2">{group.name}</h3>
              <p className="text-brand-white/60 text-sm mb-3">{group.age}</p>
              <p className="text-brand-white font-medium">{group.focus}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
