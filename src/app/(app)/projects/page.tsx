"use client";

import React from "react";
import { Users, Plus, ChevronRight, MessageSquare, BookOpen } from "lucide-react";

export default function ProjectsPage() {
  const activeProjects = [
    { title: "Photosynthesis Experiment Log", subject: "Biology", members: 4, tasks: 6, completed: 4 },
    { title: "Hydraulic Press Model Build", subject: "Physics", members: 3, tasks: 5, completed: 2 },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4 flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
            Collaborative Group Projects
          </h1>
          <p className="text-xs md:text-sm text-text-muted">
            Share note folders, allocate study tasks, and work on lab practicals together.
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-3 py-2 text-xs font-semibold shadow active-press transition-colors cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>New Group</span>
        </button>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeProjects.map((p, idx) => (
          <div
            key={idx}
            className="hover-bloom rounded-2xl border border-border-default bg-surface p-5 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                  {p.subject}
                </span>
                <span className="text-xs text-text-muted font-bold flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{p.members} members</span>
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-text-default">{p.title}</h3>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Collaborative workspace for research logs and model blueprints.
                </p>
              </div>
            </div>

            {/* Progress and actions */}
            <div className="mt-5 pt-4 border-t border-border-default/20 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-text-muted font-semibold">Tasks Completed</span>
                <span className="text-text-default font-extrabold">{p.completed} / {p.tasks}</span>
              </div>
              <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full bg-growth rounded-full" 
                  style={{ width: `${(p.completed / p.tasks) * 100}%` }}
                />
              </div>

              <button className="w-full mt-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border-default hover:bg-background/80 text-text-default py-2 text-xs font-semibold active-press transition-colors">
                <MessageSquare className="h-3.5 w-3.5 text-text-muted" />
                <span>Open Collaboration Hub</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
