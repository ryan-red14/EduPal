"use client";

import React, { useState, useEffect } from "react";
import {
  Trophy,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  Play,
  RotateCcw,
  BookOpen
} from "lucide-react";

interface Contest {
  id: string;
  title: string;
  subject: string;
  duration: string;
  questions: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  school: string;
}

export default function OlympiadHubPage() {
  const [activeSubjectTab, setActiveSubjectTab] = useState<"math" | "physics" | "chemistry" | "cs">("math");
  
  // Simulated contest state
  const [activeContest, setActiveContest] = useState<Contest | null>(null);
  const [contestTimer, setContestTimer] = useState(600); // 10 mins
  const [contestAnswers, setContestAnswers] = useState<Record<number, number>>({});
  const [contestSubmitted, setContestSubmitted] = useState(false);
  const [contestScore, setContestScore] = useState(0);

  const contests: Contest[] = [
    { id: "1", title: "Junior Mathematics Olympiad Test 1", subject: "Math", duration: "10 mins", questions: 3, difficulty: "Intermediate" },
    { id: "2", title: "National Physics Challenge Prep", subject: "Physics", duration: "15 mins", questions: 4, difficulty: "Advanced" },
    { id: "3", title: "African Chemistry Olympiad Trials", subject: "Chemistry", duration: "20 mins", questions: 5, difficulty: "Intermediate" }
  ];

  const contestProblems = [
    { question: "If x + y = 10 and x^2 - y^2 = 40, find the value of x - y.", options: ["2", "4", "5", "8"], answer: 1 },
    { question: "A wave travels at 300 m/s with frequency 50 Hz. Find wavelength.", options: ["3 m", "6 m", "15 m", "150 m"], answer: 1 },
    { question: "What is the molecular geometry of methane (CH4)?", options: ["Linear", "Bent", "Tetrahedral", "Trigonal Planar"], answer: 2 }
  ];

  const leaderboards: Record<string, LeaderboardEntry[]> = {
    math: [
      { rank: 1, name: "Ryan Muuo", points: 840, school: "Alliance High School" },
      { rank: 2, name: "Alice Wambui", points: 810, school: "Kenya High School" },
      { rank: 3, name: "John Njoroge", points: 790, school: "Mang'u High School" }
    ],
    physics: [
      { rank: 1, name: "Alice Wambui", points: 920, school: "Kenya High School" },
      { rank: 2, name: "Ryan Muuo", points: 890, school: "Alliance High School" },
      { rank: 3, name: "John Njoroge", points: 850, school: "Mang'u High School" }
    ],
    chemistry: [
      { rank: 1, name: "John Njoroge", points: 760, school: "Mang'u High School" },
      { rank: 2, name: "Alice Wambui", points: 750, school: "Kenya High School" },
      { rank: 3, name: "Ryan Muuo", points: 720, school: "Alliance High School" }
    ],
    cs: [
      { rank: 1, name: "Ryan Muuo", points: 950, school: "Alliance High School" },
      { rank: 2, name: "John Njoroge", points: 910, school: "Mang'u High School" },
      { rank: 3, name: "Alice Wambui", points: 880, school: "Kenya High School" }
    ]
  };

  // Timer countdown loop
  useEffect(() => {
    let interval: any = null;
    if (activeContest && !contestSubmitted) {
      interval = setInterval(() => {
        setContestTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setContestSubmitted(true);
            alert("Contest time is up! Auto-submitting answers.");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeContest, contestSubmitted]);

  const startContest = (c: Contest) => {
    setActiveContest(c);
    setContestTimer(600); // 10 mins
    setContestAnswers({});
    setContestSubmitted(false);
    setContestScore(0);
  };

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    if (contestSubmitted) return;
    setContestAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const submitContest = () => {
    let score = 0;
    contestProblems.forEach((q, idx) => {
      if (contestAnswers[idx] === q.answer) score++;
    });
    setContestScore(score);
    setContestSubmitted(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/45 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight flex items-center gap-2">
          <Trophy className="h-6.5 w-6.5 text-accent animate-pulse" />
          <span>Olympiad Hub</span>
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Challenge yourself with national timed contests, view global student ranks, and earn certificates.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Left column: Practice & AI Coach (3/5) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active contest dialog popup if running */}
          {activeContest ? (
            <div className="rounded-2xl border border-accent bg-[#0B0F19] p-5 md:p-6 space-y-5 shadow-2xl relative animate-fade-in hover-bloom">
              <div className="flex justify-between items-center border-b border-border-default/20 pb-3">
                <h3 className="text-sm font-bold text-text-default">{activeContest.title}</h3>
                <div className="flex items-center gap-4 text-xs font-bold text-accent">
                  <Clock className="h-4 w-4" />
                  <span>Time Left: {formatTime(contestTimer)}</span>
                </div>
              </div>

              {/* Questions list */}
              <div className="space-y-5">
                {contestProblems.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-2.5">
                    <p className="text-xs font-bold text-text-default">{qIdx + 1}. {q.question}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = contestAnswers[qIdx] === optIdx;
                        const showCorrect = contestSubmitted && optIdx === q.answer;
                        const showIncorrect = contestSubmitted && isSelected && optIdx !== q.answer;

                        let style = "border-border-default bg-background/25 text-text-default hover:border-text-muted hover:bg-background/50";
                        if (isSelected) style = "border-accent bg-accent/5 text-accent";
                        if (showCorrect) style = "border-green-500/80 bg-green-500/10 text-green-400";
                        if (showIncorrect) style = "border-red-500/80 bg-red-500/10 text-red-400";

                        return (
                          <button
                            key={optIdx}
                            disabled={contestSubmitted}
                            onClick={() => handleSelectAnswer(qIdx, optIdx)}
                            className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${
                              !contestSubmitted ? "active-press hover-bloom" : ""
                            } ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-border-default/20">
                {contestSubmitted ? (
                  <button
                    onClick={() => setActiveContest(null)}
                    className="px-4 py-2 rounded-lg bg-primary text-white text-xs font-bold shadow hover-bloom active-press"
                  >
                    Close Sheet
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setActiveContest(null)}
                      className="px-4 py-2 rounded-lg border border-border-default text-text-default text-xs font-bold hover:bg-background active-press hover-bloom"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitContest}
                      className="px-5 py-2 rounded-lg bg-accent text-white text-xs font-bold shadow hover-bloom active-press"
                    >
                      Submit Paper
                    </button>
                  </>
                )}
              </div>

              {contestSubmitted && (
                <div className="p-3.5 rounded-lg border border-accent/20 bg-accent/5 text-xs text-text-default font-semibold text-center animate-fade-in hover-bloom">
                  🎯 You scored <span className="text-accent font-black">{contestScore} / {contestProblems.length}</span>! Award points updated.
                </div>
              )}
            </div>
          ) : (
            /* Contest options board */
            <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="h-4.5 w-4.5 text-accent" />
                <span>Active Timed Contests</span>
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {contests.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl border border-border-default/60 bg-background/25 flex justify-between items-center gap-4 flex-wrap hover-bloom hover:shadow-md">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-accent uppercase tracking-wider bg-accent/15 px-2 py-0.5 rounded border border-accent/20">
                        {c.subject} • {c.difficulty}
                      </span>
                      <h4 className="text-xs font-bold text-text-default mt-1.5">{c.title}</h4>
                      <p className="text-[10px] text-text-muted">Duration: {c.duration} • {c.questions} MCQ Questions</p>
                    </div>

                    <button
                      onClick={() => startContest(c)}
                      className="inline-flex items-center gap-1 rounded-lg bg-primary hover:bg-primary/95 text-white px-3.5 py-1.5 text-xs font-bold shadow-md active-press hover-bloom"
                    >
                      <Play className="h-3 w-3 fill-white" />
                      <span>Start Contest</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Coach strategy tips */}
          <div className="p-5 rounded-xl border border-accent/20 bg-accent/5 space-y-4 hover-bloom shadow-md">
            <h3 className="text-xs font-bold text-text-default flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-accent animate-pulse" />
              <span>Olympiad AI Coach Recommendations</span>
            </h3>
            <p className="text-xs text-text-muted leading-relaxed font-semibold italic bg-background/20 p-3 rounded-lg border border-border-default/30">
              💡 &quot;Focus on kinematics velocity equations for the Physics Olympiad. Remember that light indices in glass prisms calculate as n = c/v.&quot;
            </p>
          </div>
        </div>

        {/* Right column: Leaderboards & Awards (2/5) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Leaderboards tabbed card */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Trophy className="h-4.5 w-4.5 text-accent" />
              <span>Olympiad Leaderboards</span>
            </h3>

            {/* Subject Selector Tabs */}
            <div className="grid grid-cols-4 gap-1 p-0.5 border border-border-default rounded-lg bg-background/30 text-center font-bold text-[9px] uppercase">
              {[
                { id: "math", label: "Math" },
                { id: "physics", label: "Phys" },
                { id: "chemistry", label: "Chem" },
                { id: "cs", label: "CS" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubjectTab(tab.id as any)}
                  className={`py-1 rounded transition-all active-press ${
                    activeSubjectTab === tab.id ? "bg-accent text-white" : "text-text-muted hover:text-text-default"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Leaderboard entries */}
            <div className="space-y-2 text-xs pt-2">
              {leaderboards[activeSubjectTab]?.map((e) => (
                <div key={e.rank} className="p-3 rounded-lg border border-border-default/50 bg-background/20 flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
                      e.rank === 1 ? "bg-[#EAB308]/15 text-[#EAB308]" :
                      e.rank === 2 ? "bg-slate-300/15 text-slate-400" : "bg-orange-400/15 text-orange-400"
                    }`}>
                      {e.rank}
                    </span>
                    <div className="space-y-0.5">
                      <p className="font-bold text-text-default">{e.name}</p>
                      <p className="text-[9px] text-text-muted">{e.school}</p>
                    </div>
                  </div>
                  <span className="font-black text-accent">{e.points} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Award Certificates */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-accent" />
              <span>Olympiad Credentials</span>
            </h3>

            <div className="p-3.5 rounded-lg border border-border-default bg-background/25 space-y-2 hover-bloom">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/15 px-2 py-0.5 rounded border border-accent/20">
                    Math Olympiad 2026
                  </p>
                  <h4 className="text-xs font-bold text-text-default mt-1.5">Junior Math Challenge certificate</h4>
                  <p className="text-[9px] text-text-muted">Issued: June 01, 2026 • Verified Credential</p>
                </div>
                <ShieldCheck className="h-4.5 w-4.5 text-accent shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
