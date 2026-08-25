"use client";

import { useState } from "react";
import { useData } from "@/lib/data-context";
import { Trash2, Mail, Phone, Building2, Calendar, CheckCircle, Clock, XCircle, MessageSquare, Eye } from "lucide-react";

export default function ApplicationsTab() {
  const { applications, updateApplication, deleteApplication } = useData();
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredApps = filterStatus === "all" 
    ? applications 
    : applications.filter(app => app.status === filterStatus);

  const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: Clock },
    contacted: { label: "Contacted", color: "bg-blue-100 text-blue-800 border-blue-300", icon: Mail },
    approved: { label: "Approved", color: "bg-green-100 text-green-800 border-green-300", icon: CheckCircle },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800 border-red-300", icon: XCircle },
  };

  const tierLabels: Record<string, string> = {
    bronze: "Bronze (₦500,000)",
    silver: "Silver (₦1,500,000)",
    gold: "Gold (₦3,000,000)",
    custom: "Custom Package",
  };

  const selectedApplication = applications.find(a => a.id === selectedApp);

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div>
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-brand-white p-4 rounded-xl border border-brand-yellow/10">
          <p className="text-xs text-brand-darkGray/60 uppercase font-semibold">Total</p>
          <p className="text-2xl font-bold text-brand-black">{applications.length}</p>
        </div>
        <div className="bg-brand-white p-4 rounded-xl border border-yellow-200">
          <p className="text-xs text-yellow-700 uppercase font-semibold">Pending</p>
          <p className="text-2xl font-bold text-yellow-800">{applications.filter(a => a.status === "pending").length}</p>
        </div>
        <div className="bg-brand-white p-4 rounded-xl border border-green-200">
          <p className="text-xs text-green-700 uppercase font-semibold">Approved</p>
          <p className="text-2xl font-bold text-green-800">{applications.filter(a => a.status === "approved").length}</p>
        </div>
        <div className="bg-brand-white p-4 rounded-xl border border-blue-200">
          <p className="text-xs text-blue-700 uppercase font-semibold">Contacted</p>
          <p className="text-2xl font-bold text-blue-800">{applications.filter(a => a.status === "contacted").length}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "pending", "contacted", "approved", "rejected"].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
              filterStatus === status
                ? "bg-brand-yellow text-brand-black"
                : "bg-brand-white text-brand-darkGray hover:bg-brand-lightGray border border-brand-yellow/20"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApps.length > 0 ? (
        <div className="space-y-3">
          {filteredApps.map((app) => {
            const StatusIcon = statusConfig[app.status].icon;
            return (
              <div key={app.id} className="bg-brand-white p-5 rounded-xl shadow-sm border border-brand-yellow/10 hover:border-brand-yellow/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-lg font-bold text-brand-black flex items-center gap-2">
                        <Building2 size={18} className="text-brand-yellow" />
                        {app.companyName}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${statusConfig[app.status].color}`}>
                        <StatusIcon size={12} />
                        {statusConfig[app.status].label}
                      </span>
                      <span className="bg-brand-black text-brand-yellow px-2.5 py-1 rounded-full text-xs font-bold">
                        {tierLabels[app.sponsorshipType] || app.sponsorshipType}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-brand-darkGray/70">
                      <span className="flex items-center gap-1"><Mail size={14} /> {app.email}</span>
                      <span className="flex items-center gap-1"><Phone size={14} /> {app.phone}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(app.submittedAt)}</span>
                    </div>
                    {app.message && (
                      <p className="text-sm text-brand-darkGray mt-2 line-clamp-1 italic">"{app.message}"</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => setSelectedApp(app.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <select
                      value={app.status}
                      onChange={(e) => updateApplication(app.id, { status: e.target.value as any })}
                      className="px-3 py-2 rounded-lg bg-brand-lightGray border border-brand-yellow/20 text-sm font-semibold focus:border-brand-yellow focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <button
                      onClick={() => {
                        if (confirm("Delete this application?")) deleteApplication(app.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-brand-white p-12 rounded-xl border border-brand-yellow/10 text-center">
          <Mail className="w-16 h-16 text-brand-yellow/40 mx-auto mb-4" />
          <p className="text-brand-darkGray text-lg font-semibold">No applications yet</p>
          <p className="text-brand-darkGray/60 text-sm mt-1">Sponsorship applications from the website will appear here.</p>
        </div>
      )}

      {/* Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedApp(null)}>
          <div className="bg-brand-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-brand-yellow/30" onClick={(e) => e.stopPropagation()}>
            <div className="bg-brand-black p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-1">Sponsorship Application</p>
                  <h2 className="text-2xl font-bold text-brand-white">{selectedApplication.companyName}</h2>
                </div>
                <button onClick={() => setSelectedApp(null)} className="p-2 text-brand-white/60 hover:text-brand-white hover:bg-brand-darkGray rounded-full transition-colors">
                  <XCircle size={24} />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-brand-lightGray p-4 rounded-lg">
                  <p className="text-xs text-brand-darkGray/60 uppercase font-semibold mb-1">Contact Person</p>
                  <p className="text-brand-black font-bold">{selectedApplication.contactPerson}</p>
                </div>
                <div className="bg-brand-lightGray p-4 rounded-lg">
                  <p className="text-xs text-brand-darkGray/60 uppercase font-semibold mb-1">Sponsorship Tier</p>
                  <p className="text-brand-black font-bold">{tierLabels[selectedApplication.sponsorshipType] || selectedApplication.sponsorshipType}</p>
                </div>
                <div className="bg-brand-lightGray p-4 rounded-lg">
                  <p className="text-xs text-brand-darkGray/60 uppercase font-semibold mb-1 flex items-center gap-1"><Mail size={12} /> Email</p>
                  <a href={`mailto:${selectedApplication.email}`} className="text-brand-yellow font-bold hover:underline">{selectedApplication.email}</a>
                </div>
                <div className="bg-brand-lightGray p-4 rounded-lg">
                  <p className="text-xs text-brand-darkGray/60 uppercase font-semibold mb-1 flex items-center gap-1"><Phone size={12} /> Phone</p>
                  <a href={`tel:${selectedApplication.phone}`} className="text-brand-yellow font-bold hover:underline">{selectedApplication.phone}</a>
                </div>
              </div>

              <div>
                <p className="text-xs text-brand-darkGray/60 uppercase font-semibold mb-2 flex items-center gap-1"><MessageSquare size={12} /> Message</p>
                <div className="bg-brand-lightGray p-4 rounded-lg">
                  <p className="text-brand-darkGray leading-relaxed whitespace-pre-wrap">
                    {selectedApplication.message || <span className="italic text-brand-darkGray/50">No message provided.</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-brand-yellow/10">
                <p className="text-xs text-brand-darkGray/60">Submitted: {formatDate(selectedApplication.submittedAt)}</p>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${selectedApplication.email}?subject=Re: Sponsorship Application - ${selectedApplication.companyName}`}
                    className="flex items-center gap-2 bg-brand-yellow text-brand-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors text-sm"
                  >
                    <Mail size={16} /> Reply via Email
                  </a>
                  <a
                    href={`tel:${selectedApplication.phone}`}
                    className="flex items-center gap-2 bg-brand-black text-brand-white px-4 py-2 rounded-lg font-bold hover:bg-brand-darkGray transition-colors text-sm"
                  >
                    <Phone size={16} /> Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
