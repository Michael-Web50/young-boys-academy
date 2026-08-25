"use client";

import { useState } from "react";
import { useData } from "@/lib/data-context";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

export default function SponsorsTab() {
  const { sponsors, addSponsor, updateSponsor, deleteSponsor } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", logo: "", tier: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) { updateSponsor(editingId, formData); setEditingId(null); } 
    else { addSponsor(formData); }
    setFormData({ name: "", logo: "", tier: "" });
    setIsAdding(false);
  };

  const handleEdit = (sponsor: any) => {
    setFormData(sponsor);
    setEditingId(sponsor.id);
    setIsAdding(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-brand-black">Sponsor Management</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 bg-brand-yellow text-brand-black px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? "Cancel" : "Add Sponsor"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-brand-white p-6 rounded-xl mb-8 border border-brand-yellow/20 shadow-sm">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input type="text" placeholder="Sponsor Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <input type="text" placeholder="Logo Text (e.g., LSF) *" value={formData.logo} onChange={(e) => setFormData({...formData, logo: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <select value={formData.tier} onChange={(e) => setFormData({...formData, tier: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required>
              <option value="">Select Tier *</option>
              <option value="Bronze">Bronze</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
            </select>
          </div>
          <button type="submit" className="flex items-center gap-2 bg-brand-black text-brand-white px-6 py-3 rounded-lg font-bold hover:bg-brand-darkGray transition-colors">
            <Save size={18} /> {editingId ? "Update Sponsor" : "Save Sponsor"}
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="bg-brand-white p-5 rounded-xl shadow-sm border border-brand-yellow/10">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-brand-black rounded-full flex items-center justify-center">
                <span className="text-brand-yellow font-bold text-sm">{sponsor.logo}</span>
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(sponsor)} className="text-blue-600 hover:text-blue-800 p-1"><Edit size={18} /></button>
                <button onClick={() => deleteSponsor(sponsor.id)} className="text-red-600 hover:text-red-800 p-1"><Trash2 size={18} /></button>
              </div>
            </div>
            <h3 className="font-bold text-brand-black text-lg">{sponsor.name}</h3>
            <p className="text-sm text-brand-yellow font-semibold">{sponsor.tier} Sponsor</p>
          </div>
        ))}
      </div>
    </div>
  );
}
