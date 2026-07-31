"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronRight, HelpCircle } from "lucide-react";

interface Step {
  targetId: string;
  title: string;
  content: string;
  placement: "bottom" | "top" | "left" | "right";
}

export const WalkthroughSpotlight: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});

  const steps: Step[] = [
    {
      targetId: "nav-dashboard",
      title: "Dashboard Home",
      content: "This is your learning dashboard. Here you can track your study streak, XP totals, and complete your Daily Challenge.",
      placement: "right"
    },
    {
      targetId: "nav-library",
      title: "Curriculum Learning Hub",
      content: "Access grade-specific CBC strands, read summary notes, review definitions, watch video guides, and complete sub-strand quizzes.",
      placement: "right"
    },
    {
      targetId: "nav-orbis",
      title: "Orbis AI Coach",
      content: "Interact with your context-aware academic assistant. Orbis answers study questions, helps with coding, and gives pathway advice.",
      placement: "right"
    },
    {
      targetId: "nav-calendar",
      title: "Study Planner",
      content: "Plan your learning timeline, schedule revision slots, configure Pomodoro timers, and run targets in the position simulator.",
      placement: "right"
    },
    {
      targetId: "nav-analytics",
      title: "Performance Analytics",
      content: "Inspect your official KNEC results slip, toggle between grading rubrics, and view radar performance charts.",
      placement: "left"
    }
  ];

  useEffect(() => {
    const updateHighlight = () => {
      const step = steps[currentStep];
      const element = document.getElementById(step.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightStyle({
          position: "fixed",
          top: `${rect.top - 4}px`,
          left: `${rect.left - 4}px`,
          width: `${rect.width + 8}px`,
          height: `${rect.height + 8}px`,
          borderRadius: "8px",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
          zIndex: 140,
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        });
      } else {
        // Fallback to center if element not found
        setHighlightStyle({
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "150px",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
          borderRadius: "12px",
          zIndex: 140
        });
      }
    };

    updateHighlight();
    window.addEventListener("resize", updateHighlight);
    return () => window.removeEventListener("resize", updateHighlight);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[130] pointer-events-none">
      {/* Target Highlight box */}
      <div style={highlightStyle} className="border border-accent pointer-events-auto transition-all duration-300" />

      {/* Info Card Popover */}
      <div 
        className="fixed z-[150] pointer-events-auto flex flex-col justify-between w-[280px] bg-surface border border-border-default rounded-xl shadow-2xl p-4 space-y-3 transition-all duration-300"
        style={{
          top: "40%",
          left: "calc(50% - 140px)",
          transform: "translateY(-50%)"
        }}
      >
        <div className="flex justify-between items-start gap-2 border-b border-border-default/20 pb-2">
          <h4 className="text-xs font-bold text-text-default flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4 text-accent" />
            <span>{currentStepData.title}</span>
          </h4>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text-default active-press p-0.5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-[11px] text-text-muted leading-relaxed">
          {currentStepData.content}
        </p>

        <div className="flex justify-between items-center pt-2">
          <span className="text-[9px] font-bold text-text-muted">
            Step {currentStep + 1} of {steps.length}
          </span>
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1 rounded-lg bg-primary hover:bg-primary/95 text-white px-2.5 py-1 text-[10px] font-bold active-press transition-colors shadow-sm"
          >
            <span>{currentStep === steps.length - 1 ? "Finish" : "Next"}</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
