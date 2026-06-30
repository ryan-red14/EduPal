"use client";

import React from "react";
import { TrendingUp, Award, Clock, Star, Flame, Sparkles, BookOpen } from "lucide-react";

export default function AnalyticsPage() {
  const kpis = [
    { label: "Tests Completed", value: "8", icon: Award, color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10" },
    { label: "Average Score", value: "78%", icon: TrendingUp, color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
    { label: "Best Score", value: "95%", icon: Star, color: "text-[#3B82F6]", bg: "bg-[#3B82F6]/10" },
    { label: "Hours Studied", value: "14.5h", icon: Clock, color: "text-[#A855F7]", bg: "bg-[#A855F7]/10" },
  ];

  const strengths = [
    { name: "Physics: Waves", score: 92, status: "Mastered" },
    { name: "Biology: Cells & Genetics", score: 88, status: "Strong" },
    { name: "English: Grammar Basics", score: 85, status: "Strong" },
  ];

  const weaknesses = [
    { name: "Maths: Quadratic Equations", score: 58, status: "Needs Review" },
    { name: "Chemistry: Balancing Equations", score: 62, status: "Needs Review" },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Performance Analytics
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Detailed metrics of your academic progress, strength areas, and suggested focus topics.
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-5 rounded-xl border border-border-default bg-surface hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  {kpi.label}
                </span>
                <p className="text-2xl font-black text-text-default">{kpi.value}</p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${kpi.bg} ${kpi.color}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - Charts & Breakdown (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Mock Score Trend SVG Graph */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-default uppercase tracking-wider">Score Progression</h3>
            
            <div className="h-48 w-full bg-background/25 rounded-lg border border-border-default/20 relative flex items-end p-4">
              {/* SVG Area for Chart */}
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Grid Lines */}
                <line x1="0" y1="20" x2="100" y2="20" stroke="var(--border-default)" strokeWidth="0.1" strokeDasharray="2" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="var(--border-default)" strokeWidth="0.1" strokeDasharray="2" />
                <line x1="0" y1="80" x2="100" y2="80" stroke="var(--border-default)" strokeWidth="0.1" strokeDasharray="2" />
                
                {/* Trend line */}
                <path
                  d="M 5,80 Q 25,65 45,45 T 85,25"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
                
                {/* Glow under line */}
                <path
                  d="M 5,80 Q 25,65 45,45 T 85,25 L 85,100 L 5,100 Z"
                  fill="url(#grad)"
                  opacity="0.1"
                />
                
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute left-2 top-2 text-[8px] text-text-muted">100%</div>
              <div className="absolute left-2 bottom-2 text-[8px] text-text-muted">0%</div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-text-muted font-bold uppercase px-2">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4 (Current)</span>
            </div>
          </div>

          {/* Strength Areas */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <h3 className="text-sm font-bold text-text-default uppercase tracking-wider">Strength Areas</h3>
            <div className="space-y-3">
              {strengths.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-text-default">{s.name}</span>
                    <span className="text-green-400 font-bold">{s.score}% ({s.status})</span>
                  </div>
                  <div className="w-full bg-background/50 h-1.5 rounded-full overflow-hidden border border-border-default/45">
                    <div className="bg-green-500 h-full rounded-full" style={{ width: `${s.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Weakness Areas & AI recommendations (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Areas for Improvement */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#FF6B9D] uppercase tracking-wider">Areas for Improvement</h3>
            
            <div className="space-y-3">
              {weaknesses.map((w, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-text-default">{w.name}</span>
                    <span className="text-[#FF6B9D] font-bold">{w.score}% ({w.status})</span>
                  </div>
                  <div className="w-full bg-background/50 h-1.5 rounded-full overflow-hidden border border-border-default/45">
                    <div className="bg-[#FF6B9D] h-full rounded-full" style={{ width: `${w.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI recommendations */}
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 md:p-6 space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-text-default">
              <Sparkles className="h-4.5 w-4.5 text-accent animate-pulse" />
              <span>Orbis Study Suggestion</span>
            </h3>

            <p className="text-xs text-text-muted leading-relaxed">
              Based on your recent quiz attempts, your accuracy in balancing Chemical equations is dropping. We suggest setting aside 15 mins today to review the chemistry notes.
            </p>

            <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white py-2 text-xs font-bold shadow-md transition-colors active-press">
              <BookOpen className="h-4 w-4" />
              <span>Open Chemistry Sub-Strand</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
