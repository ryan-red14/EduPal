"use client";

import React, { useState, useEffect } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus, Trash2, X } from "lucide-react";

interface CalendarEvent {
  id: string;
  day: number;
  title: string;
  type: "deadline" | "test" | "study";
}

export default function CalendarPage() {
  const daysInMonth = 30;
  const startOffset = 1; // June 2026 starts on Monday (index 1)
  
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newType, setNewType] = useState<"deadline" | "test" | "study">("deadline");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("edupal-calendar-events");
      if (saved) {
        setEvents(JSON.parse(saved));
      } else {
        const defaultEvents: CalendarEvent[] = [
          { id: "1", day: 8, title: "Math Assignment", type: "deadline" },
          { id: "2", day: 15, title: "Biology Lab Report", type: "deadline" },
          { id: "3", day: 24, title: "Physics Strands Test", type: "test" },
        ];
        setEvents(defaultEvents);
        localStorage.setItem("edupal-calendar-events", JSON.stringify(defaultEvents));
      }
    }
  }, []);

  const saveEvents = (newEvents: CalendarEvent[]) => {
    setEvents(newEvents);
    localStorage.setItem("edupal-calendar-events", JSON.stringify(newEvents));
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newEvent: CalendarEvent = {
      id: Math.random().toString(),
      day: selectedDay,
      title: newTaskTitle,
      type: newType
    };

    saveEvents([...events, newEvent]);
    setNewTaskTitle("");
    setShowAddModal(false);
  };

  const handleDeleteEvent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = events.filter((ev) => ev.id !== id);
    saveEvents(updated);
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
        <button 
          onClick={() => {
            setSelectedDay(1);
            setNewTaskTitle("");
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-3.5 py-2 text-xs font-semibold shadow active-press transition-colors cursor-pointer shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Calendar Grid Container */}
      <div className="rounded-xl border border-border-default bg-surface p-5 space-y-6 shadow-xl">
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
            <div key={day} className="font-extrabold text-text-muted pb-2 uppercase text-[9px] tracking-wider">
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
            const dayEvents = events.filter((ev) => ev.day === dayNum);

            return (
              <div
                key={dayNum}
                onClick={() => {
                  setSelectedDay(dayNum);
                  setNewTaskTitle("");
                  setShowAddModal(true);
                }}
                className="min-h-[70px] md:min-h-[90px] border border-border-default/40 rounded-lg p-1.5 flex flex-col justify-between items-start text-left bg-background/10 hover:bg-primary/5 transition-colors relative cursor-pointer group active-press"
              >
                <span className="font-bold text-text-default">{dayNum}</span>
                <div className="w-full space-y-1 overflow-y-auto max-h-[50px] pr-0.5">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`w-full p-1 rounded text-[8px] font-bold truncate leading-tight border flex justify-between items-center group/item ${
                        event.type === "deadline"
                          ? "bg-wisdom/10 text-wisdom border-wisdom/25"
                          : event.type === "test"
                          ? "bg-passion/10 text-passion border-passion/25"
                          : "bg-growth/10 text-growth border-growth/25"
                      }`}
                    >
                      <span className="truncate flex-1">{event.title}</span>
                      <button
                        onClick={(e) => handleDeleteEvent(event.id, e)}
                        className="opacity-0 group-hover/item:opacity-100 p-0.5 text-text-muted hover:text-passion transition-opacity ml-1 shrink-0"
                        title="Delete Task"
                      >
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-border-default/20 text-[9px] font-bold text-text-muted uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-wisdom border border-wisdom/40" />
            <span>Assignment Deadlines</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-passion border border-passion/40" />
            <span>Exams &amp; Strands Tests</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded bg-growth border border-growth/40" />
            <span>Study Slots</span>
          </span>
        </div>
      </div>

      {/* Task Creation Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-surface border border-border-default rounded-xl p-5 md:p-6 space-y-4 animate-fade-up">
            <div className="flex justify-between items-center border-b border-border-default/25 pb-2">
              <h3 className="text-sm font-bold text-text-default">
                Add Task for June {selectedDay}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-text-muted hover:text-text-default">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-muted uppercase">Task Name / Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Physics Revision..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none"
                  required
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-muted uppercase">Task Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none"
                >
                  <option value="deadline">Assignment Deadline</option>
                  <option value="test">Exam / Strand Test</option>
                  <option value="study">Personal Study Slot</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 border-t border-border-default/20 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 rounded-lg border border-border-default text-text-muted hover:text-text-default text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold shadow"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
