"use client";

import React, { useState } from "react";
import { Trophy, Medal, Flame, Star, ShieldAlert, Check } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  name: string;
  level: string;
  xp: number;
  streak: number;
  avatar: string;
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const [scope, setScope] = useState<"school" | "national">("school");
  const [timeframe, setTimeframe] = useState<"weekly" | "all-time">("weekly");
  const [optOut, setOptOut] = useState(false);

  const schoolWeeklyUsers: LeaderboardUser[] = [
    { rank: 1, name: "Emmanuel Kiprop", level: "Legend", xp: 1450, streak: 12, avatar: "EK" },
    { rank: 2, name: "Stacy Awuor", level: "Master", xp: 1280, streak: 8, avatar: "SA" },
    { rank: 3, name: "Ryan (You)", level: "Scholar", xp: 980, streak: 4, avatar: "R", isCurrentUser: true },
    { rank: 4, name: "David Mwangi", level: "Scholar", xp: 850, streak: 5, avatar: "DM" },
    { rank: 5, name: "Amani Nekesa", level: "Learner", xp: 710, streak: 3, avatar: "AN" },
  ];

  const nationalWeeklyUsers: LeaderboardUser[] = [
    { rank: 1, name: "Fatuma Ali (Mombasa)", level: "Legend", xp: 2450, streak: 24, avatar: "FA" },
    { rank: 2, name: "Emmanuel Kiprop (Nairobi)", level: "Legend", xp: 1450, streak: 12, avatar: "EK" },
    { rank: 3, name: "Stacy Awuor (Kisumu)", level: "Master", xp: 1280, streak: 8, avatar: "SA" },
    { rank: 34, name: "Ryan (You)", level: "Scholar", xp: 980, streak: 4, avatar: "R", isCurrentUser: true },
  ];

  const list = scope === "school" ? schoolWeeklyUsers : nationalWeeklyUsers;

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Leaderboard & Ranks
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Study consistently, complete sub-strand assessments, and earn XP to rank up.
        </p>
      </div>

      {/* Scope Controls & Settings */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2.5">
          <button
            onClick={() => setScope("school")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all active-press ${
              scope === "school"
                ? "bg-accent/15 border-accent text-accent"
                : "border-border-default bg-surface/50 text-text-muted hover:text-text-default"
            }`}
          >
            School Rankings
          </button>
          <button
            onClick={() => setScope("national")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all active-press ${
              scope === "national"
                ? "bg-accent/15 border-accent text-accent"
                : "border-border-default bg-surface/50 text-text-muted hover:text-text-default"
            }`}
          >
            National Rankings
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setOptOut(!optOut)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-default/60 hover:border-text-muted bg-surface/50 hover:bg-surface text-xs font-semibold text-text-muted transition-all active-press"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>{optOut ? "Show profile publicly" : "Incognito Mode"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Podiums & Standings (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Rank Podium Standings (if any) */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-text-default border-b border-border-default/20 pb-3">
              <Trophy className="h-5 w-5 text-[#EAB308]" />
              <span>Podium Standings</span>
            </h2>

            {/* Visual Podium stand */}
            <div className="flex items-end justify-center gap-4 pt-8 pb-4">
              {/* Rank 2 */}
              <div className="flex flex-col items-center max-w-[100px]">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-background border border-border-default shadow">
                  <span className="text-xs font-bold text-text-default">SA</span>
                  <div className="absolute -top-2.5 -right-1 bg-neutral-300 text-neutral-900 border border-neutral-400 font-extrabold text-[9px] h-4.5 w-4.5 rounded-full flex items-center justify-center shadow">
                    2
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-bold text-text-default truncate w-[90px]">Stacy Awuor</p>
                  <p className="text-[9px] text-[#10B981] font-semibold">1,280 XP</p>
                </div>
                <div className="w-16 bg-border-default/45 h-16 rounded-t-lg mt-2 flex items-center justify-center">
                  <span className="text-xs font-extrabold text-text-muted">2nd</span>
                </div>
              </div>

              {/* Rank 1 */}
              <div className="flex flex-col items-center max-w-[120px]">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-background border-2 border-[#EAB308] shadow-lg">
                  <span className="text-sm font-bold text-text-default">EK</span>
                  <div className="absolute -top-3 -right-1 bg-[#EAB308] text-neutral-900 border border-[#CA8A04] font-black text-xs h-5.5 w-5.5 rounded-full flex items-center justify-center shadow">
                    1
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-bold text-text-default truncate w-[110px]">Emmanuel Kiprop</p>
                  <p className="text-[10px] text-[#EAB308] font-bold">1,450 XP</p>
                </div>
                <div className="w-20 bg-accent/15 border-x border-t border-accent/20 h-24 rounded-t-lg mt-2 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-[#EAB308] animate-bounce mt-1" />
                </div>
              </div>

              {/* Rank 3 */}
              <div className="flex flex-col items-center max-w-[100px]">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-background border border-border-default shadow">
                  <span className="text-xs font-bold text-text-default">R</span>
                  <div className="absolute -top-2.5 -right-1 bg-amber-600 text-white font-extrabold text-[9px] h-4.5 w-4.5 rounded-full flex items-center justify-center shadow">
                    3
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-bold text-text-default truncate w-[90px]">Ryan (You)</p>
                  <p className="text-[9px] text-[#A855F7] font-semibold">980 XP</p>
                </div>
                <div className="w-16 bg-border-default/45 h-10 rounded-t-lg mt-2 flex items-center justify-center">
                  <span className="text-xs font-extrabold text-text-muted">3rd</span>
                </div>
              </div>
            </div>
          </div>

          {/* User List */}
          <div className="rounded-xl border border-border-default bg-surface p-4 space-y-2">
            {list.map((u, idx) => (
              <div
                key={idx}
                className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                  u.isCurrentUser
                    ? "border-accent bg-accent/5"
                    : "border-border-default/20 bg-background/5"
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className={`w-5 text-center text-xs font-bold shrink-0 ${
                    u.rank === 1 ? "text-[#EAB308]" : u.rank === 2 ? "text-neutral-400" : "text-text-muted"
                  }`}>
                    #{u.rank}
                  </span>
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background border border-border-default/50 text-xs font-bold text-text-default">
                    {u.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-text-default truncate">
                      {u.name}
                    </p>
                    <p className="text-[9px] text-text-muted font-semibold uppercase tracking-wider">
                      {u.level} Level
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-0.5 text-orange-400 font-semibold text-xs">
                    <Flame className="h-4 w-4 fill-orange-400" />
                    <span>{u.streak}d</span>
                  </div>
                  <span className="text-xs font-extrabold text-text-default">{u.xp} XP</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Level breakdown / achievements (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* XP details */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-default uppercase tracking-wider">Your Progress</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-text-muted">Current Rank: Scholar</span>
                <span className="text-accent">980 / 1500 XP</span>
              </div>
              <div className="w-full bg-background/50 h-2 rounded-full overflow-hidden border border-border-default/45">
                <div className="bg-accent h-full rounded-full" style={{ width: "65%" }} />
              </div>
            </div>

            <div className="pt-2 border-t border-border-default/30 flex justify-between items-center text-xs text-text-muted font-medium">
              <span>Next Level: Master</span>
              <span>520 XP needed</span>
            </div>
          </div>

          {/* How to earn XP card */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-default uppercase tracking-wider">How to earn XP</h3>
            
            <div className="space-y-3">
              {[
                { title: "Daily Challenge Quiz", xp: "+10 XP" },
                { title: "Complete Topic Lessons", xp: "+20 XP" },
                { title: "Ace Sub-strand Tests", xp: "+50 XP" },
                { title: "Submit Group Projects", xp: "+100 XP" },
              ].map((act, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-text-default font-medium flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>{act.title}</span>
                  </span>
                  <span className="text-accent font-bold">{act.xp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
