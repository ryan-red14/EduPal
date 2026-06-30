"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calculator as CalcIcon,
  ArrowLeftRight,
  Atom as AtomIcon,
  BookOpen,
  Search,
  Check,
  Sparkles,
} from "lucide-react";

interface Element {
  num: number;
  symbol: string;
  name: string;
  weight: number;
  category: "alkali" | "alkaline" | "transition" | "post-transition" | "nonmetal" | "halogen" | "noble";
  groupClass: string;
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<"periodic" | "calc" | "converter">("periodic");
  
  // 1. PERIODIC TABLE STATE & DATA
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const elements: Element[] = [
    { num: 1, symbol: "H", name: "Hydrogen", weight: 1.008, category: "nonmetal", groupClass: "bg-blue-500/15 border-blue-500/50 text-blue-300 hover:bg-blue-500/30" },
    { num: 2, symbol: "He", name: "Helium", weight: 4.0026, category: "noble", groupClass: "bg-purple-500/15 border-purple-500/50 text-purple-300 hover:bg-purple-500/30" },
    { num: 3, symbol: "Li", name: "Lithium", weight: 6.94, category: "alkali", groupClass: "bg-red-500/15 border-red-500/50 text-red-300 hover:bg-red-500/30" },
    { num: 4, symbol: "Be", name: "Beryllium", weight: 9.0122, category: "alkaline", groupClass: "bg-orange-500/15 border-orange-500/50 text-orange-300 hover:bg-orange-500/30" },
    { num: 5, symbol: "B", name: "Boron", weight: 10.81, category: "nonmetal", groupClass: "bg-blue-500/15 border-blue-500/50 text-blue-300 hover:bg-blue-500/30" },
    { num: 6, symbol: "C", name: "Carbon", weight: 12.011, category: "nonmetal", groupClass: "bg-blue-500/15 border-blue-500/50 text-blue-300 hover:bg-blue-500/30" },
    { num: 7, symbol: "N", name: "Nitrogen", weight: 14.007, category: "nonmetal", groupClass: "bg-blue-500/15 border-blue-500/50 text-blue-300 hover:bg-blue-500/30" },
    { num: 8, symbol: "O", name: "Oxygen", weight: 15.999, category: "nonmetal", groupClass: "bg-blue-500/15 border-blue-500/50 text-blue-300 hover:bg-blue-500/30" },
    { num: 9, symbol: "F", name: "Fluorine", weight: 18.998, category: "halogen", groupClass: "bg-green-500/15 border-green-500/50 text-green-300 hover:bg-green-500/30" },
    { num: 10, symbol: "Ne", name: "Neon", weight: 20.180, category: "noble", groupClass: "bg-purple-500/15 border-purple-500/50 text-purple-300 hover:bg-purple-500/30" },
    { num: 11, symbol: "Na", name: "Sodium", weight: 22.990, category: "alkali", groupClass: "bg-red-500/15 border-red-500/50 text-red-300 hover:bg-red-500/30" },
    { num: 12, symbol: "Mg", name: "Magnesium", weight: 24.305, category: "alkaline", groupClass: "bg-orange-500/15 border-orange-500/50 text-orange-300 hover:bg-orange-500/30" },
    { num: 13, symbol: "Al", name: "Aluminum", weight: 26.982, category: "post-transition", groupClass: "bg-teal-500/15 border-teal-500/50 text-teal-300 hover:bg-teal-500/30" },
    { num: 14, symbol: "Si", name: "Silicon", weight: 28.085, category: "nonmetal", groupClass: "bg-blue-500/15 border-blue-500/50 text-blue-300 hover:bg-blue-500/30" },
    { num: 15, symbol: "P", name: "Phosphorus", weight: 30.974, category: "nonmetal", groupClass: "bg-blue-500/15 border-blue-500/50 text-blue-300 hover:bg-blue-500/30" },
    { num: 16, symbol: "S", name: "Sulfur", weight: 32.06, category: "nonmetal", groupClass: "bg-blue-500/15 border-blue-500/50 text-blue-300 hover:bg-blue-500/30" },
    { num: 17, symbol: "Cl", name: "Chlorine", weight: 35.45, category: "halogen", groupClass: "bg-green-500/15 border-green-500/50 text-green-300 hover:bg-green-500/30" },
    { num: 18, symbol: "Ar", name: "Argon", weight: 39.948, category: "noble", groupClass: "bg-purple-500/15 border-purple-500/50 text-purple-300 hover:bg-purple-500/30" },
    { num: 19, symbol: "K", name: "Potassium", weight: 39.098, category: "alkali", groupClass: "bg-red-500/15 border-red-500/50 text-red-300 hover:bg-red-500/30" },
    { num: 20, symbol: "Ca", name: "Calcium", weight: 40.078, category: "alkaline", groupClass: "bg-orange-500/15 border-orange-500/50 text-orange-300 hover:bg-orange-500/30" },
    { num: 26, symbol: "Fe", name: "Iron", weight: 55.845, category: "transition", groupClass: "bg-yellow-600/15 border-yellow-600/50 text-yellow-300 hover:bg-yellow-600/30" },
    { num: 29, symbol: "Cu", name: "Copper", weight: 63.546, category: "transition", groupClass: "bg-yellow-600/15 border-yellow-600/50 text-yellow-300 hover:bg-yellow-600/30" },
    { num: 30, symbol: "Zn", name: "Zinc", weight: 65.38, category: "transition", groupClass: "bg-yellow-600/15 border-yellow-600/50 text-yellow-300 hover:bg-yellow-600/30" },
    { num: 79, symbol: "Au", name: "Gold", weight: 196.97, category: "transition", groupClass: "bg-yellow-600/15 border-yellow-600/50 text-yellow-300 hover:bg-yellow-600/30" },
    { num: 82, symbol: "Pb", name: "Lead", weight: 207.2, category: "post-transition", groupClass: "bg-teal-500/15 border-teal-500/50 text-teal-300 hover:bg-teal-500/30" },
  ];

