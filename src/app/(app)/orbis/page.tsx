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
  CheckCircle,
  HelpCircle,
  FileText,
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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (contextParam) {
      setContext(contextParam);
    }
  }, [contextParam]);

  useEffect(() => {
    // Scroll to bottom on new messages
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

    // Simulate Orbis responding in 1.5 seconds
    setTimeout(() => {
      let responseContent = "";
      let responseActions: { label: string; action: string }[] = [];

      const query = textToSend.toLowerCase();
      if (query.includes("water cycle")) {
        responseContent = "The **Water Cycle** (hydrological cycle) is the continuous movement of water on, above, and below the surface of the Earth. It involves four main stages:\n\n1. **Evaporation:** The sun heats water in oceans and rivers, turning it into water vapor.\n2. **Condensation:** Water vapor cools down in the atmosphere and forms clouds.\n3. **Precipitation:** Water falls back to earth as rain, snow, or hail.\n4. **Collection:** Water gathers in oceans, soil, and underground reservoirs, starting the process again.";
        responseActions = [
          { label: "Explain Simpler", action: "explain-simpler" },
          { label: "Create Quiz", action: "create-quiz" },
          { label: "Save to Notebook", action: "save-note" },
        ];
      } else if (query.includes("photosynthesis")) {
        responseContent = "🌿 **Photosynthesis** is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water. In plants, photosynthesis generally involves the green pigment chlorophyll and generates oxygen as a byproduct.\n\n* **Equation:** `6CO₂ + 6H₂O + light energy ➔ C₆H₁₂O₆ + 6O₂`\n* **Key Site:** Occurs inside the chloroplasts of leaf cells.";
        responseActions = [
          { label: "Explain Simpler", action: "explain-simpler" },
          { label: "Make Flashcards", action: "make-flashcards" },
        ];
      } else if (query.includes("revision plan") || query.includes("study plan")) {
        responseContent = "📅 **Weekly Study Plan Suggestion:**\n\n* **Monday:** Physics (Properties of Waves) — 45 mins\n* **Wednesday:** Chemistry (Ionic Bonding review) — 40 mins\n* **Friday:** Biology (Cell Organelles practice) — 30 mins\n* **Saturday:** Complete Weekly Diagnostic Quiz — 20 mins";
        responseActions = [
          { label: "Add to Planner", action: "add-planner" },
        ];
      } else {
        responseContent = `Thank you for asking about that in the **${context}** context. I am Orbis, your personal curriculum learning companion. I can explain this topic, generate flashcards, create a quick mock test, or summarize key concepts.`;
        responseActions = [
          { label: "Explain Simpler", action: "explain-simpler" },
          { label: "Create Quiz", action: "create-quiz" },
        ];
      }

      const orbisMsg: Message = {
        id: Math.random().toString(),
        sender: "orbis",
        content: responseContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: responseActions,
      };

      setMessages((prev) => [...prev, orbisMsg]);
      setIsThinking(false);
    }, 1200);
  };

  const handleActionClick = (action: string) => {
    // Add dynamic response to clicking action buttons inside chat
    setIsThinking(true);
    setTimeout(() => {
      let reply = "";
      if (action === "explain-simpler") {
        reply = "Here's a simpler summary: Think of it like a loop! The sun heats water up into the sky (Evaporation), it forms clouds (Condensation), it rains down (Precipitation), and flows back to repeat.";
      } else if (action === "create-quiz") {
        reply = "Here is a quick question: What is the process of water turning into vapor called? (Hint: Evaporation). You can practice this strand in the Curriculum Library!";
      } else if (action === "save-note") {
        reply = "✓ Note successfully saved to your Notebook under the 'Science' folder.";
      } else if (action === "make-flashcards") {
        reply = "✓ 5 flashcards added to your Flashcards deck under the topic 'Cell Biology'.";
      } else if (action === "add-planner") {
        reply = "✓ Study tasks successfully scheduled in your Study Calendar.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(),
          sender: "orbis",
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsThinking(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-5rem)] max-w-4xl mx-auto border border-border-default bg-surface rounded-2xl overflow-hidden animate-fade-up">
      {/* Orbis Workspace Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border-default bg-background/30 px-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-wisdom to-trust text-white shadow shadow-wisdom/25">
            <Bot className="h-4.5 w-4.5" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-text-default">Orbis AI</h1>
            {/* Dynamic Context indicator */}
            <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
              <span>Context:</span>
              <span className="font-semibold text-accent truncate max-w-[200px]">{context}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-growth animate-pulse" />
          <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Online</span>
        </div>
      </div>

      {/* Messages / Welcome Greeting Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-background/10">
        {messages.length === 0 ? (
          /* Empty Greeting state */
          <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto space-y-6 animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-wisdom to-trust text-white shadow-xl shadow-wisdom/25">
              <Bot className="h-8 w-8 animate-bounce" style={{ animationDuration: "3s" }} />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-text-default">Hello, I&apos;m Orbis</h2>
              <p className="text-xs text-text-muted leading-relaxed">
                Your personal AI learning assistant. Ask me anything, upload a photo of your textbook, or ask to generate practice quizzes.
              </p>
            </div>

            {/* Grid of suggested prompt cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full pt-4">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.text)}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-border-default/60 bg-surface hover:bg-primary/5 hover:border-accent hover:-translate-y-0.5 text-left text-xs font-semibold text-text-default shadow-sm hover:shadow active-press transition-all cursor-pointer"
                >
                  <span className="text-base shrink-0">{p.icon}</span>
                  <span className="leading-snug">{p.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Active Chat Conversation Log */
          <div className="space-y-4">
            {messages.map((msg) => {
              const isOrbis = msg.sender === "orbis";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] animate-fade-in ${isOrbis ? "self-start" : "self-end flex-row-reverse ml-auto"}`}
                >
                  {/* Avatar */}
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border shadow-sm ${
                    isOrbis
                      ? "bg-gradient-to-tr from-wisdom to-trust border-wisdom text-white"
                      : "bg-surface border-border-default text-text-default"
                  }`}>
                    {isOrbis ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>

                  {/* Message bubble */}
                  <div className="space-y-2">
                    <div className={`rounded-xl px-4 py-3 text-xs md:text-sm shadow-sm leading-relaxed border ${
                      isOrbis
                        ? "bg-surface border-border-default text-text-default"
                        : "bg-primary text-white border-primary"
                    }`}>
                      {/* Process simple markdown blocks for formatting */}
                      {msg.content.split("\n\n").map((para, pIdx) => {
                        // Check if paragraph is list
                        if (para.startsWith("1.") || para.startsWith("*")) {
                          return (
                            <ul key={pIdx} className="list-disc pl-4 space-y-1 my-1">
                              {para.split("\n").map((li, lIdx) => (
                                <li key={lIdx}>{li.replace(/^[*\s0-9.]+\s*/, "")}</li>
                              ))}
                            </ul>
                          );
                        }
                        return <p key={pIdx}>{para}</p>;
                      })}
                    </div>

                    {/* Action buttons under Orbis messages */}
                    {isOrbis && msg.actions && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.actions.map((act, actIdx) => (
                          <button
                            key={actIdx}
                            onClick={() => handleActionClick(act.action)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-default bg-background/50 hover:bg-background/80 text-[10px] font-bold text-text-default active-press transition-colors shadow-sm"
                          >
                            {act.action === "explain-simpler" && <HelpCircle className="h-3 w-3 text-accent" />}
                            {act.action === "create-quiz" && <Sparkles className="h-3 w-3 text-growth" />}
                            {act.action === "save-note" && <FileText className="h-3 w-3 text-trust" />}
                            <span>{act.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <span className="block text-[9px] text-text-muted px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Thinking indicator */}
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

      {/* Input Tray footer */}
      <div className="p-4 border-t border-border-default bg-background/20 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="flex items-center gap-2 rounded-xl border border-border-default bg-surface px-3 py-2 shadow-inner focus-within:border-accent transition-colors"
        >
          <button
            type="button"
            className="p-1.5 rounded-lg text-text-muted hover:text-text-default hover:bg-background active-press transition-colors"
            title="Snap a photo"
          >
            <Camera className="h-4.5 w-4.5" />
          </button>
          
          <button
            type="button"
            className="p-1.5 rounded-lg text-text-muted hover:text-text-default hover:bg-background active-press transition-colors"
            title="Attach file"
          >
            <Paperclip className="h-4.5 w-4.5" />
          </button>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Ask Orbis or attach a photo of your textbook...`}
            className="flex-1 bg-transparent px-2 text-xs md:text-sm text-text-default placeholder:text-text-muted/70 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white disabled:opacity-40 disabled:bg-transparent disabled:text-text-muted active-press transition-colors cursor-pointer"
          >
            <SendHorizontal className="h-4.5 w-4.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default function OrbisAIPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-text-muted">Loading Orbis Workspace...</div>}>
      <OrbisAIPageContent />
    </Suspense>
  );
}
