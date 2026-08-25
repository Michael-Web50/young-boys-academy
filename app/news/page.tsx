"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import NewsCard from "@/components/ui/NewsCard";
import { Calendar, Filter } from "lucide-react";
import { useData } from "@/lib/data-context";

export default function NewsPage() {
  const { news } = useData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Match Report", "Announcement", "Fixture", "Training"];

  const filteredArticles = selectedCategory === "All" 
    ? news 
    : news.filter(article => article.category === selectedCategory);

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          News & <span className="text-brand-yellow">Announcements</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          Stay updated with the latest match reports, fixtures, and academy news from Young Boys Football Academy.
        </p>
      </section>

      <section className="py-8 px-4 bg-brand-lightGray border-b border-brand-yellow/20 sticky top-20 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Filter className="w-5 h-5 text-brand-darkGray" />
            <span className="text-brand-darkGray font-semibold">Filter by:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-brand-yellow text-brand-black shadow-lg"
                    : "bg-brand-white text-brand-darkGray hover:bg-brand-black hover:text-brand-white border border-brand-yellow/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-black">
            {selectedCategory === "All" ? "Latest News" : selectedCategory}
          </h2>
          <p className="text-brand-darkGray mt-1">
            {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
          </p>
        </div>

        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <NewsCard
                key={article.id}
                title={article.title}
                excerpt={article.excerpt}
                date={article.date}
                category={article.category}
                image={article.image}
                author={article.author}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-brand-darkGray text-xl">No articles found in this category.</p>
          </div>
        )}
      </section>

      <section className="py-16 px-4 bg-brand-black">
        <div className="max-w-3xl mx-auto text-center">
          <Calendar className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-brand-white mb-4">Never Miss an Update</h2>
          <p className="text-brand-white/70 mb-8">
            Subscribe to receive the latest news, match reports, and academy announcements directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg bg-brand-darkGray border border-brand-yellow/30 text-brand-white placeholder-brand-white/50 focus:border-brand-yellow focus:outline-none"
            />
            <button
              type="submit"
              className="bg-brand-yellow text-brand-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
