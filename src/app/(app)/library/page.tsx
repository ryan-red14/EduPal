"use client";

import React, { useState, useEffect } from "react";
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
  HelpCircle,
  Clock,
  Video,
  Download,
  FileText,
  UploadCloud,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  content: string;
  keyPoints: string[];
  glossary: { term: string; def: string }[];
}

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
  const [activeTab, setActiveTab] = useState<"notes" | "definitions" | "videos" | "quiz" | "projects">("notes");
  const [bookmarkedTopics, setBookmarkedTopics] = useState<Record<string, boolean>>({});
  
  // Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  // File Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [generatedNotes, setGeneratedNotes] = useState<string[]>([]);

  // User Grade State (determines junior vs senior subjects)
  const [userGrade, setUserGrade] = useState("8");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const grade = localStorage.getItem("edupal-grade") || "8";
      setUserGrade(grade);
    }
  }, []);

  const subjectsData: Subject[] = [
    // Junior Subjects (Grades 7-9)
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
            "Describe various methods of separating mixtures (filtration, evaporation, distillation).",
            "Apply separation techniques in real-life contexts like water purification."
          ],
          notes: {
            title: "Mixtures and Separation - Grade 8 Curriculum Notes",
            description: "Matter is anything that has mass and occupies space. It exists in different forms, which can be categorized as pure substances or mixtures depending on their composition.",
            concepts: [
              { name: "Pure Substance", definition: "A material consisting of only one type of particle with constant chemical properties.", example: "Distilled water, pure gold, table salt." },
              { name: "Mixture", definition: "A physical combination of two or more substances where each retains its own identity.", example: "Sandy water, air, brass." },
              { name: "Simple Distillation", definition: "A method used to separate a solvent from a solution containing dissolved solids.", example: "Obtaining pure water from salty sea water." }
            ]
          },
          definitions: [
            { term: "Solute", def: "The substance that dissolves in a solvent to form a solution." },
            { term: "Solvent", def: "The liquid in which a solute dissolves." },
            { term: "Filtrate", def: "The clear liquid that passes through a filter." }
          ],
          videos: [
            { title: "Separating Mixtures - Integrated Science Grade 8", url: "https://www.youtube.com/embed/Pj1525_i-7c", duration: "8m 15s" },
            { title: "Simple Distillation Experiment Demonstration", url: "https://www.youtube.com/embed/xxNfJLMNS4E", duration: "6m 40s" }
          ],
          quiz: [
            { question: "Which separation technique is best for obtaining salt from sea water?", options: ["Filtration", "Simple Distillation", "Evaporation", "Decantation"], answer: 2 },
            { question: "What do we call the solid substance left on the filter paper after filtration?", options: ["Residue", "Filtrate", "Solvent", "Precipitate"], answer: 0 }
          ],
          projects: [
            "Construct a simple water filter using sand, charcoal, pebbles, and a plastic bottle.",
            "Design an experiment to separate salt from sand."
          ]
        }
      ]
    },
    {
      id: "pre-technical",
      name: "Pre-technical Studies",
      icon: Calculator,
      glowColor: "hover:shadow-trust/20 hover:border-trust",
      colorName: "text-trust",
      bgGlow: "bg-trust/10",
      progress: 50,
      completedCount: 4,
      totalCount: 8,
      topics: [
        {
          id: "pt1",
          title: "Safety in the Workshop",
          cluster: "Workshop Practice",
          grade: "Grade 7",
          keyPoints: [
            "Identify common workshop hazards and safety measures.",
            "Demonstrate proper use of personal protective equipment (PPE).",
            "Understand first-aid responses for minor workshop injuries."
          ],
          notes: {
            title: "Workshop Safety - Grade 7 Curriculum Notes",
            description: "Safety in a technical workshop is paramount to prevent injuries and maintain a productive learning environment. A workshop contains tools and machinery that pose potential hazards if handled incorrectly.",
            concepts: [
              { name: "Hazard", definition: "A potential source of danger, harm, or adverse health effects on someone.", example: "Spilled oil on the floor, exposed electrical wires." },
              { name: "PPE", definition: "Personal Protective Equipment designed to protect the wearer from injury or infection.", example: "Safety goggles, leather gloves, steel-toed boots." }
            ]
          },
          definitions: [
            { term: "First Aid", def: "Immediate assistance given to any person suffering from a sudden illness or injury." },
            { term: "PPE", def: "Personal Protective Equipment." }
          ],
          videos: [
            { title: "Introduction to Technical Workshop Safety", url: "https://www.youtube.com/embed/tS7g7fV0V4o", duration: "10m 12s" }
          ],
          quiz: [
            { question: "What is the primary purpose of safety goggles in a workshop?", options: ["To look professional", "To protect eyes from flying debris", "To improve eyesight", "To block bright sunlight"], answer: 1 }
          ],
          projects: [
            "Create a safety poster detailing the rules of the technical workshop.",
            "Perform a hazard identification sweep of your classroom."
          ]
        }
      ]
    },
    // Senior Subjects (Grades 10-12)
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
            "Rectilinear propagation, reflection, refraction, diffraction, interference (Qualitative treatment only).",
            "Applications of properties of waves (Need for modulation, Production and detection of frequency-modulated wave).",
            "Stationary waves and its applications (Resonance).",
            "Doppler effect and applications.",
            "Explanation of the wave properties in real-life situations.",
            "Demonstration of the properties of waves in nature.",
            "Demonstration of the formation and properties of stationary waves in nature.",
            "Description of applications of stationary waves in day-to-day life.",
            "Description of Doppler effect and its applications in day-to-day life.",
            "Appreciation of wave formation and application of waves in real-life situations."
          ],
          notes: {
            title: "Properties of Waves - Grade 10 Curriculum Notes",
            description: "Waves are everywhere in our lives, from the sound we hear to the light that helps us see. Understanding the properties of waves is essential, as they play a crucial role in various technologies and natural phenomena. This guide delves into the key properties of waves and their applications in our daily lives, with a focus on examples relevant to Kenya.",
            concepts: [
              { name: "Rectilinear Propagation", definition: "Waves travel in straight lines in a uniform medium until they encounter obstacles.", example: "When you see a straight beam of light from a flashlight cutting through fog, it shows rectilinear propagation." },
              { name: "Reflection", definition: "The bouncing back of a wave when it hits a boundary surface.", example: "Echoes in a large hall or cave, or seeing your image in a quiet water pool." },
              { name: "Refraction", definition: "The bending of waves when they pass from one medium to another of different density, changing speed.", example: "A straw appearing bent when placed in a glass of water." },
              { name: "Diffraction", definition: "The spreading of waves as they pass through narrow openings or around corners.", example: "Hearing sound from around a corner even if you cannot see the source." },
              { name: "Interference", definition: "The combination of two or more waves of the same frequency to form a resultant wave of greater or lower amplitude.", example: "The colorful patterns seen on soap bubbles or oil films on wet roads." }
            ]
          },
          definitions: [
            { term: "Transverse Wave", def: "A wave in which the particles of the medium vibrate perpendicular to the direction of wave travel." },
            { term: "Longitudinal Wave", def: "A wave in which the particles of the medium vibrate parallel to the direction of wave travel." },
            { term: "Wavelength (λ)", def: "The distance between two consecutive crests or troughs in a wave." },
            { term: "Frequency (f)", def: "The number of complete oscillations or cycles per second." }
          ],
          videos: [
            { title: "Wave Properties - Reflection, Refraction, Diffraction & Interference", url: "https://www.youtube.com/embed/g4kK52W2qT8", duration: "12m 45s" },
            { title: "Understanding Doppler Effect in Wave Physics", url: "https://www.youtube.com/embed/h4OnBYrbCjY", duration: "8m 20s" }
          ],
          quiz: [
            { question: "What wave property is demonstrated when sound waves bend around a building corner?", options: ["Reflection", "Refraction", "Diffraction", "Interference"], answer: 2 },
            { question: "Which formula correctly links wave speed (v), frequency (f), and wavelength (λ)?", options: ["v = f + λ", "v = f / λ", "v = f * λ", "f = v * λ"], answer: 2 },
            { question: "What occurs when the crest of one wave aligns perfectly with the trough of another wave?", options: ["Constructive Interference", "Destructive Interference", "Diffraction", "Resonance"], answer: 1 }
          ],
          projects: [
            "Construct a simple ripple tank using a shallow baking tray, water, and a lamp to project wave diffraction on paper.",
            "Use a slinky spring to demonstrate the differences between transverse and longitudinal wave motions."
          ]
        }
      ]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      icon: FlaskConical,
      glowColor: "hover:shadow-passion/20 hover:border-passion",
      colorName: "text-passion",
      bgGlow: "bg-passion/10",
      progress: 40,
      completedCount: 4,
      totalCount: 10,
      topics: [
        {
          id: "c1",
          title: "Ionic and Covalent Bonding",
          cluster: "Structure and Bonding",
          grade: "Grade 10",
          keyPoints: [
            "Describe the formation of ionic bonds using dot-and-cross diagrams.",
            "Explain physical properties of ionic substances (melting point, conductivity).",
            "Describe covalent bond formation and compare simple molecular vs giant structures."
          ],
          notes: {
            title: "Chemical Bonding - Grade 10 Curriculum Notes",
            description: "Chemical bonding refers to the attractive forces that hold atoms or ions together to form stable molecules or crystal lattices. Atoms bond to achieve a stable octet electron configuration.",
            concepts: [
              { name: "Ionic Bond", definition: "Electrostatic force of attraction between oppositely charged ions formed by transfer of electrons.", example: "Sodium Chloride (NaCl) crystal lattice." },
              { name: "Covalent Bond", definition: "A bond formed by the sharing of one or more pairs of electrons between non-metal atoms.", example: "Water molecules (H₂O), Carbon Dioxide (CO₂)." }
            ]
          },
          definitions: [
            { term: "Valency", def: "The combining power of an element, determined by the number of outer shell electrons." },
            { term: "Octet Rule", def: "The tendency of atoms to prefer to have eight electrons in their valence shell." }
          ],
          videos: [
            { title: "Ionic and Covalent Bonding Explained", url: "https://www.youtube.com/embed/UrYXO8aR1t8", duration: "11m 30s" }
          ],
          quiz: [
            { question: "Which type of bond is formed by the sharing of electron pairs?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], answer: 1 }
          ],
          projects: [
            "Build 3D molecular models of water, methane, and carbon dioxide using clay and toothpicks.",
            "Test electrical conductivity of salt water vs sugar water."
          ]
        }
      ]
    }
  ];

  // Filter subjects based on grade (junior: 7-9, senior: 10-12)
  const gradeNum = parseInt(userGrade);
  const filteredSubjects = subjectsData.filter((sub) => {
    if (gradeNum >= 7 && gradeNum <= 9) {
      return sub.id === "integrated-science" || sub.id === "pre-technical";
    } else {
      return sub.id === "physics" || sub.id === "chemistry";
    }
  });

  const handleBookmarkToggle = (topicId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  // Mock File Upload Handler
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateUpload(files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      simulateUpload(files[0].name);
    }
  };

  const simulateUpload = (fileName: string) => {
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadedFiles((f) => [...f, fileName]);
          
          // Generate mock notes
          setTimeout(() => {
            setGeneratedNotes((n) => [
              ...n,
              `📝 Orbis AI generated notes for ${fileName}:\n\n- File scanned successfully.\n- Detected topic: ${selectedTopic?.title}.\n- Summary: This document covers core CBC curriculum concepts. Key terms have been linked to your Definitions tab.`
            ]);
            setUploadProgress(0);
          }, 500);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  // Quiz submission
  const handleQuizAnswer = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const submitQuiz = () => {
    if (!selectedTopic) return;
    let score = 0;
    selectedTopic.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.answer) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);

    // Reward XP on first completion
    const savedXp = localStorage.getItem("edupal-xp") || "0";
    const newXp = parseInt(savedXp) + (score * 10);
    localStorage.setItem("edupal-xp", newXp.toString());
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  // 1. Topic View (Matched to Screenshot)
  if (selectedTopic && selectedSubject) {
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

        {/* Header badges */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-primary/10 text-accent border border-primary/20 uppercase tracking-wider">
            {selectedSubject.name}
          </span>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-background border border-border-default text-text-default uppercase tracking-wider">
            {selectedTopic.grade}
          </span>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-background border border-border-default text-text-default uppercase tracking-wider">
            {selectedTopic.cluster}
          </span>
        </div>

        {/* Main Title Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border-default bg-surface p-6 md:p-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-secondary/5 to-transparent opacity-60 pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <h1 className="text-2xl md:text-3xl font-black text-text-default">{selectedTopic.title}</h1>
            
            {/* Quiz Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-accent/20 bg-accent/5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EAB308]/10 text-[#EAB308] border border-[#EAB308]/20">
                  <Star className="h-4.5 w-4.5 fill-[#EAB308]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-default">Sub-strand quiz available</h4>
                  <p className="text-[10px] text-text-muted mt-0.5">Test yourself after studying this sub-strand.</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab("quiz")}
                className="rounded-lg bg-primary hover:bg-primary/95 text-white px-4 py-2 text-xs font-bold shadow-md active-press transition-colors shrink-0"
              >
                Generate Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Tabbed Sub-navigation */}
        <div className="flex justify-between items-center border-b border-border-default/30 pb-1.5 overflow-x-auto gap-4">
          <div className="flex gap-2 shrink-0">
            {([
              { id: "notes", label: "Notes", icon: FileText },
              { id: "definitions", label: "Definitions", icon: BookText },
              { id: "videos", label: "Videos", icon: Video },
              { id: "quiz", label: "Sub-strand Quiz", icon: Star },
              { id: "projects", label: "Projects", icon: Layers }
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

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-default bg-background/50 text-text-default text-xs font-bold active-press hover:bg-background shrink-0">
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>

        {/* Tab Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Panel (Left 66%) */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "notes" && (
              <div className="space-y-6 animate-fade-in">
                {/* Key Points Box */}
                <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
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

                {/* Curriculum Notes */}
                <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-5">
                  <div className="border-b border-border-default/20 pb-3">
                    <h3 className="text-sm font-bold text-text-default">{selectedTopic.notes.title}</h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">{selectedTopic.notes.description}</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider">Key Concepts</h4>
                    {selectedTopic.notes.concepts.map((c, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-border-default/20 bg-background/20 space-y-2">
                        <p className="text-xs font-bold text-accent">{c.name}</p>
                        <p className="text-xs text-text-default leading-relaxed"><span className="font-semibold text-text-muted">Definition:</span> {c.definition}</p>
                        <p className="text-xs text-text-default italic leading-relaxed"><span className="font-semibold text-text-muted">Example:</span> {c.example}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "definitions" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                {selectedTopic.definitions.map((d, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-border-default bg-surface space-y-2">
                    <p className="text-xs font-bold text-accent">{d.term}</p>
                    <p className="text-xs text-text-muted leading-relaxed">{d.def}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "videos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                {selectedTopic.videos.map((vid, idx) => (
                  <div key={idx} className="rounded-xl border border-border-default bg-surface overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                    <div className="relative aspect-video w-full bg-black">
                      <iframe 
                        className="absolute inset-0 w-full h-full border-none"
                        src={vid.url}
                        title={vid.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <h4 className="text-xs font-bold text-text-default leading-snug line-clamp-2">{vid.title}</h4>
                        <span className="text-[10px] text-text-muted font-semibold mt-1 block">{vid.duration}</span>
                      </div>
                      
                      <Link 
                        href={`/orbis?context=${encodeURIComponent(`Video -> ${vid.title}`)}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border-default hover:bg-background/80 text-text-default py-1.5 text-[10px] font-bold active-press transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5 text-accent" />
                        <span>Ask Orbis about this video</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "quiz" && (
              <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-6 animate-fade-in">
                <div className="flex justify-between items-center border-b border-border-default/20 pb-3">
                  <h3 className="text-sm font-bold text-text-default">Topic Assessment</h3>
                  {quizSubmitted && (
                    <span className="text-xs font-extrabold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                      Score: {quizScore} / {selectedTopic.quiz.length}
                    </span>
                  )}
                </div>

                <div className="space-y-6">
                  {selectedTopic.quiz.map((q, qIdx) => (
                    <div key={qIdx} className="space-y-3">
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
                              className={`w-full p-3 rounded-lg border text-xs font-semibold text-left transition-all ${
                                !quizSubmitted ? "active-press" : ""
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

                <div className="flex gap-3 justify-end border-t border-border-default/20 pt-4">
                  {quizSubmitted ? (
                    <button
                      onClick={resetQuiz}
                      className="px-4 py-2 rounded-lg border border-border-default text-text-default text-xs font-bold active-press hover:bg-background transition-colors"
                    >
                      Retry Quiz
                    </button>
                  ) : (
                    <button
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length < selectedTopic.quiz.length}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-5 py-2 text-xs font-bold shadow-md active-press transition-colors disabled:opacity-40"
                    >
                      Submit Answers
                    </button>
                  )}
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-4 animate-fade-in">
                {selectedTopic.projects.map((proj, idx) => (
                  <div key={idx} className="p-5 rounded-xl border border-border-default bg-surface space-y-2">
                    <p className="text-xs font-bold text-accent">Project Idea {idx + 1}</p>
                    <p className="text-xs text-text-default leading-relaxed">{proj}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel - Document Upload Zone (Right 33%) */}
          <div className="space-y-6">
            <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
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
                  onChange={handleFileSelect}
                />
                <UploadCloud className="h-8 w-8 text-text-muted" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-text-default">Drag & drop files here</p>
                  <p className="text-[10px] text-text-muted">or click to browse from explorer</p>
                </div>
                <span className="text-[9px] text-text-muted font-semibold bg-background/50 border border-border-default/40 px-2 py-0.5 rounded-full uppercase">
                  PDF, DOCX, TXT
                </span>
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

              {/* Uploaded Files list */}
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

            {/* Generated summaries */}
            {generatedNotes.length > 0 && (
              <div className="rounded-xl border border-accent/20 bg-accent/5 p-5 md:p-6 space-y-4 animate-fade-in">
                <h3 className="flex items-center gap-2 text-xs font-bold text-text-default">
                  <Sparkles className="h-4.5 w-4.5 text-accent" />
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
    );
  }

  // 2. Subject view
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
          {selectedSubject.topics.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                setSelectedTopic(t);
                setActiveTab("notes");
                resetQuiz();
              }}
              className="group p-5 rounded-xl border border-border-default bg-surface hover:border-text-muted/40 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between gap-4 active-press"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[9px] font-bold text-accent px-1.5 py-0.5 rounded-full bg-accent/10 border border-accent/15 uppercase tracking-wider">
                    {t.grade} • {t.cluster}
                  </span>
                  <button
                    onClick={(e) => handleBookmarkToggle(t.id, e)}
                    className="text-text-muted hover:text-accent transition-colors"
                  >
                    <Bookmark className={`h-4.5 w-4.5 ${bookmarkedTopics[t.id] ? "fill-accent text-accent" : ""}`} />
                  </button>
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
                  <span>Open Topic</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Subjects Grid view (Default)
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Curriculum Library
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Select a subject from your {gradeNum >= 10 ? "Senior School" : "Junior School"} curriculum to start learning.
        </p>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((sub) => {
          const Icon = sub.icon;
          return (
            <div
              key={sub.id}
              onClick={() => setSelectedSubject(sub)}
              className={`group p-5 rounded-xl border border-border-default bg-surface transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-pointer active-press flex flex-col justify-between gap-6 ${sub.glowColor}`}
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
