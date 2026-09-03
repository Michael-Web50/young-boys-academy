"use client";

import Header from "@/components/layout/Header";
import { useData } from "@/lib/data-context";
import { Image as ImageIcon, Video, Calendar, Filter } from "lucide-react";
import { useState } from "react";

export default function GalleryPage() {
  const { gallery, isLoading } = useData();
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Match", "Training", "Event", "Team"];
  const filteredGallery = filter === "All" ? gallery : gallery.filter(item => item.category === filter);

  if (isLoading) return <main className="min-h-screen bg-brand-white flex items-center justify-center"><div className="text-brand-darkGray">Loading gallery...</div></main>;

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          Academy <span className="text-brand-yellow">Gallery</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          Relive the best moments from our matches, training sessions, and academy events.
        </p>
      </section>

      <section className="py-12 px-4 max-w-7xl mx-auto">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                filter === cat 
                  ? "bg-brand-yellow text-brand-black shadow-lg" 
                  : "bg-brand-lightGray text-brand-darkGray hover:bg-brand-black hover:text-brand-white"
              }`}
            >
              {cat === "All" && <Filter size={16} />}
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {filteredGallery.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGallery.map((item) => (
              <div key={item.id} className="group bg-brand-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-brand-yellow/10">
                {/* Media Container */}
                <div className="relative aspect-video bg-brand-black overflow-hidden">
                  {item.mediaType === "video" && item.videoUrl ? (
                    <iframe 
                      src={item.videoUrl.includes("youtube") ? item.videoUrl.replace("watch?v=", "embed/") : item.videoUrl} 
                      className="w-full h-full"
                      allowFullScreen
                      title={item.title}
                    />
                  ) : (
                    <img 
                      src={item.image || "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=600&fit=crop"} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  
                  {/* Media Type Badge */}
                  <div className="absolute top-4 left-4 bg-brand-black/80 backdrop-blur-sm text-brand-yellow px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                    {item.mediaType === "video" ? <Video size={14} /> : <ImageIcon size={14} />}
                    {item.mediaType}
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 bg-brand-yellow text-brand-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-black mb-2 group-hover:text-brand-yellow transition-colors">{item.title}</h3>
                  <div className="flex items-center gap-2 text-brand-darkGray/70 text-sm mb-3">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </div>
                  {item.description && (
                    <p className="text-brand-darkGray text-sm leading-relaxed">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-brand-lightGray rounded-2xl border-2 border-dashed border-brand-yellow/30">
            <ImageIcon className="w-16 h-16 text-brand-yellow mx-auto mb-4" />
            <p className="text-brand-darkGray font-semibold text-lg">No items found in this category.</p>
            <p className="text-brand-darkGray/60 text-sm mt-1">Check back soon or add new highlights in Sanity Studio!</p>
          </div>
        )}
      </section>
    </main>
  );
}
