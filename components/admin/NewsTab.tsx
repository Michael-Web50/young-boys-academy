"use client";

import { useState } from "react";
import { useData } from "@/lib/data-context";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

export default function NewsTab() {
  const { news, addNews, updateNews, deleteNews } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: "", excerpt: "", date: "", category: "", image: "", author: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) { updateNews(editingId, formData); setEditingId(null); } 
    else { addNews(formData); }
    setFormData({ title: "", excerpt: "", date: "", category: "", image: "", author: "" });
    setIsAdding(false);
  };

  const handleEdit = (article: any) => {
    setFormData(article);
    setEditingId(article.id);
    setIsAdding(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-brand-black">News & Announcements</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 bg-brand-yellow text-brand-black px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? "Cancel" : "New Article"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-brand-white p-6 rounded-xl mb-8 border border-brand-yellow/20 shadow-sm">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Article Title *" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none md:col-span-2" required />
            <textarea placeholder="Excerpt *" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none md:col-span-2" rows={3} required />
            <input type="text" placeholder="Date (e.g., August 20, 2026) *" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required>
              <option value="">Select Category *</option>
              {["Match Report", "Announcement", "Fixture", "Training", "Transfer"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input type="url" placeholder="Image URL *" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <input type="text" placeholder="Author *" value={formData.author} onChange={(e) => setFormData({...formData, author: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
          </div>
          <button type="submit" className="flex items-center gap-2 bg-brand-black text-brand-white px-6 py-3 rounded-lg font-bold hover:bg-brand-darkGray transition-colors">
            <Save size={18} /> {editingId ? "Update Article" : "Publish Article"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {news.map((article) => (
          <div key={article.id} className="bg-brand-white p-5 rounded-xl shadow-sm border border-brand-yellow/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={article.image} alt={article.title} className="w-16 h-16 rounded-lg object-cover" />
              <div>
                <h3 className="font-bold text-brand-black">{article.title}</h3>
                <p className="text-sm text-brand-darkGray/70">{article.date} • <span className="text-brand-yellow font-semibold">{article.category}</span> • by {article.author}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(article)} className="text-blue-600 hover:text-blue-800 p-2"><Edit size={18} /></button>
              <button onClick={() => deleteNews(article.id)} className="text-red-600 hover:text-red-800 p-2"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
