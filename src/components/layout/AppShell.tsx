"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, X, Sparkles } from "lucide-react";

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-text-default font-inter">
      {/* Sidebar - Desktop (lg breakpoint / >= 1024px) */}
      <div className="hidden lg:block h-full shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Navigation (overlay for mobile) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer content panel */}
          <div className="relative flex flex-col h-full w-[240px] animate-slide-right shadow-2xl bg-surface z-50">
            {/* Close button inside drawer */}
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
        {/* Mobile Header Bar (Only visible < 1024px) */}
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
