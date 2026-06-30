"use client";

import React, { useState } from "react";
import { FolderGit2, Calendar, FileCheck2, ShieldCheck, Plus, Sparkles, BookOpen } from "lucide-react";

interface PortfolioEntry {
  id: string;
  title: string;
  category: "Project" | "Certificate" | "Achievement" | "Leadership";
  description: string;
  date: string;
  evidenceLink?: string;
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
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-4 py-2 text-xs font-bold shadow active-press transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project / Cert</span>
        </button>
      </div>

      {/* Quick Stats Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border border-border-default bg-surface flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Completed Projects</span>
            <p className="text-2xl font-extrabold text-text-default">1</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-trust/10 text-trust">
            <FolderGit2 className="h-5 w-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border-default bg-surface flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Certificates</span>
            <p className="text-2xl font-extrabold text-text-default">1</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-wisdom/10 text-wisdom">
            <FileCheck2 className="h-5 w-5" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border-default bg-surface flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Badges & Ranks</span>
            <p className="text-2xl font-extrabold text-text-default">2</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAB308]/10 text-[#EAB308]">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>
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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Entries list (60%) */}
        <div className="lg:col-span-3 space-y-4">
          {filteredEntries.map((e) => (
            <div
              key={e.id}
              className="p-5 rounded-xl border border-border-default bg-surface space-y-3 hover:border-text-muted/30 transition-colors"
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

        {/* Orbis AI Insights (40%) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 md:p-6 space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-bold text-text-default">
              <Sparkles className="h-4.5 w-4.5 text-accent" />
              <span>Orbis AI Portfolio Review</span>
            </h3>

            <p className="text-xs text-text-muted leading-relaxed">
              Orbis automatically analyses your projects and badges to draft university pathway recommendation notes and highlight skill gaps.
            </p>

            <div className="p-3 rounded-lg bg-background/50 border border-border-default/40 space-y-2">
              <h4 className="text-[10px] font-bold text-[#EAB308] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#EAB308]" />
                <span>AI Highlight</span>
              </h4>
              <p className="text-xs text-text-default italic leading-relaxed">
                &quot;Your Wave Physics Simulation demonstrates early engineering skills. I recommend uploading a certificate for Grade 8 Mathematics to complete your STEM portfolio.&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
