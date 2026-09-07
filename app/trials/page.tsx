"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { CheckCircle, Send, Loader2, User, MapPin, Trophy, Footprints, FileText, Shield } from "lucide-react";

export default function TrialsPage() {
  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "",
    formerTeam: "", location: "", ageGroup: "",
    positionsPlayed: [] as string[], preferredFoot: "", bestPosition: "",
    quickNote: "", motivationLetter: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ageGroups = ["U-10", "U-12", "U-15", "U-17", "U-20"];
  const positions = ["GK", "CB", "LB", "RB", "LWB", "RWB", "CDM", "DM", "CM", "CAM", "AM", "SS", "CF", "LW", "RW"];
  const feet = ["Right", "Left", "Both"];

  const togglePosition = (pos: string) => {
    setFormData(prev => ({
      ...prev,
      positionsPlayed: prev.positionsPlayed.includes(pos) 
        ? prev.positionsPlayed.filter(p => p !== pos) 
        : [...prev.positionsPlayed, pos]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          Trial <span className="text-brand-yellow">Application</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          Prove your worth. Fill out the scouting form below to apply for a trial with Young Boys FA.
        </p>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        {submitted ? (
          <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-12 text-center">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-green-900 mb-4">Application Received!</h2>
            <p className="text-green-800 text-lg mb-6">
              Thank you for applying. Our coaching staff will review your profile. If selected, we will contact you via phone or email with your trial date and venue.
            </p>
            <button onClick={() => setSubmitted(false)} className="bg-brand-yellow text-brand-black px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors">
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-brand-lightGray p-8 md:p-12 rounded-2xl border border-brand-yellow/20 shadow-xl">
            <h2 className="text-2xl font-bold text-brand-black mb-8 flex items-center gap-2">
              <Shield className="text-brand-yellow" /> Player Information
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-brand-black font-semibold mb-2">First Name *</label>
                <input required type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 focus:border-brand-yellow focus:outline-none" />
              </div>
              <div>
                <label className="block text-brand-black font-semibold mb-2">Middle Name</label>
                <input type="text" value={formData.middleName} onChange={(e) => setFormData({...formData, middleName: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 focus:border-brand-yellow focus:outline-none" />
              </div>
              <div>
                <label className="block text-brand-black font-semibold mb-2">Last Name *</label>
                <input required type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 focus:border-brand-yellow focus:outline-none" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-brand-black font-semibold mb-2"><Trophy className="inline w-4 h-4 mr-1" /> Former Team / Club</label>
                <input type="text" value={formData.formerTeam} onChange={(e) => setFormData({...formData, formerTeam: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 focus:border-brand-yellow focus:outline-none" placeholder="e.g. Surulere FC" />
              </div>
              <div>
                <label className="block text-brand-black font-semibold mb-2"><MapPin className="inline w-4 h-4 mr-1" /> Current Location *</label>
                <input required type="text" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 focus:border-brand-yellow focus:outline-none" placeholder="e.g. Surulere, Lagos" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-brand-black font-semibold mb-2">Age Group *</label>
                <select required value={formData.ageGroup} onChange={(e) => setFormData({...formData, ageGroup: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 focus:border-brand-yellow focus:outline-none">
                  <option value="">Select Age Group</option>
                  {ageGroups.map(age => <option key={age} value={age}>{age}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-brand-black font-semibold mb-2"><Footprints className="inline w-4 h-4 mr-1" /> Preferred Foot *</label>
                <select required value={formData.preferredFoot} onChange={(e) => setFormData({...formData, preferredFoot: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 focus:border-brand-yellow focus:outline-none">
                  <option value="">Select Foot</option>
                  {feet.map(foot => <option key={foot} value={foot}>{foot}</option>)}
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-brand-black font-semibold mb-3">Positions Played (Select all that apply) *</label>
              <div className="flex flex-wrap gap-2">
                {positions.map(pos => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => togglePosition(pos)}
                    className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                      formData.positionsPlayed.includes(pos) 
                        ? "bg-brand-yellow text-brand-black shadow-md" 
                        : "bg-brand-white text-brand-darkGray border border-brand-yellow/30 hover:bg-brand-yellow/20"
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-brand-black font-semibold mb-2">Best Position Played *</label>
              <select required value={formData.bestPosition} onChange={(e) => setFormData({...formData, bestPosition: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 focus:border-brand-yellow focus:outline-none">
                <option value="">Select your best position</option>
                {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
              </select>
            </div>

            <h2 className="text-2xl font-bold text-brand-black mb-6 flex items-center gap-2 pt-6 border-t border-brand-yellow/20">
              <FileText className="text-brand-yellow" /> Coach's Evaluation
            </h2>

            <div className="mb-6">
              <label className="block text-brand-black font-semibold mb-2">Quick Note About Yourself *</label>
              <textarea required rows={3} value={formData.quickNote} onChange={(e) => setFormData({...formData, quickNote: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 focus:border-brand-yellow focus:outline-none resize-none" placeholder="e.g. I am a fast winger with great crossing ability..." />
            </div>

            <div className="mb-8">
              <label className="block text-brand-black font-semibold mb-2">Why should we give you a trial? *</label>
              <textarea required rows={5} value={formData.motivationLetter} onChange={(e) => setFormData({...formData, motivationLetter: e.target.value})} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 focus:border-brand-yellow focus:outline-none resize-none" placeholder="Write a short letter to the coaching staff explaining your dedication, work ethic, and why you deserve a spot..." />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-yellow text-brand-black py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Submitting Application...</> : <><Send size={20} /> Submit Trial Application</>}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
