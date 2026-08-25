"use client";

import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Training", href: "/training" },
  { name: "Teams", href: "/teams" },
  { name: "Staff", href: "/coaching-staff" },
  { name: "News", href: "/news" },
  { name: "Support", href: "/support" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("ybfa_admin_auth");
    if (auth === "true") setIsAdmin(true);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-black/95 backdrop-blur-sm border-b border-brand-yellow/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-brand-yellow tracking-tight">
              YOUNG BOYS <span className="text-brand-white">ACADEMY</span>
            </h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-brand-white hover:text-brand-yellow transition-colors duration-300 font-medium text-sm uppercase tracking-wide"
              >
                {link.name}
              </Link>
            ))}
            
            <Link 
              href="/admin" 
              className={`p-2 rounded-full transition-colors duration-300 ${
                isAdmin ? "bg-brand-yellow text-brand-black" : "text-brand-white/50 hover:text-brand-yellow hover:bg-brand-white/10"
              }`}
              title={isAdmin ? "Admin Dashboard" : "Admin Access"}
            >
              <Shield size={20} />
            </Link>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <Link href="/admin" className={`p-2 ${isAdmin ? "text-brand-yellow" : "text-brand-white/50"}`}>
              <Shield size={20} />
            </Link>
            <button className="text-brand-yellow p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-brand-darkGray border-t border-brand-yellow/20">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-brand-white hover:text-brand-yellow transition-colors duration-300 font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/admin"
              className="block text-brand-yellow font-bold py-2 border-t border-brand-white/10 mt-2 pt-2"
              onClick={() => setIsOpen(false)}
            >
              {isAdmin ? "⚙️ Admin Dashboard" : "🔒 Admin Access"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
