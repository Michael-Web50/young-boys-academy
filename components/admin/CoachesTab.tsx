"use client";

import { useState } from "react";
import { useData } from "@/lib/data-context";
import ImageUpload from "@/components/ui/ImageUpload";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

export default function CoachesTab() {
  const { coaches, addCoach, updateCoach, deleteCoach } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    image: "",
    bio: "",
    license: "",
    experience: "",
    specialties: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) { alert("Please upload a coach photo"); return; }
    if (editingId) { updateCoach(editingId, formData); setEditingId(null); } 
    else { addCoach(formData); }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ firstName: "", lastName: "", role: "", image: "", bio: "", license: "", experience: "", specialties: "" });
    setIsAdding(false);
  };

  const handleEdit = (coach: any) => {
    setFormData(coach);
    setEditingId(coach.id);
    setIsAdding(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-brand-black">Coaching Staff</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 bg-brand-yellow text-brand-black px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? "Cancel" : "Add Coach"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-brand-white p-6 rounded-xl mb-8 border border-brand-yellow/20 shadow-sm">
          <h3 className="text-lg font-bold text-brand-black mb-4">{editingId ? "Edit Coach" : "Add New Coach"}</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="First Name *" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <input type="text" placeholder="Last Name *" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required>
              <option value="">Select Role *</option>
              <option value="Head Coach">Head Coach</option>
              <option value="Assistant Coach">Assistant Coach</option>
              <option value="Goalkeeper Coach">Goalkeeper Coach</option>
              <option value="Fitness Coach">Fitness Coach</option>
              <option value="Youth Coach">Youth Coach</option>
              <option value="Tactical Coach">Tactical Coach</option>
            </select>
            <input type="text" placeholder="License (e.g., CAF License A) *" value={formData.license} onChange={(e) => setFormData({...formData, license: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <input type="text" placeholder="Experience (e.g., 10+ Years) *" value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <input type="text" placeholder="Specialties *" value={formData.specialties} onChange={(e) => setFormData({...formData, specialties: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none md:col-span-2" required />
            <textarea placeholder="Bio / Short Description *" value={formData.bio} onChange={(e) => setFormData({...formData, bio: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none md:col-span-2" rows={4} required />
          </div>
          <div className="mb-6">
            <ImageUpload value={formData.image} onChange={(img) => setFormData({...formData, image: img})} label="Coach Photo *" />
          </div>
          <button type="submit" className="flex items-center gap-2 bg-brand-black text-brand-white px-6 py-3 rounded-lg font-bold hover:bg-brand-darkGray transition-colors">
            <Save size={18} /> {editingId ? "Update Coach" : "Save Coach"}
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coaches.map((coach) => (
          <div key={coach.id} className="bg-brand-white rounded-xl overflow-hidden shadow-sm border border-brand-yellow/10">
            <div className="relative h-48">
              <img src={coach.image} alt={`${coach.firstName} ${coach.lastName}`} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className="bg-brand-yellow text-brand-black px-3 py-1 rounded-full text-xs font-bold">{coach.role}</span>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-brand-black">{coach.firstName} {coach.lastName}</h3>
                  <p className="text-xs text-brand-darkGray/70">{coach.license} • {coach.experience}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => handleEdit(coach)} className="text-blue-600 hover:text-blue-800 p-1"><Edit size={16} /></button>
                  <button onClick={() => deleteCoach(coach.id)} className="text-red-600 hover:text-red-800 p-1"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="text-xs text-brand-darkGray/80 line-clamp-2">{coach.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
