"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white border-t border-brand-yellow/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & Logo */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="YBFA Logo"
                width={64}
                height={64}
                className="object-contain"
              />
              <div>
                <h2 className="text-xl font-bold text-brand-yellow">YOUNG BOYS</h2>
                <p className="text-brand-white text-sm">ACADEMY</p>
              </div>
            </div>
            <p className="text-brand-white/70 mb-4 leading-relaxed text-sm">
              Forging the next generation of champions through discipline, hardwork, and consistency.
            </p>
            <div className="flex items-center gap-2 text-brand-white/70">
              <MapPin size={16} className="text-brand-yellow flex-shrink-0" />
              <span className="text-sm">Sanya Street, Surulere, Lagos</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-brand-yellow mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Training", href: "/training" },
                { name: "Teams", href: "/teams" },
                { name: "Matches", href: "/matches" },
                { name: "News", href: "/news" },
                { name: "Gallery", href: "/gallery" },
                { name: "Support", href: "/support" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-brand-white/70 hover:text-brand-yellow transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-brand-yellow mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-brand-white/70 text-sm">
                <Phone size={16} className="text-brand-yellow flex-shrink-0" />
                <a href="tel:08055912351" className="hover:text-brand-yellow transition-colors">0805 591 2351</a>
              </li>
              <li className="flex items-center gap-3 text-brand-white/70 text-sm">
                <Mail size={16} className="text-brand-yellow flex-shrink-0" />
                <a href="mailto:yboysfa@gmail.com" className="hover:text-brand-yellow transition-colors">yboysfa@gmail.com</a>
              </li>
              <li className="flex items-start gap-3 text-brand-white/70 text-sm">
                <MapPin size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" />
                <span>Sanya Street, Surulere,<br />Lagos, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-lg font-bold text-brand-yellow mb-4">Follow Us</h3>
            <p className="text-brand-white/70 text-sm mb-4">Stay connected with our latest updates, match highlights, and academy news.</p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/youngboys7980" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-darkGray hover:bg-brand-yellow text-brand-white hover:text-brand-black rounded-full flex items-center justify-center transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.tiktok.com/@youngboysfa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-darkGray hover:bg-brand-yellow text-brand-white hover:text-brand-black rounded-full flex items-center justify-center transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path></svg>
              </a>
              <a href="https://www.facebook.com/share/19NpCESTbw/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-darkGray hover:bg-brand-yellow text-brand-white hover:text-brand-black rounded-full flex items-center justify-center transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-brand-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-white/50 text-sm text-center md:text-left">&copy; {new Date().getFullYear()} Young Boys Football Academy. All rights reserved.</p>
          <p className="text-brand-white/50 text-sm">Discipline. Hardwork. Consistency.</p>
        </div>
      </div>
    </footer>
  );
}
