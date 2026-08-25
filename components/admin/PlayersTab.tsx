"use client";

import { useState } from "react";
import { useData } from "@/lib/data-context";
import ImageUpload from "@/components/ui/ImageUpload";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

export default function PlayersTab() {
  const { players, addPlayer, updatePlayer, deletePlayer } = useData();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "", middleName: "", lastName: "", nameOnShirt: "",
    position: "", shirtNumber: 0, ageGroup: "", dateOfBirth: "",
    nationality: "", height: "", image: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) { alert("Please upload a player image"); return; }
    if (editingId) { updatePlayer(editingId, formData); setEditingId(null); } 
    else { addPlayer(formData); }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ firstName: "", middleName: "", lastName: "", nameOnShirt: "", position: "", shirtNumber: 0, ageGroup: "", dateOfBirth: "", nationality: "", height: "", image: "" });
    setIsAdding(false);
  };

  const handleEdit = (player: any) => {
    setFormData(player);
    setEditingId(player.id);
    setIsAdding(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-brand-black">Player Roster</h2>
        <button onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2 bg-brand-yellow text-brand-black px-5 py-2.5 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
          {isAdding ? <X size={18} /> : <Plus size={18} />}
          {isAdding ? "Cancel" : "Add New Player"}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-brand-white p-6 rounded-xl mb-8 border border-brand-yellow/20 shadow-sm">
          <h3 className="text-lg font-bold text-brand-black mb-4">{editingId ? "Edit Player" : "Add New Player"}</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="First Name *" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <input type="text" placeholder="Middle Name" value={formData.middleName} onChange={(e) => setFormData({...formData, middleName: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" />
            <input type="text" placeholder="Last Name *" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <input type="text" placeholder="Name on Shirt *" value={formData.nameOnShirt} onChange={(e) => setFormData({...formData, nameOnShirt: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <select value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required>
              <option value="">Select Position *</option>
              {["GK","CB","LB","RB","LWB","RWB","CDM","CM","CAM","LW","RW","SS","CF","ST","AM"].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <input type="number" placeholder="Shirt Number *" value={formData.shirtNumber || ""} onChange={(e) => setFormData({...formData, shirtNumber: parseInt(e.target.value)})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <select value={formData.ageGroup} onChange={(e) => setFormData({...formData, ageGroup: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required>
              <option value="">Select Age Group *</option>
              {["U12","U15","U17","U20"].map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <input type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <input type="text" placeholder="Nationality *" value={formData.nationality} onChange={(e) => setFormData({...formData, nationality: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
            <input type="text" placeholder="Height *" value={formData.height} onChange={(e) => setFormData({...formData, height: e.target.value})} className="px-4 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 focus:border-brand-yellow focus:outline-none" required />
          </div>
          <div className="mb-6">
            <ImageUpload value={formData.image} onChange={(img) => setFormData({...formData, image: img})} label="Player Photo *" />
          </div>
          <button type="submit" className="flex items-center gap-2 bg-brand-black text-brand-white px-6 py-3 rounded-lg font-bold hover:bg-brand-darkGray transition-colors">
            <Save size={18} /> {editingId ? "Update Player" : "Save Player"}
          </button>
        </form>
      )}

      <div className="bg-brand-white rounded-xl overflow-hidden shadow-sm border border-brand-yellow/10">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-lightGray text-brand-darkGray text-sm uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Player</th>
                <th className="px-6 py-4 text-left">Position</th>
                <th className="px-6 py-4 text-left">Age Group</th>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-yellow/10">
              {players.map((player) => (
                <tr key={player.id} className="hover:bg-brand-lightGray/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={player.image} alt={player.firstName} className="w-10 h-10 rounded-full object-cover border border-brand-yellow/30" />
                      <div>
                        <p className="font-bold text-brand-black">{player.firstName} {player.lastName}</p>
                        <p className="text-xs text-brand-darkGray/60">{player.nameOnShirt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-brand-darkGray">{player.position}</td>
                  <td className="px-6 py-4"><span className="bg-brand-yellow/20 text-brand-black px-2 py-1 rounded text-xs font-bold">{player.ageGroup}</span></td>
                  <td className="px-6 py-4 font-bold text-brand-black">{player.shirtNumber}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(player)} className="text-blue-600 hover:text-blue-800 mr-3 p-1"><Edit size={18} /></button>
                    <button onClick={() => deletePlayer(player.id)} className="text-red-600 hover:text-red-800 p-1"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
