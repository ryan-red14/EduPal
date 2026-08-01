"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Award, Clock, Star, Flame, Sparkles, BookOpen, FileText, CheckCircle2, ChevronRight } from "lucide-react";

interface SubjectResult {
  code: string;
  name: string;
  cbeLevel: string;
  points: number;
  cbeDesc: string;
  tradGrade: string;
  tradDesc: string;
  gpa: number;
}

export default function AnalyticsPage() {
  const [rubric, setRubric] = useState<"cbe" | "traditional" | "gpa">("cbe");
  const [studentName, setStudentName] = useState("RYAN MUUO");
  const [schoolName, setSchoolName] = useState("OUR LADY QUEEN OF PEACE");
  const [studentGrade, setStudentGrade] = useState("8");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const name = localStorage.getItem("edupal-name");
      if (name) setStudentName(name.toUpperCase());
      const school = localStorage.getItem("edupal-school");
      if (school) setSchoolName(school.toUpperCase());
      const grade = localStorage.getItem("edupal-grade") || "8";
      setUserGradeData(grade);
    }
  }, []);

  const [userGradeData, setUserGradeData] = useState("8");

  // Mock KJSEA Results Slip Data (compulsory junior secondary subjects)
  const juniorResults: SubjectResult[] = [
    { code: "901", name: "English", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "902", name: "Kiswahili", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "903", name: "Mathematics", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "905", name: "Integrated Science", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "906", name: "Agriculture", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "907", name: "Social Studies", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "908", name: "Christian Religious Education", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "911", name: "Creative Arts & Sports", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "912", name: "Pre-technical Studies", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
  ];

  const seniorResults: SubjectResult[] = [
    { code: "101", name: "English (Core)", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "102", name: "Kiswahili (Core)", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "103", name: "Core Mathematics", cbeLevel: "ME1", points: 6, cbeDesc: "Meeting Expectation", tradGrade: "B+", tradDesc: "Very Good", gpa: 3.3 },
    { code: "231", name: "Biology (STEM)", cbeLevel: "EE2", points: 7, cbeDesc: "Exceeding Expectation", tradGrade: "A-", tradDesc: "Excellent", gpa: 3.7 },
    { code: "232", name: "Chemistry (STEM)", cbeLevel: "ME2", points: 5, cbeDesc: "Meeting Expectation", tradGrade: "B", tradDesc: "Good", gpa: 3.0 },
    { code: "233", name: "Physics (STEM)", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
    { code: "238", name: "Computer Studies (STEM)", cbeLevel: "EE1", points: 8, cbeDesc: "Exceeding Expectation", tradGrade: "A", tradDesc: "Excellent", gpa: 4.0 },
  ];

  const results = parseInt(userGradeData) >= 10 ? seniorResults : juniorResults;

  // Calculate Average GPA/Points
  const avgPoints = (results.reduce((acc, r) => acc + r.points, 0) / results.length).toFixed(2);
  const avgGpa = (results.reduce((acc, r) => acc + r.gpa, 0) / results.length).toFixed(2);

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Performance Analytics
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Track syllabus progression, view assessment transcripts, and toggle grading rubrics.
        </p>
      </div>

      {/* Rubric Toggle */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-2 bg-background border border-border-default/45 p-1 rounded-xl w-full sm:w-auto">
          {[
            { id: "cbe", label: "CBE Rubric" },
            { id: "traditional", label: "Traditional (A-E)" },
            { id: "gpa", label: "GPA Scale (4.0)" }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setRubric(r.id as any)}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all active-press ${
                rubric === r.id
                  ? "bg-accent/15 border border-accent/25 text-accent"
                  : "text-text-muted hover:text-text-default"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-text-muted">
          Syllabus Average: <span className="text-accent font-bold">{rubric === "gpa" ? `${avgGpa} GPA` : `${avgPoints} Points`}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column: KNEC Transcript (3/5) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Official KNEC Slip Card */}
          <div className="rounded-2xl border border-border-default bg-surface overflow-hidden shadow-xl">
            {/* Header banner */}
            <div className="bg-background/40 border-b border-border-default/60 p-5 text-center space-y-3 relative">
              {/* Mock Seal */}
              <div className="h-10 w-10 rounded-full border border-accent/45 bg-accent/5 mx-auto flex items-center justify-center text-[8px] font-bold text-accent">
                KNEC
              </div>
              <div className="space-y-1">
                <h2 className="text-sm font-extrabold text-text-default tracking-wide uppercase">
                  The Kenya National Examinations Council
                </h2>
                <p className="text-xs font-bold text-accent">
                  2025 {parseInt(userGradeData) >= 10 ? "KPSEA/KCSE" : "KJSEA"} Results
                </p>
              </div>
            </div>

            {/* Student metadata */}
            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-border-default/30 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between border-b border-border-default/15 pb-1">
                  <span className="text-text-muted uppercase text-[9px] font-bold">Assessment Number</span>
                  <span className="font-mono font-bold text-text-default">A001741925</span>
                </div>
                <div className="flex justify-between border-b border-border-default/15 pb-1">
                  <span className="text-text-muted uppercase text-[9px] font-bold">Full Name</span>
                  <span className="font-bold text-text-default">{studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted uppercase text-[9px] font-bold">Gender</span>
                  <span className="font-bold text-text-default">M</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between border-b border-border-default/15 pb-1">
                  <span className="text-text-muted uppercase text-[9px] font-bold">Centre Code</span>
                  <span className="font-mono font-bold text-text-default">12315261</span>
                </div>
                <div className="flex justify-between border-b border-border-default/15 pb-1">
                  <span className="text-text-muted uppercase text-[9px] font-bold">Centre Name</span>
                  <span className="font-bold text-text-default truncate max-w-[150px]">{schoolName}</span>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold">
                <thead>
                  <tr className="border-b border-border-default/30 bg-background/20 text-text-muted uppercase text-[9px] tracking-wider">
                    <th className="py-3 px-4">Subject Code</th>
                    <th className="py-3 px-4">Subject Name</th>
                    <th className="py-3 px-4">Performance Level</th>
                    <th className="py-3 px-4">Points</th>
                    <th className="py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default/20 text-text-default">
                  {results.map((r) => (
                    <tr key={r.code} className="hover:bg-background/10">
                      <td className="py-3 px-4 font-mono">{r.code}</td>
                      <td className="py-3 px-4 font-bold">{r.name}</td>
                      
                      {/* Performance Level */}
                      <td className="py-3 px-4 font-mono text-accent">
                        {rubric === "cbe" && r.cbeLevel}
                        {rubric === "traditional" && r.tradGrade}
                        {rubric === "gpa" && r.gpa.toFixed(1)}
                      </td>

                      {/* Points */}
                      <td className="py-3 px-4 font-mono">{r.points}</td>

                      {/* Description */}
                      <td className="py-3 px-4 text-text-muted font-medium">
                        {rubric === "cbe" && r.cbeDesc}
                        {rubric === "traditional" && r.tradDesc}
                        {rubric === "gpa" && `Grade Point: ${r.gpa.toFixed(1)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pathway averages (Compulsory footer) */}
            <div className="p-4 bg-background/25 border-t border-border-default/30 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
              <div className="p-2 rounded bg-background/40 border border-border-default/40">
                <p className="text-[9px] text-text-muted font-bold uppercase">Arts & Sports Pathway</p>
                <p className="font-black text-accent mt-0.5">73.6632</p>
              </div>
              <div className="p-2 rounded bg-background/40 border border-border-default/40">
                <p className="text-[9px] text-text-muted font-bold uppercase">Social Science Pathway</p>
                <p className="font-black text-accent mt-0.5">73.7231</p>
              </div>
              <div className="p-2 rounded bg-background/40 border border-border-default/40">
                <p className="text-[9px] text-text-muted font-bold uppercase">STEM Pathway</p>
                <p className="font-black text-accent mt-0.5">73.7518</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Animated SVG Charts (2/5) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Study Time bar chart */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="h-4.5 w-4.5 text-accent" />
              <span>Weekly Study Distribution (Hours)</span>
            </h3>

            <div className="h-40 w-full flex items-end justify-between gap-2 pt-6 pb-2 px-2 relative border-b border-border-default/30">
              {/* Bars */}
              {[
                { day: "Mon", hrs: 2.5 },
                { day: "Tue", hrs: 1.8 },
                { day: "Wed", hrs: 3.2 },
                { day: "Thu", hrs: 0.5 },
                { day: "Fri", hrs: 2.0 },
                { day: "Sat", hrs: 4.5 },
                { day: "Sun", hrs: 1.5 }
              ].map((d, idx) => {
                const heightPct = (d.hrs / 5) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                    <div className="relative w-full flex justify-center">
                      {/* Tooltip */}
                      <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-background text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                        {d.hrs}h
                      </span>
                      <div
                        className="w-full bg-accent/20 border border-accent/45 hover:bg-accent/40 rounded-t-sm transition-all duration-500 ease-out"
                        style={{ height: `${heightPct}%`, minHeight: "4px" }}
                      />
                    </div>
                    <span className="text-[9px] text-text-muted font-bold uppercase tracking-wider">{d.day}</span>
                  </div>
                );
              })}
              <div className="absolute left-0 top-0 text-[8px] text-text-muted">5h</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[8px] text-text-muted">2.5h</div>
            </div>
          </div>

          {/* Subject performance trend */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="h-4.5 w-4.5 text-accent animate-pulse" />
              <span>Score Progression Trend</span>
            </h3>

            <div className="h-36 w-full bg-background/25 rounded-lg border border-border-default/20 relative flex items-end p-2">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="30" x2="100" y2="30" stroke="var(--border-default)" strokeWidth="0.15" strokeDasharray="3" />
                <line x1="0" y1="60" x2="100" y2="60" stroke="var(--border-default)" strokeWidth="0.15" strokeDasharray="3" />
                <path
                  d="M 5,85 Q 25,60 45,40 T 95,15"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  className="animate-logo-draw"
                />
              </svg>
              <div className="absolute left-2 top-2 text-[8px] text-text-muted">100%</div>
              <div className="absolute left-2 bottom-2 text-[8px] text-text-muted">0%</div>
            </div>
            
            <div className="flex justify-between items-center text-[9px] text-text-muted font-bold uppercase px-2">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4 (Current)</span>
            </div>
          </div>

          {/* Orbis recommendations */}
          <div className="rounded-xl border border-accent/25 bg-accent/5 p-5 md:p-6 space-y-4">
            <h3 className="flex items-center gap-2 text-xs font-bold text-text-default">
              <Sparkles className="h-4.5 w-4.5 text-accent animate-pulse" />
              <span>Orbis Performance Insights</span>
            </h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Your average score sits at **78% (ME1)**. You are exceeding expectations in **Physics** and **Integrated Science**. Let&apos;s boost your Mathematics score by completing the Daily Challenge quiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
