"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  BookOpen,
  Atom,
  FlaskConical,
  Leaf,
  Calculator,
  BookText,
  ChevronRight,
  Star,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Clock,
  Video,
  Download,
  FileText,
  UploadCloud,
  Layers,
  Lock,
  Flame,
  Volume2,
  Dribbble,
  Play,
  Maximize2,
  AlertTriangle,
  Grid,
  PenTool,
  RotateCcw,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

interface Topic {
  id: string;
  title: string;
  cluster: string;
  grade: string;
  keyPoints: string[];
  notes: {
    title: string;
    description: string;
    concepts: { name: string; definition: string; example: string }[];
  };
  definitions: { term: string; def: string }[];
  videos: { title: string; url: string; duration: string }[];
  quiz: { question: string; options: string[]; answer: number }[];
  projects: string[];
}

interface Subject {
  id: string;
  name: string;
  icon: any;
  glowColor: string;
  colorName: string;
  bgGlow: string;
  progress: number;
  completedCount: number;
  totalCount: number;
  topics: Topic[];
}

export default function LibraryPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<"notes" | "definitions" | "videos" | "projects" | "assessments" | "flashcards" | "simulation" | "orbis">("notes");
  const [bookmarkedTopics, setBookmarkedTopics] = useState<Record<string, boolean>>({});
  
  // Quiz & Assessment states
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [essayAnswer, setEssayAnswer] = useState("");
  const [essayScore, setEssayScore] = useState<number | null>(null);
  const [topicUnlockedState, setTopicUnlockedState] = useState<Record<string, boolean>>({});

  // File Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [generatedNotes, setGeneratedNotes] = useState<string[]>([]);

  // Simulation parameters
  const [simFreq, setSimFreq] = useState(2);
  const [simAmp, setSimAmp] = useState(30);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // V2 Exam Mode & Math Workspace States
  const [showExamMode, setShowExamMode] = useState(false);
  const [examWarningCount, setExamWarningCount] = useState(0);
  const [examTimer, setExamTimer] = useState(1200); // 20 mins
  const [showMathWorkspace, setShowMathWorkspace] = useState(false);
  const [drawingActive, setDrawingActive] = useState(false);
  const mathCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // User Grade State
  const [userGrade, setUserGrade] = useState("8");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const grade = localStorage.getItem("edupal-grade") || "8";
      setUserGrade(grade);
      
      const locks: Record<string, boolean> = {
        is1: true,
        pt1: true,
        p1: true,
        c1: true,
      };
      const topic1Passed = localStorage.getItem("edupal-quiz-passed-p1") === "true";
      if (topic1Passed) {
        locks["p2"] = true;
      }
      setTopicUnlockedState(locks);
    }
  }, [quizSubmitted]);

  // Wave Simulation Animation loop
  useEffect(() => {
    if (activeTab === "simulation" && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let animationFrameId: number;
      let offset = 0;

      const render = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        for (let i = 0; i < canvas.width; i += 20) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }
        for (let j = 0; j < canvas.height; j += 20) {
          ctx.beginPath();
          ctx.moveTo(0, j);
          ctx.lineTo(canvas.width, j);
          ctx.stroke();
        }

        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        ctx.strokeStyle = "#A855F7";
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x++) {
          const y = canvas.height / 2 + Math.sin(x * 0.01 * simFreq + offset) * simAmp;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        offset += 0.05;
        animationFrameId = requestAnimationFrame(render);
      };

      render();
      return () => cancelAnimationFrame(animationFrameId);
    }
  }, [activeTab, simFreq, simAmp]);

  // V2 Fullscreen Exam anti-tab warning listeners
  useEffect(() => {
    if (showExamMode) {
      const handleBlur = () => {
        setExamWarningCount((prev) => {
          const nextCount = prev + 1;
          alert(`⚠️ Anti-Cheat Warning: Tab Switch Detected! Warning ${nextCount} of 3.`);
          if (nextCount >= 3) {
            alert("❌ Exam Terminated due to multiple violations.");
            setShowExamMode(false);
          }
          return nextCount;
        });
      };
      window.addEventListener("blur", handleBlur);

      const countdown = setInterval(() => {
        setExamTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            alert("⏰ Time is up! Exam auto-submitted.");
            setShowExamMode(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        window.removeEventListener("blur", handleBlur);
        clearInterval(countdown);
      };
    }
  }, [showExamMode]);

  // Math Workspace drawing functions
  const startDrawing = (e: React.MouseEvent) => {
    if (!mathCanvasRef.current) return;
    const canvas = mathCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setDrawingActive(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!drawingActive || !mathCanvasRef.current) return;
    const canvas = mathCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#A855F7";
    ctx.lineWidth = 2.5;
    ctx.stroke();
  };

  const stopDrawingFunc = () => {
    setDrawingActive(false);
  };

  const clearMathCanvas = () => {
    if (!mathCanvasRef.current) return;
    const canvas = mathCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const subjectsData: Subject[] = [
    {
      id: "integrated-science",
      name: "Integrated Science",
      icon: Leaf,
      glowColor: "hover:shadow-growth/20 hover:border-growth",
      colorName: "text-growth",
      bgGlow: "bg-growth/10",
      progress: 75,
      completedCount: 6,
      totalCount: 8,
      topics: [
        {
          id: "is1",
          title: "Mixtures and Pure Substances",
          cluster: "Matter and Its Properties",
          grade: "Grade 8",
          keyPoints: [
            "Distinguish between pure substances and mixtures.",
            "Describe separation techniques (filtration, evaporation, distillation).",
          ],
          notes: {
            title: "Mixtures and Separation - Grade 8 Curriculum Notes",
            description: "Matter can be categorized as pure substances or mixtures depending on composition.",
            concepts: [
              { name: "Pure Substance", definition: "Consisting of only one type of particle.", example: "Distilled water, pure gold." },
              { name: "Mixture", definition: "A physical combination of two or more substances.", example: "Sandy water, brass." }
            ]
          },
          definitions: [
            { term: "Solute", def: "The substance that dissolves in a solvent." },
            { term: "Solvent", def: "The liquid in which solute dissolves." }
          ],
          videos: [
            { title: "Separating Mixtures - Integrated Science Grade 8", url: "https://www.youtube.com/embed/Pj1525_i-7c", duration: "8m 15s" }
          ],
          quiz: [
            { question: "Which separation technique is best for salt from seawater?", options: ["Filtration", "Decantation", "Evaporation", "Sifting"], answer: 2 }
          ],
          projects: ["Construct a simple water filter using sand, gravel, and charcoal."]
        }
      ]
    },
    {
      id: "physics",
      name: "Physics",
      icon: Atom,
      glowColor: "hover:shadow-wisdom/20 hover:border-wisdom",
      colorName: "text-wisdom",
      bgGlow: "bg-wisdom/10",
      progress: 60,
      completedCount: 6,
      totalCount: 10,
      topics: [
        {
          id: "p1",
          title: "Properties of Waves",
          cluster: "Waves and Optics",
          grade: "Grade 10",
          keyPoints: [
            "Rectilinear propagation, reflection, refraction, diffraction, interference.",
            "Applications of properties of waves (Production and detection of FM waves).",
            "Stationary waves and resonance.",
            "Doppler effect and its day-to-day applications."
          ],
          notes: {
            title: "Properties of Waves - Grade 10 Notes",
            description: "Waves transfer energy from one point to another without transferring matter. Mechanical waves require a medium, while electromagnetic waves travel through a vacuum.",
            concepts: [
              { name: "Rectilinear Propagation", definition: "Waves travel in straight lines in a uniform medium.", example: "Straight beam of flashlight light through fog." },
              { name: "Reflection", definition: "The bouncing back of a wave when it hits a boundary surface.", example: "Echoes in a large hall." },
              { name: "Refraction", definition: "Bending of waves when passing through different media.", example: "Pencil appearing bent in water." }
            ]
          },
          definitions: [
            { term: "Transverse Wave", def: "Vibrations are perpendicular to wave travel direction." },
            { term: "Longitudinal Wave", def: "Vibrations are parallel to wave travel direction." }
          ],
          videos: [
            { title: "Wave Properties - Reflection, Refraction, Diffraction & Interference", url: "https://www.youtube.com/embed/g4kK52W2qT8", duration: "12m 45s" }
          ],
          quiz: [
            { question: "What wave property is demonstrated when sound waves bend around corners?", options: ["Reflection", "Refraction", "Diffraction", "Interference"], answer: 2 },
            { question: "Which formula matches wave speed (v), frequency (f), and wavelength (λ)?", options: ["v = f + λ", "v = f * λ", "v = f / λ", "f = v * λ"], answer: 1 }
          ],
          projects: ["Construct a simple ripple tank using a shallow tray and paper projection."]
        },
        {
          id: "p2",
          title: "Light & Wave Mechanics",
          cluster: "Waves and Optics",
          grade: "Grade 10",
          keyPoints: [
            "Explore electromagnetic spectrum properties.",
            "Calculate light reflection indices in glass prisms."
          ],
          notes: {
            title: "Light & Optics - Grade 10 Advanced Notes",
            description: "Light behaves as both a wave and a stream of particles. Refractive index measures how much light bends.",
            concepts: [
              { name: "Refractive Index", definition: "Ratio of speed of light in vacuum to speed in medium.", example: "Glass refractive index is approximately 1.5." }
            ]
          },
          definitions: [
            { term: "Refractive Index", def: "n = c / v" }
          ],
          videos: [
            { title: "Optics - Reflection and Refraction in Prisms", url: "https://www.youtube.com/embed/g4kK52W2qT8", duration: "10m" }
          ],
          quiz: [
            { question: "What is the speed of light in a vacuum?", options: ["3.0 x 10^8 m/s", "1.5 x 10^8 m/s", "3.0 x 10^5 m/s", "3.0 x 10^6 m/s"], answer: 0 }
          ],
          projects: ["Verify refractive index of water using a glass plate and pins."]
        }
      ]
    }
  ];

  const gradeNum = parseInt(userGrade);
  const filteredSubjects = subjectsData.filter((sub) => {
    if (gradeNum >= 7 && gradeNum <= 9) {
      return sub.id === "integrated-science";
    } else {
      return sub.id === "physics";
    }
  });

  const handleBookmarkToggle = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const simulateUpload = (fileName: string) => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadedFiles((f) => [...f, fileName]);
          
          setTimeout(() => {
            setGeneratedNotes((n) => [
              ...n,
              `📝 AI Summary for ${fileName}:\n\n- Scanned properties successfully.\n- Key Concepts: Wave velocity formulas, Doppler effect calculations, and boundary nodes mapping.`
            ]);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) simulateUpload(files[0].name);
  };

  const handleQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const submitQuiz = () => {
    if (!selectedTopic) return;
    let score = 0;
    selectedTopic.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    const pct = (score / selectedTopic.quiz.length) * 100;
    if (pct >= 70) {
      localStorage.setItem(`edupal-quiz-passed-${selectedTopic.id}`, "true");
    }
  };

  const evaluateEssay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!essayAnswer.trim()) return;
    setEssayScore(Math.floor(Math.random() * 5) + 6);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    setEssayAnswer("");
    setEssayScore(null);
  };

  // V2 Fullscreen Exam Mode Render Block
  if (showExamMode && selectedTopic && selectedSubject) {
    return (
      <div className="fixed inset-0 z-[120] bg-background text-text-default flex flex-col p-6 overflow-hidden">
        {/* Exam Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border-default/45 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-bold text-passion bg-passion/10 border border-passion/20 px-3 py-1 rounded-full animate-pulse">
              <AlertTriangle className="h-4 w-4" />
              <span>Fullscreen Exam Mode Active</span>
            </span>
            <span className="text-xs text-text-muted">Warnings: {examWarningCount}/3</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-accent">
              <Clock className="h-4 w-4" />
              <span>Time Remaining: {formatTime(examTimer)}</span>
            </div>

            <button
              onClick={() => {
                if (confirm("Are you sure you want to exit Exam Mode? Unsaved progress will be lost.")) {
                  setShowExamMode(false);
                }
              }}
              className="px-3.5 py-1.5 rounded-lg border border-border-default hover:bg-surface text-text-default text-xs font-bold active-press"
            >
              Exit Exam
            </button>
          </div>
        </div>

        {/* Exam Split Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 overflow-hidden py-4 gap-6 relative">
          {/* Question List (60%) */}
          <div className="lg:col-span-3 overflow-y-auto pr-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-text-default">{selectedTopic.title} Exam</h3>
              <p className="text-xs text-text-muted">Please complete all structured and formulaic tasks. Anti-cheat boundaries monitor window switches.</p>
            </div>

            <div className="space-y-6">
              {selectedTopic.quiz.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2 p-4 rounded-xl border border-border-default bg-surface">
                  <p className="text-xs font-bold text-text-default">{qIdx + 1}. {q.question}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizAnswer(qIdx, optIdx)}
                          className={`w-full p-2.5 rounded-lg border text-xs font-semibold text-left transition-all hover-bloom ${
                            isSelected ? "border-accent bg-accent/5 text-accent" : "border-border-default bg-background/20 text-text-default"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl border border-border-default bg-surface space-y-3">
              <p className="text-xs font-bold text-text-default">Calculate the refractive index if light velocity is 2.0 x 10^8 m/s:</p>
              <textarea
                value={essayAnswer}
                onChange={(e) => setEssayAnswer(e.target.value)}
                placeholder="Show your mathematical working step-by-step..."
                className="w-full min-h-[90px] px-3.5 py-2 text-xs rounded-lg border border-border-default bg-background/30 text-text-default focus:border-accent focus:outline-none resize-none font-mono"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => {
                  submitQuiz();
                  setShowExamMode(false);
                  alert("🎉 Exam submitted successfully! Scores recorded.");
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-6 py-2.5 text-xs font-bold shadow-md active-press hover-bloom"
              >
                <CheckCircle className="h-4 w-4" />
                <span>Submit Exam Paper</span>
              </button>
            </div>
          </div>

          {/* V2 Math Workspace panel (40%) */}
          <div className="lg:col-span-2 flex flex-col rounded-xl border border-border-default bg-surface overflow-hidden shadow-md">
            <div className="h-12 border-b border-border-default/45 px-4 flex items-center justify-between bg-background/25 shrink-0">
              <span className="text-xs font-bold text-text-default flex items-center gap-1.5">
                <Grid className="h-4.5 w-4.5 text-accent" />
                <span>Math Workspace Canvas</span>
              </span>

              <button
                onClick={clearMathCanvas}
                className="p-1 rounded bg-background border border-border-default/80 text-text-muted hover:text-text-default active-press text-[10px] font-bold"
              >
                Clear Grid
              </button>
            </div>

            {/* Canvas grid paper */}
            <div className="flex-1 bg-[#090C12] relative overflow-hidden cursor-crosshair">
              <canvas
                ref={mathCanvasRef}
                width={380}
                height={350}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawingFunc}
                onMouseLeave={stopDrawingFunc}
                className="absolute inset-0 w-full h-full block z-10"
              />
              {/* background graph grid */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
            </div>

            {/* Geometry reference footers */}
            <div className="p-3 border-t border-border-default bg-background/20 text-[10px] text-text-muted font-bold tracking-wide uppercase shrink-0">
              📐 Formula sheet: Speed of light c = 3.0 x 10^8 m/s • Wave Index n = c / v
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Topic View Details (8-Tab sub-navigation)
  if (selectedTopic && selectedSubject) {
    const isUnlocked = topicUnlockedState[selectedTopic.id] !== false;

    return (
      <div className="space-y-6 animate-fade-up">
        {/* Breadcrumb path */}
        <div className="flex items-center gap-2 text-xs text-text-muted font-semibold shrink-0">
          <button 
            onClick={() => setSelectedTopic(null)} 
            className="hover:text-text-default flex items-center gap-1 transition-colors"
          >
            <span>Library</span>
          </button>
          <span>/</span>
          <span className="uppercase">{selectedSubject.name}</span>
          <span>/</span>
          <span>{selectedTopic.cluster}</span>
          <span>/</span>
          <span className="text-accent font-bold">{selectedTopic.title}</span>
        </div>

        {/* Lock warning */}
        {!isUnlocked && (
          <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex items-center gap-3 text-xs text-red-300">
            <Lock className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">Topic Locked</p>
              <p className="text-[10px] text-text-muted/80">You must pass the quiz for the previous topic with a score of 70% or more to unlock this strand.</p>
            </div>
          </div>
        )}

        <div className={!isUnlocked ? "opacity-40 pointer-events-none" : ""}>
          {/* Main Title Card */}
          <div className="relative overflow-hidden rounded-2xl border border-border-default bg-surface p-6 md:p-8 hover-bloom">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/5 to-transparent opacity-60 pointer-events-none" />
            <div className="relative z-10 space-y-4">
              <h1 className="text-2xl md:text-3xl font-black text-text-default">{selectedTopic.title}</h1>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-accent/20 bg-accent/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">
                    <Star className="h-4.5 w-4.5 fill-[#EAB308]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-default">Sub-strand assessment available</h4>
                    <p className="text-[10px] text-text-muted mt-0.5">Test yourself under standard anti-cheat exam timer conditions.</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    resetQuiz();
                    setShowExamMode(true);
                  }}
                  className="rounded-lg bg-passion hover:bg-passion/95 text-white px-4 py-2 text-xs font-bold shadow-md active-press transition-colors shrink-0 hover-bloom"
                >
                  Start Exam Mode
                </button>
              </div>
            </div>
          </div>

          {/* 8-Tab navigation bar */}
          <div className="flex justify-between items-center border-b border-border-default/30 pb-1.5 overflow-x-auto gap-4">
            <div className="flex gap-1 shrink-0">
              {([
                { id: "notes", label: "Notes", icon: FileText },
                { id: "definitions", label: "Definitions", icon: BookText },
                { id: "videos", label: "Videos", icon: Video },
                { id: "projects", label: "Projects", icon: Layers },
                { id: "assessments", label: "Assessments", icon: Star },
                { id: "flashcards", label: "Flashcards", icon: Flame },
                { id: "simulation", label: "Virtual Simulation", icon: Dribbble },
                { id: "orbis", label: "Ask Orbis", icon: Sparkles }
              ] as const).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all active-press ${
                      activeTab === tab.id
                        ? "bg-accent/15 border-accent text-accent"
                        : "border-transparent text-text-muted hover:text-text-default hover:bg-background/45"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-default bg-background/50 text-text-default text-xs font-bold active-press hover:bg-background hover-bloom shrink-0">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
          </div>

          {/* Tab Viewport */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Notes Tab */}
              {activeTab === "notes" && (
                <div className="space-y-6 animate-fade-in">
                  <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="h-4.5 w-4.5 text-accent" />
                      <span>Key Points</span>
                    </h3>
                    <ul className="space-y-2.5">
                      {selectedTopic.keyPoints.map((kp, idx) => (
                        <li key={idx} className="text-xs text-text-default leading-relaxed flex items-start gap-2.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-5 hover-bloom">
                    <div className="border-b border-border-default/25 pb-3">
                      <h3 className="text-sm font-bold text-text-default">{selectedTopic.notes.title}</h3>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{selectedTopic.notes.description}</p>
                    </div>
                    <div className="space-y-4">
                      {selectedTopic.notes.concepts.map((c, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-border-default/20 bg-background/20 space-y-2 hover-bloom">
                          <p className="text-xs font-bold text-accent">{c.name}</p>
                          <p className="text-xs text-text-default leading-relaxed"><span className="font-semibold text-text-muted">Definition:</span> {c.definition}</p>
                          <p className="text-xs text-text-default italic leading-relaxed"><span className="font-semibold text-text-muted">Example:</span> {c.example}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Definitions Tab */}
              {activeTab === "definitions" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                  {selectedTopic.definitions.map((d, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-border-default bg-surface space-y-2 hover-bloom">
                      <p className="text-xs font-bold text-accent">{d.term}</p>
                      <p className="text-xs text-text-muted leading-relaxed">{d.def}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Videos Tab */}
              {activeTab === "videos" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                  {selectedTopic.videos.map((vid, idx) => (
                    <div key={idx} className="rounded-xl border border-border-default bg-surface overflow-hidden flex flex-col hover-bloom hover:shadow-md">
                      <div className="relative aspect-video w-full bg-black">
                        <iframe 
                          className="absolute inset-0 w-full h-full border-none"
                          src={vid.url}
                          title={vid.title}
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <h4 className="text-xs font-bold text-text-default leading-snug line-clamp-2">{vid.title}</h4>
                        <span className="text-[9px] text-text-muted font-bold block">{vid.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === "projects" && (
                <div className="space-y-4 animate-fade-in">
                  {selectedTopic.projects.map((proj, idx) => (
                    <div key={idx} className="p-5 rounded-xl border border-border-default bg-surface space-y-2 hover-bloom">
                      <p className="text-xs font-bold text-accent">Project Experiment {idx + 1}</p>
                      <p className="text-xs text-text-default leading-relaxed">{proj}</p>
                    </div>
                  ))}

                  {/* Coding studio launcher integration */}
                  {selectedSubject.id === "physics" && (
                    <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 flex justify-between items-center gap-4 flex-wrap hover-bloom">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-text-default flex items-center gap-1.5">
                          <Calculator className="h-4 w-4 text-accent" />
                          <span>Computer Science Lab</span>
                        </h4>
                        <p className="text-[11px] text-text-muted leading-relaxed">
                          Want to simulate wave velocity algorithms? Practice coding inside our studio.
                        </p>
                      </div>
                      <Link
                        href="/tools?tab=coding"
                        className="inline-flex items-center gap-1 rounded-lg bg-primary hover:bg-primary/95 text-white px-3 py-1.5 text-[10px] font-bold shadow-md active-press hover-bloom"
                      >
                        <span>Practice Code</span>
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Assessments Tab (Structured & Essays) */}
              {activeTab === "assessments" && (
                <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-6 animate-fade-in hover-bloom">
                  <div className="flex justify-between items-center border-b border-border-default/20 pb-3">
                    <h3 className="text-sm font-bold text-text-default">Sub-strand Assessment</h3>
                    {quizSubmitted && (
                      <span className="text-[10px] font-extrabold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                        Score: {quizScore} / {selectedTopic.quiz.length}
                      </span>
                    )}
                  </div>

                  {/* Multiple Choice Quiz */}
                  <div className="space-y-5">
                    {selectedTopic.quiz.map((q, qIdx) => (
                      <div key={qIdx} className="space-y-2">
                        <p className="text-xs font-bold text-text-default">{qIdx + 1}. {q.question}</p>
                        <div className="grid grid-cols-1 gap-2">
                          {q.options.map((opt, optIdx) => {
                            const isSelected = quizAnswers[qIdx] === optIdx;
                            const showCorrect = quizSubmitted && optIdx === q.answer;
                            const showIncorrect = quizSubmitted && isSelected && optIdx !== q.answer;

                            let style = "border-border-default bg-background/20 text-text-default hover:border-text-muted hover:bg-background/40";
                            if (isSelected) style = "border-accent bg-accent/5 text-accent";
                            if (showCorrect) style = "border-green-500/80 bg-green-500/10 text-green-400";
                            if (showIncorrect) style = "border-red-500/80 bg-red-500/10 text-red-400";

                            return (
                              <button
                                key={optIdx}
                                disabled={quizSubmitted}
                                onClick={() => handleQuizAnswer(qIdx, optIdx)}
                                className={`w-full p-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${
                                  !quizSubmitted ? "active-press hover-bloom" : ""
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

                  {/* Essay / Structured questions section */}
                  <div className="space-y-4 pt-4 border-t border-border-default/20">
                    <p className="text-xs font-bold text-text-default">Structured Response Question:</p>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      &quot;Describe how the Doppler Effect applies to police speed-monitoring radars in Kenya.&quot;
                    </p>
                    <form onSubmit={evaluateEssay} className="space-y-3">
                      <textarea
                        value={essayAnswer}
                        onChange={(e) => setEssayAnswer(e.target.value)}
                        disabled={essayScore !== null}
                        placeholder="Write your explanation here..."
                        className="w-full min-h-[90px] px-3.5 py-2 text-xs rounded-lg border border-border-default bg-background/30 text-text-default focus:border-accent focus:outline-none resize-none"
                      />
                      {essayScore === null ? (
                        <button
                          type="submit"
                          disabled={!essayAnswer.trim()}
                          className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white text-xs font-bold shadow-md active-press transition-colors disabled:opacity-40 hover-bloom"
                        >
                          Submit Essay
                        </button>
                      ) : (
                        <div className="p-3.5 rounded-lg border border-accent/20 bg-accent/5 space-y-2 animate-fade-in hover-bloom">
                          <p className="text-xs font-bold text-text-default flex items-center gap-1.5">
                            <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                            <span>Orbis AI Evaluation</span>
                          </p>
                          <p className="text-xs text-text-muted leading-relaxed">
                            Structured score: <span className="text-accent font-bold">{essayScore} / 10</span>. Good use of Doppler shift and speed limit radar descriptions.
                          </p>
                        </div>
                      )}
                    </form>
                  </div>

                  <div className="flex gap-3 justify-end border-t border-border-default/20 pt-4">
                    <button
                      onClick={resetQuiz}
                      className="px-4 py-2 rounded-lg border border-border-default text-text-default text-xs font-bold active-press hover:bg-background hover-bloom"
                    >
                      Reset Assessment
                    </button>
                    {!quizSubmitted && (
                      <button
                        onClick={submitQuiz}
                        disabled={Object.keys(quizAnswers).length < selectedTopic.quiz.length}
                        className="rounded-lg bg-primary hover:bg-primary/95 text-white px-5 py-2 text-xs font-bold shadow-md active-press transition-colors disabled:opacity-40 hover-bloom"
                      >
                        Submit Quiz
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Flashcards Tab */}
              {activeTab === "flashcards" && (
                <div className="p-4 rounded-xl border border-border-default bg-surface flex flex-col items-center justify-center py-10 hover-bloom">
                  <Flame className="h-8 w-8 text-passion animate-pulse mb-3" />
                  <p className="text-xs text-text-default font-bold">Vocabulary card sets ready</p>
                  <p className="text-[11px] text-text-muted mt-0.5">Click the link below to open flashcard drills.</p>
                  <Link
                    href="/flashcards"
                    className="inline-flex items-center gap-1 rounded-lg bg-primary hover:bg-primary/95 text-white px-4 py-2 text-xs font-bold mt-4 shadow active-press hover-bloom"
                  >
                    <span>Drill Cards</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              )}

              {/* Virtual Simulation Tab (Interactive Wave canvas) */}
              {activeTab === "simulation" && (
                <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md animate-fade-in">
                  <div className="flex justify-between items-center border-b border-border-default/20 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-text-default">Wave Physics Lab</h3>
                      <p className="text-[10px] text-text-muted mt-0.5">Adjust sliders to observe displacement variations.</p>
                    </div>
                    <span className="flex items-center gap-1.5 text-[10px] text-text-muted font-bold">
                      <Maximize2 className="h-3.5 w-3.5" />
                      <span>Interactive Canvas</span>
                    </span>
                  </div>

                  <div className="relative w-full aspect-[2/1] bg-[#0A0D14] border border-border-default rounded-xl overflow-hidden shadow-inner">
                    <canvas ref={canvasRef} width={500} height={250} className="w-full h-full block" />
                  </div>

                  {/* Sliders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase">
                        <span>Frequency</span>
                        <span className="text-accent">{simFreq} Hz</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="0.5"
                        value={simFreq}
                        onChange={(e) => setSimFreq(parseFloat(e.target.value))}
                        className="w-full h-1 bg-background rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-text-muted uppercase">
                        <span>Amplitude</span>
                        <span className="text-accent">{simAmp} cm</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="70"
                        step="5"
                        value={simAmp}
                        onChange={(e) => setSimAmp(parseInt(e.target.value))}
                        className="w-full h-1 bg-background rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Ask Orbis Tab */}
              {activeTab === "orbis" && (
                <div className="p-5 rounded-xl border border-border-default bg-surface space-y-4 hover-bloom">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                    <span>Launch Orbis Help</span>
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Have questions about the properties of waves? Explain the Doppler shift, or click to start chat tutor session with Orbis.
                  </p>
                  <Link
                    href={`/orbis?topic=${encodeURIComponent(selectedTopic.title)}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-4 py-2 text-xs font-bold shadow active-press hover-bloom"
                  >
                    <span>Launch AI chat</span>
                    <Sparkles className="h-4 w-4 text-accent fill-accent" />
                  </Link>
                </div>
              )}
            </div>

            {/* Right Panel - Document Upload Zone */}
            <div className="space-y-6">
              <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                  <UploadCloud className="h-4.5 w-4.5 text-accent" />
                  <span>Upload Study Files</span>
                </h3>
                
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Have a school worksheet or past paper? Upload it here, and Orbis AI will generate structured notes for this topic.
                </p>

                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                    isDragging
                      ? "border-accent bg-accent/5"
                      : "border-border-default bg-background/20 hover:border-text-muted/60"
                  }`}
                  onClick={() => document.getElementById("file-picker")?.click()}
                >
                  <input
                    id="file-picker"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) simulateUpload(files[0].name);
                    }}
                  />
                  <UploadCloud className="h-8 w-8 text-text-muted" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-text-default">Drag & drop files here</p>
                    <p className="text-[10px] text-text-muted">or click to browse from explorer</p>
                  </div>
                </div>

                {/* Progress bar */}
                {uploadProgress > 0 && (
                  <div className="space-y-1.5 animate-pulse">
                    <div className="flex justify-between text-[10px] font-bold text-text-muted">
                      <span>Analyzing file...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-background h-1.5 rounded-full overflow-hidden border border-border-default/30">
                      <div className="bg-accent h-full rounded-full transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                )}

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border-default/20">
                    <h4 className="text-[10px] font-bold text-text-muted uppercase">Uploaded Files</h4>
                    <div className="space-y-1.5">
                      {uploadedFiles.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-background/30 border border-border-default/40 text-[11px] text-text-default">
                          <FileText className="h-4 w-4 text-accent shrink-0" />
                          <span className="truncate flex-1 font-semibold">{f}</span>
                          <span className="text-[9px] text-green-400 font-bold uppercase shrink-0">Scanned</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Generated notes */}
              {generatedNotes.length > 0 && (
                <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 md:p-6 space-y-4 animate-fade-in hover-bloom shadow-md">
                  <h3 className="flex items-center gap-2 text-xs font-bold text-text-default">
                    <Sparkles className="h-4.5 w-4.5 text-accent animate-pulse" />
                    <span>AI Generated Notes</span>
                  </h3>
                  <div className="space-y-3">
                    {generatedNotes.map((n, idx) => (
                      <p key={idx} className="text-xs text-text-default leading-relaxed whitespace-pre-line bg-background/40 p-3 rounded-lg border border-border-default/30">
                        {n}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Subject view
  if (selectedSubject) {
    return (
      <div className="space-y-6 animate-fade-up">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-text-muted font-semibold shrink-0">
          <button 
            onClick={() => setSelectedSubject(null)} 
            className="hover:text-text-default flex items-center gap-1 transition-colors"
          >
            <span>Library</span>
          </button>
          <span>/</span>
          <span className="text-accent font-bold uppercase">{selectedSubject.name}</span>
        </div>

        {/* Subject Header */}
        <div className="flex items-center justify-between border-b border-border-default/40 pb-4 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${selectedSubject.bgGlow} ${selectedSubject.colorName}`}>
              <selectedSubject.icon className="h-5.5 w-5.5" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-text-default tracking-tight">{selectedSubject.name}</h1>
              <p className="text-xs text-text-muted">Explore curriculum strands, notes, and assessments.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-text-muted shrink-0">
            <span>Progress: {selectedSubject.progress}%</span>
            <div className="w-24 bg-background border border-border-default/40 h-2 rounded-full overflow-hidden">
              <div className="bg-accent h-full" style={{ width: `${selectedSubject.progress}%` }} />
            </div>
          </div>
        </div>

        {/* Topics List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedSubject.topics.map((t) => {
            const isUnlocked = topicUnlockedState[t.id] !== false;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTopic(t);
                  setActiveTab("notes");
                  resetQuiz();
                }}
                className={`group p-5 rounded-xl border border-border-default bg-surface hover-bloom hover:border-text-muted/45 hover:shadow-md cursor-pointer flex flex-col justify-between gap-4 active-press ${
                  !isUnlocked ? "opacity-55" : ""
                }`}
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[9px] font-bold text-accent px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/15 uppercase tracking-wider">
                      {t.grade} • {t.cluster}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {!isUnlocked && <Lock className="h-3.5 w-3.5 text-passion" />}
                      <button
                        onClick={(e) => handleBookmarkToggle(t.id, e)}
                        className="text-text-muted hover:text-accent transition-colors"
                      >
                        <Bookmark className={`h-4.5 w-4.5 ${bookmarkedTopics[t.id] ? "fill-accent text-accent" : ""}`} />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-text-default group-hover:text-accent transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                    {t.notes.description}
                  </p>
                </div>

                <div className="flex justify-between items-center text-[10px] text-text-muted font-bold border-t border-border-default/20 pt-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{t.quiz.length} Questions</span>
                  </span>
                  <span className="flex items-center gap-0.5 text-accent group-hover:translate-x-0.5 transition-transform">
                    <span>{isUnlocked ? "Open Topic" : "Locked"}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Subjects Grid view (Default)
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Curriculum Library
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Select a subject from your {gradeNum >= 10 ? "Senior School" : "Junior School"} curriculum to start learning.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((sub) => {
          const Icon = sub.icon;
          return (
            <div
              key={sub.id}
              onClick={() => setSelectedSubject(sub)}
              className={`group p-5 rounded-xl border border-border-default bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer active-press flex flex-col justify-between gap-6 hover-bloom ${sub.glowColor}`}
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${sub.bgGlow} ${sub.colorName}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] font-extrabold text-text-muted uppercase bg-background/50 border border-border-default/50 px-2 py-0.5 rounded-full">
                  {sub.topics.length} Strands
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-text-default group-hover:text-accent transition-colors">
                  {sub.name}
                </h3>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-bold text-text-muted">
                    <span>SYLLABUS PROGRESS</span>
                    <span>{sub.progress}%</span>
                  </div>
                  <div className="w-full bg-background border border-border-default/45 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-accent h-full rounded-full transition-all duration-300" style={{ width: `${sub.progress}%` }} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
