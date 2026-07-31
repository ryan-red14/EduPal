"use client";

import React, { useState } from "react";
import {
  Users,
  MessageSquare,
  FileText,
  Presentation,
  Grid,
  Plus,
  SendHorizontal,
  Sparkles,
  CheckCircle,
  FileSpreadsheet,
  Layers,
  ChevronRight,
  ClipboardList
} from "lucide-react";

interface ProjectTask {
  id: string;
  text: string;
  completed: boolean;
}

interface ChatMsg {
  sender: string;
  content: string;
  time: string;
}

export default function CollaborationPage() {
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"chat" | "docs" | "slides" | "sheets">("chat");

  // Chat Log States
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([
    { sender: "Ryan", content: "Hey team, did we finish the wave lab report?", time: "09:30 AM" },
    { sender: "Alice", content: "Yes! I uploaded the ripple tank photos to files.", time: "09:32 AM" },
    { sender: "John", content: "Great. I will write the conclusion in EduDocs now.", time: "09:33 AM" }
  ]);
  const [newMsg, setNewMsg] = useState("");

  // Tasks Checklist states
  const [tasks, setTasks] = useState<ProjectTask[]>([
    { id: "1", text: "Conduct ripple tank physics experiment", completed: true },
    { id: "2", text: "Draft wave diffraction note conclusions", completed: false },
    { id: "3", text: "Assemble final presentation slides", completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState("");

  // EduDocs States
  const [docContent, setDocContent] = useState(
    "Title: Wave Refraction Experiment Lab Report\n\nObjective:\nTo analyze boundary shifts of mechanical wave propagation in water media.\n\nObservations:\nWe observed waves bending as they transitioned from shallow water sections to deep water sections..."
  );
  const [docFeedback, setDocFeedback] = useState("");

  // EduSlides States
  const [slides, setSlides] = useState([
    { title: "Physics: Properties of Waves", bulletPoints: "1. Wave velocity v = f * λ\n2. Reflections on boundary interfaces\n3. Light refraction and Doppler mechanics" },
    { title: "Wave Refraction Findings", bulletPoints: "1. Wavefronts change direction\n2. Frequency remains constant\n3. Wavelength decreases in shallow media" }
  ]);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  // EduSheets States (5x5 sheet mockup)
  const [sheetsCells, setSheetsCells] = useState<Record<string, string>>({
    A1: "Frequency (Hz)", B1: "Wavelength (m)", C1: "Velocity (m/s)",
    A2: "2.5", B2: "0.4", C2: "1.0",
    A3: "5.0", B3: "0.2", C3: "1.0",
    A4: "1.2", B4: "0.5", C4: "0.6"
  });

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: "You", content: newMsg, time: "Just now" }
    ]);
    setNewMsg("");
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Math.random().toString(), text: newTaskText, completed: false }
    ]);
    setNewTaskText("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const runAiWriter = (type: "polish" | "summarize") => {
    setDocFeedback("AI processing document...");
    setTimeout(() => {
      if (type === "polish") {
        setDocContent((prev) => prev + "\n\n[AI POLISH ENHANCEMENT]: Transverse vibrations exhibit phase shifts depending on boundary rigidity parameters.");
        setDocFeedback("✓ Document polished with academic physics terminologies!");
      } else {
        setDocFeedback(`📝 Summary: Refraction lab reports verify wave speed calculations (v = f * λ) client-side.`);
      }
    }, 600);
  };

  const handleCellChange = (cellKey: string, val: string) => {
    setSheetsCells((prev) => ({ ...prev, [cellKey]: val }));
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/45 pb-4 flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight flex items-center gap-2">
            <Users className="h-6.5 w-6.5 text-accent" />
            <span>Project Workspace</span>
          </h1>
          <p className="text-xs md:text-sm text-text-muted">
            Collaborate on strands, edit shared notes, slides, and spreadsheet files.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border border-border-default p-1 rounded-lg bg-surface font-bold text-xs gap-1 select-none">
          {[
            { id: "chat", label: "Tasks & Chats", icon: MessageSquare },
            { id: "docs", label: "EduDocs", icon: FileText },
            { id: "slides", label: "EduSlides", icon: Presentation },
            { id: "sheets", label: "EduSheets", icon: FileSpreadsheet }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveWorkspaceTab(tab.id as any);
                  setDocFeedback("");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all active-press ${
                  activeWorkspaceTab === tab.id ? "bg-accent text-white" : "text-text-muted hover:text-text-default"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main workspace container */}
      <div className="rounded-xl border border-border-default bg-surface p-5 space-y-6 shadow-xl hover-bloom">
        
        {/* 1. Chats & Tasks Workspace */}
        {activeWorkspaceTab === "chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[400px] animate-fade-in">
            {/* Chat column (60%) */}
            <div className="lg:col-span-3 flex flex-col border border-border-default/60 rounded-xl overflow-hidden bg-background/10">
              <div className="p-3 border-b border-border-default/45 font-bold text-[10px] text-text-muted uppercase tracking-wider bg-background/25">
                Team Chat Channel
              </div>

              {/* Message log */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`max-w-[80%] p-3 rounded-lg text-xs leading-relaxed ${
                    msg.sender === "You" ? "ml-auto bg-primary text-white" : "bg-surface border border-border-default text-text-default"
                  }`}>
                    <p className="font-bold text-[9px] opacity-75 uppercase tracking-wide">{msg.sender}</p>
                    <p className="mt-1">{msg.content}</p>
                    <span className="block text-[8px] text-right opacity-60 mt-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Input tray */}
              <form onSubmit={sendChatMessage} className="p-3 border-t border-border-default/45 bg-surface flex gap-2">
                <input
                  type="text"
                  placeholder="Type group message..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  className="flex-1 bg-background border border-border-default px-3 py-1.5 rounded-lg text-xs text-text-default focus:border-accent focus:outline-none"
                />
                <button type="submit" className="p-2 rounded-lg bg-primary hover:bg-primary/95 text-white active-press">
                  <SendHorizontal className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Task column (40%) */}
            <div className="lg:col-span-2 flex flex-col border border-border-default/60 rounded-xl overflow-hidden bg-background/10 p-4 space-y-4">
              <h3 className="text-xs font-bold text-text-default flex items-center gap-1.5">
                <ClipboardList className="h-4.5 w-4.5 text-accent" />
                <span>Project Tasks Checklist</span>
              </h3>

              <form onSubmit={handleAddTask} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Create team task..."
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="flex-1 bg-background border border-border-default px-3 py-1.5 rounded-lg text-xs text-text-default focus:border-accent focus:outline-none"
                />
                <button type="submit" className="p-2 rounded-lg bg-accent text-white active-press text-xs font-bold">
                  Add
                </button>
              </form>

              <div className="flex-1 overflow-y-auto space-y-2">
                {tasks.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className="w-full p-2.5 rounded-lg border border-border-default/50 bg-surface flex items-center gap-2.5 text-xs text-left transition-all active-press"
                  >
                    <CheckCircle className={`h-4.5 w-4.5 shrink-0 ${t.completed ? "text-green-400 fill-green-400/10" : "text-text-muted"}`} />
                    <span className={t.completed ? "line-through text-text-muted" : "text-text-default"}>
                      {t.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. EduDocs Workspace */}
        {activeWorkspaceTab === "docs" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-fade-in">
            {/* Editor Sheet */}
            <div className="lg:col-span-3 flex flex-col border border-border-default/60 rounded-xl overflow-hidden shadow-inner">
              <textarea
                value={docContent}
                onChange={(e) => setDocContent(e.target.value)}
                className="w-full min-h-[300px] p-6 font-mono text-xs text-text-default bg-[#07090E] border-none focus:outline-none leading-relaxed resize-y"
              />
            </div>

            {/* AI Helpers Column */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 space-y-3 hover-bloom">
                <h3 className="text-xs font-bold text-text-default flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-accent animate-pulse" />
                  <span>EduPal AI Docs Assistant</span>
                </h3>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Generate conclusion reviews, check vocabulary structure, or simplify language.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => runAiWriter("polish")}
                    className="w-full py-2 rounded-lg bg-primary hover:bg-primary/95 text-white text-xs font-bold shadow-sm active-press hover-bloom"
                  >
                    AI Academic Polish
                  </button>
                  <button
                    onClick={() => runAiWriter("summarize")}
                    className="w-full py-2 rounded-lg border border-border-default bg-background/50 hover:bg-background text-text-default text-xs font-bold active-press hover-bloom"
                  >
                    AI Summarize Text
                  </button>
                </div>
              </div>

              {docFeedback && (
                <div className="p-3.5 rounded-lg border border-border-default bg-background/40 text-[10px] font-bold text-text-default animate-fade-in">
                  {docFeedback}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. EduSlides Workspace */}
        {activeWorkspaceTab === "slides" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-in h-[350px]">
            {/* Slide Selection Column */}
            <div className="lg:col-span-1 border border-border-default/60 bg-background/15 rounded-xl p-3 space-y-2 overflow-y-auto">
              {slides.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`w-full text-left p-2.5 rounded-lg border text-[10px] font-bold truncate active-press ${
                    activeSlideIdx === idx ? "border-accent bg-accent/5 text-accent" : "border-border-default bg-surface text-text-default"
                  }`}
                >
                  Slide {idx + 1}: {s.title}
                </button>
              ))}

              <button
                onClick={() => {
                  setSlides([...slides, { title: "New Slide Strand", bulletPoints: "1. Core facts details" }]);
                  setActiveSlideIdx(slides.length);
                }}
                className="w-full py-2 border-2 border-dashed border-border-default hover:border-text-muted text-text-muted hover:text-text-default text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 active-press"
              >
                <Plus className="h-3 w-3" />
                <span>Add Slide</span>
              </button>
            </div>

            {/* Slide Editor Panel */}
            <div className="lg:col-span-4 flex flex-col border border-border-default rounded-xl overflow-hidden bg-[#07090E] p-6 justify-between shadow-inner">
              <div className="space-y-4">
                <input
                  type="text"
                  value={slides[activeSlideIdx]?.title || ""}
                  onChange={(e) => {
                    const copy = [...slides];
                    copy[activeSlideIdx].title = e.target.value;
                    setSlides(copy);
                  }}
                  className="w-full bg-transparent text-lg font-black text-text-default border-none border-b border-border-default/20 pb-2 focus:outline-none"
                  placeholder="Enter Slide Title"
                />

                <textarea
                  value={slides[activeSlideIdx]?.bulletPoints || ""}
                  onChange={(e) => {
                    const copy = [...slides];
                    copy[activeSlideIdx].bulletPoints = e.target.value;
                    setSlides(copy);
                  }}
                  className="w-full min-h-[140px] bg-transparent text-xs font-mono text-text-muted border-none focus:outline-none resize-none leading-relaxed"
                  placeholder="Write slide body bullet points..."
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-border-default/10">
                <span className="text-[9px] font-bold text-text-muted uppercase">Slide Preview Canvas</span>
                <button
                  onClick={() => {
                    const copy = [...slides];
                    copy[activeSlideIdx].bulletPoints += "\n[AI ADDITION]: Experimental verification requires refraction observations.";
                    setSlides(copy);
                  }}
                  className="inline-flex items-center gap-1.5 rounded bg-primary hover:bg-primary/95 text-white px-2.5 py-1 text-[9px] font-bold active-press transition-colors shadow hover-bloom"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>AI Enhance Slide</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. EduSheets Workspace */}
        {activeWorkspaceTab === "sheets" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center text-xs font-semibold text-text-muted">
              <span>Spreadsheet cells A1 to D4 are fully editable. Formulas calculate sums client-side.</span>
              <span className="text-[10px] font-bold text-accent">Formula: SUM(C2:C4) = 2.6 m/s</span>
            </div>

            {/* spreadsheet Grid */}
            <div className="overflow-x-auto border border-border-default rounded-xl bg-[#090C12] p-1.5 shadow-inner">
              <table className="min-w-full text-center border-collapse">
                <thead>
                  <tr className="bg-background/40 font-bold text-[10px] text-text-muted uppercase border-b border-border-default/30">
                    <th className="py-2 px-3 border border-border-default/20 w-12">Col</th>
                    {["A", "B", "C", "D"].map((col) => (
                      <th key={col} className="py-2 px-3 border border-border-default/20 w-36">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((row) => (
                    <tr key={row} className="border-b border-border-default/20 text-xs">
                      <td className="py-2 px-3 font-mono font-bold text-text-muted bg-background/25 border border-border-default/20">
                        {row}
                      </td>
                      {["A", "B", "C", "D"].map((col) => {
                        const cellKey = `${col}${row}`;
                        return (
                          <td key={col} className="p-0.5 border border-border-default/20">
                            <input
                              type="text"
                              value={sheetsCells[cellKey] || ""}
                              onChange={(e) => handleCellChange(cellKey, e.target.value)}
                              className="w-full h-8 px-2 bg-transparent text-center text-xs font-semibold border-none text-text-default focus:bg-accent/5 focus:outline-none"
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
