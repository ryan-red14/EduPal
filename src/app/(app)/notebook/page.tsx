"use client";

import React, { useState } from "react";
import { Folder, FileText, Plus, Pin, Search } from "lucide-react";

export default function NotebookPage() {
  const [notes, setNotes] = useState([
    { id: "1", title: "Physics: Waves Formula Sheet", folder: "Science", date: "June 29, 2026", pinned: true },
    { id: "2", title: "Biology: Photosynthesis Summary", folder: "Science", date: "June 28, 2026", pinned: true },
    { id: "3", title: "Chemistry: Covalent Bonding Properties", folder: "Science", date: "June 27, 2026", pinned: false },
    { id: "4", title: "History: Cold War Causes", folder: "Social Studies", date: "June 25, 2026", pinned: false },
  ]);

  const [activeNote, setActiveNote] = useState<string>("2");
  const [search, setSearch] = useState("");

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
          onClick={() => {
            const newNote = {
              id: (notes.length + 1).toString(),
              title: "Untitled Note",
              folder: "General",
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              pinned: false,
            };
            setNotes([newNote, ...notes]);
            setActiveNote(newNote.id);
          }}
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

          <div className="flex-1 overflow-y-auto space-y-2">
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block px-1">
              All Notes
            </span>
            {notes
              .filter((n) => n.title.toLowerCase().includes(search.toLowerCase()))
              .map((note) => (
                <button
                  key={note.id}
                  onClick={() => setActiveNote(note.id)}
                  className={`flex w-full items-start gap-2.5 p-2 rounded-lg text-xs font-medium text-left transition-colors active-press ${
                    activeNote === note.id
                      ? "bg-accent/15 text-accent border border-accent/15"
                      : "hover:bg-background/40 text-text-default"
                  }`}
                >
                  <FileText className="h-4.5 w-4.5 text-text-muted mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <p className="font-bold truncate">{note.title}</p>
                      {note.pinned && <Pin className="h-3 w-3 text-accent fill-accent shrink-0" />}
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
                  onChange={(e) => {
                    const titleVal = e.target.value;
                    setNotes(notes.map((n) => (n.id === activeNote ? { ...n, title: titleVal } : n)));
                  }}
                  className="text-lg font-bold bg-transparent text-text-default border-none focus:outline-none flex-1 min-w-0"
                />
                <span className="text-[10px] font-bold text-text-muted border border-border-default px-2 py-0.5 rounded-full capitalize">
                  {activeContent.folder}
                </span>
              </div>
              <textarea
                placeholder="Type your notes here..."
                defaultValue={
                  activeContent.id === "2"
                    ? "🌿 Photosynthesis Summary\n\n- Chlorophyll absorbs blue and red wavelengths.\n- Light-dependent reactions split water molecules (Photolysis) releasing oxygen.\n- Light-independent reactions (Calvin Cycle) fix carbon dioxide into glucose.\n\nCreated with Orbis AI Assistant."
                    : ""
                }
                className="w-full flex-1 min-h-[250px] bg-transparent text-sm text-text-default placeholder:text-text-muted/65 focus:outline-none resize-none"
              />
            </div>
          ) : (
            <div className="text-center py-20 text-text-muted flex-1 flex flex-col justify-center">
              <p className="text-xs font-semibold">Select a note to edit or click New Note to write</p>
            </div>
          )}
          
          <div className="text-[10px] text-text-muted pt-2 border-t border-border-default/20 text-right">
            Auto-saves locally
          </div>
        </div>
      </div>
    </div>
  );
}
