"use client";

import React, { useState } from "react";
import { Layers, HelpCircle, ArrowRightLeft, Sparkles } from "lucide-react";

interface Card {
  term: string;
  definition: string;
  category: string;
}

export default function FlashcardsPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards: Card[] = [
    { term: "Evaporation", definition: "The process where liquid water changes into water vapour due to heat energy.", category: "Science • Hydrology" },
    { term: "Condensation", definition: "The conversion of vapor or gas to a liquid, typically forming clouds as it cools.", category: "Science • Hydrology" },
    { term: "Precipitation", definition: "Water released from clouds in the form of rain, freezing rain, sleet, snow, or hail.", category: "Science • Hydrology" },
    { term: "Transpiration", definition: "The release of water vapour from plant leaves into the atmosphere.", category: "Science • Botany" },
  ];

  const handleShuffle = () => {
    setIsFlipped(false);
    // Move to next card in array
    setActiveIdx((prev) => (prev + 1) % cards.length);
  };

  const activeCard = cards[activeIdx];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up max-w-2xl mx-auto">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Flashcards &amp; Glossary
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Active recall cards to review syllabus vocabulary and core concepts.
        </p>
      </div>

      {/* Main Flashcard Container */}
      <div className="space-y-6">
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative min-h-[260px] w-full rounded-2xl border border-border-default bg-surface p-6 shadow-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-accent/5 active-press"
        >
          {/* Background Gradient Accent Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 pointer-events-none rounded-2xl" />

          {/* Category Pill */}
          <span className="absolute top-4 left-4 text-[10px] font-bold text-text-muted uppercase tracking-wider bg-background/50 border border-border-default/50 px-2 py-0.5 rounded-full">
            {activeCard.category}
          </span>

          <span className="absolute top-4 right-4 text-[10px] font-extrabold text-accent">
            {activeIdx + 1} / {cards.length}
          </span>

          {/* Card Side Content */}
          <div className="text-center px-4 space-y-4 select-none">
            {!isFlipped ? (
              <div className="space-y-2 animate-fade-in">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Term</span>
                <h2 className="text-3xl font-black text-text-default tracking-tight">
                  {activeCard.term}
                </h2>
                <p className="text-[10px] text-text-muted/80">Click card to reveal definition</p>
              </div>
            ) : (
              <div className="space-y-2 animate-fade-in">
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block">Definition</span>
                <p className="text-base font-semibold text-text-default max-w-md leading-relaxed">
                  {activeCard.definition}
                </p>
                <p className="text-[10px] text-accent/80">Click card to flip back</p>
              </div>
            )}
          </div>
        </div>

        {/* Controls Layout */}
        <div className="flex gap-4">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface hover:bg-background/80 text-text-default py-2.5 text-xs font-semibold shadow active-press transition-colors"
          >
            <ArrowRightLeft className="h-4 w-4 text-text-muted" />
            <span>Flip Card</span>
          </button>
          
          <button
            onClick={handleShuffle}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white py-2.5 text-xs font-semibold shadow active-press transition-colors"
          >
            <Layers className="h-4 w-4" />
            <span>Next Flashcard</span>
          </button>
        </div>
      </div>

      {/* Full Glossary Table Grid */}
      <div className="rounded-2xl border border-border-default bg-surface p-5 space-y-4">
        <h3 className="text-sm font-extrabold text-text-default uppercase tracking-wider flex items-center gap-2 border-b border-border-default/30 pb-2">
          <HelpCircle className="h-4.5 w-4.5 text-accent" />
          <span>Full Glossary Summary</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map((c, idx) => (
            <div key={idx} className="p-3 rounded-lg border border-border-default/30 bg-background/20 space-y-1">
              <h4 className="text-xs font-extrabold text-text-default">{c.term}</h4>
              <p className="text-[10px] text-text-muted leading-relaxed">{c.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
