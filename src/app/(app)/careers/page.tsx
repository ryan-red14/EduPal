"use client";

import React, { useState } from "react";
import { Briefcase, Bookmark, Award, Sparkles, CheckCircle2, AlertCircle, Search, HelpCircle } from "lucide-react";
import Link from "next/link";

interface Career {
  id: string;
  name: string;
  category: "Science" | "Business" | "Arts" | "Agriculture" | "Social Sciences";
  description: string;
  requiredSubjects: string[];
  recommendedSkills: string[];
  missingSkills: string[];
  progress: number;
  pathway: string;
  isSaved: boolean;
}

export default function CareerTrackingPage() {
  const [careers, setCareers] = useState<Career[]>([
    {
      id: "1",
      name: "Electrical Engineer",
      category: "Science",
      description: "Design, develop, test, and supervise the manufacture of electrical equipment.",
      requiredSubjects: ["Mathematics", "Physics", "Chemistry"],
      recommendedSkills: ["Circuit Design", "Problem Solving", "CAD Modeling", "Python Programming"],
      missingSkills: ["CAD Modeling", "Python Programming"],
      progress: 65,
      pathway: "B.Sc. in Electrical & Electronics Engineering",
      isSaved: true,
    },
    {
      id: "2",
      name: "Data Scientist",
      category: "Science",
      description: "Analyze and interpret complex digital data to assist in decision-making.",
      requiredSubjects: ["Mathematics", "Physics", "Computer Studies"],
      recommendedSkills: ["Python Programming", "Statistics", "Machine Learning", "Data Visualization"],
      missingSkills: ["Machine Learning", "Statistics"],
      progress: 50,
      pathway: "B.Sc. in Computer Science or Statistics",
      isSaved: false,
    },
    {
      id: "3",
      name: "Agricultural Economist",
      category: "Agriculture",
      description: "Apply economic principles to optimize agricultural production and distribution.",
      requiredSubjects: ["Agriculture", "Mathematics", "Business Studies"],
      recommendedSkills: ["Data Analysis", "Agribusiness Management", "Market Research"],
      missingSkills: ["Agribusiness Management"],
      progress: 80,
      pathway: "B.Sc. in Agricultural Economics",
      isSaved: true,
    },
    {
      id: "4",
      name: "Environmental Analyst",
      category: "Social Sciences",
      description: "Conduct research and analyze data to assess environmental impacts of human activity.",
      requiredSubjects: ["Geography", "Biology", "Chemistry"],
      recommendedSkills: ["GIS Mapping", "Environmental Law", "Scientific Writing"],
      missingSkills: ["GIS Mapping", "Environmental Law"],
      progress: 45,
      pathway: "B.Sc. in Environmental Sciences",
      isSaved: false,
    },
  ]);

  const [activeCareerId, setActiveCareerId] = useState<string>("1");
  const [search, setSearch] = useState("");
  const activeCareer = careers.find((c) => c.id === activeCareerId);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCareers(
      careers.map((c) => (c.id === id ? { ...c, isSaved: !c.isSaved } : c))
    );
  };

  const filteredCareers = careers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Career Hub & Path Planning
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Map your academic performance to career paths, evaluate skill gaps, and explore university requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column - List of paths (40%) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search careers or clusters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border-default bg-surface/50 text-text-default focus:border-accent focus:outline-none"
            />
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
            {filteredCareers.map((c) => (
              <div
                key={c.id}
                onClick={() => setActiveCareerId(c.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-sm active-press flex flex-col gap-2.5 ${
                  activeCareerId === c.id
                    ? "border-accent bg-accent/5"
                    : "border-border-default bg-surface hover:border-text-muted/40"
                }`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <span className="text-[9px] font-bold text-accent px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/15 uppercase tracking-wider">
                      {c.category}
                    </span>
                    <h3 className="text-sm font-semibold text-text-default mt-1.5 truncate">
                      {c.name}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => toggleSave(c.id, e)}
                    className="p-1 rounded-md hover:bg-background transition-colors text-text-muted hover:text-text-default shrink-0"
                  >
                    <Bookmark
                      className={`h-4.5 w-4.5 ${
                        c.isSaved ? "fill-accent text-accent" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center gap-3 mt-1 text-[11px] text-text-muted font-medium">
                  <div className="flex-1 bg-background/50 h-1.5 rounded-full overflow-hidden border border-border-default/40">
                    <div
                      className="bg-accent h-full rounded-full transition-all duration-300"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                  <span className="shrink-0">{c.progress}% match</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Career Requirements and Details (60%) */}
        <div className="lg:col-span-3">
          {activeCareer ? (
            <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-6 animate-fade-in">
              {/* Profile status summary */}
              <div className="flex justify-between items-start border-b border-border-default/30 pb-4 gap-4">
                <div>
                  <h2 className="text-lg font-bold text-text-default">{activeCareer.name}</h2>
                  <p className="text-xs text-text-muted">{activeCareer.pathway}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-accent">{activeCareer.progress}%</span>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
                    Academic Match
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Career Description
                </h4>
                <p className="text-xs text-text-default leading-relaxed">
                  {activeCareer.description}
                </p>
              </div>

              {/* Required Subjects */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Required Subjects
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeCareer.requiredSubjects.map((s, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-border-default bg-background/50 text-text-default"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skill Gap Analysis */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  Skill Gap Analysis
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Acquired Skills */}
                  <div className="p-3.5 rounded-lg border border-green-500/20 bg-green-500/5 space-y-2">
                    <h5 className="text-[11px] font-bold text-green-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Acquired Skills</span>
                    </h5>
                    <div className="space-y-1">
                      {activeCareer.recommendedSkills
                        .filter((s) => !activeCareer.missingSkills.includes(s))
                        .map((s, idx) => (
                          <div key={idx} className="text-xs text-green-300 font-medium">
                            • {s}
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div className="p-3.5 rounded-lg border border-yellow-500/20 bg-yellow-500/5 space-y-2">
                    <h5 className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="h-4 w-4" />
                      <span>Skills to Develop</span>
                    </h5>
                    <div className="space-y-1">
                      {activeCareer.missingSkills.map((s, idx) => (
                        <div key={idx} className="text-xs text-yellow-300 font-medium">
                          • {s}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Orbis AI Guidance action */}
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent">
                    <Sparkles className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-text-default">
                      Need a Career Plan?
                    </h5>
                    <p className="text-[10px] text-text-muted mt-0.5 leading-relaxed">
                      Ask Orbis AI to recommend extra-curricular projects or online resources to bridge your skill gap.
                    </p>
                  </div>
                </div>
                <Link
                  href={`/orbis?career_id=${activeCareer.id}&career_name=${encodeURIComponent(activeCareer.name)}`}
                  className="w-full md:w-auto inline-flex justify-center items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-4 py-2 text-xs font-bold shadow-md active-press transition-colors shrink-0"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Ask Orbis</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-border-default/60 rounded-xl bg-surface/30">
              <p className="text-sm text-text-muted">Select a career profile to track requirements and milestones.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
