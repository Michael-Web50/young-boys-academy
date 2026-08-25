"use client";

import Header from "@/components/layout/Header";
import { useData } from "@/lib/data-context";
import { Calendar, MapPin, Clock, Trophy, Shield } from "lucide-react";

export default function MatchesPage() {
  const { fixtures, isLoading } = useData();

  const upcomingMatches = fixtures.filter(f => f.status === "upcoming").sort((a, b) => new Date(a.matchDate).getTime() - new Date(b.matchDate).getTime());
  const recentResults = fixtures.filter(f => f.status === "completed").sort((a, b) => new Date(b.matchDate).getTime() - new Date(a.matchDate).getTime());

  if (isLoading) return <main className="min-h-screen bg-brand-white flex items-center justify-center"><div className="text-brand-darkGray">Loading matches...</div></main>;

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <main className="min-h-screen bg-brand-white">
      <Header />
      
      <section className="pt-32 pb-16 px-4 bg-brand-black text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-brand-white mb-4">
          Fixtures & <span className="text-brand-yellow">Results</span>
        </h1>
        <p className="text-xl text-brand-white/80 max-w-3xl mx-auto">
          Catch up on our latest match results and see where our teams are playing next.
        </p>
      </section>

      {/* Upcoming Matches */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="w-8 h-8 text-brand-yellow" />
          <h2 className="text-3xl font-extrabold text-brand-black">Upcoming Fixtures</h2>
        </div>

        {upcomingMatches.length > 0 ? (
          <div className="space-y-4">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="bg-brand-lightGray p-6 rounded-2xl border-l-4 border-brand-yellow shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center text-brand-yellow font-bold text-xl flex-shrink-0">
                    {match.ageGroup}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-black">
                      Young Boys FA <span className="text-brand-yellow text-sm mx-2">VS</span> {match.opponentName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-brand-darkGray mt-2">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(match.matchDate)}</span>
                      {match.matchTime && <span className="flex items-center gap-1"><Clock size={14} /> {match.matchTime}</span>}
                      <span className="flex items-center gap-1"><MapPin size={14} /> {match.location} {match.isHomeGame && <span className="text-brand-yellow font-bold ml-1">(HOME)</span>}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-brand-yellow text-brand-black px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide text-center">
                  Upcoming
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-brand-lightGray p-12 rounded-2xl text-center border-2 border-dashed border-brand-yellow/30">
            <Calendar className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
            <p className="text-brand-darkGray font-semibold">No upcoming fixtures scheduled.</p>
            <p className="text-brand-darkGray/60 text-sm mt-1">Check back soon for new match announcements!</p>
          </div>
        )}
      </section>

      {/* Recent Results */}
      <section className="py-16 px-4 max-w-5xl mx-auto bg-brand-lightGray/50">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-brand-yellow" />
          <h2 className="text-3xl font-extrabold text-brand-black">Recent Results</h2>
        </div>

        {recentResults.length > 0 ? (
          <div className="space-y-4">
            {recentResults.map((match) => {
              const isWin = (match.ourScore || 0) > (match.opponentScore || 0);
              const isDraw = (match.ourScore || 0) === (match.opponentScore || 0);
              const resultColor = isWin ? "bg-green-600" : isDraw ? "bg-gray-500" : "bg-red-600";
              const resultText = isWin ? "WIN" : isDraw ? "DRAW" : "LOSS";

              return (
                <div key={match.id} className="bg-brand-white p-6 rounded-2xl shadow-sm border border-brand-yellow/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-brand-black rounded-full flex items-center justify-center text-brand-yellow font-bold text-xl flex-shrink-0">
                      {match.ageGroup}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-brand-black">
                        Young Boys FA <span className="text-brand-darkGray/50 text-sm mx-2">VS</span> {match.opponentName}
                      </h3>
                      <p className="text-sm text-brand-darkGray mt-1">{formatDate(match.matchDate)} • {match.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-xs text-brand-darkGray/60 uppercase font-bold">Score</p>
                      <p className="text-3xl font-extrabold text-brand-black">{match.ourScore} - {match.opponentScore}</p>
                    </div>
                    <div className={`${resultColor} text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide`}>
                      {resultText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-brand-white p-12 rounded-2xl text-center border-2 border-dashed border-brand-yellow/30">
            <Trophy className="w-12 h-12 text-brand-yellow mx-auto mb-4" />
            <p className="text-brand-darkGray font-semibold">No recent results to display.</p>
          </div>
        )}
      </section>
    </main>
  );
}
