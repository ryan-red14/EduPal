"use client";

import React from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";

export default function CalendarPage() {
  const daysInMonth = 30;
  const startOffset = 1; // June 2026 starts on Monday (index 1)

  const events = {
    8: { title: "Math Assignment", type: "deadline" },
    15: { title: "Biology Lab Report", type: "deadline" },
    24: { title: "Physics Strands Test", type: "test" },
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4 flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
            Study Calendar
          </h1>
          <p className="text-xs md:text-sm text-text-muted">
            Track assignment deadlines, exam timetables, and personalized AI study slots.
          </p>
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-3 py-2 text-xs font-semibold shadow active-press transition-colors cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Calendar Grid Container */}
      <div className="rounded-xl border border-border-default bg-surface p-5 space-y-6">
        {/* Month Selector Bar */}
        <div className="flex items-center justify-between border-b border-border-default/30 pb-4">
          <h2 className="text-base font-extrabold text-text-default flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-accent" />
            <span>June 2026</span>
          </h2>
          <div className="flex border border-border-default rounded-lg p-0.5 bg-background/50">
            <button className="p-1 rounded-md hover:bg-background active-press">
              <ChevronLeft className="h-4 w-4 text-text-muted" />
            </button>
            <button className="p-1 rounded-md hover:bg-background active-press">
              <ChevronRight className="h-4 w-4 text-text-muted" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-xs">
          {/* Weekday headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-extrabold text-text-muted pb-2 uppercase text-[10px] tracking-wider">
              {day}
            </div>
          ))}

          {/* Empty spacer cells before start of month */}
          {Array.from({ length: startOffset }).map((_, idx) => (
            <div key={idx} className="min-h-[60px] border border-border-default/10 rounded-lg opacity-25" />
          ))}

          {/* June Days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const event = (events as any)[dayNum];

            return (
              <div
                key={dayNum}
                className="min-h-[60px] md:min-h-[80px] border border-border-default/40 rounded-lg p-1.5 flex flex-col justify-between items-start text-left bg-background/10 hover:bg-primary/5 transition-colors relative"
              >
                <span className="font-bold text-text-default">{dayNum}</span>
                {event && (
                  <div className={`w-full p-1 rounded text-[9px] font-semibold truncate leading-tight border ${
                    event.type === "deadline"
                      ? "bg-wisdom/10 text-wisdom border-wisdom/25"
                      : "bg-passion/10 text-passion border-passion/25"
                  }`}>
                    {event.title}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-border-default/20 text-[10px] font-bold text-text-muted uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-wisdom border border-wisdom/40" />
            <span>Assignment Deadlines</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-passion border border-passion/40" />
            <span>Exams &amp; Strands Tests</span>
          </span>
        </div>
      </div>
    </div>
  );
}
