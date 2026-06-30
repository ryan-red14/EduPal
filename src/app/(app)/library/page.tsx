"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Atom,
  FlaskConical,
  Leaf,
  Calculator,
  BookText,
  Landmark,
  Globe,
  ChevronRight,
  Star,
  CheckCircle2,
  Bookmark,
  Sparkles,
  HelpCircle,
  Clock,
  BookOpenCheck,
} from "lucide-react";

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
  lessons: Lesson[];
}

interface Subject {
  id: string;
  name: string;
  icon: any;
  glowColor: string;
  progress: number;
  completedCount: number;
  totalCount: number;
  colorName: string;
  topics: Topic[];
}

export default function LibraryPage() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [bookmarkedLessons, setBookmarkedLessons] = useState<Record<string, boolean>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizActive, setQuizActive] = useState(false);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});

  // Mock database representing KICD/CBC subjects, topics, and lessons
  const subjectsData: Subject[] = [
    {
      id: "physics",
      name: "Physics",
      icon: Atom,
      glowColor: "hover:shadow-[#A78BFA]/20 hover:border-[#A78BFA]",
      colorName: "text-[#A78BFA]",
      progress: 60,
      completedCount: 6,
      totalCount: 10,
      topics: [
        {
          id: "p1",
          title: "Mechanics and Thermal Physics",
          lessons: [
            {
              id: "pl1",
              title: "Introduction to Physics",
              duration: "25 mins",
              completed: true,
              content: "Physics is the branch of science concerned with the nature and properties of matter and energy. The subject matter of physics includes mechanics, heat, light and other radiation, sound, electricity, magnetism, and the structure of atoms.",
              keyPoints: [
                "Understand the relationship between physics and technology.",
                "Describe basic branches of physics (mechanics, thermodynamics, etc.).",
                "Learn about laboratory safety rules.",
              ],
              glossary: [
                { term: "Mechanics", def: "The study of motion and its causes." },
                { term: "Thermodynamics", def: "The study of heat and temperature." },
              ],
            },
            {
              id: "pl2",
              title: "Pressure in Fluids",
              duration: "40 mins",
              completed: true,
              content: "Pressure is defined as force per unit area. Fluid pressure occurs due to the weight of fluid acting on a surface. In fluids, pressure increases with depth and acts equally in all directions at a given depth.",
              keyPoints: [
                "Define pressure and calculate pressure in solids.",
                "Derive the formula for fluid pressure: P = hρg.",
                "Describe applications of pressure, including hydraulic lifts.",
              ],
              glossary: [
                { term: "Pascal (Pa)", def: "The SI unit of pressure, equivalent to 1 N/m²." },
                { term: "Fluid", def: "A substance that flows, such as a liquid or gas." },
              ],
            },
          ],
        },
        {
          id: "p2",
          title: "Waves and Optics",
          lessons: [
            {
              id: "pl3",
              title: "Properties of Waves",
              duration: "35 mins",
              completed: false,
              content: "Waves transfer energy from one point to another without transferring matter. Mechanical waves require a material medium to propagate, while electromagnetic waves can travel through a vacuum. Key properties include wavelength, frequency, amplitude, and speed.",
              keyPoints: [
                "Distinguish between transverse and longitudinal waves.",
                "Recall the wave equation: v = fλ.",
                "Explain the phenomena of reflection, refraction, diffraction, and interference.",
              ],
              glossary: [
                { term: "Amplitude", def: "The maximum displacement of a particle from its equilibrium position." },
                { term: "Frequency", def: "The number of complete wave cycles passing a point per second." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "chemistry",
      name: "Chemistry",
      icon: FlaskConical,
      glowColor: "hover:shadow-[#2DD4BF]/20 hover:border-[#2DD4BF]",
      colorName: "text-[#2DD4BF]",
      progress: 40,
      completedCount: 4,
      totalCount: 10,
      topics: [
        {
          id: "c1",
          title: "Structure and Bonding",
          lessons: [
            {
              id: "cl1",
              title: "Ionic and Covalent Bonding",
              duration: "45 mins",
              completed: true,
              content: "Ionic bonding occurs when electrons are transferred from a metal to a non-metal, forming ions. Covalent bonding involves the sharing of electron pairs between non-metals to achieve a stable octet structure.",
              keyPoints: [
                "Describe how ionic bonds form using dot-and-cross diagrams.",
                "Compare physical properties of ionic and covalent substances.",
                "Understand giant metallic and molecular lattices.",
              ],
              glossary: [
                { term: "Valency", def: "The combining power of an element." },
                { term: "Cation", def: "A positively charged ion." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "biology",
      name: "Biology",
      icon: Leaf,
      glowColor: "hover:shadow-[#4ADE80]/20 hover:border-[#4ADE80]",
      colorName: "text-[#4ADE80]",
      progress: 75,
      completedCount: 9,
      totalCount: 12,
      topics: [
        {
          id: "b1",
          title: "Cell Structure and Physiology",
          lessons: [
            {
              id: "bl1",
              title: "Cell Organelles",
              duration: "30 mins",
              completed: true,
              content: "Cells are the basic units of life. Eukaryotic cells contain membrane-bound organelles that specialize in different cellular functions. Mitochondria produce energy, ribosomes synthesize proteins, and the nucleus houses DNA.",
              keyPoints: [
                "Identify parts of plant and animal cells under a microscope.",
                "Describe the functions of mitochondria, chloroplasts, and ribosomes.",
                "Distinguish between eukaryotic and prokaryotic cells.",
              ],
              glossary: [
                { term: "Organelle", def: "A specialized subunit within a cell." },
                { term: "Cytoplasm", def: "The jelly-like fluid filling the cell." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "mathematics",
      name: "Mathematics",
      icon: Calculator,
      glowColor: "hover:shadow-[#60A5FA]/20 hover:border-[#60A5FA]",
      colorName: "text-[#60A5FA]",
      progress: 25,
      completedCount: 3,
      totalCount: 12,
      topics: [],
    },
    {
      id: "english",
      name: "English",
      icon: BookText,
      glowColor: "hover:shadow-[#FB7185]/20 hover:border-[#FB7185]",
      colorName: "text-[#FB7185]",
      progress: 90,
      completedCount: 9,
      totalCount: 10,
      topics: [],
    },
    {
      id: "history",
      name: "History",
      icon: Landmark,
      glowColor: "hover:shadow-[#FB923C]/20 hover:border-[#FB923C]",
      colorName: "text-[#FB923C]",
      progress: 50,
      completedCount: 5,
      totalCount: 10,
      topics: [],
    },
    {
      id: "geography",
      name: "Geography",
      icon: Globe,
      glowColor: "hover:shadow-[#22D3EE]/20 hover:border-[#22D3EE]",
      colorName: "text-[#22D3EE]",
      progress: 30,
      completedCount: 3,
      totalCount: 10,
      topics: [],
    },
  ];

  const handleToggleBookmark = (lessonId: string) => {
    setBookmarkedLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const handleMarkComplete = (lessonId: string) => {
    if (!selectedSubject) return;

    // Mutate state locally for prototype feedback
    const updatedTopics = selectedSubject.topics.map((t) => {
      const updatedLessons = t.lessons.map((l) => {
        if (l.id === lessonId) {
          return { ...l, completed: true };
        }
        return l;
      });
      return { ...t, lessons: updatedLessons };
    });

    const updatedSubject = { ...selectedSubject, topics: updatedTopics };
    setSelectedSubject(updatedSubject);
    if (selectedLesson && selectedLesson.id === lessonId) {
      setSelectedLesson({ ...selectedLesson, completed: true });
    }
  };

  const mockQuizQuestions = [
    {
      q: "What type of wave requires a material medium to propagate?",
      options: ["Electromagnetic wave", "Mechanical wave", "Light wave", "Radio wave"],
      correct: 1,
    },
    {
      q: "What is the formula representing the wave equation?",
      options: ["v = f/λ", "v = fλ", "f = vλ", "λ = f/v"],
      correct: 1,
    },
  ];

  const handleSelectQuizAnswer = (qIdx: number, oIdx: number) => {
    setSelectedQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    let score = 0;
    mockQuizQuestions.forEach((q, idx) => {
      if (selectedQuizAnswers[idx] === q.correct) {
        score += 1;
      }
    });
    setQuizScore(score);
  };

  const resetQuiz = () => {
    setSelectedQuizAnswers({});
    setQuizScore(null);
    setQuizActive(false);
  };

  // 1. LESSON VIEWER MODE
  if (selectedLesson) {
    const isBookmarked = bookmarkedLessons[selectedLesson.id];

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Navigation Breadcrumbs & Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-default/40 pb-4">
          <button
            onClick={() => {
              setSelectedLesson(null);
              resetQuiz();
            }}
            className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text-default active-press transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Subject Topics</span>
          </button>
          
          <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
            <span>Library</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="capitalize">{selectedSubject?.name}</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="truncate max-w-[150px]">{selectedLesson.title}</span>
          </div>
        </div>

        {quizActive ? (
          /* Lesson Quiz Mode */
          <div className="max-w-2xl mx-auto rounded-xl border border-border-default bg-surface p-6 space-y-6">
            <div className="border-b border-border-default/30 pb-3 flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2 text-text-default">
                <BookOpenCheck className="h-5.5 w-5.5 text-accent" />
                <span>Practice Quiz: {selectedLesson.title}</span>
              </h2>
              <span className="text-xs text-text-muted">CBC Aligned</span>
            </div>

            {quizScore === null ? (
              <div className="space-y-6">
                {mockQuizQuestions.map((question, qIdx) => (
                  <div key={qIdx} className="space-y-3">
                    <p className="font-semibold text-text-default text-sm">
                      {qIdx + 1}. {question.q}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {question.options.map((option, oIdx) => {
                        const isSelected = selectedQuizAnswers[qIdx] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            onClick={() => handleSelectQuizAnswer(qIdx, oIdx)}
                            className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg border text-xs font-semibold text-left transition-all active-press ${
                              isSelected
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-border-default/60 hover:border-text-muted bg-background/25"
                            }`}
                          >
                            <span className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold ${
                              isSelected ? "bg-accent text-surface border-accent" : "border-border-default/80"
                            }`}>
                              {oIdx + 1}
                            </span>
                            <span>{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedQuizAnswers).length < mockQuizQuestions.length}
                  className="w-full inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50 text-white py-3 text-sm font-semibold shadow-md active-press transition-all"
                >
                  Submit Answers
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-2xl border border-accent/20">
                  {quizScore} / {mockQuizQuestions.length}
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-text-default">Quiz Completed!</p>
                  <p className="text-sm text-text-muted">
                    {quizScore === mockQuizQuestions.length
                      ? "Excellent! You scored 100% and mastered this concept."
                      : "Good effort! Revise the key points and try again."}
                  </p>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={resetQuiz}
                    className="flex-1 py-2.5 rounded-lg border border-border-default text-text-default text-xs font-semibold bg-background/40 hover:bg-background/80 active-press transition-all"
                  >
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => {
                      resetQuiz();
                      handleMarkComplete(selectedLesson.id);
                    }}
                    className="flex-1 py-2.5 rounded-lg bg-primary hover:bg-primary/95 text-white text-xs font-semibold active-press transition-all shadow"
                  >
                    Done & Complete Lesson
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Main Lesson Content Reading Mode */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Content column (66%) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl border border-border-default bg-surface p-5 md:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
                    {selectedLesson.title}
                  </h1>
                  <button
                    onClick={() => handleToggleBookmark(selectedLesson.id)}
                    className="p-2 rounded-lg border border-border-default/60 text-text-muted hover:text-accent hover:border-accent active-press transition-all"
                    aria-label="Bookmark lesson"
                  >
                    <Bookmark className={`h-4.5 w-4.5 ${isBookmarked ? "fill-accent text-accent" : ""}`} />
                  </button>
                </div>

                <div className="flex items-center gap-3.5 text-xs text-text-muted">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{selectedLesson.duration} reading time</span>
                  </span>
                  {selectedLesson.completed && (
                    <span className="flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-bold">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Completed</span>
                    </span>
                  )}
                </div>

                <div className="prose prose-invert max-w-none text-text-default/90 leading-relaxed text-sm md:text-base border-t border-border-default/30 pt-4 space-y-4">
                  <p>{selectedLesson.content}</p>
                  <p>In this lesson, we break down standard learning outcomes specified by the curriculum design. Take your time to review the key points in the right sidebar to consolidate your understanding before generating your diagnostic practice test.</p>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-border-default bg-surface/50">
                <div className="flex gap-2.5">
                  <button
                    onClick={() => handleMarkComplete(selectedLesson.id)}
                    disabled={selectedLesson.completed}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-growth hover:bg-growth/90 disabled:opacity-50 text-white px-4 py-2 text-xs font-semibold active-press transition-colors shadow"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{selectedLesson.completed ? "Completed" : "Mark Complete"}</span>
                  </button>
                  
                  <Link
                    href={{ pathname: "/orbis", query: { context: `${selectedSubject?.name} -> ${selectedLesson.title}` } }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border-default bg-background/50 hover:bg-background/80 text-text-default px-4 py-2 text-xs font-semibold active-press transition-colors"
                  >
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span>Ask Orbis</span>
                  </Link>
                </div>

                <button
                  onClick={() => setQuizActive(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white px-4 py-2 text-xs font-semibold active-press transition-colors shadow"
                >
                  <BookOpenCheck className="h-4 w-4" />
                  <span>Practice Quiz</span>
                </button>
              </div>
            </div>

            {/* Right Reference Column (33%) */}
            <div className="space-y-6">
              {/* Key Points */}
              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-4">
                <h3 className="text-sm font-extrabold text-text-default uppercase tracking-wider flex items-center gap-2 border-b border-border-default/30 pb-2">
                  <Star className="h-4.5 w-4.5 text-accent fill-accent" />
                  <span>Key Points</span>
                </h3>
                <ul className="space-y-3">
                  {selectedLesson.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex gap-2 text-xs text-text-muted leading-relaxed">
                      <span className="flex h-1.5 w-1.5 mt-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Glossary Terms */}
              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-4">
                <h3 className="text-sm font-extrabold text-text-default uppercase tracking-wider flex items-center gap-2 border-b border-border-default/30 pb-2">
                  <HelpCircle className="h-4.5 w-4.5 text-trust" />
                  <span>Glossary</span>
                </h3>
                <div className="space-y-3.5">
                  {selectedLesson.glossary.map((g, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-xs font-bold text-text-default">{g.term}</p>
                      <p className="text-[11px] text-text-muted leading-normal">{g.def}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. TOPICS & LESSONS BROWSER MODE
  if (selectedSubject) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Navigation Breadcrumbs & Back */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-default/40 pb-4">
          <button
            onClick={() => setSelectedSubject(null)}
            className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-text-default active-press transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Subjects</span>
          </button>
          
          <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
            <span>Library</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="capitalize">{selectedSubject.name}</span>
          </div>
        </div>

        {/* Subject Header Information */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-border-default bg-surface p-5">
          <div className="flex items-center gap-4">
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-background border border-border-default ${selectedSubject.colorName}`}>
              {React.createElement(selectedSubject.icon, { className: "h-7 w-7" })}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-text-default">{selectedSubject.name}</h1>
              <p className="text-xs text-text-muted">KICD / CBC Secondary School Syllabus</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-t md:border-t-0 border-border-default/30 pt-3 md:pt-0">
            <div className="text-right">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Mastery Progress</span>
              <p className="text-lg font-extrabold text-text-default">{selectedSubject.progress}%</p>
            </div>
            <div className="h-10 w-24 rounded bg-background border border-border-default/80 p-0.5 overflow-hidden flex items-end">
              <div 
                className="bg-growth h-full rounded transition-all duration-300"
                style={{ width: `${selectedSubject.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* List of Topics */}
        {selectedSubject.topics.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border-default rounded-xl space-y-3">
            <p className="text-sm font-semibold text-text-muted">Topics for {selectedSubject.name} are coming soon!</p>
            <p className="text-xs text-text-muted/70">Our educators are currently writing CBC-aligned material for this subject.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {selectedSubject.topics.map((topic) => (
              <div key={topic.id} className="rounded-xl border border-border-default bg-surface overflow-hidden">
                <div className="border-b border-border-default/40 bg-background/25 px-5 py-4">
                  <h3 className="font-bold text-text-default text-base">{topic.title}</h3>
                  <p className="text-[11px] text-text-muted">{topic.lessons.length} lessons available</p>
                </div>
                <div className="divide-y divide-border-default/30">
                  {topic.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className="group flex items-center justify-between px-5 py-3.5 hover:bg-primary/5 active:bg-primary/10 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          lesson.completed
                            ? "bg-growth/10 border-growth text-growth"
                            : "border-border-default text-text-muted group-hover:border-text-default"
                        }`}>
                          {lesson.completed ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <span className="text-[10px] font-bold">{lesson.duration.split(" ")[0]}m</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-text-default truncate group-hover:text-accent transition-colors">
                            {lesson.title}
                          </p>
                          <p className="text-[11px] text-text-muted truncate">
                            ETA {lesson.duration}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {bookmarkedLessons[lesson.id] && (
                          <Bookmark className="h-3.5 w-3.5 text-accent fill-accent" />
                        )}
                        <ChevronRight className="h-4.5 w-4.5 text-text-muted group-hover:text-text-default group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // 3. SUBJECT SELECTION LIST MODE (DEFAULT)
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Page Header */}
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Curriculum Library
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Browse strands, sub-strands, and master topics for your grade level.
        </p>
      </div>

      {/* Grid of Enrolled Subjects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjectsData.map((subject) => {
          const Icon = subject.icon;
          return (
            <div
              key={subject.id}
              className={`hover-bloom group flex flex-col justify-between rounded-2xl border border-border-default bg-surface p-5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${subject.glowColor}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-background border border-border-default ${subject.colorName}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-bold text-text-muted uppercase bg-background/50 border border-border-default/60 px-2 py-0.5 rounded-full">
                    {subject.completedCount} / {subject.totalCount} completed
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-text-default group-hover:text-accent transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    Access secondary school syllabus materials tailored to the KICD CBC standards.
                  </p>
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="mt-5 pt-4 border-t border-border-default/20 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-text-muted">Syllabus Progress</span>
                  <span className="font-extrabold text-text-default">{subject.progress}%</span>
                </div>
                
                {/* Micro Progress Bar */}
                <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-growth rounded-full transition-all duration-300"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>

                <button
                  onClick={() => setSelectedSubject(subject)}
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white py-2 text-xs font-semibold shadow active-press transition-colors"
                >
                  <span>Continue Study</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
