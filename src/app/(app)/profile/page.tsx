"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/shared/ThemeProvider";
import { 
  User, 
  Settings, 
  Save, 
  Type, 
  Award,
  ChevronRight
} from "lucide-react";

export default function ProfilePage() {
  const { 
    fontFamily, 
    setFontFamily, 
    fontSize, 
    setFontSize 
  } = useTheme();

  // Form states
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const fontOptions = [
    { id: "inter", name: "Inter", desc: "Default • Modern & clean" },
    { id: "poppins", name: "Poppins", desc: "Friendly • Great for younger learners" },
    { id: "roboto", name: "Roboto", desc: "Professional • Familiar style" },
    { id: "nunito", name: "Nunito", desc: "Rounded • Easy extended reading" },
    { id: "open-sans", name: "Open Sans", desc: "Readable • Academic content" },
    { id: "lato", name: "Lato", desc: "Balanced • Educational materials" },
    { id: "merriweather", name: "Merriweather", desc: "Serif • Long-form reading" },
    { id: "lexend", name: "Lexend", desc: "Accessibility • Reduces reading fatigue" },
  ];

  const fontSizeOptions: { id: "small" | "default" | "large" | "extra-large"; name: string }[] = [
    { id: "small", name: "Small" },
    { id: "default", name: "Default" },
    { id: "large", name: "Large" },
    { id: "extra-large", name: "Extra Large" },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Student Profile
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Manage your personal details, academic goals, and reading preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Form and Level (66%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Level Tracker Card */}
          <div className="rounded-xl border border-border-default bg-surface p-5 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 border border-accent/30 text-accent font-black text-lg">
                1
              </div>
              <div>
                <h3 className="text-sm font-bold text-text-default">Lv.1 Beginner</h3>
                <p className="text-[10px] text-text-muted">0 XP • Novice Scholar</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text-muted bg-background/50 border border-border-default/60 px-2 py-0.5 rounded-full">
                0%
              </span>
            </div>
          </div>

          {/* Profile Form Card */}
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-6">
            <h2 className="flex items-center gap-2 text-base font-bold text-text-default border-b border-border-default/30 pb-2">
              <User className="h-5 w-5 text-accent" />
              <span>Personal Details</span>
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs md:text-sm">
              <div className="space-y-1.5">
                <label className="font-bold text-text-muted uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name..."
                  className="w-full px-3 py-2 rounded-lg border border-border-default/60 bg-background/30 text-text-default focus:border-accent focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-text-muted uppercase tracking-wide">
                    Age
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Your age..."
                    className="w-full px-3 py-2 rounded-lg border border-border-default/60 bg-background/30 text-text-default focus:border-accent focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-text-muted uppercase tracking-wide">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border-default/60 bg-background/30 text-text-default focus:border-accent focus:outline-none cursor-pointer"
                  >
                    <option value="">Select gender...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-text-muted uppercase tracking-wide">
                  Grade / Form
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border-default/60 bg-background/30 text-text-default focus:border-accent focus:outline-none cursor-pointer"
                >
                  <option value="">Select your grade...</option>
                  <option value="Grade 7">Grade 7 (Junior Secondary)</option>
                  <option value="Grade 8">Grade 8 (Junior Secondary)</option>
                  <option value="Grade 9">Grade 9 (Junior Secondary)</option>
                  <option value="Form 3">Form 3 (Senior School)</option>
                  <option value="Form 4">Form 4 (Senior School)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-text-muted uppercase tracking-wide">
                  School Name
                </label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="Your school name..."
                  className="w-full px-3 py-2 rounded-lg border border-border-default/60 bg-background/30 text-text-default focus:border-accent focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/95 text-white py-2.5 font-semibold shadow active-press transition-colors cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>{isSaved ? "Saved Successfully!" : "Save Profile"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column - Font & Reading Settings (33%) */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-text-default border-b border-border-default/30 pb-2">
              <Type className="h-5 w-5 text-accent" />
              <span>Font &amp; Reading Settings</span>
            </h2>

            {/* Font Picker */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                Font Family
              </span>
              <div className="grid grid-cols-1 gap-2">
                {fontOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFontFamily(opt.id)}
                    className={`flex flex-col items-start px-3 py-2.5 rounded-lg border text-left active-press transition-all cursor-pointer ${
                      fontFamily === opt.id
                        ? "border-accent bg-accent/15 text-accent shadow-sm"
                        : "border-border-default/60 hover:border-text-muted bg-background/25"
                    }`}
                  >
                    <span 
                      className="text-xs font-bold text-text-default"
                      style={{ fontFamily: `var(--font-${opt.id}), sans-serif` }}
                    >
                      {opt.name}
                    </span>
                    <span className="text-[9px] text-text-muted leading-tight mt-0.5">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size Selector */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                Font Size
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {fontSizeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFontSize(opt.id)}
                    className={`py-2 rounded-lg border text-[10px] font-bold text-center active-press transition-colors cursor-pointer ${
                      fontSize === opt.id
                        ? "border-accent bg-accent/20 text-accent"
                        : "border-border-default/60 hover:border-text-muted bg-background/20"
                    }`}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Typography Previewer */}
            <div className="space-y-2 pt-2 border-t border-border-default/20">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
                Live Preview
              </span>
              <div 
                className="rounded-lg p-3 bg-background/60 border border-border-default/40 min-h-[50px] flex items-center"
              >
                <p 
                  className="leading-snug text-text-default font-medium transition-all"
                  style={{ 
                    fontFamily: `var(--font-${fontFamily}), sans-serif`,
                    fontSize: fontSize === "small" ? "12px" : fontSize === "large" ? "16px" : fontSize === "extra-large" ? "18px" : "14px"
                  }}
                >
                  The quick brown fox jumps over the lazy dog.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
