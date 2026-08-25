"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/lib/data-context";
import { 
  Users, FileText, Award, LogOut, LayoutDashboard, Shield, UserCog, Inbox
} from "lucide-react";
import CoachesTab from "@/components/admin/CoachesTab";
import PlayersTab from "@/components/admin/PlayersTab";
import NewsTab from "@/components/admin/NewsTab";
import SponsorsTab from "@/components/admin/SponsorsTab";
import OverviewTab from "@/components/admin/OverviewTab";
import ApplicationsTab from "@/components/admin/ApplicationsTab";

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { applications } = useData();

  const pendingCount = applications.filter(a => a.status === "pending").length;

  useEffect(() => {
    const auth = localStorage.getItem("ybfa_admin_auth");
    if (auth === "true") setIsLoggedIn(true);
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("ybfa_admin_auth", "true");
      setIsLoggedIn(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ybfa_admin_auth");
    setIsLoggedIn(false);
    router.push("/");
  };

  if (isLoading) {
    return <div className="min-h-screen bg-brand-black flex items-center justify-center text-brand-yellow">Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-brand-black flex items-center justify-center p-4">
        <div className="bg-brand-darkGray p-8 rounded-2xl border-2 border-brand-yellow/30 max-w-md w-full shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-brand-black" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-brand-white text-center mb-2">Admin Access</h1>
          <p className="text-brand-white/60 text-center mb-6">Young Boys Football Academy</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-brand-white/80 text-sm mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-brand-black border border-brand-yellow/30 text-brand-white focus:border-brand-yellow focus:outline-none focus:ring-1 focus:ring-brand-yellow"
                placeholder="Enter password"
                autoFocus
              />
            </div>
            <button type="submit" className="w-full bg-brand-yellow text-brand-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
              <Shield size={18} /> Access Dashboard
            </button>
          </form>
        </div>
      </main>
    );
  }

  const tabTitles: Record<string, string> = {
    overview: "Overview",
    players: "Players",
    coaches: "Coaching Staff",
    news: "News & Updates",
    sponsors: "Sponsors",
    applications: "Sponsorship Applications",
  };

  return (
    <div className="min-h-screen bg-brand-lightGray flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-brand-black text-brand-white flex-shrink-0 border-r border-brand-yellow/20 md:min-h-screen">
        <div className="p-6 border-b border-brand-yellow/20">
          <h2 className="text-xl font-bold text-brand-yellow">YBFA Admin</h2>
          <p className="text-xs text-brand-white/50 mt-1">Management Portal</p>
        </div>
        
        <nav className="p-4 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20} />} label="Overview" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <SidebarItem icon={<Users size={20} />} label="Players" active={activeTab === "players"} onClick={() => setActiveTab("players")} />
          <SidebarItem icon={<UserCog size={20} />} label="Coaching Staff" active={activeTab === "coaches"} onClick={() => setActiveTab("coaches")} />
          <SidebarItem icon={<FileText size={20} />} label="News & Updates" active={activeTab === "news"} onClick={() => setActiveTab("news")} />
          <SidebarItem icon={<Award size={20} />} label="Sponsors" active={activeTab === "sponsors"} onClick={() => setActiveTab("sponsors")} />
          <SidebarItem 
            icon={<Inbox size={20} />} 
            label="Applications" 
            active={activeTab === "applications"} 
            onClick={() => setActiveTab("applications")}
            badge={pendingCount > 0 ? pendingCount : undefined}
          />
        </nav>

        <div className="p-4 border-t border-brand-yellow/20 mt-auto">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-brand-white/70 hover:text-brand-white hover:bg-brand-darkGray rounded-lg transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen">
        <header className="bg-brand-white border-b border-brand-yellow/20 px-8 py-4 flex items-center justify-between sticky top-0 z-30">
          <h1 className="text-2xl font-bold text-brand-black">
            {tabTitles[activeTab]} Management
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-brand-black font-bold">A</div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-brand-black">Administrator</p>
              <p className="text-xs text-brand-darkGray/60">Super Admin</p>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "players" && <PlayersTab />}
          {activeTab === "coaches" && <CoachesTab />}
          {activeTab === "news" && <NewsTab />}
          {activeTab === "sponsors" && <SponsorsTab />}
          {activeTab === "applications" && <ApplicationsTab />}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, badge }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, badge?: number }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg font-medium transition-all ${
        active ? "bg-brand-yellow text-brand-black shadow-lg" : "text-brand-white/70 hover:bg-brand-darkGray hover:text-brand-white"
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge !== undefined && (
        <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
          {badge}
        </span>
      )}
    </button>
  );
}
