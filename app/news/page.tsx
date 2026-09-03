"use client";

import Header from "@/components/layout/Header";
import { useData } from "@/lib/data-context";
import Link from "next/link";
import { Calendar, User, ArrowRight, Newspaper } from "lucide-react";
import { useState } from "react";

export default function NewsPage() {
  const { news, isLoading } = useData();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Academy News", "Match Reports", "Player Spotlights", "Community"];
  const filteredNews = filter === "All" ? news : news.filter(n => n.category === filter);
  const featuredArticle = filteredNews[0];
  const restOfNews = filteredNews.slice(1);

  if (isLoading) return <main className="min-h-screen bg-brand-white flex items-center justify-center"><div className="text-brand-darkGray">Loading news...</div></main>;

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          Academy <span className="text-brand-yellow">News</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          Stay updated with the latest from Young Boys Football Academy.
        </p>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === cat 
                  ? "bg-brand-yellow text-brand-black shadow-lg" 
                  : "bg-brand-lightGray text-brand-darkGray hover:bg-brand-black hover:text-brand-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredNews.length > 0 ? (
          <>
            {/* Featured Article */}
            {featuredArticle && (
              <Link href={`/news/${featuredArticle.id}`} className="block group mb-16">
                <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src={featuredArticle.image || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&h=600&fit=crop"} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl">
                    <span className="inline-block bg-brand-yellow text-brand-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                      Featured • {featuredArticle.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-brand-white mb-4 group-hover:text-brand-yellow transition-colors leading-tight">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-brand-white/80 text-lg mb-6 line-clamp-2">{featuredArticle.excerpt}</p>
                    <div className="flex items-center gap-6 text-brand-white/70 text-sm">
                      <span className="flex items-center gap-2"><User size={16} /> {featuredArticle.author}</span>
                      <span className="flex items-center gap-2"><Calendar size={16} /> {featuredArticle.date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restOfNews.map((article) => (
                <Link href={`/news/${article.id}`} key={article.id} className="group bg-brand-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-brand-yellow/10 flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={article.image || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=450&fit=crop"} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-brand-black/80 backdrop-blur-sm text-brand-yellow px-3 py-1 rounded-full text-xs font-bold uppercase">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-brand-black mb-3 group-hover:text-brand-yellow transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-brand-darkGray text-sm mb-4 line-clamp-3 flex-1">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-brand-darkGray/60 text-xs pt-4 border-t border-brand-lightGray">
                      <span className="flex items-center gap-1"><User size={12} /> {article.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-brand-lightGray rounded-2xl border-2 border-dashed border-brand-yellow/30">
            <Newspaper className="w-16 h-16 text-brand-yellow mx-auto mb-4" />
            <p className="text-brand-darkGray font-semibold text-lg">No news articles found in this category.</p>
          </div>
        )}
      </section>
    </main>
  );
}
