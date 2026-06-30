"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X, Sparkles, ArrowRight, CheckCircle2, Award, Zap, BookOpen, CircleUserRound, Palette, Type } from "lucide-react";
import { Theme, useTheme } from "@/components/shared/ThemeProvider";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Splash and Onboarding States
  const [isMounted, setIsMounted] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  
  // Onboarding Form States
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [studentGrade, setStudentGrade] = useState("8"); // Default Junior Grade
  const [selectedPathway, setSelectedPathway] = useState<"STEM" | "Social Sciences" | "Arts & Sports" | "">("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [academicGoal, setAcademicGoal] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  
  const { theme, setTheme, fontFamily, setFontFamily } = useTheme();

  useEffect(() => {
    setIsMounted(true);
    
    // Check onboarding status
    const onboarded = localStorage.getItem("edupal-onboarded") === "true";
    if (onboarded) {
      setShowOnboarding(false);
    } else {
      setShowOnboarding(true);
    }

    // Hide splash after 2.5s
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleNextStep = () => {
    // If Grade 7-9 (Junior School) is selected, skip Pathway and Elective Subject selection
    if (onboardingStep === 2) {
      const gradeNum = parseInt(studentGrade);
      if (gradeNum >= 7 && gradeNum <= 9) {
        // Jump to Step 5 (Goals) directly
        setOnboardingStep(5);
        return;
      }
    }
    setOnboardingStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    if (onboardingStep === 5) {
      const gradeNum = parseInt(studentGrade);
      if (gradeNum >= 7 && gradeNum <= 9) {
        setOnboardingStep(2);
        return;
      }
    }
    setOnboardingStep((prev) => prev - 1);
  };

  const handleCompleteOnboarding = () => {
    localStorage.setItem("edupal-onboarded", "true");
    localStorage.setItem("edupal-name", studentName || "Learner");
    localStorage.setItem("edupal-grade", studentGrade);
    localStorage.setItem("edupal-school", studentSchool || "Our Lady Queen of Peace");
    localStorage.setItem("edupal-pathway", selectedPathway || "STEM");
    localStorage.setItem("edupal-academic-goal", academicGoal || "Excel in science & prepare for exams");
    localStorage.setItem("edupal-career-goal", careerGoal || "Software Engineer");
    
    // Save selected subjects based on grade
    const gradeNum = parseInt(studentGrade);
    if (gradeNum >= 7 && gradeNum <= 9) {
      const compulsory = ["English", "Kiswahili", "Mathematics", "Integrated Science", "Agriculture", "Social Studies", "CRE", "Creative Arts & Sports", "Pre-technical Studies"];
      localStorage.setItem("edupal-subjects", JSON.stringify(compulsory));
    } else {
      const core = ["English", "Kiswahili", "Core Mathematics", "CSL"];
      localStorage.setItem("edupal-subjects", JSON.stringify([...core, ...selectedSubjects]));
    }
    
    // Trigger reload or state change to update welcome message
    setShowOnboarding(false);
    window.location.reload();
  };

  const seniorElectives = {
    "STEM": ["Biology", "Chemistry", "Physics", "Computer Studies", "Agriculture", "Aviation"],
    "Social Sciences": ["Literature in English", "Fasihi ya Kiswahili", "History and Citizenship", "Geography", "Business Studies"],
    "Arts & Sports": ["Sports and Recreation", "Music and Dance", "Theatre and Film", "Fine Arts"]
  };

  const toggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  if (!isMounted) return null;

  // 1. Splash Screen
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0E0F13] text-white">
        <div className="relative flex flex-col items-center gap-6 animate-fade-in">
          {/* Logo SVG (Neural Brain Redesign) */}
          <svg viewBox="0 0 100 100" className="h-24 w-24 animate-pulse" style={{ animationDuration: "3s" }}>
            <defs>
              <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B9D" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
            {/* Human figure in center */}
            <circle cx="50" cy="40" r="4.5" fill="url(#brainGrad)" />
            <path d="M40 58 C40 48, 60 48, 60 58" stroke="url(#brainGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
            
            {/* Left Brain Circuit half */}
            <path d="M47 28 C26 23, 15 38, 21 55 C18 67, 32 78, 47 73" stroke="url(#brainGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-logo-draw" />
            <circle cx="21" cy="40" r="1.5" fill="url(#brainGrad)" />
            <circle cx="17" cy="52" r="1.5" fill="url(#brainGrad)" />
            <line x1="21" y1="40" x2="32" y2="46" stroke="url(#brainGrad)" strokeWidth="1.5" />
            <line x1="17" y1="52" x2="31" y2="54" stroke="url(#brainGrad)" strokeWidth="1.5" />

            {/* Right Brain Circuit half */}
            <path d="M53 28 C74 23, 85 38, 79 55 C82 67, 68 78, 53 73" stroke="url(#brainGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" className="animate-logo-draw" />
            <circle cx="79" cy="40" r="1.5" fill="url(#brainGrad)" />
            <circle cx="83" cy="52" r="1.5" fill="url(#brainGrad)" />
            <line x1="79" y1="40" x2="68" y2="46" stroke="url(#brainGrad)" strokeWidth="1.5" />
            <line x1="83" y1="52" x2="69" y2="54" stroke="url(#brainGrad)" strokeWidth="1.5" />
          </svg>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-black tracking-wider">
              Edu<span className="bg-gradient-to-r from-[#FF6B9D] via-[#A855F7] to-[#3B82F6] bg-clip-text text-transparent">Pal</span>
            </h1>
            <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase">
              LEARN • GROW • ACHIEVE
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. Onboarding Flow
  if (showOnboarding) {
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center bg-background/95 backdrop-blur-md p-4">
        <div className="w-full max-w-xl bg-surface border border-border-default rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 animate-fade-up max-h-[90vh] overflow-y-auto">
          {/* Top Progress bar */}
          <div className="flex justify-between items-center text-[10px] font-bold text-text-muted uppercase tracking-wider">
            <span>Step {onboardingStep} of {studentGrade && parseInt(studentGrade) >= 10 ? 6 : 4}</span>
            <div className="flex gap-1.5 h-1.5 w-32 bg-background border border-border-default/40 rounded-full overflow-hidden">
              <div 
                className="bg-accent h-full rounded-full transition-all duration-300"
                style={{ width: `${(onboardingStep / (studentGrade && parseInt(studentGrade) >= 10 ? 6 : 4)) * 100}%` }}
              />
            </div>
          </div>

          {/* Steps Content */}
          {onboardingStep === 1 && (
            <div className="space-y-5 text-center py-4 animate-fade-in">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mx-auto">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-black text-text-default leading-tight">Welcome to EduPal!</h2>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                  Your personalized Competency-Based Curriculum (CBC) companion. Let&apos;s configure your workspace in a few quick steps.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                <div className="p-3 rounded-xl border border-border-default bg-background/40 space-y-1.5">
                  <BookOpen className="h-4 w-4 text-trust" />
                  <p className="text-xs font-bold">CBE Curriculums</p>
                  <p className="text-[10px] text-text-muted">Grade-specific study notes & strands.</p>
                </div>
                <div className="p-3 rounded-xl border border-border-default bg-background/40 space-y-1.5">
                  <Zap className="h-4 w-4 text-[#EAB308]" />
                  <p className="text-xs font-bold">Daily Quizzes</p>
                  <p className="text-[10px] text-text-muted">Interactive tests to earn XP & badges.</p>
                </div>
                <div className="p-3 rounded-xl border border-border-default bg-background/40 space-y-1.5">
                  <Award className="h-4 w-4 text-growth" />
                  <p className="text-xs font-bold">Orbis AI Assistant</p>
                  <p className="text-[10px] text-text-muted">Instant homework help and note summaries.</p>
                </div>
              </div>
            </div>
          )}

          {onboardingStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-text-default">Who are you?</h3>
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-border-default bg-background/40 text-text-default focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase">Age</label>
                    <input
                      type="number"
                      placeholder="e.g. 14"
                      value={studentAge}
                      onChange={(e) => setStudentAge(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-border-default bg-background/40 text-text-default focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-text-muted uppercase">School Grade</label>
                    <select
                      value={studentGrade}
                      onChange={(e) => setStudentGrade(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-lg border border-border-default bg-background/40 text-text-default focus:border-accent focus:outline-none"
                    >
                      <option value="7">Grade 7 (Junior School)</option>
                      <option value="8">Grade 8 (Junior School)</option>
                      <option value="9">Grade 9 (Junior School)</option>
                      <option value="10">Grade 10 (Senior School)</option>
                      <option value="11">Grade 11 (Senior School)</option>
                      <option value="12">Grade 12 (Senior School)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">School Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Our Lady Queen of Peace"
                    value={studentSchool}
                    onChange={(e) => setStudentSchool(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-border-default bg-background/40 text-text-default focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {onboardingStep === 3 && parseInt(studentGrade) >= 10 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-text-default">Select Senior Pathway</h3>
              <p className="text-xs text-text-muted">Choose your academic pathway clusters from KICD:</p>
              <div className="grid grid-cols-1 gap-2.5">
                {[
                  { id: "STEM", desc: "Science, Technology, Engineering & Mathematics" },
                  { id: "Social Sciences", desc: "Humanities, Languages, and Business Studies" },
                  { id: "Arts & Sports", desc: "Performing Arts, Fine Arts, and Sports Sciences" }
                ].map((path) => (
                  <button
                    key={path.id}
                    onClick={() => {
                      setSelectedPathway(path.id as any);
                      setSelectedSubjects([]);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all active-press ${
                      selectedPathway === path.id
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-border-default bg-background/40 text-text-default hover:border-text-muted"
                    }`}
                  >
                    <p className="text-xs font-bold">{path.id}</p>
                    <p className="text-[10px] text-text-muted mt-0.5">{path.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {onboardingStep === 4 && parseInt(studentGrade) >= 10 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-text-default">Select Elective Subjects</h3>
              <p className="text-xs text-text-muted">Select your electives under the <strong>{selectedPathway}</strong> pathway:</p>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-1">
                {selectedPathway && seniorElectives[selectedPathway]?.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => toggleSubject(sub)}
                    className={`p-2.5 rounded-lg border text-xs font-semibold transition-all active-press ${
                      selectedSubjects.includes(sub)
                        ? "border-accent bg-accent/5 text-accent"
                        : "border-border-default bg-background/40 text-text-default hover:border-text-muted"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
              <p className="text-[9px] text-text-muted italic">
                * Note: English, Kiswahili, Core Mathematics, and Community Service Learning are core subjects and will be automatically added.
              </p>
            </div>
          )}

          {onboardingStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-lg font-bold text-text-default">Goals & Ambitions</h3>
              <div className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">What is your academic goal?</label>
                  <input
                    type="text"
                    placeholder="e.g. Improve my Integrated Science grades..."
                    value={academicGoal}
                    onChange={(e) => setAcademicGoal(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-border-default bg-background/40 text-text-default focus:border-accent focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-text-muted uppercase">What is your career goal? (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Doctor, Agronomist, Software Developer..."
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-lg border border-border-default bg-background/40 text-text-default focus:border-accent focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {onboardingStep === (studentGrade && parseInt(studentGrade) >= 10 ? 6 : 4) && (
            <div className="space-y-5 animate-fade-in">
              <h3 className="text-lg font-bold text-text-default">Appearance Preferences</h3>
              
              {/* Theme selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase flex items-center gap-1">
                  <Palette className="h-3.5 w-3.5 text-accent" />
                  <span>Choose Theme</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "scholar", name: "Scholar", color: "bg-[#D4AF37]" },
                    { id: "midnight", name: "Midnight", color: "bg-[#10B981]" },
                    { id: "tech", name: "Tech", color: "bg-[#14B8A6]" },
                    { id: "heritage", name: "Heritage", color: "bg-[#7F1D1D]" },
                    { id: "horizon", name: "Horizon", color: "bg-[#C4B5FD]" },
                    { id: "classic-light", name: "Light", color: "bg-[#1E3A8A]" },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as any)}
                      className={`flex items-center gap-1.5 p-2 rounded-lg border text-[10px] font-bold transition-all active-press ${
                        theme === t.id ? "border-accent bg-accent/5 text-accent" : "border-border-default bg-background/40 text-text-default"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${t.color}`} />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-text-muted uppercase flex items-center gap-1">
                  <Type className="h-3.5 w-3.5 text-accent" />
                  <span>Choose Font</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "inter", name: "Inter (Default)" },
                    { id: "poppins", name: "Poppins" },
                    { id: "lexend", name: "Lexend (Clean)" },
                    { id: "merriweather", name: "Merriweather (Serif)" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFontFamily(f.id)}
                      className={`p-2 rounded-lg border text-xs font-semibold transition-all active-press ${
                        fontFamily === f.id ? "border-accent bg-accent/5 text-accent" : "border-border-default bg-background/40 text-text-default"
                      }`}
                      style={{ fontFamily: `var(--font-${f.id}), sans-serif` }}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center border-t border-border-default/30 pt-4 mt-2">
            {onboardingStep > 1 ? (
              <button
                onClick={handlePrevStep}
                className="px-4 py-2 rounded-lg border border-border-default text-text-muted hover:text-text-default text-xs font-semibold active-press transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {onboardingStep === (studentGrade && parseInt(studentGrade) >= 10 ? 6 : 4) ? (
              <button
                onClick={handleCompleteOnboarding}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-5 py-2 text-xs font-bold shadow-md active-press transition-colors"
              >
                <span>Enter Workspace</span>
                <CheckCircle2 className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleNextStep}
                disabled={onboardingStep === 2 && !studentName.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-5 py-2 text-xs font-bold shadow-md active-press transition-colors disabled:opacity-40"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3. Normal App Shell
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-text-default font-inter">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block h-full shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          
          <div className="relative flex flex-col h-full w-[240px] animate-slide-right shadow-2xl bg-surface z-50">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-[-48px] flex h-10 w-10 items-center justify-center rounded-lg bg-surface text-text-default hover:bg-background border border-border-default/50 active-press"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar onCloseMobile={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full min-w-0">
        {/* Mobile Header Bar */}
        <header className="lg:hidden flex h-16 shrink-0 items-center justify-between px-6 border-b border-border-default bg-surface">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg hover:bg-background border border-border-default text-text-default active-press"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="text-lg font-bold tracking-tight">
              Edu<span className="bg-gradient-to-r from-[#FF6B9D] via-[#A855F7] to-[#3B82F6] bg-clip-text text-transparent">Pal</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-text-muted bg-background/50 border border-border-default/40 rounded-full px-3 py-1">
            <Sparkles className="h-3 w-3 text-accent animate-pulse" />
            <span>Orbis Online</span>
          </div>
        </header>

        {/* Dynamic page viewport */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
