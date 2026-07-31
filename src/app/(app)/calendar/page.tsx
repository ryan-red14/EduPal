"use client";

import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Trash2,
  X,
  Target,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle2
} from "lucide-react";

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

  // V2 Tab Navigation
  const [activeTab, setActiveTab] = useState<"calendar" | "pomodoro" | "simulator">("calendar");

  // Pomodoro States
  const [pomoTime, setPomoTime] = useState(1500); // 25 minutes
  const [pomoRunning, setPomoRunning] = useState(false);
  const [pomoMode, setPomoMode] = useState<"study" | "break">("study");
  const [pomoCompletedCount, setPomoCompletedCount] = useState(0);

  // Position Simulator States
  const [targetRank, setTargetRank] = useState<number>(10);
  const [simulatedStrategy, setSimulatedStrategy] = useState<string>("");

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

  // Pomodoro timer loop
  useEffect(() => {
    let interval: any = null;
    if (pomoRunning) {
      interval = setInterval(() => {
        setPomoTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setPomoRunning(false);
            if (pomoMode === "study") {
              alert("🎉 Pomodoro Session Completed! Time for a short 5-minute break.");
              setPomoMode("break");
              setPomoTime(300); // 5 mins
              setPomoCompletedCount((c) => c + 1);
            } else {
              alert("💪 Break finished! Back to study.");
              setPomoMode("study");
              setPomoTime(1500); // 25 mins
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [pomoRunning, pomoMode]);

  // Position Simulator change effects
  useEffect(() => {
    if (targetRank <= 5) {
      setSimulatedStrategy("Allocate 3 hours daily to Mathematics and Physics. Focus heavily on practice exams and request mock grading rubrics from Orbis.");
    } else if (targetRank <= 15) {
      setSimulatedStrategy("Dedicate 1.5 hours daily to your weakest subject. Complete 2 daily challenge quizzes and review flashcards during short breaks.");
    } else {
      setSimulatedStrategy("Complete all compulsory subject notes and take 1 test review after each sub-strand. Ensure all assignment deadlines are logged.");
    }
  }, [targetRank]);

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

  const formatPomoTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4 flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
            Study Planner
          </h1>
          <p className="text-xs md:text-sm text-text-muted">
            Configure Pomodoro study timers, log deadlines, and simulate ranking goals.
          </p>
        </div>
        
        {/* Navigation tabs */}
        <div className="flex border border-border-default p-1 rounded-lg bg-surface shrink-0 text-xs font-bold gap-1">
          {[
            { id: "calendar", label: "Calendar", icon: CalendarDays },
            { id: "pomodoro", label: "Pomodoro", icon: Timer },
            { id: "simulator", label: "Position Simulator", icon: Target }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all active-press ${
                  activeTab === tab.id ? "bg-accent text-white" : "text-text-muted hover:text-text-default"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content viewport */}
      <div className="rounded-xl border border-border-default bg-surface p-5 space-y-6 shadow-xl hover-bloom">
        {/* 1. Calendar View Tab */}
        {activeTab === "calendar" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-border-default/30 pb-4">
              <h2 className="text-base font-extrabold text-text-default flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-accent" />
                <span>June 2026</span>
              </h2>

              <button 
                onClick={() => {
                  setSelectedDay(1);
                  setNewTaskTitle("");
                  setShowAddModal(true);
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-primary hover:bg-primary/95 text-white px-3 py-1.5 text-[11px] font-bold shadow active-press hover-bloom"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Task</span>
              </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold text-text-muted mb-2 uppercase">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((w) => (
                <div key={w} className="py-1">{w}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: startOffset }).map((_, idx) => (
                <div key={`empty-${idx}`} className="aspect-square rounded-lg bg-background/10 border border-transparent" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const day = idx + 1;
                const dayEvents = events.filter((ev) => ev.day === day);

                return (
                  <div
                    key={day}
                    onClick={() => {
                      setSelectedDay(day);
                      setShowAddModal(true);
                    }}
                    className="aspect-square rounded-lg border border-border-default bg-background/20 p-1.5 flex flex-col justify-between hover-bloom hover:border-accent hover:shadow cursor-pointer active-press group"
                  >
                    <span className="text-[10px] font-bold text-text-default">{day}</span>
                    <div className="space-y-1 overflow-hidden max-h-[75%]">
                      {dayEvents.slice(0, 2).map((ev) => (
                        <div
                          key={ev.id}
                          className={`text-[8px] px-1 py-0.5 rounded truncate font-bold uppercase flex justify-between items-center ${
                            ev.type === "deadline" ? "bg-passion/15 text-passion" :
                            ev.type === "test" ? "bg-accent/15 text-accent" : "bg-growth/15 text-growth"
                          }`}
                        >
                          <span className="truncate flex-1">{ev.title}</span>
                          <button
                            onClick={(e) => handleDeleteEvent(ev.id, e)}
                            className="hidden group-hover:block ml-0.5 text-text-muted hover:text-text-default"
                          >
                            <Trash2 className="h-2 w-2" />
                          </button>
                        </div>
                      ))}
                      {dayEvents.length > 2 && (
                        <span className="text-[7px] text-text-muted font-bold block">+{dayEvents.length - 2} more</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Pomodoro Timer View Tab */}
        {activeTab === "pomodoro" && (
          <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center animate-fade-in">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent animate-pulse">
              <Timer className="h-6 w-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-text-default tracking-wider">{formatPomoTime(pomoTime)}</h2>
              <p className="text-xs text-text-muted font-semibold uppercase tracking-widest">
                {pomoMode === "study" ? "⏱ Study Focus Session" : "☕ Short Break Session"}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPomoRunning(!pomoRunning)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary hover:bg-primary/95 text-white shadow-md active-press transition-transform hover-bloom"
              >
                {pomoRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 fill-white" />}
              </button>

              <button
                onClick={() => {
                  setPomoRunning(false);
                  setPomoTime(pomoMode === "study" ? 1500 : 300);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default bg-background/50 hover:bg-background text-text-muted hover:text-text-default active-press transition-colors hover-bloom"
                title="Reset timer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Quick config options */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setPomoRunning(false);
                  setPomoMode("study");
                  setPomoTime(1500); // 25 mins
                }}
                className={`px-3.5 py-1.5 border rounded-lg text-xs font-bold active-press ${
                  pomoMode === "study" ? "border-accent bg-accent/5 text-accent" : "border-border-default bg-background/50 text-text-muted"
                }`}
              >
                25m Study Session
              </button>
              <button
                onClick={() => {
                  setPomoRunning(false);
                  setPomoMode("break");
                  setPomoTime(300); // 5 mins
                }}
                className={`px-3.5 py-1.5 border rounded-lg text-xs font-bold active-press ${
                  pomoMode === "break" ? "border-accent bg-accent/5 text-accent" : "border-border-default bg-background/50 text-text-muted"
                }`}
              >
                5m Short Break
              </button>
            </div>

            <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 flex items-center gap-3 max-w-sm hover-bloom">
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0 animate-pulse" />
              <p className="text-[11px] text-text-muted leading-relaxed text-left">
                Pomodoros Completed Today: <span className="text-text-default font-extrabold">{pomoCompletedCount}</span>. Streak active! Keep up the momentum.
              </p>
            </div>
          </div>
        )}

        {/* 3. Position Simulator View Tab */}
        {activeTab === "simulator" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-border-default/30 pb-3">
              <h2 className="text-base font-extrabold text-text-default flex items-center gap-2">
                <Target className="h-5 w-5 text-accent" />
                <span>Class Position Target Simulator</span>
              </h2>
              <span className="text-[10px] font-bold bg-accent/15 text-accent border border-accent/25 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Simulation Mode
              </span>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              Set your target rank goal and Orbis AI will calculate the target subject scores required:
            </p>

            <div className="p-4 rounded-xl border border-border-default bg-background/35 space-y-4 max-w-md hover-bloom shadow">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-text-default">
                  <span>Target Position:</span>
                  <span className="text-accent">Top {targetRank}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={targetRank}
                  onChange={(e) => setTargetRank(parseInt(e.target.value))}
                  className="w-full h-1 bg-background rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              {/* Targets Grade Grid */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Required Subject Scores</h4>
                <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-center">
                  <div className="p-2 border border-border-default bg-surface rounded">
                    <p className="text-text-muted">Physics</p>
                    <p className="text-sm font-black text-text-default mt-1">{targetRank <= 5 ? "85%" : "72%"}</p>
                  </div>
                  <div className="p-2 border border-border-default bg-surface rounded">
                    <p className="text-text-muted">Math</p>
                    <p className="text-sm font-black text-text-default mt-1">{targetRank <= 5 ? "88%" : "74%"}</p>
                  </div>
                  <div className="p-2 border border-border-default bg-surface rounded">
                    <p className="text-text-muted">Chemistry</p>
                    <p className="text-sm font-black text-text-default mt-1">{targetRank <= 5 ? "80%" : "68%"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Advisor Card */}
            {simulatedStrategy && (
              <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 space-y-3 animate-fade-in hover-bloom shadow-md">
                <h3 className="flex items-center gap-2 text-xs font-bold text-text-default">
                  <Sparkles className="h-4.5 w-4.5 text-accent animate-pulse" />
                  <span>Orbis Target Study Strategy</span>
                </h3>
                <p className="text-xs text-text-muted leading-relaxed font-semibold italic bg-background/35 p-3 rounded-lg border border-border-default/40">
                  💡 &quot;{simulatedStrategy}&quot;
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Task Modal overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-sm bg-surface border border-border-default rounded-xl shadow-2xl p-6 space-y-4 animate-fade-up">
            <div className="flex justify-between items-center pb-2 border-b border-border-default/20">
              <h3 className="text-sm font-bold text-text-default">Add Planner Event (June {selectedDay})</h3>
              <button onClick={() => setShowAddModal(false)} className="text-text-muted hover:text-text-default active-press p-0.5">
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-muted uppercase">Task Name</label>
                <input
                  type="text"
                  placeholder="e.g. Physics light prism revision"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-border-default bg-background/40 text-text-default focus:border-accent focus:outline-none"
                  autoFocus
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-muted uppercase">Event Type</label>
                <select
                  value={newType}
                  onChange={(e: any) => setNewType(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-lg border border-border-default bg-background/40 text-text-default focus:border-accent"
                >
                  <option value="deadline">Deadline Assignment</option>
                  <option value="test">Mock Examination Test</option>
                  <option value="study">Personal Study Slot</option>
                </select>
              </div>

              <div className="flex gap-2 justify-end pt-2 border-t border-border-default/20">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 border border-border-default text-text-muted hover:text-text-default text-xs font-bold rounded-lg active-press"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTaskTitle.trim()}
                  className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white text-xs font-bold shadow-md active-press transition-colors disabled:opacity-40 hover-bloom"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
