"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Player {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nameOnShirt: string;
  position: string;
  shirtNumber: number;
  ageGroup: string;
  dateOfBirth: string;
  nationality: string;
  height: string;
  image: string;
}

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: string;
}

interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: string;
}

interface Coach {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  image: string;
  bio: string;
  license: string;
  experience: string;
  specialties: string;
}

interface Application {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  sponsorshipType: string;
  message: string;
  status: "pending" | "contacted" | "approved" | "rejected";
  submittedAt: string;
}

interface DataContextType {
  players: Player[];
  news: NewsArticle[];
  sponsors: Sponsor[];
  coaches: Coach[];
  applications: Application[];
  addPlayer: (player: Omit<Player, "id">) => void;
  updatePlayer: (id: string, player: Partial<Player>) => void;
  deletePlayer: (id: string) => void;
  addNews: (article: Omit<NewsArticle, "id">) => void;
  updateNews: (id: string, article: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;
  addSponsor: (sponsor: Omit<Sponsor, "id">) => void;
  updateSponsor: (id: string, sponsor: Partial<Sponsor>) => void;
  deleteSponsor: (id: string) => void;
  addCoach: (coach: Omit<Coach, "id">) => void;
  updateCoach: (id: string, coach: Partial<Coach>) => void;
  deleteCoach: (id: string) => void;
  addApplication: (application: Omit<Application, "id" | "status" | "submittedAt">) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialCoaches: Coach[] = [
  { id: "1", firstName: "Adeyemi", lastName: "Johnson", role: "Head Coach", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop", bio: "A passionate football coach with over 15 years of experience developing young talent in Lagos. Coach Adeyemi believes in discipline, hardwork, and consistency as the foundation of every great player.", license: "CAF License A", experience: "15+ Years", specialties: "Tactical Training, Youth Development, Match Strategy" },
  { id: "2", firstName: "Ibrahim", lastName: "Mohammed", role: "Assistant Coach", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop", bio: "Coach Ibrahim brings energy and tactical intelligence to every training session. He specializes in developing midfielders and attacking players with sharp decision-making skills.", license: "CAF License B", experience: "10+ Years", specialties: "Midfield Training, Attacking Play, Set Pieces" },
  { id: "3", firstName: "Chukwu", lastName: "Emeka", role: "Goalkeeper Coach", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop", bio: "A former professional goalkeeper, Coach Chukwu mentors our young keepers with specialized drills that build reflexes, positioning, and confidence between the posts.", license: "FIFA Goalkeeping Diploma", experience: "12+ Years", specialties: "Goalkeeping Techniques, Reflex Training, Distribution" },
  { id: "4", firstName: "Bakare", lastName: "Yusuf", role: "Fitness Coach", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop", bio: "Coach Bakare designs age-appropriate fitness programs that build speed, agility, and endurance while prioritizing injury prevention for growing athletes.", license: "NSCA Certified Strength Coach", experience: "8+ Years", specialties: "Athletic Conditioning, Injury Prevention, Nutrition" },
];

const initialPlayers: Player[] = [
  { id: "1", firstName: "Adebayo", middleName: "Oluwaseun", lastName: "Johnson", nameOnShirt: "A. JOHNSON", position: "ST", shirtNumber: 9, ageGroup: "U12", dateOfBirth: "2012-03-15", nationality: "Nigerian", height: "4'8\"", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
];

const initialNews: NewsArticle[] = [
  { id: "1", title: "U17 Team Wins Surulere Youth League Championship!", excerpt: "Our U17 squad secured the championship title after a thrilling 3-2 victory in the final match.", date: "August 20, 2026", category: "Match Report", image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=500&fit=crop", author: "Coach Adeyemi" },
];

const initialSponsors: Sponsor[] = [
  { id: "1", name: "Lagos Sports Foundation", logo: "LSF", tier: "Gold" },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const storedPlayers = localStorage.getItem("ybfa_players");
    const storedNews = localStorage.getItem("ybfa_news");
    const storedSponsors = localStorage.getItem("ybfa_sponsors");
    const storedCoaches = localStorage.getItem("ybfa_coaches");
    const storedApplications = localStorage.getItem("ybfa_applications");

    setPlayers(storedPlayers ? JSON.parse(storedPlayers) : initialPlayers);
    setNews(storedNews ? JSON.parse(storedNews) : initialNews);
    setSponsors(storedSponsors ? JSON.parse(storedSponsors) : initialSponsors);
    setCoaches(storedCoaches ? JSON.parse(storedCoaches) : initialCoaches);
    setApplications(storedApplications ? JSON.parse(storedApplications) : []);
  }, []);

  useEffect(() => { localStorage.setItem("ybfa_players", JSON.stringify(players)); }, [players]);
  useEffect(() => { localStorage.setItem("ybfa_news", JSON.stringify(news)); }, [news]);
  useEffect(() => { localStorage.setItem("ybfa_sponsors", JSON.stringify(sponsors)); }, [sponsors]);
  useEffect(() => { localStorage.setItem("ybfa_coaches", JSON.stringify(coaches)); }, [coaches]);
  useEffect(() => { localStorage.setItem("ybfa_applications", JSON.stringify(applications)); }, [applications]);

  const addPlayer = (player: Omit<Player, "id">) => setPlayers([...players, { ...player, id: Date.now().toString() }]);
  const updatePlayer = (id: string, updates: Partial<Player>) => setPlayers(players.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  const deletePlayer = (id: string) => setPlayers(players.filter((p) => p.id !== id));

  const addNews = (article: Omit<NewsArticle, "id">) => setNews([{ ...article, id: Date.now().toString() }, ...news]);
  const updateNews = (id: string, updates: Partial<NewsArticle>) => setNews(news.map((n) => (n.id === id ? { ...n, ...updates } : n)));
  const deleteNews = (id: string) => setNews(news.filter((n) => n.id !== id));

  const addSponsor = (sponsor: Omit<Sponsor, "id">) => setSponsors([...sponsors, { ...sponsor, id: Date.now().toString() }]);
  const updateSponsor = (id: string, updates: Partial<Sponsor>) => setSponsors(sponsors.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  const deleteSponsor = (id: string) => setSponsors(sponsors.filter((s) => s.id !== id));

  const addCoach = (coach: Omit<Coach, "id">) => setCoaches([...coaches, { ...coach, id: Date.now().toString() }]);
  const updateCoach = (id: string, updates: Partial<Coach>) => setCoaches(coaches.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  const deleteCoach = (id: string) => setCoaches(coaches.filter((c) => c.id !== id));

  const addApplication = (application: Omit<Application, "id" | "status" | "submittedAt">) => {
    const newApp: Application = {
      ...application,
      id: Date.now().toString(),
      status: "pending",
      submittedAt: new Date().toISOString(),
    };
    setApplications([newApp, ...applications]);
  };
  const updateApplication = (id: string, updates: Partial<Application>) => setApplications(applications.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  const deleteApplication = (id: string) => setApplications(applications.filter((a) => a.id !== id));

  return (
    <DataContext.Provider
      value={{
        players, news, sponsors, coaches, applications,
        addPlayer, updatePlayer, deletePlayer,
        addNews, updateNews, deleteNews,
        addSponsor, updateSponsor, deleteSponsor,
        addCoach, updateCoach, deleteCoach,
        addApplication, updateApplication, deleteApplication,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
}
