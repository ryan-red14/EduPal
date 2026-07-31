"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Award, Clock, Star, Flame, Sparkles, BookOpen, FileText, CheckCircle2, ChevronRight, Grid } from "lucide-react";

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

  // Heatmap Mock: 4 weeks x 7 days = 28 slots
  const heatmapData = [
    30, 45, 60, 0, 15, 90, 45,
    60, 30, 0, 45, 60, 120, 15,
    30, 90, 45, 60, 0, 75, 45,
    90, 60, 30, 45, 120, 90, 60
  ];

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
          <div className="rounded-2xl border border-border-default bg-surface overflow-hidden shadow-xl hover-bloom">
            {/* Header banner */}
            <div className="bg-[#121A2A] text-white p-6 border-b border-border-default/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black tracking-widest text-accent uppercase">Kenyan National Examinations Council</p>
                <h2 className="text-lg font-black tracking-tight">KJSEA 2025 RESULT SLIP</h2>
              </div>
              <div className="text-right text-[10px] text-text-muted font-mono leading-relaxed">
                <p>REF: KNEC/KJSEA/2025/940251</p>
                <p>DATE: 30TH NOVEMBER 2025</p>
              </div>
            </div>

            {/* Student metadata */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-b border-border-default/20 bg-background/25 text-xs font-semibold leading-relaxed">
              <div className="space-y-1">
                <p className="text-[9px] text-text-muted uppercase font-bold">Student Name</p>
                <p className="text-text-default font-bold">{studentName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-text-muted uppercase font-bold">School Name</p>
                <p className="text-text-default font-bold">{schoolName}</p>
              </div>
            </div>

            {/* Subjects Marks Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border-default/30 bg-background/40 font-bold uppercase text-[9px] text-text-muted">
                    <th className="py-2.5 px-4">Code</th>
                    <th className="py-2.5 px-4">Subject Description</th>
                    <th className="py-2.5 px-4">Grade / Rubric Level</th>
                    <th className="py-2.5 px-4">Points</th>
                    <th className="py-2.5 px-4">Performance Indicator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default/20 font-semibold text-text-default">
                  {results.map((r) => (
                    <tr key={r.code} className="hover:bg-background/20 transition-colors">
                      <td className="py-3 px-4 font-mono">{r.code}</td>
                      <td className="py-3 px-4">{r.name}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-black ${
                          r.points >= 7 ? "bg-green-500/10 text-green-400" : "bg-accent/10 text-accent"
                        }`}>
                          {rubric === "cbe" && r.cbeLevel}
                          {rubric === "traditional" && r.tradGrade}
                          {rubric === "gpa" && `${r.gpa.toFixed(1)} / 4.0`}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono">{r.points}</td>
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

            {/* Pathway averages */}
            <div className="p-4 bg-background/25 border-t border-border-default/30 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
              <div className="p-2 rounded bg-background/40 border border-border-default/40 hover-bloom">
                <p className="text-[9px] text-text-muted font-bold uppercase">Arts & Sports Pathway</p>
                <p className="font-black text-accent mt-0.5">73.66</p>
              </div>
              <div className="p-2 rounded bg-background/40 border border-border-default/40 hover-bloom">
                <p className="text-[9px] text-text-muted font-bold uppercase">Social Science Pathway</p>
                <p className="font-black text-accent mt-0.5">73.72</p>
              </div>
              <div className="p-2 rounded bg-background/40 border border-border-default/40 hover-bloom">
                <p className="text-[9px] text-text-muted font-bold uppercase">STEM Pathway</p>
                <p className="font-black text-accent mt-0.5">73.75</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: V2 Animated SVG Charts (2/5) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Radar Chart (Subject clusters strengths) */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 text-accent animate-pulse" />
              <span>Competency Radar Analysis</span>
            </h3>

            <div className="flex justify-center py-4">
              <svg className="h-44 w-44" viewBox="0 0 100 100">
                {/* Background pentagon rings */}
                <polygon points="50,10 88,38 73,83 27,83 12,38" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                <polygon points="50,23 78,44 67,78 33,78 22,44" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                <polygon points="50,36 68,50 61,72 39,72 32,50" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                
                {/* Axis lines */}
                <line x1="50" y1="50" x2="50" y2="10" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                <line x1="50" y1="50" x2="88" y2="38" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                <line x1="50" y1="50" x2="73" y2="83" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                <line x1="50" y1="50" x2="27" y2="83" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
                <line x1="50" y1="50" x2="12" y2="38" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />

                {/* Score polygon */}
                <polygon
                  points="50,18 78,28 66,74 31,73 24,32"
                  fill="rgba(168, 85, 247, 0.25)"
                  stroke="#A855F7"
                  strokeWidth="2"
                  className="animate-logo-draw"
                />

                {/* Labels */}
                <text x="50" y="7" textAnchor="middle" fontSize="5" fill="var(--text-muted)" fontWeight="bold">STEM</text>
                <text x="92" y="38" textAnchor="start" fontSize="5" fill="var(--text-muted)" fontWeight="bold">LANG</text>
                <text x="76" y="88" textAnchor="start" fontSize="5" fill="var(--text-muted)" fontWeight="bold">HUM</text>
                <text x="24" y="88" textAnchor="end" fontSize="5" fill="var(--text-muted)" fontWeight="bold">ARTS</text>
                <text x="8" y="38" textAnchor="end" fontSize="5" fill="var(--text-muted)" fontWeight="bold">TECH</text>
              </svg>
            </div>
          </div>

          {/* Heatmap (Study consistency grid) */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Grid className="h-4.5 w-4.5 text-accent" />
              <span>Study Consistency Heatmap</span>
            </h3>

            <div className="grid grid-cols-7 gap-1.5 p-2 bg-background/25 rounded-lg border border-border-default/45">
              {heatmapData.map((mins, idx) => {
                let colorClass = "bg-background border border-border-default/20";
                if (mins > 90) colorClass = "bg-green-500/80 border-green-500";
                else if (mins > 45) colorClass = "bg-green-500/50 border-green-500/60";
                else if (mins > 0) colorClass = "bg-green-500/20 border-green-500/30";

                return (
                  <div
                    key={idx}
                    className={`aspect-square rounded-sm transition-all duration-300 hover:scale-105 cursor-pointer relative group ${colorClass}`}
                  >
                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-accent text-background text-[8px] font-bold px-1.5 py-0.5 rounded shadow whitespace-nowrap z-50">
                      {mins} mins
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center text-[9px] text-text-muted font-bold uppercase px-1">
              <span>Less</span>
              <div className="flex gap-1 items-center">
                <div className="h-2 w-2 rounded bg-background border border-border-default/20" />
                <div className="h-2 w-2 rounded bg-green-500/20 border border-green-500/30" />
                <div className="h-2 w-2 rounded bg-green-500/50 border border-green-500/60" />
                <div className="h-2 w-2 rounded bg-green-500/80 border border-green-500" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Position Timeline (Line Chart rank progression) */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="h-4.5 w-4.5 text-accent animate-pulse" />
              <span>Rank Position Timeline</span>
            </h3>

            <div className="h-32 w-full bg-background/25 rounded-lg border border-border-default/20 relative flex items-end p-2">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Horizontal reference grid lines */}
                <line x1="0" y1="20" x2="100" y2="20" stroke="var(--border-default)" strokeWidth="0.15" strokeDasharray="3" />
                <line x1="0" y1="50" x2="100" y2="50" stroke="var(--border-default)" strokeWidth="0.15" strokeDasharray="3" />
                <line x1="0" y1="80" x2="100" y2="80" stroke="var(--border-default)" strokeWidth="0.15" strokeDasharray="3" />
                
                {/* Area chart filled path */}
                <path
                  d="M 5,80 L 25,65 L 45,50 L 65,35 L 85,25 L 95,20 L 95,100 L 5,100 Z"
                  fill="rgba(168, 85, 247, 0.1)"
                />
                
                {/* Line path */}
                <path
                  d="M 5,80 L 25,65 L 45,50 L 65,35 L 85,25 L 95,20"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  className="animate-logo-draw"
                />
              </svg>
              <div className="absolute left-2 top-2 text-[8px] text-text-muted">Rank 1</div>
              <div className="absolute left-2 bottom-2 text-[8px] text-text-muted">Rank 20</div>
            </div>
            
            <div className="flex justify-between items-center text-[9px] text-text-muted font-bold uppercase px-2">
              <span>Week 1 (Rank 16)</span>
              <span>Week 3 (Rank 10)</span>
              <span>Week 6 (Rank 5)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
