"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getPlayers, getCoaches, getNewsArticles, getSponsors, createSponsorshipApplication } from "./sanity-queries";
import { urlFor } from "./sanity";

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

interface DataContextType {
  players: Player[];
  news: NewsArticle[];
  sponsors: Sponsor[];
  coaches: Coach[];
  isLoading: boolean;
  addApplication: (application: any) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [playersData, coachesData, newsData, sponsorsData] = await Promise.all([
          getPlayers(),
          getCoaches(),
          getNewsArticles(),
          getSponsors(),
        ]);

        // Transform Sanity data to match our interface
        setPlayers(playersData.map((p: any) => ({
          id: p._id,
          firstName: p.firstName,
          middleName: p.middleName || "",
          lastName: p.lastName,
          nameOnShirt: p.nameOnShirt,
          position: p.position,
          shirtNumber: p.shirtNumber,
          ageGroup: p.ageGroup,
          dateOfBirth: p.dateOfBirth || "",
          nationality: p.nationality || "Nigerian",
          height: p.height || "",
          image: p.photo ? urlFor(p.photo).url() : "",
        })));

        setCoaches(coachesData.map((c: any) => ({
          id: c._id,
          firstName: c.firstName,
          lastName: c.lastName,
          role: c.role,
          image: c.photo ? urlFor(c.photo).url() : "",
          bio: c.bio,
          license: c.license,
          experience: c.experience,
          specialties: c.specialties,
        })));

        setNews(newsData.map((n: any) => ({
          id: n._id,
          title: n.title,
          excerpt: n.excerpt,
          date: new Date(n.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          category: n.category,
          image: n.featuredImage ? urlFor(n.featuredImage).url() : "",
          author: n.author,
        })));

        setSponsors(sponsorsData.map((s: any) => ({
          id: s._id,
          name: s.name,
          logo: s.logo ? urlFor(s.logo).url() : "",
          tier: s.tier,
        })));
      } catch (error) {
        console.error("Error fetching data from Sanity:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const addApplication = async (application: any) => {
    try {
      await createSponsorshipApplication(application);
    } catch (error) {
      console.error("Error submitting application:", error);
      throw error;
    }
  };

  return (
    <DataContext.Provider
      value={{
        players,
        news,
        sponsors,
        coaches,
        isLoading,
        addApplication,
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
