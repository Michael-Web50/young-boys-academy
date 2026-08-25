"use client";

import { useData } from "@/lib/data-context";
import { Users, FileText, Award, UserCog, Inbox } from "lucide-react";

export default function OverviewTab() {
  const { players, news, sponsors, coaches, applications } = useData();
  const pendingApps = applications.filter(a => a.status === "pending").length;

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<Users className="w-8 h-8" />} label="Total Players" value={players.length} color="bg-blue-600" />
        <StatCard icon={<UserCog className="w-8 h-8" />} label="Coaching Staff" value={coaches.length} color="bg-purple-600" />
        <StatCard icon={<FileText className="w-8 h-8" />} label="News Articles" value={news.length} color="bg-brand-yellow" />
        <StatCard icon={<Award className="w-8 h-8" />} label="Active Sponsors" value={sponsors.length} color="bg-green-600" />
      </div>

      {pendingApps > 0 && (
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-2 border-brand-yellow rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-brand-yellow rounded-full flex items-center justify-center">
              <Inbox className="w-7 h-7 text-brand-black" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-black">You have {pendingApps} new application{pendingApps > 1 ? "s" : ""}!</h3>
              <p className="text-sm text-brand-darkGray">Review sponsorship applications in the Applications tab.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="bg-brand-white p-6 rounded-2xl shadow-sm border border-brand-yellow/10 flex items-center gap-4">
      <div className={`${color} w-16 h-16 rounded-xl flex items-center justify-center text-brand-white flex-shrink-0`}>
        {icon}
      </div>
      <div>
        <p className="text-3xl font-bold text-brand-black">{value}</p>
        <p className="text-brand-darkGray/70 text-sm">{label}</p>
      </div>
    </div>
  );
}
