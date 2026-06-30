"use client";

import React, { useState, useEffect } from "react";
import { Layers, HelpCircle, ArrowRightLeft, Sparkles, Plus, Trash2, Edit3, ChevronLeft, ChevronRight, X } from "lucide-react";

interface Card {
  id: string;
  term: string;
  definition: string;
  category: string;
}

export default function FlashcardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Modals / Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);
  const [newTerm, setNewTerm] = useState("");
  const [newDefinition, setNewDefinition] = useState("");
  const [newCategory, setNewCategory] = useState("General");

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("edupal-flashcards");
      if (saved) {
        setCards(JSON.parse(saved));
      } else {
        const defaultDeck: Card[] = [
          { id: "1", term: "Evaporation", definition: "The process where liquid water changes into water vapour due to heat energy.", category: "Science • Hydrology" },
          { id: "2", term: "Condensation", definition: "The conversion of vapor or gas to a liquid, typically forming clouds as it cools.", category: "Science • Hydrology" },
          { id: "3", term: "Precipitation", definition: "Water released from clouds in the form of rain, freezing rain, sleet, snow, or hail.", category: "Science • Hydrology" },
          { id: "4", term: "Transpiration", definition: "The release of water vapour from plant leaves into the atmosphere.", category: "Science • Botany" },
        ];
        setCards(defaultDeck);
        localStorage.setItem("edupal-flashcards", JSON.stringify(defaultDeck));
      }
    }
  }, []);

  const saveDeck = (newDeck: Card[]) => {
    setCards(newDeck);
    localStorage.setItem("edupal-flashcards", JSON.stringify(newDeck));
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveIdx((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveIdx((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTerm.trim() || !newDefinition.trim()) return;

    if (editingCard) {
      // Edit
      const updated = cards.map((c) =>
        c.id === editingCard.id
          ? { ...c, term: newTerm, definition: newDefinition, category: newCategory }
          : c
      );
      saveDeck(updated);
      setEditingCard(null);
    } else {
      // Add
      const newCard: Card = {
        id: Math.random().toString(),
        term: newTerm,
        definition: newDefinition,
        category: newCategory,
      };
      saveDeck([...cards, newCard]);
      setActiveIdx(cards.length); // Jump to new card
    }

    setNewTerm("");
    setNewDefinition("");
    setNewCategory("General");
    setShowAddModal(false);
  };

  const handleDeleteCard = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (cards.length <= 1) {
      alert("You need at least one card in your deck.");
      return;
    }
    const updated = cards.filter((c) => c.id !== id);
    saveDeck(updated);
    setActiveIdx(0);
    setIsFlipped(false);
  };

  const startEdit = (card: Card, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCard(card);
    setNewTerm(card.term);
    setNewDefinition(card.definition);
    setNewCategory(card.category);
    setShowAddModal(true);
  };

  const activeCard = cards[activeIdx];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up max-w-2xl mx-auto">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4 flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
            Flashcards Deck
          </h1>
          <p className="text-xs md:text-sm text-text-muted">
            Active recall tools to review syllabus vocabulary and core concepts.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCard(null);
            setNewTerm("");
            setNewDefinition("");
            setNewCategory("General");
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-3.5 py-2 text-xs font-bold shadow active-press transition-colors shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add Card</span>
        </button>
      </div>

      {/* Main Flashcard Container with 3D Flip */}
      {activeCard ? (
        <div className="space-y-6">
          {/* 3D Perspective Card Wrapper */}
          <div className="perspective-1000 w-full h-[260px] cursor-pointer">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`relative w-full h-full preserve-3d transition-transform duration-500 rounded-2xl ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* CARD FRONT */}
              <div className="absolute inset-0 backface-hidden rounded-2xl border border-border-default bg-surface p-6 shadow-xl flex flex-col items-center justify-center">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50 rounded-2xl pointer-events-none" />
                <span className="absolute top-4 left-4 text-[9px] font-bold text-text-muted uppercase tracking-wider bg-background/50 border border-border-default/50 px-2 py-0.5 rounded-full">
                  {activeCard.category}
                </span>
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={(e) => startEdit(activeCard, e)}
                    className="p-1 text-text-muted hover:text-accent transition-colors"
                    title="Edit Card"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteCard(activeCard.id, e)}
                    className="p-1 text-text-muted hover:text-passion transition-colors"
                    title="Delete Card"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <span className="text-[10px] font-extrabold text-accent ml-1">
                    {activeIdx + 1} / {cards.length}
                  </span>
                </div>
                <div className="text-center px-4 space-y-2 select-none">
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">Term</span>
                  <h2 className="text-2xl md:text-3xl font-black text-text-default tracking-tight">
                    {activeCard.term}
                  </h2>
                  <p className="text-[9px] text-text-muted/80 mt-2">Click card or press Flip to reveal definition</p>
                </div>
              </div>

              {/* CARD BACK (rotated initially) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-border-default bg-surface p-6 shadow-xl flex flex-col items-center justify-center">
                <span className="absolute top-4 left-4 text-[9px] font-bold text-text-muted uppercase tracking-wider bg-background/50 border border-border-default/50 px-2 py-0.5 rounded-full">
                  {activeCard.category}
                </span>
                <div className="text-center px-6 space-y-2 select-none">
                  <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider block">Definition</span>
                  <p className="text-sm md:text-base font-semibold text-text-default max-w-md leading-relaxed">
                    {activeCard.definition}
                  </p>
                  <p className="text-[9px] text-accent/80 mt-2">Click card to flip back</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Layout */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="px-3.5 py-2.5 rounded-lg border border-border-default bg-surface hover:bg-background/80 text-text-default active-press transition-colors shadow"
              title="Previous Card"
            >
              <ChevronLeft className="h-4.5 w-4.5" />
            </button>
            
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-border-default bg-surface hover:bg-background/80 text-text-default py-2.5 text-xs font-semibold shadow active-press transition-colors"
            >
              <ArrowRightLeft className="h-4 w-4 text-text-muted" />
              <span>Flip Card</span>
            </button>
            
            <button
              onClick={handleNext}
              className="px-3.5 py-2.5 rounded-lg border border-border-default bg-surface hover:bg-background/80 text-text-default active-press transition-colors shadow"
              title="Next Card"
            >
              <ChevronRight className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-border-default/60 rounded-xl bg-surface/30">
          <p className="text-sm text-text-muted">No cards in this deck. Add a new card above to start studying.</p>
        </div>
      )}

      {/* Editor Modal Overlay */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-surface border border-border-default rounded-xl p-5 md:p-6 space-y-4 animate-fade-up">
            <div className="flex justify-between items-center border-b border-border-default/20 pb-2">
              <h3 className="text-sm font-bold text-text-default">
                {editingCard ? "Edit Flashcard" : "Add Flashcard"}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-text-muted hover:text-text-default">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-muted uppercase">Term / Keyword</label>
                <input
                  type="text"
                  placeholder="e.g. Mitochondria"
                  value={newTerm}
                  onChange={(e) => setNewTerm(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-muted uppercase">Category</label>
                <input
                  type="text"
                  placeholder="e.g. Science • Biology"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-text-muted uppercase">Definition / Detail</label>
                <textarea
                  placeholder="Details of the term..."
                  value={newDefinition}
                  onChange={(e) => setNewDefinition(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none min-h-[90px] resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-border-default/25 pt-3">
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
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Full Glossary Table Grid */}
      <div className="rounded-2xl border border-border-default bg-surface p-5 space-y-4">
        <h3 className="text-sm font-extrabold text-text-default uppercase tracking-wider flex items-center gap-2 border-b border-border-default/30 pb-2">
          <HelpCircle className="h-4.5 w-4.5 text-accent" />
          <span>Full Glossary Summary</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-1">
          {cards.map((c, idx) => (
            <div key={idx} className="p-3.5 rounded-lg border border-border-default/30 bg-background/20 space-y-1.5">
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-xs font-extrabold text-text-default">{c.term}</h4>
                <span className="text-[8px] font-bold text-text-muted uppercase tracking-wider bg-background/40 border border-border-default/50 px-1.5 py-0.5 rounded">
                  {c.category}
                </span>
              </div>
              <p className="text-[10px] text-text-muted leading-relaxed">{c.definition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
