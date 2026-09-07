"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { Heart, Trophy, Users, DollarSign, CheckCircle, Send, Mail, Loader2, Coins, Copy, Check } from "lucide-react";
import { useData } from "@/lib/data-context";

export default function SupportPage() {
  const { sponsors, addApplication } = useData();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    contributionAmount: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const accountDetails = {
    accountNumber: "8055912351",
    bankName: "OPAY",
    accountName: "FEMI CLEMENT ADEYEMI",
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const supportOptions = [
    { icon: Heart, title: "General Donation", description: "Support our daily operations, training equipment, and facility maintenance.", color: "bg-red-600" },
    { icon: Users, title: "Sponsor a Player", description: "Help cover training costs, equipment, and travel expenses for a talented young player.", color: "bg-blue-600" },
    { icon: Trophy, title: "Become a Sponsor", description: "Partner with us as an official sponsor and get brand visibility across all our teams and events.", color: "bg-brand-yellow" },
    { icon: DollarSign, title: "Buy Merchandise", description: "Purchase official academy jerseys, training kits, and merchandise to support the team.", color: "bg-green-600" },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addApplication({
        companyName: "Individual Donor",
        contactPerson: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        sponsorshipType: "General Contribution",
        message: `Contribution: ₦${formData.contributionAmount} | ${formData.message}`,
      });
      
      setSubmitted(true);
      setFormData({ fullName: "", email: "", phoneNumber: "", contributionAmount: "", message: "" });
    } catch (error) {
      console.error("Error submitting:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          Support & <span className="text-brand-yellow">Sponsorship</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          Your support helps us nurture the next generation of football champions.
        </p>
      </section>

      {/* Bank Account Details Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-brand-yellow to-yellow-500">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mb-4">
              Make a Contribution
            </h2>
            <p className="text-xl text-brand-black/80">
              Every naira counts! Use the account details below to make your donation.
            </p>
          </div>

          <div className="bg-brand-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-brand-lightGray p-6 rounded-xl text-center border-2 border-brand-yellow/30">
                <p className="text-brand-darkGray text-sm font-semibold mb-2">Account Number</p>
                <div className="flex items-center justify-center gap-2">
                  <p className="text-2xl md:text-3xl font-extrabold text-brand-black">{accountDetails.accountNumber}</p>
                  <button 
                    onClick={() => copyToClipboard(accountDetails.accountNumber)}
                    className="p-2 bg-brand-yellow rounded-lg hover:bg-yellow-400 transition-colors"
                    title="Copy account number"
                  >
                    {copied ? <Check size={20} className="text-brand-black" /> : <Copy size={20} className="text-brand-black" />}
                  </button>
                </div>
              </div>
              
              <div className="bg-brand-lightGray p-6 rounded-xl text-center border-2 border-brand-yellow/30">
                <p className="text-brand-darkGray text-sm font-semibold mb-2">Bank Name</p>
                <p className="text-2xl md:text-3xl font-extrabold text-brand-black">{accountDetails.bankName}</p>
              </div>
              
              <div className="bg-brand-lightGray p-6 rounded-xl text-center border-2 border-brand-yellow/30">
                <p className="text-brand-darkGray text-sm font-semibold mb-2">Account Name</p>
                <p className="text-lg md:text-xl font-extrabold text-brand-black">{accountDetails.accountName}</p>
              </div>
            </div>

            <div className="bg-brand-black/5 rounded-xl p-6 mb-8">
              <p className="text-brand-black/80 text-center text-sm">
                <strong className="text-brand-black">Important:</strong> After making your contribution, please fill out the form below with your details so we can reach out to thank you personally.
              </p>
            </div>

            {copied && (
              <div className="mb-6 bg-green-100 border-2 border-green-300 rounded-xl p-4 text-center">
                <p className="text-green-800 font-semibold">Account number copied to clipboard!</p>
              </div>
            )}
          </div>
        </div>
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

      {/* Contribution Recognition Form */}
      <section id="support-form" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-4">
            Let Us Thank You
          </h2>
          <p className="text-center text-brand-darkGray mb-12">
            After making your contribution, please fill out this form so we can personally reach out and thank you for your support.
          </p>

          {submitted && (
            <div className="mb-8 bg-green-50 border-2 border-green-300 rounded-xl p-6 flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-900 mb-1">Thank You!</h3>
                <p className="text-green-800 text-sm">We've received your details and will contact you shortly to express our gratitude.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-brand-lightGray p-8 rounded-2xl border border-brand-yellow/20">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-brand-black font-semibold mb-2">Your Full Name *</label>
                <input 
                  type="text" 
                  required 
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" 
                  placeholder="Your full name" 
                />
              </div>
              <div>
                <label className="block text-brand-black font-semibold mb-2">Email Address *</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" 
                  placeholder="your@email.com" 
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-brand-black font-semibold mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" 
                  placeholder="+234 800 000 0000" 
                />
              </div>
              <div>
                <label className="block text-brand-black font-semibold mb-2">Amount Contributed (₦)</label>
                <input 
                  type="number" 
                  value={formData.contributionAmount}
                  onChange={(e) => setFormData({ ...formData, contributionAmount: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" 
                  placeholder="e.g., 5000" 
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-brand-black font-semibold mb-2">Message (Optional)</label>
              <textarea 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none resize-none" 
                placeholder="Any message or specific area you'd like your contribution to support..." 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-brand-yellow text-brand-black py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin" size={20} /> Submitting...</>
              ) : (
                <><Send size={20} /> Submit My Details</>
              )}
            </button>
            
            <p className="text-xs text-brand-darkGray/60 text-center mt-4 flex items-center justify-center gap-1">
              <Mail size={12} /> We'll contact you to personally thank you for your support.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
