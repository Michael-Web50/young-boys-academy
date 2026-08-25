"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getPlayers, getCoaches, getNewsArticles, getSponsors, getFixtures, createSponsorshipApplication } from "./sanity-queries";
import { urlFor } from "./sanity";

export interface Player { id: string; firstName: string; middleName: string; lastName: string; nameOnShirt: string; position: string; shirtNumber: number; ageGroup: string; dateOfBirth: string; nationality: string; height: string; image: string; }
export interface NewsArticle { id: string; title: string; excerpt: string; date: string; category: string; image: string; author: string; }
export interface Sponsor { id: string; name: string; logo: string; tier: string; }
export interface Coach { id: string; firstName: string; lastName: string; role: string; image: string; bio: string; license: string; experience: string; specialties: string; }
export interface Application { id: string; companyName: string; contactPerson: string; email: string; phone: string; sponsorshipType: string; message: string; status: "pending" | "contacted" | "approved" | "rejected"; submittedAt: string; }
export interface Fixture { id: string; opponentName: string; ageGroup: string; matchDate: string; matchTime: string; location: string; isHomeGame: boolean; status: string; ourScore?: number; opponentScore?: number; }

export interface DataContextType {
  players: Player[]; news: NewsArticle[]; sponsors: Sponsor[]; coaches: Coach[]; applications: Application[]; fixtures: Fixture[]; isLoading: boolean;
  addPlayer: (player: Omit<Player, "id">) => void; updatePlayer: (id: string, player: Partial<Player>) => void; deletePlayer: (id: string) => void;
  addNews: (article: Omit<NewsArticle, "id">) => void; updateNews: (id: string, article: Partial<NewsArticle>) => void; deleteNews: (id: string) => void;
  addSponsor: (sponsor: Omit<Sponsor, "id">) => void; updateSponsor: (id: string, sponsor: Partial<Sponsor>) => void; deleteSponsor: (id: string) => void;
  addCoach: (coach: Omit<Coach, "id">) => void; updateCoach: (id: string, coach: Partial<Coach>) => void; deleteCoach: (id: string) => void;
  addApplication: (application: Omit<Application, "id" | "status" | "submittedAt">) => Promise<void>; updateApplication: (id: string, updates: Partial<Application>) => void; deleteApplication: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [playersData, coachesData, newsData, sponsorsData, fixturesData] = await Promise.all([
          getPlayers().catch(() => []), getCoaches().catch(() => []), getNewsArticles().catch(() => []), getSponsors().catch(() => []), getFixtures().catch(() => []),
        ]);

        setPlayers((playersData as any[]).map((p: any) => ({ id: p._id, firstName: p.firstName, middleName: p.middleName || "", lastName: p.lastName, nameOnShirt: p.nameOnShirt, position: p.position, shirtNumber: p.shirtNumber, ageGroup: p.ageGroup, dateOfBirth: p.dateOfBirth || "", nationality: p.nationality || "Nigerian", height: p.height || "", image: p.photo ? urlFor(p.photo).url() : "" })));
        setCoaches((coachesData as any[]).map((c: any) => ({ id: c._id, firstName: c.firstName, lastName: c.lastName, role: c.role, image: c.photo ? urlFor(c.photo).url() : "", bio: c.bio, license: c.license, experience: c.experience, specialties: c.specialties })));
        setNews((newsData as any[]).map((n: any) => ({ id: n._id, title: n.title, excerpt: n.excerpt, date: new Date(n.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), category: n.category, image: n.featuredImage ? urlFor(n.featuredImage).url() : "", author: n.author })));
        setSponsors((sponsorsData as any[]).map((s: any) => ({ id: s._id, name: s.name, logo: s.logo ? urlFor(s.logo).url() : "", tier: s.tier })));
        
        setFixtures((fixturesData as any[]).map((f: any) => ({
          id: f._id,
          opponentName: f.opponentName,
          ageGroup: f.ageGroup,
          matchDate: f.matchDate,
          matchTime: f.matchTime,
          location: f.location,
          isHomeGame: f.isHomeGame,
          status: f.status,
          ourScore: f.ourScore,
          opponentScore: f.opponentScore,
        })));

      } catch (error) { console.error("Error fetching data:", error); } finally { setIsLoading(false); }
    }
    fetchData();
  }, []);

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
  const addApplication = async (application: Omit<Application, "id" | "status" | "submittedAt">) => {
    const newApp: Application = { ...application, id: Date.now().toString(), status: "pending", submittedAt: new Date().toISOString() };
    try { await createSponsorshipApplication(application); setApplications([newApp, ...applications]); } catch (error) { console.error("Error submitting to Sanity, saving locally:", error); setApplications([newApp, ...applications]); }
  };
  const updateApplication = (id: string, updates: Partial<Application>) => setApplications(applications.map((a: Application) => (a.id === id ? { ...a, ...updates } : a)));
  const deleteApplication = (id: string) => setApplications(applications.filter((a: Application) => a.id !== id));

  return (
    <DataContext.Provider value={{ players, news, sponsors, coaches, applications, fixtures, isLoading, addPlayer, updatePlayer, deletePlayer, addNews, updateNews, deleteNews, addSponsor, updateSponsor, deleteSponsor, addCoach, updateCoach, deleteCoach, addApplication, updateApplication, deleteApplication }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
}
