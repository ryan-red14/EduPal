"use client";

import React, { useState, useEffect } from "react";
import { Folder, FileText, Plus, Pin, Search, Trash2 } from "lucide-react";

interface Note {
  id: string;
  title: string;
  folder: string;
  content: string;
  date: string;
  pinned: boolean;
}

export default function NotebookPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<string>("");
  const [search, setSearch] = useState("");
  const [saveStatus, setSaveStatus] = useState("Saved locally");

  // Load notes on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("edupal-notes");
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotes(parsed);
        if (parsed.length > 0) setActiveNote(parsed[0].id);
      } else {
        const defaultNotes: Note[] = [
          { id: "1", title: "Physics: Waves Formula Sheet", folder: "Science", content: "⚡ Waves Properties:\n\n- Wave Equation: v = f * λ\n- Rectilinear Propagation: waves travel in straight lines.\n- Refraction: change in speed when entering different density.", date: "Jun 29, 2026", pinned: true },
          { id: "2", title: "Biology: Photosynthesis Summary", folder: "Science", content: "🌿 Photosynthesis Summary\n\n- Chlorophyll absorbs blue and red wavelengths.\n- Light-dependent reactions split water molecules (Photolysis) releasing oxygen.\n- Light-independent reactions (Calvin Cycle) fix carbon dioxide into glucose.", date: "Jun 28, 2026", pinned: true },
          { id: "3", title: "Chemistry: Covalent Bonding Properties", folder: "Science", content: "🧪 Covalent bonding occurs when non-metal atoms share electron pairs to reach stable configurations.\n- Low melting points\n- Poor electrical conductivity in any phase", date: "Jun 27, 2026", pinned: false },
        ];
        setNotes(defaultNotes);
        setActiveNote("2");
        localStorage.setItem("edupal-notes", JSON.stringify(defaultNotes));
      }
    }
  }, []);

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes);
    localStorage.setItem("edupal-notes", JSON.stringify(newNotes));
    setSaveStatus("Saving...");
    setTimeout(() => {
      setSaveStatus("All changes saved");
    }, 400);
  };

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Math.random().toString(),
      title: "Untitled Note",
      folder: "General",
      content: "",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      pinned: false,
    };
    const updated = [newNote, ...notes];
    saveNotes(updated);
    setActiveNote(newNote.id);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = notes.filter((n) => n.id !== id);
    saveNotes(updated);
    if (activeNote === id && updated.length > 0) {
      setActiveNote(updated[0].id);
    } else if (updated.length === 0) {
      setActiveNote("");
    }
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, ...updates } : n));
    saveNotes(updated);
  };

  const activeContent = notes.find((n) => n.id === activeNote);

  return (
    <div className="space-y-6 animate-fade-up h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4 flex justify-between items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
            Personal Notebook
          </h1>
          <p className="text-xs md:text-sm text-text-muted">
            Organize study notes, quick ideas, and summaries compiled by Orbis AI.
          </p>
        </div>
        <button
          onClick={handleCreateNote}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-3.5 py-2 text-xs font-semibold shadow active-press transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* Workspace Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-[400px]">
        {/* Navigation Sidebar (33%) */}
        <div className="rounded-xl border border-border-default bg-surface p-4 flex flex-col space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-border-default bg-background/30 text-text-default focus:border-accent focus:outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 max-h-[350px]">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block px-1">
              All Notes
            </span>
            {notes
              .filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
              .map((note) => (
                <button
                  key={note.id}
                  onClick={() => setActiveNote(note.id)}
                  className={`flex w-full items-start gap-2.5 p-2 rounded-lg text-xs font-medium text-left transition-colors active-press group ${
                    activeNote === note.id
                      ? "bg-accent/15 text-accent border border-accent/15"
                      : "hover:bg-background/40 text-text-default"
                  }`}
                >
                  <FileText className="h-4.5 w-4.5 text-text-muted mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-bold truncate">{note.title}</p>
                      <div className="flex items-center gap-1 shrink-0">
                        {note.pinned && <Pin className="h-3 w-3 text-accent fill-accent" />}
                        <button
                          onClick={(e) => handleDeleteNote(note.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-text-muted hover:text-passion transition-all"
                          title="Delete Note"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-text-muted mt-0.5">
                      <span className="flex items-center gap-1 font-semibold">
                        <Folder className="h-3 w-3" />
                        <span>{note.folder}</span>
                      </span>
                      <span>{note.date}</span>
                    </div>
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* Editor Area (66%) */}
        <div className="md:col-span-2 rounded-xl border border-border-default bg-surface p-5 flex flex-col justify-between">
          {activeContent ? (
            <div className="space-y-4 flex-1 flex flex-col animate-fade-in">
              <div className="border-b border-border-default/30 pb-3 flex justify-between items-start gap-2">
                <input
                  type="text"
                  value={activeContent.title}
                  onChange={(e) => handleUpdateNote(activeNote, { title: e.target.value })}
                  className="text-lg font-bold bg-transparent text-text-default border-none focus:outline-none flex-1 min-w-0"
                />
                <input
                  type="text"
                  value={activeContent.folder}
                  onChange={(e) => handleUpdateNote(activeNote, { folder: e.target.value })}
                  className="text-[10px] font-bold text-accent border border-border-default/60 bg-background/50 px-2.5 py-0.5 rounded-full capitalize focus:outline-none"
                />
              </div>
              <textarea
                placeholder="Type your notes here..."
                value={activeContent.content}
                onChange={(e) => handleUpdateNote(activeNote, { content: e.target.value })}
                className="w-full flex-1 min-h-[250px] bg-transparent text-sm text-text-default placeholder:text-text-muted/65 focus:outline-none resize-none"
              />
            </div>
          ) : (
            <div className="text-center py-20 text-text-muted flex-1 flex flex-col justify-center">
              <p className="text-xs font-semibold">Select a note to edit or click New Note to write</p>
            </div>
          )}
          
          <div className="text-[10px] text-text-muted pt-2 border-t border-border-default/20 text-right">
            {saveStatus}
          </div>
        </div>
      </div>
    </div>
  );
}
