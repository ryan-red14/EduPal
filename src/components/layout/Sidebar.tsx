"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme, Theme } from "@/components/shared/ThemeProvider";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  NotebookPen,
  Layers,
  CalendarDays,
  Users,
  Library,
  Briefcase,
  Wrench,
  Trophy,
  FolderGit2,
  BarChart3,
  CircleUserRound,
  GraduationCap,
  Palette,
  ChevronUp,
} from "lucide-react";

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, route: "/dashboard" },
    { label: "Curriculum Library", icon: BookOpen, route: "/library" },
    { label: "Orbis AI", icon: Sparkles, route: "/orbis" },
    { label: "Notebook", icon: NotebookPen, route: "/notebook" },
    { label: "Flashcards", icon: Layers, route: "/flashcards" },
    { label: "Study Calendar", icon: CalendarDays, route: "/calendar" },
    { label: "Group Projects", icon: Users, route: "/projects" },
    { label: "Digital Library", icon: Library, route: "/digital-library" },
    { label: "Career Tracking", icon: Briefcase, route: "/careers" },
    { label: "Tools", icon: Wrench, route: "/tools" },
    { label: "Leaderboard", icon: Trophy, route: "/leaderboard" },
    { label: "Portfolio", icon: FolderGit2, route: "/portfolio" },
    { label: "Analytics", icon: BarChart3, route: "/analytics" },
    { label: "Profile", icon: CircleUserRound, route: "/profile" },
  ];

  const themes: { id: Theme; name: string; color: string; label: string }[] = [
    { id: "scholar", name: "Scholar", color: "bg-[#D4AF37]", label: "Default Dark" },
    { id: "midnight", name: "Midnight Library", color: "bg-[#10B981]", label: "Calm Emerald" },
    { id: "heritage", name: "Heritage", color: "bg-[#7F1D1D]", label: "Burgundy" },
    { id: "horizon", name: "Horizon", color: "bg-[#C4B5FD]", label: "Lavender" },
    { id: "forest", name: "Forest Scholar", color: "bg-[#B68D57]", label: "Grounded Green" },
    { id: "classic-light", name: "Classic Light", color: "bg-[#1E3A8A]", label: "Clean Light" },
    { id: "tech", name: "Tech (NEW)", color: "bg-[#14B8A6]", label: "Teal Steel" },
  ];

  const handleThemeChange = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setShowThemeMenu(false);
  };

  return (
    <div className="flex h-full w-[240px] flex-col border-r border-border-default bg-surface text-text-default">
      {/* Top Logo Section */}
      <div className="flex h-16 items-center px-6 border-b border-border-default gap-3">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-primary-gradient bg-gradient-to-tr from-wisdom to-trust text-white shadow-md shadow-wisdom/10">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight">
            Edu<span className="bg-gradient-to-r from-[#FF6B9D] via-[#A855F7] to-[#3B82F6] bg-clip-text text-transparent">Pal</span>
          </span>
          <span className="text-[10px] text-text-muted font-medium uppercase tracking-wider -mt-1">
            powered by Orbis AI
          </span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.route;
          const Icon = item.icon;

          return (
            <Link
              key={item.route}
              href={item.route}
              onClick={onCloseMobile}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium relative transition-all duration-150 active-press ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-text-muted hover:text-text-default hover:bg-primary/10"
              }`}
            >
              {/* Left Accent Bar for Active Link */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-3/5 bg-accent rounded-r-md" />
              )}
              
              <Icon className={`h-4.5 w-4.5 transition-transform duration-150 ${
                isActive ? "text-accent" : "text-text-muted group-hover:text-text-default"
              }`} />
              
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-border-default bg-surface relative space-y-4">
        {/* Dynamic Theme Selector Menu */}
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="flex w-full items-center justify-between px-3 py-2 rounded-lg border border-border-default hover:border-text-muted bg-background/50 hover:bg-background/80 transition-all text-xs font-medium text-text-default active-press"
          >
            <span className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-accent" />
              <span>Theme: {themes.find((t) => t.id === theme)?.name}</span>
            </span>
            <ChevronUp className={`h-4.5 w-4.5 text-text-muted transition-transform ${showThemeMenu ? "rotate-180" : ""}`} />
          </button>

          {showThemeMenu && (
            <div className="absolute bottom-full left-0 right-0 mb-2 z-50 p-2 rounded-lg border border-border-default bg-surface shadow-xl space-y-1 animate-fade-in">
              <div className="px-2 py-1 text-[10px] text-text-muted font-bold uppercase tracking-wider">
                Select Workspace Theme
              </div>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  className={`flex w-full items-center gap-3 px-2 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    theme === t.id
                      ? "bg-accent/15 text-accent"
                      : "hover:bg-background text-text-default"
                  }`}
                >
                  <span className={`h-3 w-3 rounded-full ${t.color} border border-border-default`} />
                  <div className="flex flex-col items-start">
                    <span>{t.name}</span>
                    <span className="text-[9px] text-text-muted">{t.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Pulsing Status Block */}
        <div className="flex items-center gap-3 rounded-lg border border-border-default/40 p-2.5 bg-background/30">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-growth opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-growth"></span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-accent" />
              <span className="text-xs font-semibold text-text-default truncate">Orbis AI Online</span>
            </div>
            <p className="text-[10px] text-text-muted truncate">
              CBC curriculum-focused learning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
