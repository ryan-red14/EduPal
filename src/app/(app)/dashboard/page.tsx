"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpen,
  ClipboardCheck,
  TrendingUp,
  Star,
  Play,
  Sparkles,
  ChevronRight,
  Zap,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Footprints,
  Swords,
  Trophy,
  BookCheck,
  Medal,
  Gem,
  Award,
} from "lucide-react";

export default function DashboardPage() {
  const [studentName, setStudentName] = useState("Learner");
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("edupal-name");
      if (name) setStudentName(name);

      const hrs = new Date().getHours();
      if (hrs < 12) setGreeting("Good morning");
      else if (hrs < 18) setGreeting("Good afternoon");
      else setGreeting("Good evening");
    }
  }, []);

  // Daily Challenge State
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const challengeOptions = [
    { key: "A", text: "Volt", isCorrect: false },
    { key: "B", text: "Ohm", isCorrect: false },
    { key: "C", text: "Ampere", isCorrect: true },
    { key: "D", text: "Watt", isCorrect: false },
  ];

  const handleSelectAnswer = (key: string) => {
    if (isAnswered) return;
    setSelectedAnswer(key);
    setIsAnswered(true);
  };

  const statCards = [
    { label: "Topics Available", value: "19", icon: BookOpen, glowClass: "hover:shadow-trust/20 hover:border-trust", iconColor: "text-trust", iconBg: "bg-trust/10" },
    { label: "Tests Taken", value: "0", icon: ClipboardCheck, glowClass: "hover:shadow-wisdom/20 hover:border-wisdom", iconColor: "text-wisdom", iconBg: "bg-wisdom/10" },
    { label: "Average Score", value: "0%", icon: TrendingUp, glowClass: "hover:shadow-growth/20 hover:border-growth", iconColor: "text-growth", iconBg: "bg-growth/10" },
    { label: "Best Score", value: "0%", icon: Star, glowClass: "hover:shadow-gold-accent/20 hover:border-gold-accent", iconColor: "text-gold-accent", iconBg: "bg-gold-accent/10" },
  ];

  const quickAccessItems = [
    { title: "Curriculum Library", desc: "Browse CBE topics", route: "/library", icon: BookOpen, iconColor: "text-trust", iconBg: "bg-trust/10" },
    { title: "Ask Orbis", desc: "AI learning assistant", route: "/orbis", icon: Sparkles, iconColor: "text-wisdom", iconBg: "bg-wisdom/10" },
    { title: "Study Calendar", desc: "Track deadlines & tests", route: "/calendar", icon: ClipboardList, iconColor: "text-accent", iconBg: "bg-accent/10" },
    { title: "Analytics", desc: "Track your progress", route: "/analytics", icon: TrendingUp, iconColor: "text-growth", iconBg: "bg-growth/10" },
  ];

  const badges = [
    { name: "First Steps", desc: "Complete first lesson", icon: Footprints },
    { name: "Quiz Warrior", desc: "Complete 5 quizzes", icon: Swords },
    { name: "Test Champion", desc: "100% on a test", icon: Trophy },
    { name: "Solid Learner", desc: "Maintain a 3-day streak", icon: BookCheck },
    { name: "High Achiever", desc: "Score above 90%", icon: Medal },
    { name: "Academic Star", desc: "Explore 5 subjects", icon: Star },
    { name: "Perfect Score", desc: "Complete daily quiz", icon: Gem },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-border-default bg-surface p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/5 to-transparent opacity-60 pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-[10px] md:text-xs font-bold tracking-wider text-accent uppercase">
            EduPal • Powered by Orbis AI
          </span>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-text-default">
            {greeting},{" "}
            <span className="bg-gradient-to-r from-[#FF6B9D] via-[#A855F7] to-[#3B82F6] bg-clip-text text-transparent">
              {studentName}
            </span>
          </h1>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Kenya&apos;s AI-powered CBC curriculum learning platform. Study smarter, test yourself after every sub-strand, and track your growth with Orbis.
          </p>
          <p className="text-[11px] md:text-xs text-text-muted/75 italic">
            Built for Kenyan learners, Grade 7 – Grade 12
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/library"
              className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/95 text-white px-4 py-2 text-sm font-semibold shadow-md active-press transition-colors"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Start Learning</span>
            </Link>
            <Link
              href="/orbis"
              className="inline-flex items-center gap-2 rounded-lg border border-border-default bg-background/50 hover:bg-background/80 text-text-default px-4 py-2 text-sm font-semibold active-press transition-colors"
            >
              <Sparkles className="h-4 w-4 text-accent" />
              <span>Ask Orbis</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Stat Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`hover-bloom flex items-center justify-between rounded-xl border border-border-default bg-surface p-5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 ${stat.glowClass}`}
            >
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  {stat.label}
                </span>
                <p className="text-3xl font-extrabold text-text-default tracking-tight">
                  {stat.value}
                </p>
              </div>
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                <Icon className="h-5.5 w-5.5" />
              </div>
            </div>
          );
        })}
      </section>

      {/* 3. Main Split Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Quick Access Card */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-text-default">
              <Sparkles className="h-5 w-5 text-accent animate-pulse" />
              <span>Quick Access</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickAccessItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.route}
                    className="group flex items-center justify-between p-3.5 rounded-lg border border-border-default/40 bg-background/20 hover:bg-primary/5 hover:border-primary/40 active-press transition-all"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ${item.iconColor}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-default truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-text-muted truncate">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4.5 w-4.5 text-text-muted group-hover:text-text-default group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Interactive Daily Challenge Box */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border-default/30 pb-3">
              <h2 className="flex items-center gap-2 text-lg font-bold text-text-default">
                <Zap className="h-5 w-5 text-[#EAB308]" />
                <span>Daily Challenge</span>
              </h2>
              <span className="text-[10px] font-bold bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Earn 10 XP
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-sm md:text-base font-semibold text-text-default">
                What is the unit of electric current?
              </p>

              <div className="space-y-2">
                {challengeOptions.map((opt) => {
                  const isSelected = selectedAnswer === opt.key;
                  const showResult = isAnswered;

                  let styleClass = "border-border-default bg-background/30 text-text-default hover:bg-background/80 hover:border-text-muted";
                  let RightIcon = null;

                  if (showResult) {
                    if (opt.isCorrect) {
                      styleClass = "border-green-500/80 bg-green-500/10 text-green-400";
                      RightIcon = <CheckCircle2 className="h-4.5 w-4.5 text-green-400" />;
                    } else if (isSelected && !opt.isCorrect) {
                      styleClass = "border-red-500/80 bg-red-500/10 text-red-400";
                      RightIcon = <XCircle className="h-4.5 w-4.5 text-red-400" />;
                    } else {
                      styleClass = "border-border-default/20 bg-background/5 text-text-muted opacity-50";
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      disabled={isAnswered}
                      onClick={() => handleSelectAnswer(opt.key)}
                      className={`flex w-full items-center justify-between px-4 py-3 rounded-lg border text-sm font-semibold text-left transition-all duration-200 ${
                        !isAnswered ? "active-press" : ""
                      } ${styleClass}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-md border border-border-default/80 text-xs font-bold ${
                          isSelected ? "bg-accent text-surface border-accent" : ""
                        }`}>
                          {opt.key}
                        </span>
                        <span>{opt.text}</span>
                      </span>
                      {RightIcon}
                    </button>
                  );
                })}
              </div>

              {/* Feedback text */}
              {isAnswered && (
                <div className="pt-2 animate-fade-in">
                  {selectedAnswer === "C" ? (
                    <p className="text-xs font-semibold text-green-400 flex items-center gap-1.5">
                      ✓ Correct! +10 XP awarded to your Profile.
                    </p>
                  ) : (
                    <p className="text-xs font-semibold text-red-400">
                      ✗ Not quite. The correct unit of electric current is Ampere (C).
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Tests Empty State */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-text-default">Recent Tests</h2>
              <Link href="/library" className="text-xs font-bold text-accent hover:underline">
                View all
              </Link>
            </div>
            
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border-default/50 text-text-muted">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-text-default">No tests taken yet</p>
                <p className="text-[11px] text-text-muted">Study sub-strands in the library first.</p>
              </div>
              <Link 
                href="/library" 
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 active-press"
              >
                <span>Browse topics to find a test</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Achievement Badgeslocked states */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-border-default/30 pb-3">
              <h2 className="flex items-center gap-2 text-base font-bold text-text-default">
                <Award className="h-5 w-5 text-accent" />
                <span>Achievement Badges</span>
              </h2>
              <span className="text-xs font-bold text-text-muted bg-background/50 border border-border-default/60 px-2 py-0.5 rounded-full">
                0 / 7
              </span>
            </div>

            <div className="space-y-3">
              {badges.map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-border-default/20 bg-background/10 grayscale opacity-60"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background border border-border-default/50 text-text-muted">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-text-default truncate">
                        {badge.name}
                      </p>
                      <p className="text-[10px] text-text-muted truncate">
                        {badge.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
