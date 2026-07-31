"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  Paperclip,
  Camera,
  SendHorizontal,
  Bot,
  User,
  HelpCircle,
  FileText,
  TrendingUp,
  Target,
  Trophy,
  Code,
  GraduationCap
} from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "orbis";
  content: string;
  timestamp: string;
  actions?: { label: string; action: string }[];
}

function OrbisAIPageContent() {
  const searchParams = useSearchParams();
  const contextParam = searchParams.get("context");

  const [context, setContext] = useState<string>("Dashboard");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activeOrbisSidebarTab, setActiveOrbisSidebarTab] = useState<"summary" | "goals" | "olympiad" | "coding" | "career">("summary");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contextParam) {
      setContext(contextParam);
    }
  }, [contextParam]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const suggestedPrompts = [
    { text: "Explain the water cycle in simple terms", icon: "💧" },
    { text: "What are the key concepts of photosynthesis?", icon: "🌿" },
    { text: "Help me create a revision plan for this week", icon: "📅" },
    { text: "Explain Newton's laws of motion", icon: "⚡" },
  ];

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsThinking(true);

    setTimeout(() => {
      let responseContent = "";
      let responseActions: { label: string; action: string }[] = [];

      const query = textToSend.toLowerCase();
      if (query.includes("water cycle")) {
        responseContent = "The **Water Cycle** is the continuous movement of water on, above, and below the Earth. It involves:\n\n1. **Evaporation:** Sun heats water bodies to form vapor.\n2. **Condensation:** Vapor cools to form clouds.\n3. **Precipitation:** Water falls back as rain or snow.\n4. **Collection:** Water gathers in soil and lakes.";
        responseActions = [
          { label: "Explain Simpler", action: "explain-simpler" },
          { label: "Save to Notebook", action: "save-note" }
        ];
      } else if (query.includes("photosynthesis")) {
        responseContent = "🌿 **Photosynthesis** is how green plants synthesize nutrients using sunlight, water, and CO₂.\n\n* **Equation:** `6CO₂ + 6H₂O + light ➔ C₆H₁₂O₆ + 6O₂`\n* **Site:** Occurs in chlorophyll leaf cells.";
        responseActions = [
          { label: "Make Flashcards", action: "make-flashcards" }
        ];
      } else if (query.includes("revision plan") || query.includes("study plan")) {
        responseContent = "📅 **Study Strategy Suggestion:**\n\n* **Monday:** Physics Waves — 45 mins\n* **Wednesday:** Chemistry Bonding — 40 mins\n* **Friday:** Biology Cells — 30 mins";
        responseActions = [
          { label: "Add to Planner", action: "add-planner" }
        ];
      } else {
        responseContent = `Thank you for asking about that in the **${context}** context. I am Orbis, your personal learning coach. I can explain complex terms, configure revision timetables, or suggest Olympiad practices.`;
        responseActions = [
          { label: "Explain Simpler", action: "explain-simpler" }
        ];
      }

      const orbisMsg: Message = {
        id: Math.random().toString(),
        sender: "orbis",
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: responseActions
      };

      setMessages((prev) => [...prev, orbisMsg]);
      setIsThinking(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[80vh] animate-fade-up">
      {/* Left Chat Screen (60%) */}
      <div className="lg:col-span-3 flex flex-col rounded-xl border border-border-default bg-surface overflow-hidden shadow-md">
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border-default/45 px-6 bg-background/25">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-wisdom to-trust text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-text-default">Orbis AI Coach</h1>
              <span className="text-[9px] text-text-muted">Active Context: {context}</span>
            </div>
          </div>
          <span className="flex items-center gap-1 text-[9px] font-extrabold text-green-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>Online</span>
          </span>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-background/10">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto space-y-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-wisdom to-trust text-white shadow-xl shadow-wisdom/25 animate-bounce" style={{ animationDuration: "3s" }}>
                <Bot className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-extrabold text-text-default">Hello, I&apos;m Orbis</h2>
                <p className="text-xs text-text-muted leading-relaxed">
                  Your personal AI tutor. Ask me to explain concepts, build practice tests, or coach you through Olympiad questions.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-4">
                {suggestedPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.text)}
                    className="flex items-start gap-3 p-3.5 rounded-xl border border-border-default/60 bg-surface hover:bg-primary/5 hover:border-accent hover:-translate-y-0.5 text-left text-xs font-semibold text-text-default hover-bloom active-press transition-all cursor-pointer"
                  >
                    <span className="text-base shrink-0">{p.icon}</span>
                    <span className="leading-snug">{p.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => {
                const isOrbis = msg.sender === "orbis";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 max-w-[85%] ${isOrbis ? "self-start" : "self-end flex-row-reverse ml-auto"}`}
                  >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm ${
                      isOrbis ? "bg-gradient-to-tr from-wisdom to-trust text-white" : "bg-surface border-border-default"
                    }`}>
                      {isOrbis ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </div>

                    <div className="space-y-1.5">
                      <div className={`rounded-xl px-4 py-3 text-xs md:text-sm shadow-sm leading-relaxed border ${
                        isOrbis ? "bg-surface border-border-default text-text-default" : "bg-primary text-white border-primary"
                      }`}>
                        {msg.content.split("\n\n").map((para, pIdx) => (
                          <p key={pIdx} className="mb-2 last:mb-0">{para}</p>
                        ))}
                      </div>
                      <span className="block text-[8px] text-text-muted px-1">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}

              {isThinking && (
                <div className="flex gap-3 max-w-[80%] self-start animate-pulse">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-wisdom to-trust border-wisdom text-white shadow-sm">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-xl px-4 py-3 bg-surface border border-border-default text-text-muted text-xs flex items-center gap-1.5 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input tray */}
        <div className="p-4 border-t border-border-default bg-background/20 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center gap-2 rounded-xl border border-border-default bg-surface px-3 py-2 shadow-inner focus-within:border-accent transition-colors"
          >
            <button type="button" className="p-1.5 rounded-lg text-text-muted hover:text-text-default hover:bg-background active-press">
              <Camera className="h-4.5 w-4.5" />
            </button>
            <button type="button" className="p-1.5 rounded-lg text-text-muted hover:text-text-default hover:bg-background active-press">
              <Paperclip className="h-4.5 w-4.5" />
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Orbis for revision strategies..."
              className="flex-1 bg-transparent px-2 text-xs md:text-sm text-text-default placeholder:text-text-muted focus:outline-none"
            />
            <button type="submit" disabled={!inputValue.trim()} className="p-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white disabled:opacity-40 active-press shrink-0">
              <SendHorizontal className="h-4.5 w-4.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Right V2 Coach Sidebar (40%) */}
      <div className="lg:col-span-2 flex flex-col rounded-xl border border-border-default bg-surface overflow-hidden shadow-md">
        {/* Sub-nav headers */}
        <div className="grid grid-cols-5 border-b border-border-default/45 p-1 bg-background/25 shrink-0 text-center font-bold text-[9px] uppercase tracking-wide">
          {([
            { id: "summary", label: "Stats", icon: TrendingUp },
            { id: "goals", label: "Goals", icon: Target },
            { id: "olympiad", label: "Olympiad", icon: Trophy },
            { id: "coding", label: "Code", icon: Code },
            { id: "career", label: "Career", icon: GraduationCap }
          ] as const).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveOrbisSidebarTab(tab.id)}
                className={`py-2 rounded flex flex-col items-center gap-1 transition-all active-press ${
                  activeOrbisSidebarTab === tab.id ? "bg-accent/15 text-accent border border-accent/20" : "text-text-muted hover:text-text-default"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sidebar tabs viewport */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {activeOrbisSidebarTab === "summary" && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xs font-bold text-text-default flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-accent" />
                <span>Academic Summary Insights</span>
              </h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Orbis tracks your class average and has calculated your weak areas:
              </p>
              <div className="space-y-2">
                <div className="p-3 rounded-lg border border-border-default bg-background/20 space-y-1">
                  <p className="font-bold text-text-default flex justify-between">
                    <span>Physics (Optics)</span>
                    <span className="text-green-400">85% average</span>
                  </p>
                  <p className="text-[10px] text-text-muted">Strong concept mastery. Completed 4 assignments.</p>
                </div>
                <div className="p-3 rounded-lg border border-border-default bg-background/20 space-y-1">
                  <p className="font-bold text-text-default flex justify-between">
                    <span>Mathematics (Stats)</span>
                    <span className="text-passion">58% average</span>
                  </p>
                  <p className="text-[10px] text-text-muted">Requires focus. Practice 5 mean deviation formulas.</p>
                </div>
              </div>
            </div>
          )}

          {activeOrbisSidebarTab === "goals" && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xs font-bold text-text-default flex items-center gap-1.5">
                <Target className="h-4 w-4 text-accent" />
                <span>Goal & Revision Advisors</span>
              </h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Your pathway target is set to **STEM**.
              </p>
              <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 space-y-2">
                <p className="font-bold text-text-default">Target: Class Rank Top 5</p>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  To reach this, your average score must increase by **4.5%**. Focus on sub-strand assessment revisions in Math and Chemistry.
                </p>
              </div>
            </div>
          )}

          {activeOrbisSidebarTab === "olympiad" && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xs font-bold text-text-default flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-accent" />
                <span>Olympiad Coach Support</span>
              </h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Unlock training tips for the upcoming **Chemistry Contest**:
              </p>
              <ul className="space-y-2">
                <li className="p-2.5 rounded border border-border-default bg-background/20 leading-relaxed text-[10px]">
                  🔬 **Daily Tip:** Focus on periodic properties and valency configurations. Practice Bohr models regularly.
                </li>
                <li className="p-2.5 rounded border border-border-default bg-background/20 leading-relaxed text-[10px]">
                  💡 **Suggested Problem:** What is the electron config of Calcium-40? Try writing it in the Chemistry periodic tool.
                </li>
              </ul>
            </div>
          )}

          {activeOrbisSidebarTab === "coding" && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xs font-bold text-text-default flex items-center gap-1.5">
                <Code className="h-4 w-4 text-accent" />
                <span>Coding Assistant Modules</span>
              </h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Practice JavaScript or Python client-side:
              </p>
              <div className="p-3.5 rounded-lg border border-border-default bg-background/30 space-y-2">
                <p className="font-bold text-accent">Physics Wave Sim Formula:</p>
                <pre className="text-[9px] font-mono bg-background p-2 rounded text-text-default border border-border-default/40 overflow-x-auto">
{`def wave_speed(freq, wavelength):
    return freq * wavelength
print(wave_speed(2.5, 0.4)) # Speed in m/s`}
                </pre>
              </div>
            </div>
          )}

          {activeOrbisSidebarTab === "career" && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xs font-bold text-text-default flex items-center gap-1.5">
                <GraduationCap className="h-4 w-4 text-accent" />
                <span>Career Pathway Matching</span>
              </h3>
              <div className="p-3.5 rounded-lg border border-border-default bg-background/20 space-y-2">
                <p className="font-bold text-text-default">Software Engineer</p>
                <div className="w-full bg-background h-2 rounded-full overflow-hidden border border-border-default/40">
                  <div className="bg-green-400 h-full" style={{ width: "90%" }} />
                </div>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  90% Compatible based on your STEM cluster selections (Computer Studies, Physics).
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OrbisAIPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-text-muted font-bold text-xs uppercase tracking-widest animate-pulse">Loading Orbis Workspace...</div>}>
      <OrbisAIPageContent />
    </Suspense>
  );
}
