"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { Heart, Trophy, Users, DollarSign, CheckCircle, Send, Mail, Loader2, Coins } from "lucide-react";
import { useData } from "@/lib/data-context";

export default function SupportPage() {
  const { sponsors, addApplication } = useData();
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    supportType: "",
    donationAmount: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Formspree endpoint - REPLACE WITH YOUR ACTUAL FORMSPREE ID
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljenjqb"; 

  const supportOptions = [
    { icon: Heart, title: "General Donation", description: "Make a one-time or monthly donation of any amount to support our operations, equipment, and player development.", color: "bg-red-600" },
    { icon: Users, title: "Sponsor a Player", description: "Cover the training costs, equipment, and travel expenses for a specific player or entire team.", color: "bg-blue-600" },
    { icon: Trophy, title: "Become a Sponsor", description: "Partner with us as an official sponsor and get brand visibility across all our teams and events.", color: "bg-brand-yellow" },
    { icon: DollarSign, title: "Buy Merchandise", description: "Purchase official academy jerseys, training kits, and merchandise to support the team.", color: "bg-green-600" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSubmitted(false);

    const formDataObj = new FormData();
    formDataObj.append("Company Name", formData.companyName || "Individual");
    formDataObj.append("Contact Person", formData.contactPerson);
    formDataObj.append("Email", formData.email);
    formDataObj.append("Phone", formData.phone);
    formDataObj.append("Support Type", formData.supportType);
    formDataObj.append("Donation Amount", formData.donationAmount ? `₦${formData.donationAmount}` : "Not specified");
    formDataObj.append("Message", formData.message);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formDataObj,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        try {
          await addApplication({
            companyName: formData.companyName || "Individual Donor",
            contactPerson: formData.contactPerson,
            email: formData.email,
            phone: formData.phone,
            sponsorshipType: formData.supportType,
            message: `${formData.message} | Donation: ₦${formData.donationAmount || "Not specified"}`,
          });
        } catch (sanityError) { console.log("Sanity sync pending:", sanityError); }

        setSubmitted(true);
        setFormData({ companyName: "", contactPerson: "", email: "", phone: "", supportType: "", donationAmount: "", message: "" });
      } else {
        setError("Failed to send. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">Support & <span className="text-brand-yellow">Sponsorship</span></h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">Every contribution counts! Support us in any way you can - no amount is too small.</p>
      </section>

      <section className="py-16 px-4 bg-brand-lightGray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-12">Our <span className="text-brand-yellow">Sponsors</span></h2>
          {sponsors.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="bg-brand-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center border-t-4 border-brand-yellow">
                  <div className="w-20 h-20 bg-brand-black rounded-full flex items-center justify-center mx-auto mb-4">
                    {sponsor.logo ? <img src={sponsor.logo} alt={sponsor.name} className="w-16 h-16 object-contain" /> : <span className="text-brand-yellow font-bold text-xl">{sponsor.name.charAt(0)}</span>}
                  </div>
                  <h3 className="text-sm font-bold text-brand-black mb-1">{sponsor.name}</h3>
                  <span className="text-xs text-brand-yellow font-semibold">{sponsor.tier} Sponsor</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12"><p className="text-brand-darkGray">No sponsors yet. Be the first to support us!</p></div>
          )}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-12">Ways to <span className="text-brand-yellow">Support</span></h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-brand-black p-8 rounded-2xl text-brand-white hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className={`${option.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}><option.icon className="w-8 h-8 text-brand-white" /></div>
                <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                <p className="text-brand-white/70 text-sm leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexible Donation Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand-yellow to-yellow-500">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-black/10 rounded-full px-6 py-2 mb-6">
            <Heart className="w-5 h-5 text-brand-black" />
            <span className="text-brand-black font-semibold">ANY AMOUNT WELCOME</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-black mb-6">
            Every Naira Counts!
          </h2>
          <p className="text-xl text-brand-black/80 mb-8 max-w-2xl mx-auto">
            Whether it's ₦1,000 or ₦1,000,000 - your support makes a real difference in a young player's life. We accept donations of any amount.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-brand-black/70">
            <div className="flex items-center gap-2 bg-brand-white/50 px-4 py-2 rounded-full">
              <Coins className="w-5 h-5" />
              <span className="font-semibold">₦1,000</span>
              <span className="text-sm">- Training cones</span>
            </div>
            <div className="flex items-center gap-2 bg-brand-white/50 px-4 py-2 rounded-full">
              <Coins className="w-5 h-5" />
              <span className="font-semibold">₦5,000</span>
              <span className="text-sm">- Water bottles</span>
            </div>
            <div className="flex items-center gap-2 bg-brand-white/50 px-4 py-2 rounded-full">
              <Coins className="w-5 h-5" />
              <span className="font-semibold">₦10,000</span>
              <span className="text-sm">- Training bibs</span>
            </div>
            <div className="flex items-center gap-2 bg-brand-white/50 px-4 py-2 rounded-full">
              <Coins className="w-5 h-5" />
              <span className="font-semibold">₦50,000+</span>
              <span className="text-sm">- Equipment & kits</span>
            </div>
          </div>
        </div>
      </section>

      <section id="support-form" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-4">
            Make a <span className="text-brand-yellow">Contribution</span>
          </h2>
          <p className="text-center text-brand-darkGray mb-12">
            Fill out the form below. Any amount you can give will be appreciated!
          </p>

          {submitted && (
            <div className="mb-8 bg-green-50 border-2 border-green-300 rounded-xl p-6 flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div><h3 className="font-bold text-green-900 mb-1">Thank You for Your Support!</h3><p className="text-green-800 text-sm">We've received your contribution details and will contact you shortly with payment instructions.</p></div>
            </div>
          )}

          {error && (
            <div className="mb-8 bg-red-50 border-2 border-red-300 rounded-xl p-6 flex items-start gap-4">
              <div className="w-8 h-8 text-red-600 flex-shrink-0 font-bold text-xl">!</div>
              <div><h3 className="font-bold text-red-900 mb-1">Something went wrong</h3><p className="text-red-800 text-sm">{error}</p></div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-brand-lightGray p-8 rounded-2xl border border-brand-yellow/20">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div><label className="block text-brand-black font-semibold mb-2">Company/Organization (Optional)</label><input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" placeholder="Your company name" /></div>
              <div><label className="block text-brand-black font-semibold mb-2">Your Name *</label><input type="text" required value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" placeholder="Full name" /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div><label className="block text-brand-black font-semibold mb-2">Email Address *</label><input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" placeholder="your@email.com" /></div>
              <div><label className="block text-brand-black font-semibold mb-2">Phone Number *</label><input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" placeholder="+234 800 000 0000" /></div>
            </div>
            <div className="mb-6">
              <label className="block text-brand-black font-semibold mb-2">Type of Support *</label>
              <select required value={formData.supportType} onChange={(e) => setFormData({ ...formData, supportType: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none">
                <option value="">Select support type</option>
                <option value="General Donation">General Donation (Any Amount)</option>
                <option value="Sponsor a Player">Sponsor a Player</option>
                <option value="Equipment Support">Equipment Support</option>
                <option value="Training Facilities">Training Facilities</option>
                <option value="Team Sponsorship">Team Sponsorship</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-brand-black font-semibold mb-2">Donation Amount (₦) - Optional</label>
              <div className="relative">
                <Coins className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-yellow" />
                <input 
                  type="number" 
                  value={formData.donationAmount} 
                  onChange={(e) => setFormData({ ...formData, donationAmount: e.target.value })} 
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" 
                  placeholder="Enter any amount (e.g., 5000)" 
                  min="0"
                />
              </div>
              <p className="text-xs text-brand-darkGray/60 mt-2">💡 Any amount is welcome! From ₦1,000 to ₦1,000,000 - every naira helps us develop young champions.</p>
            </div>
            <div className="mb-6">
              <label className="block text-brand-black font-semibold mb-2">Message (Optional)</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none resize-none" placeholder="Tell us how you'd like to support us or any specific questions..." />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full bg-brand-yellow text-brand-black py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Sending...</> : <><Send size={20} /> Send Support Details</>}
            </button>
            <p className="text-xs text-brand-darkGray/60 text-center mt-4 flex items-center justify-center gap-1">
              <Mail size={12} /> We'll contact you with payment details after submission.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
