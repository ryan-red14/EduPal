"use client";

import React, { useState } from "react";
import {
  FolderGit2,
  Calendar,
  FileCheck2,
  ShieldCheck,
  Plus,
  Sparkles,
  BookOpen,
  Award,
  Zap,
  Flame,
  Clock,
  TrendingUp,
  Brain,
  CheckCircle2,
  Crown,
  Target,
  Heart,
  ChevronRight
} from "lucide-react";

interface PortfolioEntry {
  id: string;
  title: string;
  category: "Project" | "Certificate" | "Achievement" | "Leadership";
  description: string;
  date: string;
  evidenceLink?: string;
}

interface Badge {
  name: string;
  desc: string;
  rarity: "Common" | "Uncommon" | "Rare" | "Exclusive";
  icon: any;
  unlocked: boolean;
  color: string;
  bgColor: string;
  borderColor: string;
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState<"all" | "Project" | "Certificate" | "Achievement">("all");
  const [entries, setEntries] = useState<PortfolioEntry[]>([
    {
      id: "1",
      title: "Wave Physics Simulation Project",
      category: "Project",
      description: "Interactive simulation tool built using JavaScript canvas demonstrating wave reflections and boundary nodes.",
      date: "June 28, 2026",
      evidenceLink: "github.com/student/physics-waves",
    },
    {
      id: "2",
      title: "CBE Junior Secondary Science Certificate",
      category: "Certificate",
      description: "Recognized certification for completing Grade 8 Integrated Science strand assessment with an average of 92%.",
      date: "May 15, 2026",
      evidenceLink: "credentials.cbe.go.ke/cert-8284",
    },
    {
      id: "3",
      title: "Science Club Leader",
      category: "Leadership" as any,
      description: "Appointed to lead Grade 8 weekly science experiment circles and coordinate group study folders.",
      date: "March 10, 2026",
    },
    {
      id: "4",
      title: "First Steps Achievement",
      category: "Achievement",
      description: "Earned for completing the first sub-strand topic in the Curriculum Library.",
      date: "June 05, 2026",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"Project" | "Certificate">("Project");
  const [newDesc, setNewDesc] = useState("");

  // Detailed Badges Collection mapped to Lucide Icons
  const badges: Record<string, Badge[]> = {
    "Academic Elite": [
      { name: "First Steps", desc: "Completed your first sub-strand topic.", rarity: "Common", icon: CheckCircle2, unlocked: true, color: "text-growth", bgColor: "bg-growth/10", borderColor: "border-growth/20" },
      { name: "Quick Study", desc: "Scored 100% on a sub-strand quiz.", rarity: "Uncommon", icon: Zap, unlocked: true, color: "text-[#EAB308]", bgColor: "bg-[#EAB308]/10", borderColor: "border-[#EAB308]/20" },
      { name: "Concept Master", desc: "Explained 10 elements to Orbis AI.", rarity: "Rare", icon: Brain, unlocked: false, color: "text-wisdom", bgColor: "bg-wisdom/10", borderColor: "border-wisdom/20" },
      { name: "Quiz Conqueror", desc: "Scored perfectly on 5 topic quizzes.", rarity: "Rare", icon: Crown, unlocked: true, color: "text-accent", bgColor: "bg-accent/10", borderColor: "border-accent/20" },
      { name: "Academic Elite", desc: "Obtained an EE1 in all junior subjects.", rarity: "Exclusive", icon: ShieldCheck, unlocked: false, color: "text-passion", bgColor: "bg-passion/10", borderColor: "border-passion/20" }
    ],
    "Consistency Heroes": [
      { name: "Steady Start", desc: "Maintained a 3-day study streak.", rarity: "Common", icon: Clock, unlocked: true, color: "text-trust", bgColor: "bg-trust/10", borderColor: "border-trust/20" },
      { name: "Week Warrior", desc: "Completed 7 daily challenges.", rarity: "Uncommon", icon: Flame, unlocked: true, color: "text-passion", bgColor: "bg-passion/10", borderColor: "border-passion/20" },
      { name: "Monthly Master", desc: "Active on EduPal for 30 consecutive days.", rarity: "Rare", icon: Target, unlocked: false, color: "text-[#FF6B9D]", bgColor: "bg-[#FF6B9D]/10", borderColor: "border-[#FF6B9D]/20" }
    ],
    "Growth & Dedication": [
      { name: "Level Up", desc: "Advanced your profile rank.", rarity: "Common", icon: TrendingUp, unlocked: true, color: "text-growth", bgColor: "bg-growth/10", borderColor: "border-growth/20" },
      { name: "Rising Star", desc: "Improved by one rubric tier in Math.", rarity: "Uncommon", icon: Sparkles, unlocked: true, color: "text-accent", bgColor: "bg-accent/10", borderColor: "border-accent/20" },
      { name: "Never Give Up", desc: "Retried a failed quiz and scored 100%.", rarity: "Rare", icon: Heart, unlocked: true, color: "text-passion", bgColor: "bg-passion/10", borderColor: "border-passion/20" }
    ]
  };

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const entry: PortfolioEntry = {
      id: (entries.length + 1).toString(),
      title: newTitle,
      category: newCategory,
      description: newDesc,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    setEntries([entry, ...entries]);
    setNewTitle("");
    setNewDesc("");
    setShowAddForm(false);
  };

  const filteredEntries = entries.filter((e) => activeTab === "all" || e.category === activeTab);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4 flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
            Academic Portfolio
          </h1>
          <p className="text-xs md:text-sm text-text-muted">
            Showcase your projects, earned certificates, leadership badges, and academic milestones.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-4 py-2 text-xs font-bold shadow active-press transition-colors shrink-0 hover-bloom"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project / Cert</span>
        </button>
      </div>

      {/* Quick Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Completed Projects", val: "1", icon: FolderGit2, color: "text-trust bg-trust/10" },
          { label: "Certificates", val: "1", icon: FileCheck2, color: "text-wisdom bg-wisdom/10" },
          { label: "Badges & Ranks", val: "8", icon: ShieldCheck, color: "text-[#EAB308] bg-[#EAB308]/10" }
        ].map((stat, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-border-default bg-surface flex items-center justify-between hover-bloom hover:border-accent/40">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">{stat.label}</span>
              <p className="text-2xl font-extrabold text-text-default">{stat.val}</p>
            </div>
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Add Entry Modal Overlay */}
      {showAddForm && (
        <div className="p-5 rounded-xl border border-border-default bg-surface space-y-4 animate-fade-in">
          <h3 className="text-sm font-bold text-text-default">Add Portfolio Record</h3>
          <form onSubmit={handleAddEntry} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-muted uppercase">Record Title</label>
                <input
                  type="text"
                  placeholder="e.g. Physics Project"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-muted uppercase">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none"
                >
                  <option value="Project">Project</option>
                  <option value="Certificate">Certificate</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-text-muted uppercase">Description</label>
              <textarea
                placeholder="Details about what you achieved..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none min-h-[80px] resize-none"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-lg border border-border-default text-text-muted hover:text-text-default text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold shadow"
              >
                Add Record
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Projects and Certificates (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Tabs and Filters */}
          <div className="flex gap-2 border-b border-border-default/30 pb-2 overflow-x-auto">
            {(["all", "Project", "Certificate", "Achievement"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider relative shrink-0 transition-colors ${
                  activeTab === tab ? "text-accent" : "text-text-muted hover:text-text-default"
                }`}
              >
                {tab}s
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-t-md" />
                )}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredEntries.map((e) => (
              <div
                key={e.id}
                className="p-5 rounded-xl border border-border-default bg-surface space-y-3 hover-bloom hover:border-accent/40"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-accent px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/15 uppercase tracking-wider">
                      {e.category}
                    </span>
                    <h3 className="text-sm font-bold text-text-default mt-2">
                      {e.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-text-muted font-semibold shrink-0">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{e.date}</span>
                  </div>
                </div>

                <p className="text-xs text-text-muted leading-relaxed">
                  {e.description}
                </p>

                {e.evidenceLink && (
                  <div className="pt-2 flex">
                    <a
                      href={`https://${e.evidenceLink}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-bold text-accent hover:underline"
                    >
                      <span>View Evidence: {e.evidenceLink}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Badges Collection & Orbis Reviews (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Badges Cabinet */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-6 shadow-md">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-accent" />
              <span>Badge Cabinet</span>
            </h3>

            <div className="space-y-6">
              {Object.entries(badges).map(([group, list]) => (
                <div key={group} className="space-y-3">
                  <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider block">
                    {group}
                  </span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {list.map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <div
                          key={badge.name}
                          className={`p-3 rounded-xl border flex items-center justify-between gap-3 hover-bloom hover:border-accent/40 ${
                            badge.unlocked 
                              ? "bg-background/40 border-border-default" 
                              : "bg-background/10 border-border-default/30 opacity-55"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg border shrink-0 ${badge.bgColor} ${badge.color} ${badge.borderColor}`}>
                              <Icon className="h-4.5 w-4.5" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-text-default">{badge.name}</p>
                              <p className="text-[10px] text-text-muted mt-0.5 leading-snug">{badge.desc}</p>
                            </div>
                          </div>

                          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                            badge.rarity === "Exclusive" 
                              ? "bg-passion/10 text-passion border border-passion/25" 
                              : badge.rarity === "Rare" 
                              ? "bg-wisdom/10 text-wisdom border border-wisdom/25"
                              : "bg-background border border-border-default text-text-muted"
                          }`}>
                            {badge.rarity}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