  const filteredElements = elements.filter(
    (el) =>
      el.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      el.num.toString().includes(searchQuery)
  );

  // 2. CALCULATOR STATE & LOGIC
  const [calcInput, setCalcInput] = useState("");
  const [calcResult, setCalcResult] = useState("");

  const handleCalcClick = (val: string) => {
    if (val === "=") {
      try {
        // Safe math evaluation for simple strings
        const cleaned = calcInput.replace(/[^0-9+\-*/.]/g, "");
        const res = new Function(`return ${cleaned}`)();
        setCalcResult(res.toString());
      } catch (err) {
        setCalcResult("Error");
      }
    } else if (val === "C") {
      setCalcInput("");
      setCalcResult("");
    } else {
      setCalcInput((prev) => prev + val);
    }
  };

  // 3. UNIT CONVERTER STATE & LOGIC
  const [convertType, setConvertType] = useState<"length" | "temp">("length");
  const [convertValue, setConvertValue] = useState("");
  const [convertedResult, setConvertedResult] = useState("");

  const handleConvert = (val: string) => {
    setConvertValue(val);
    const num = parseFloat(val);
    if (isNaN(num)) {
      setConvertedResult("");
      return;
    }
    
    if (convertType === "length") {
      // Meters to Feet
      setConvertedResult(`${(num * 3.28084).toFixed(3)} ft`);
    } else {
      // Celsius to Fahrenheit
      setConvertedResult(`${((num * 9) / 5 + 32).toFixed(1)} °F`);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
            Tools &amp; References
          </h1>
          <p className="text-xs md:text-sm text-text-muted">
            Academic utilities to support your secondary school science and math calculations.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-background/50 border border-border-default rounded-xl p-1 shrink-0 self-start md:self-auto gap-0.5">
          <button
            onClick={() => setActiveTab("periodic")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold active-press transition-colors ${
              activeTab === "periodic"
                ? "bg-accent/15 text-accent border border-accent/20"
                : "text-text-muted hover:text-text-default"
            }`}
          >
            <AtomIcon className="h-4 w-4" />
            <span>Periodic Table</span>
          </button>
          
          <button
            onClick={() => setActiveTab("calc")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold active-press transition-colors ${
              activeTab === "calc"
                ? "bg-accent/15 text-accent border border-accent/20"
                : "text-text-muted hover:text-text-default"
            }`}
          >
            <CalcIcon className="h-4 w-4" />
            <span>Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab("converter")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold active-press transition-colors ${
              activeTab === "converter"
                ? "bg-accent/15 text-accent border border-accent/20"
                : "text-text-muted hover:text-text-default"
            }`}
          >
            <ArrowLeftRight className="h-4 w-4" />
            <span>Unit Converter</span>
          </button>
        </div>
      </div>

      {/* RENDER VIEWS */}

      {activeTab === "periodic" && (
        /* Periodic Table Strands */
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-border-default bg-surface p-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search element by name, symbol, or atomic number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border-default/60 bg-background/30 text-text-default focus:border-accent focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold text-text-muted">
              <span className="flex items-center gap-1.5 bg-red-500/10 text-red-300 border border-red-500/20 px-2 py-1 rounded">Alkali Metals</span>
              <span className="flex items-center gap-1.5 bg-orange-500/10 text-orange-300 border border-orange-500/20 px-2 py-1 rounded">Alkaline Earths</span>
              <span className="flex items-center gap-1.5 bg-yellow-600/10 text-yellow-300 border border-yellow-600/20 px-2 py-1 rounded">Transition</span>
              <span className="flex items-center gap-1.5 bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-1 rounded">Nonmetals</span>
              <span className="flex items-center gap-1.5 bg-purple-500/10 text-purple-300 border border-purple-500/20 px-2 py-1 rounded">Noble Gases</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Elements Grid (75%) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {filteredElements.map((el) => (
                  <button
                    key={el.num}
                    onClick={() => setSelectedElement(el)}
                    className={`hover-bloom border rounded-xl p-3 flex flex-col items-start gap-1 justify-between transition-all duration-150 active-press cursor-pointer hover:shadow-md ${el.groupClass} ${
                      selectedElement?.num === el.num ? "ring-2 ring-accent border-accent bg-background/50 shadow-lg" : ""
                    }`}
                  >
                    <span className="text-[10px] font-extrabold opacity-65">{el.num}</span>
                    <span className="text-xl font-black tracking-wide leading-none">{el.symbol}</span>
                    <div className="w-full text-left truncate">
                      <p className="text-[10px] font-bold truncate leading-tight">{el.name}</p>
                      <p className="text-[9px] opacity-75 truncate">{el.weight}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Element Detail Drawer (25%) */}
            <div className="rounded-xl border border-border-default bg-surface p-5 space-y-4 h-fit">
              {selectedElement ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-center pb-3 border-b border-border-default/30 space-y-2">
                    <span className="text-xs font-bold text-text-muted bg-background border border-border-default/50 px-2 py-0.5 rounded">
                      Atomic No. {selectedElement.num}
                    </span>
                    <h2 className="text-5xl font-black tracking-wider text-text-default">
                      {selectedElement.symbol}
                    </h2>
                    <p className="text-base font-extrabold text-text-default">{selectedElement.name}</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-border-default/10">
                      <span className="text-text-muted">Atomic Weight</span>
                      <span className="font-semibold">{selectedElement.weight} u</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-border-default/10">
                      <span className="text-text-muted">Category</span>
                      <span className="font-semibold capitalize text-accent">{selectedElement.category}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-text-muted">Phase</span>
                      <span className="font-semibold">Solid (20°C)</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/orbis?context=${encodeURIComponent(`Science -> Periodic Table element -> ${selectedElement.name}`)}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white py-2 text-xs font-semibold active-press transition-colors shadow"
                  >
                    <Sparkles className="h-4 w-4 text-accent" />
                    <span>Explain Element</span>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-10 space-y-3 text-text-muted">
                  <AtomIcon className="h-10 w-10 mx-auto text-text-muted opacity-40 animate-spin" style={{ animationDuration: "12s" }} />
                  <p className="text-xs font-semibold">Select an element from the grid to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "calc" && (
        /* Math Calculator Mockup */
        <div className="max-w-md mx-auto rounded-2xl border border-border-default bg-surface p-5 space-y-4">
          {/* Display Output Screen */}
          <div className="rounded-xl border border-border-default/60 bg-background/50 p-4 text-right space-y-1">
            <div className="text-xs text-text-muted min-h-[16px] truncate font-mono">{calcInput || "0"}</div>
            <div className="text-2xl font-bold text-text-default min-h-[32px] font-mono">{calcResult || "0"}</div>
          </div>

          {/* Calculator Pad Grid */}
          <div className="grid grid-cols-4 gap-2">
            {["C", "(", ")", "/", "7", "8", "9", "*", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="].map((val) => {
              const isOperator = ["/", "*", "-", "+", "="].includes(val);
              const isClear = val === "C";

              let btnClass = "bg-background/40 hover:bg-background/80 text-text-default border-border-default/50";
              if (isOperator) btnClass = "bg-primary text-white border-primary hover:bg-primary/90";
              if (isClear) btnClass = "bg-passion/25 border-passion/40 text-passion hover:bg-passion/40";

              return (
                <button
                  key={val}
                  onClick={() => handleCalcClick(val)}
                  className={`border py-3 rounded-lg text-sm font-semibold active-press transition-all cursor-pointer ${btnClass} ${
                    val === "0" ? "col-span-2" : ""
                  }`}
                >
                  {val}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "converter" && (
        /* Interactive Unit Converter Forms */
        <div className="max-w-md mx-auto rounded-2xl border border-border-default bg-surface p-5 space-y-6">
          <div className="flex rounded-lg bg-background p-1 border border-border-default/50">
            <button
              onClick={() => {
                setConvertType("length");
                setConvertValue("");
                setConvertedResult("");
              }}
              className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-md transition-colors active-press ${
                convertType === "length" ? "bg-accent/20 text-accent" : "text-text-muted hover:text-text-default"
              }`}
            >
              Meters to Feet
            </button>
            <button
              onClick={() => {
                setConvertType("temp");
                setConvertValue("");
                setConvertedResult("");
              }}
              className={`flex-1 py-1.5 text-center text-xs font-semibold rounded-md transition-colors active-press ${
                convertType === "temp" ? "bg-accent/20 text-accent" : "text-text-muted hover:text-text-default"
              }`}
            >
              Celsius to Fahrenheit
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wide">
                Input Value ({convertType === "length" ? "Meters" : "°Celsius"})
              </label>
              <input
                type="number"
                value={convertValue}
                onChange={(e) => handleConvert(e.target.value)}
                placeholder="Enter numerical value..."
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-border-default/60 bg-background/30 text-text-default focus:border-accent focus:outline-none"
              />
            </div>

            <div className="flex h-12 items-center justify-between px-4 rounded-lg bg-background/50 border border-border-default/40">
              <span className="text-xs text-text-muted font-bold uppercase tracking-wide">
                Result ({convertType === "length" ? "Feet" : "°Fahrenheit"})
              </span>
              <span className="text-sm font-extrabold text-accent">{convertedResult || "—"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
