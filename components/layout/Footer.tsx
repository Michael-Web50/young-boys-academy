"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white border-t border-brand-yellow/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-brand-yellow mb-4">YOUNG BOYS <span className="text-brand-white">ACADEMY</span></h2>
            <p className="text-brand-white/70 mb-4 leading-relaxed">Forging the next generation of champions through discipline, hardwork, and consistency.</p>
            <div className="flex items-center gap-2 text-brand-white/70"><MapPin size={16} className="text-brand-yellow flex-shrink-0" /><span className="text-sm">Sanya Street, Surulere, Lagos</span></div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-brand-yellow mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[{ name: "Home", href: "/" }, { name: "About Us", href: "/about" }, { name: "Training", href: "/training" }, { name: "Teams", href: "/teams" }, { name: "Matches", href: "/matches" }, { name: "News", href: "/news" }, { name: "Support", href: "/support" }].map((link) => (
                <li key={link.name}><Link href={link.href} className="text-brand-white/70 hover:text-brand-yellow transition-colors text-sm">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-brand-yellow mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-brand-white/70 text-sm"><Phone size={16} className="text-brand-yellow flex-shrink-0" /><span>+234 800 000 0000</span></li>
              <li className="flex items-center gap-3 text-brand-white/70 text-sm"><Mail size={16} className="text-brand-yellow flex-shrink-0" /><span>info@youngboysacademy.ng</span></li>
              <li className="flex items-start gap-3 text-brand-white/70 text-sm"><MapPin size={16} className="text-brand-yellow flex-shrink-0 mt-0.5" /><span>Sanya Street, Surulere,<br />Lagos, Nigeria</span></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-brand-yellow mb-4">Follow Us</h3>
            <p className="text-brand-white/70 text-sm mb-4">Stay connected with our latest updates and match highlights.</p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-brand-darkGray hover:bg-brand-yellow text-brand-white hover:text-brand-black rounded-full flex items-center justify-center transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              <a href="#" className="w-10 h-10 bg-brand-darkGray hover:bg-brand-yellow text-brand-white hover:text-brand-black rounded-full flex items-center justify-center transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></a>
              <a href="#" className="w-10 h-10 bg-brand-darkGray hover:bg-brand-yellow text-brand-white hover:text-brand-black rounded-full flex items-center justify-center transition-all duration-300"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
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
