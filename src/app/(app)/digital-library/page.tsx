"use client";

import React, { useState } from "react";
import { BookOpen, FileText, Video, Search, Download, Sparkles } from "lucide-react";
import Link from "next/link";

interface Document {
  id: string;
  title: string;
  category: "textbook" | "past-paper" | "guide" | "video";
  subject: string;
  fileSize?: string;
  duration?: string;
  format: string;
  downloads: string;
}

export default function DigitalLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "textbook" | "past-paper" | "guide" | "video">("all");
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  const documents: Document[] = [
    { id: "1", title: "Grade 8 Integrated Science Textbook", category: "textbook", subject: "Integrated Science", fileSize: "14.2 MB", format: "PDF", downloads: "2.4k" },
    { id: "2", title: "KCSE Chemistry Revision Past Paper - 2025", category: "past-paper", subject: "Chemistry", fileSize: "3.1 MB", format: "PDF", downloads: "1.1k" },
    { id: "3", title: "Grade 7 Mathematics Curriculum Guide", category: "guide", subject: "Mathematics", fileSize: "5.8 MB", format: "PDF", downloads: "950" },
    { id: "4", title: "Properties of Wave Motion - Experimental Video", category: "video", subject: "Physics", duration: "14m 20s", format: "MP4", downloads: "1.8k" },
    { id: "5", title: "Grade 9 Biology: Cell Structure Guide", category: "guide", subject: "Biology", fileSize: "4.5 MB", format: "PDF", downloads: "750" },
    { id: "6", title: "KCSE English Composition Prep", category: "past-paper", subject: "English", fileSize: "2.8 MB", format: "PDF", downloads: "1.5k" },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || doc.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const getIcon = (category: string) => {
    switch (category) {
      case "textbook":
        return <BookOpen className="h-5 w-5 text-trust" />;
      case "video":
        return <Video className="h-5 w-5 text-accent" />;
      default:
        return <FileText className="h-5 w-5 text-wisdom" />;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Digital Library
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Browse textbooks, CBC past papers, revision materials, and videos approved for Kenya&apos;s curriculum.
        </p>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {(["all", "textbook", "past-paper", "guide", "video"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider border transition-all active-press ${
                activeTab === tab
                  ? "bg-accent/15 border-accent text-accent"
                  : "border-border-default bg-surface/50 text-text-muted hover:text-text-default"
              }`}
            >
              {tab.replace("-", " ")}s
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search by title or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border-default bg-surface/60 text-text-default focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredDocs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`group p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 active-press flex items-start justify-between gap-4 ${
                    selectedDoc?.id === doc.id
                      ? "border-accent bg-accent/5"
                      : "border-border-default bg-surface hover:border-text-muted/40"
                  }`}
                >
                  <div className="flex gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background/50 border border-border-default/50">
                      {getIcon(doc.category)}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                        {doc.subject}
                      </span>
                      <h3 className="text-sm font-semibold text-text-default truncate group-hover:text-accent transition-colors">
                        {doc.title}
                      </h3>
                      <div className="flex gap-2 text-[10px] text-text-muted mt-1 font-medium">
                        <span className="capitalize">{doc.category}</span>
                        <span>•</span>
                        <span>{doc.fileSize || doc.duration}</span>
                        <span>•</span>
                        <span>{doc.downloads} reads</span>
                      </div>
                    </div>
                  </div>
                  <Download className="h-4.5 w-4.5 text-text-muted hover:text-text-default shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-border-default/60 rounded-xl bg-surface/30">
              <p className="text-sm text-text-muted font-medium">No resources found matching criteria.</p>
            </div>
          )}
        </div>

        {/* Info panel / Orbis integration */}
        <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-5 h-fit">
          {selectedDoc ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex justify-between items-start border-b border-border-default/30 pb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded-full capitalize">
                  {selectedDoc.category}
                </span>
                <span className="text-xs text-text-muted font-semibold">{selectedDoc.format}</span>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-bold text-accent uppercase tracking-wider">{selectedDoc.subject}</p>
                <h3 className="text-base font-bold text-text-default leading-tight">{selectedDoc.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  CBC curriculum resource approved for exam preps. Includes self-check exercises, sub-strand assessments, and hands-on experiments.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/95 text-white py-2 text-xs font-bold shadow-md transition-colors active-press">
                  <Download className="h-4 w-4" />
                  <span>Download Resource ({selectedDoc.fileSize || "Watch Video"})</span>
                </button>

                <Link
                  href={`/orbis?doc_id=${selectedDoc.id}&doc_title=${encodeURIComponent(selectedDoc.title)}`}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-border-default bg-background/50 hover:bg-background/80 text-text-default py-2 text-xs font-bold transition-all active-press"
                >
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span>Ask Orbis AI about this</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border-default/50 text-text-muted">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-text-default">Select a resource</p>
                <p className="text-xs text-text-muted">Click any textbook or paper to download or prompt Orbis AI for a summary.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
