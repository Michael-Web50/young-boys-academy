"use client";

import Header from "@/components/layout/Header";
import { MapPin, Phone, Mail, Clock, Navigation, Target, Award } from "lucide-react";

export default function AboutPage() {
  const academyLocation = "Sanya Street, Surulere, Lagos, Nigeria";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(academyLocation)}`;
  const appleMapsUrl = `http://maps.apple.com/?q=${encodeURIComponent(academyLocation)}`;

  const handleGetDirections = () => {
    // Detect device and open appropriate maps app
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      window.open(appleMapsUrl, '_blank');
    } else {
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          About <span className="text-brand-yellow">Young Boys</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          Building champions on and off the pitch since 2020
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-brand-lightGray p-8 rounded-2xl border-l-4 border-brand-yellow">
            <Target className="w-12 h-12 text-brand-yellow mb-4" />
            <h2 className="text-3xl font-bold text-brand-black mb-4">Our Mission</h2>
            <p className="text-brand-darkGray leading-relaxed">
              To develop young football talents through professional training, instilling discipline, hardwork, and consistency while providing a pathway to professional football careers.
            </p>
          </div>
          <div className="bg-brand-lightGray p-8 rounded-2xl border-l-4 border-brand-yellow">
            <Award className="w-12 h-12 text-brand-yellow mb-4" />
            <h2 className="text-3xl font-bold text-brand-black mb-4">Our Vision</h2>
            <p className="text-brand-darkGray leading-relaxed">
              To become Lagos' premier football academy, producing world-class players who represent Nigeria with pride and excellence at national and international levels.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-brand-black text-brand-white p-8 md:p-12 rounded-2xl mb-16">
          <h2 className="text-3xl font-bold mb-6 text-brand-yellow">Our Story</h2>
          <div className="space-y-4 text-brand-white/90 leading-relaxed">
            <p>
              Young Boys Football Academy was founded in 2020 in the heart of Surulere, Lagos, with a simple yet powerful vision: to provide young talented footballers with professional training and a real pathway to success.
            </p>
            <p>
              Located on Sanya Street, we've grown from a small neighborhood training group to a structured academy with four age groups (U12, U15, U17, and U20), coaching staff with CAF and FIFA certifications, and a proven track record of developing players who go on to play at higher levels.
            </p>
            <p>
              Our philosophy is built on three core pillars: <span className="text-brand-yellow font-bold">Discipline, Hardwork, and Consistency</span>. We believe that talent alone is not enough - it takes dedication, structure, and relentless effort to become a champion.
            </p>
          </div>
        </div>
      </section>

      {/* Find Us Section with Map */}
      <section className="py-16 px-4 bg-brand-lightGray">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Info */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-yellow/10 border border-brand-yellow/30 rounded-full px-4 py-1.5 mb-6">
                <MapPin className="w-4 h-4 text-brand-yellow" />
                <span className="text-brand-yellow text-sm font-semibold tracking-wide uppercase">VISIT US</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold text-brand-black mb-6">
                Find <span className="text-brand-yellow">Us</span>
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brand-yellow flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-brand-black text-lg">Training Ground</h4>
                    <p className="text-brand-darkGray">Sanya Street, Surulere<br />Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-brand-yellow flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-brand-black text-lg">Training Hours</h4>
                    <p className="text-brand-darkGray">Tuesday, Thursday & Saturday<br />4:00 PM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-brand-yellow flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-brand-black text-lg">Contact</h4>
                    <p className="text-brand-darkGray">Phone: 0805 591 2351<br />Email: yboysfa@gmail.com</p>
                  </div>
                </div>
              </div>

              {/* Get Directions Button */}
              <button
                onClick={handleGetDirections}
                className="w-full sm:w-auto bg-brand-yellow text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                <Navigation className="w-5 h-5" />
                Get Directions
              </button>

              <p className="text-sm text-brand-darkGray/60 mt-4">
                Opens in Google Maps (Android) or Apple Maps (iOS)
              </p>
            </div>

            {/* Right Side - Interactive Map */}
            <div className="bg-brand-black p-2 rounded-2xl border-2 border-brand-yellow/30 shadow-2xl">
              <div className="relative w-full h-96 rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.726!2d3.356!3d6.504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzAnMTQuNCJOIDPCsDIxJzIxLjYiRQ!5e0!3m2!1sen!2sng!4v1234567890`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Young Boys Football Academy Location"
                  className="rounded-xl"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-brand-white text-sm">
                  <MapPin className="w-4 h-4 inline mr-2 text-brand-yellow" />
                  Sanya Street, Surulere, Lagos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Train With Us */}
      <section className="py-16 px-4 bg-brand-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black text-center mb-12">
            Why Train With <span className="text-brand-yellow">Young Boys?</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-brand-black" />
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-2">Professional Coaching</h3>
              <p className="text-brand-darkGray">CAF & FIFA certified coaches with years of experience</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-brand-black" />
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-2">Structured Programs</h3>
              <p className="text-brand-darkGray">Age-appropriate training designed for maximum development</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="w-8 h-8 text-brand-black" />
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-2">Career Pathway</h3>
              <p className="text-brand-darkGray">Connections to professional clubs and scouting opportunities</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
