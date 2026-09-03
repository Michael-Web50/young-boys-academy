"use client";

import { useParams, useRouter } from "next/navigation";
import { useData } from "@/lib/data-context";
import Header from "@/components/layout/Header";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

export default function ArticlePage() {
  const { id } = useParams();
  const router = useRouter();
  const { news, isLoading } = useData();

  if (isLoading) return <main className="min-h-screen bg-brand-white flex items-center justify-center"><div className="text-brand-darkGray">Loading article...</div></main>;

  const article = news.find(n => n.id === id);

  if (!article) {
    return (
      <main className="min-h-screen bg-brand-white flex flex-col items-center justify-center p-4">
        <Header />
        <h1 className="text-3xl font-bold text-brand-black mt-20">Article not found</h1>
        <button onClick={() => router.back()} className="mt-4 text-brand-yellow font-bold hover:underline">Go back to News</button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      {/* Hero Image */}
      <section className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
        <img 
          src={article.image || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1600&h=900&fit=crop"} 
          alt={article.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent" />
        
        <div className="absolute top-32 left-4 md:left-8 z-10">
          <button onClick={() => router.back()} className="flex items-center gap-2 bg-brand-black/50 backdrop-blur-md text-brand-white px-4 py-2 rounded-full hover:bg-brand-yellow hover:text-brand-black transition-all duration-300">
            <ArrowLeft size={18} /> Back to News
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-5xl mx-auto">
          <span className="inline-block bg-brand-yellow text-brand-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-6 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-brand-white/80 text-sm md:text-base">
            <span className="flex items-center gap-2"><User size={18} /> By {article.author}</span>
            <span className="flex items-center gap-2"><Calendar size={18} /> {article.date}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4">
        <article className="max-w-3xl mx-auto">
          <div className="bg-brand-lightGray p-8 md:p-12 rounded-3xl border-l-4 border-brand-yellow shadow-lg">
            {/* Since we are using the excerpt for now, we format it beautifully. 
                Later we can add a full 'body' text field in Sanity! */}
            <p className="text-xl md:text-2xl text-brand-black leading-relaxed font-medium mb-8">
              {article.excerpt}
            </p>
            
            <div className="border-t border-brand-black/10 pt-8 mt-8">
              <h3 className="text-lg font-bold text-brand-black mb-2 flex items-center gap-2">
                <Tag size={20} className="text-brand-yellow" />
                Article Details
              </h3>
              <p className="text-brand-darkGray">
                This is an official update from the Young Boys Football Academy. 
                For more information, interviews, or media inquiries regarding this article, 
                please contact our press team at <span className="text-brand-yellow font-semibold">yboysfa@gmail.com</span>.
              </p>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
