"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import { Heart, Trophy, Users, DollarSign, CheckCircle, Send, Mail, Loader2 } from "lucide-react";
import { useData } from "@/lib/data-context";

export default function SupportPage() {
  const { sponsors, addApplication } = useData();
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    sponsorshipType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const supportOptions = [
    { icon: Heart, title: "Donate", description: "Make a one-time or monthly donation to support our operations, equipment, and player development.", color: "bg-red-600" },
    { icon: Users, title: "Sponsor a Player", description: "Cover the training costs, equipment, and travel expenses for a specific player or entire team.", color: "bg-blue-600" },
    { icon: Trophy, title: "Become a Sponsor", description: "Partner with us as an official sponsor and get brand visibility across all our teams and events.", color: "bg-brand-yellow" },
    { icon: DollarSign, title: "Buy Merchandise", description: "Purchase official academy jerseys, training kits, and merchandise to support the team.", color: "bg-green-600" },
  ];

  const sponsorshipTiers = [
    { name: "Bronze", amount: "₦500,000", benefits: ["Logo on training kits", "Social media mentions", "Website logo placement", "Invitation to academy events"] },
    { name: "Silver", amount: "₦1,500,000", benefits: ["All Bronze benefits", "Logo on match day jerseys", "Banner at training ground", "Featured in newsletters", "VIP access to matches"] },
    { name: "Gold", amount: "₦3,000,000", benefits: ["All Silver benefits", "Naming rights for a team", "Exclusive sponsorship plaque", "Press conference mentions", "Priority partnership renewal", "Custom branded content"] },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSubmitted(false);

    // REPLACE THIS WITH YOUR ACTUAL FORMSPREE ENDPOINT URL
    const formEndpoint = "https://formspree.io/f/xzepnala"; 

    const formDataObj = new FormData();
    formDataObj.append("Company Name", formData.companyName);
    formDataObj.append("Contact Person", formData.contactPerson);
    formDataObj.append("Email", formData.email);
    formDataObj.append("Phone", formData.phone);
    formDataObj.append("Sponsorship Tier", formData.sponsorshipType);
    formDataObj.append("Message", formData.message);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formDataObj,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Also save to Sanity Dashboard
        try {
          await addApplication({
            companyName: formData.companyName,
            contactPerson: formData.contactPerson,
            email: formData.email,
            phone: formData.phone,
            sponsorshipType: formData.sponsorshipType,
            message: formData.message,
          });
        } catch (sanityError) {
          console.log("Saved locally, Sanity sync pending:", sanityError);
        }

        setSubmitted(true);
        setFormData({ companyName: "", contactPerson: "", email: "", phone: "", sponsorshipType: "", message: "" });
      } else {
        setError("Failed to send application. Please try again.");
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
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          Support & <span className="text-brand-yellow">Sponsorship</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          Join us in nurturing the next generation of football champions. Your support makes a difference.
        </p>
      </section>

      <section className="py-16 px-4 bg-brand-lightGray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-12">
            Our <span className="text-brand-yellow">Sponsors</span>
          </h2>
          {sponsors.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="bg-brand-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 text-center border-t-4 border-brand-yellow">
                  <div className="w-20 h-20 bg-brand-black rounded-full flex items-center justify-center mx-auto mb-4">
                    {sponsor.logo ? (
                      <img src={sponsor.logo} alt={sponsor.name} className="w-16 h-16 object-contain" />
                    ) : (
                      <span className="text-brand-yellow font-bold text-xl">{sponsor.name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-brand-black mb-1">{sponsor.name}</h3>
                  <span className="text-xs text-brand-yellow font-semibold">{sponsor.tier} Sponsor</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-brand-darkGray">No sponsors yet. Be the first to support us!</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-12">
            Ways to <span className="text-brand-yellow">Support</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-brand-black p-8 rounded-2xl text-brand-white hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className={`${option.color} w-16 h-16 rounded-full flex items-center justify-center mb-6`}>
                  <option.icon className="w-8 h-8 text-brand-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{option.title}</h3>
                <p className="text-brand-white/70 text-sm leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-brand-lightGray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-4">
            Sponsorship <span className="text-brand-yellow">Packages</span>
          </h2>
          <p className="text-center text-brand-darkGray mb-12 max-w-2xl mx-auto">
            Choose the sponsorship tier that best fits your organization's goals and budget.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {sponsorshipTiers.map((tier, index) => (
              <div key={index} className={`bg-brand-white p-8 rounded-2xl shadow-xl border-2 ${tier.name === "Gold" ? "border-brand-yellow transform scale-105" : "border-transparent"}`}>
                {tier.name === "Gold" && (
                  <div className="bg-brand-yellow text-brand-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block mb-4">Most Popular</div>
                )}
                <h3 className="text-3xl font-extrabold text-brand-black mb-2">{tier.name}</h3>
                <p className="text-4xl font-bold text-brand-yellow mb-6">{tier.amount}</p>
                <p className="text-sm text-brand-darkGray mb-6">per season</p>
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-brand-darkGray">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <a href="#application-form" className="block w-full text-center bg-brand-black text-brand-white py-3 rounded-lg font-bold hover:bg-brand-yellow hover:text-brand-black transition-colors">
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="application-form" className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-black text-center mb-4">
            Sponsorship <span className="text-brand-yellow">Application</span>
          </h2>
          <p className="text-center text-brand-darkGray mb-12">
            Fill out the form below and our partnership team will contact you within 48 hours.
          </p>

          {submitted && (
            <div className="mb-8 bg-green-50 border-2 border-green-300 rounded-xl p-6 flex items-start gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-900 mb-1">Application Sent Successfully!</h3>
                <p className="text-green-800 text-sm">Thank you for your interest. We have received your application and will contact you shortly.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-8 bg-red-50 border-2 border-red-300 rounded-xl p-6 flex items-start gap-4">
              <div className="w-8 h-8 text-red-600 flex-shrink-0 font-bold text-xl">!</div>
              <div>
                <h3 className="font-bold text-red-900 mb-1">Something went wrong</h3>
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-brand-lightGray p-8 rounded-2xl border border-brand-yellow/20">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-brand-black font-semibold mb-2">Company Name *</label>
                <input type="text" required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" placeholder="Your company name" />
              </div>
              <div>
                <label className="block text-brand-black font-semibold mb-2">Contact Person *</label>
                <input type="text" required value={formData.contactPerson} onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" placeholder="Full name" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-brand-black font-semibold mb-2">Email Address *</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block text-brand-black font-semibold mb-2">Phone Number *</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none" placeholder="+234 800 000 0000" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-brand-black font-semibold mb-2">Sponsorship Tier *</label>
              <select required value={formData.sponsorshipType} onChange={(e) => setFormData({ ...formData, sponsorshipType: e.target.value })} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none">
                <option value="">Select a tier</option>
                <option value="bronze">Bronze - ₦500,000</option>
                <option value="silver">Silver - ₦1,500,000</option>
                <option value="gold">Gold - ₦3,000,000</option>
                <option value="custom">Custom Package</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-brand-black font-semibold mb-2">Message (Optional)</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full px-4 py-3 rounded-lg bg-brand-white border border-brand-yellow/30 text-brand-black focus:border-brand-yellow focus:outline-none resize-none" placeholder="Tell us about your organization and why you want to partner with us..." />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-brand-yellow text-brand-black py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Sending Application...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Submit Application
                </>
              )}
            </button>
            <p className="text-xs text-brand-darkGray/60 text-center mt-4 flex items-center justify-center gap-1">
              <Mail size={12} /> Your application will be sent directly to our partnership team.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
