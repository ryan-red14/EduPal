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
  BookMarked,
  Volume2,
  AlertCircle,
  BookText,
  Bookmark,
  Terminal,
  Grid,
  Lightbulb
} from "lucide-react";
import { CodingStudio } from "@/components/shared/CodingStudio";

interface Element {
  num: number;
  symbol: string;
  name: string;
  weight: number;
  category: "alkali" | "alkaline" | "transition" | "post-transition" | "nonmetal" | "halogen" | "noble";
  groupClass: string;
  bohrConfig: string;
  valency: number;
  meltPoint: string;
  boilPoint: string;
}

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<"periodic" | "calc" | "converter" | "dictionary" | "religion" | "coding">("periodic");
  
  // 1. PERIODIC TABLE STATE & DATA
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  
  const elements: Element[] = [
    { num: 1, symbol: "H", name: "Hydrogen", weight: 1.008, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30", bohrConfig: "1", valency: 1, meltPoint: "-259.1 °C", boilPoint: "-252.9 °C" },
    { num: 2, symbol: "He", name: "Helium", weight: 4.0026, category: "noble", groupClass: "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30", bohrConfig: "2", valency: 0, meltPoint: "-272.2 °C", boilPoint: "-268.9 °C" },
    { num: 3, symbol: "Li", name: "Lithium", weight: 6.94, category: "alkali", groupClass: "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30", bohrConfig: "2, 1", valency: 1, meltPoint: "180.5 °C", boilPoint: "1342 °C" },
    { num: 4, symbol: "Be", name: "Beryllium", weight: 9.0122, category: "alkaline", groupClass: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30", bohrConfig: "2, 2", valency: 2, meltPoint: "1287 °C", boilPoint: "2469 °C" },
    { num: 5, symbol: "B", name: "Boron", weight: 10.81, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30", bohrConfig: "2, 3", valency: 3, meltPoint: "2076 °C", boilPoint: "3927 °C" },
    { num: 6, symbol: "C", name: "Carbon", weight: 12.011, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30", bohrConfig: "2, 4", valency: 4, meltPoint: "3550 °C", boilPoint: "4827 °C" },
    { num: 7, symbol: "N", name: "Nitrogen", weight: 14.007, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30", bohrConfig: "2, 5", valency: 3, meltPoint: "-210.0 °C", boilPoint: "-195.8 °C" },
    { num: 8, symbol: "O", name: "Oxygen", weight: 15.999, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30", bohrConfig: "2, 6", valency: 2, meltPoint: "-218.8 °C", boilPoint: "-183.0 °C" },
    { num: 9, symbol: "F", name: "Fluorine", weight: 18.998, category: "halogen", groupClass: "bg-[#EC4899]/15 text-[#EC4899] border-[#EC4899]/30", bohrConfig: "2, 7", valency: 1, meltPoint: "-219.6 °C", boilPoint: "-188.1 °C" },
    { num: 10, symbol: "Ne", name: "Neon", weight: 20.18, category: "noble", groupClass: "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30", bohrConfig: "2, 8", valency: 0, meltPoint: "-248.6 °C", boilPoint: "-246.1 °C" },
    { num: 11, symbol: "Na", name: "Sodium", weight: 22.99, category: "alkali", groupClass: "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30", bohrConfig: "2, 8, 1", valency: 1, meltPoint: "97.8 °C", boilPoint: "883 °C" },
    { num: 12, symbol: "Mg", name: "Magnesium", weight: 24.305, category: "alkaline", groupClass: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30", bohrConfig: "2, 8, 2", valency: 2, meltPoint: "650 °C", boilPoint: "1090 °C" },
  ];

  // 2. WORKING SCIENTIFIC CALCULATOR STATE
  const [calcInput, setCalcInput] = useState("");
  const [calcResult, setCalcResult] = useState("");

  const handleCalcClick = (val: string) => {
    if (val === "C") {
      setCalcInput("");
      setCalcResult("");
    } else if (val === "DEL") {
      setCalcInput(calcInput.slice(0, -1));
    } else if (val === "=") {
      try {
        let expr = calcInput
          .replace(/sin\(/g, "Math.sin(")
          .replace(/cos\(/g, "Math.cos(")
          .replace(/tan\(/g, "Math.tan(")
          .replace(/log\(/g, "Math.log10(")
          .replace(/ln\(/g, "Math.log(")
          .replace(/√\(/g, "Math.sqrt(")
          .replace(/π/g, "Math.PI")
          .replace(/e/g, "Math.E")
          .replace(/\^/g, "**");
        
        const res = new Function(`return ${expr}`)();
        setCalcResult(res.toString());
      } catch (err) {
        setCalcResult("Syntax Error");
      }
    } else {
      setCalcInput(calcInput + val);
    }
  };

  // 3. UNIT CONVERTER STATE
  const [convType, setConvType] = useState<"length" | "temp" | "mass">("length");
  const [convVal, setConvVal] = useState("1");
  const [convFrom, setConvFrom] = useState("m");
  const [convTo, setConvTo] = useState("km");
  const [convResult, setConvResult] = useState("0.001");

  const handleConvert = (val: string, from: string, to: string, type: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      setConvResult("");
      return;
    }

    let result = 0;
    if (type === "length") {
      let meters = num;
      if (from === "km") meters = num * 1000;
      else if (from === "cm") meters = num / 100;
      else if (from === "mm") meters = num / 1000;

      if (to === "m") result = meters;
      else if (to === "km") result = meters / 1000;
      else if (to === "cm") result = meters * 100;
      else if (to === "mm") result = meters * 1000;
    } else if (type === "temp") {
      let celsius = num;
      if (from === "f") celsius = ((num - 32) * 5) / 9;
      else if (from === "k") celsius = num - 273.15;

      if (to === "c") result = celsius;
      else if (to === "f") result = (celsius * 9) / 5 + 32;
      else if (to === "k") result = celsius + 273.15;
    } else {
      let grams = num;
      if (from === "kg") grams = num * 1000;
      else if (from === "mg") grams = num / 1000;

      if (to === "g") result = grams;
      else if (to === "kg") result = grams / 1000;
      else if (to === "mg") result = grams * 1000;
    }

    setConvResult(result.toString());
  };

  // 4. DICTIONARY STATE & MOCK SWAHILI KAMUSI
  const [dictQuery, setDictQuery] = useState("");
  const [dictType, setDictType] = useState<"english" | "kamusi">("english");
  const [dictData, setDictData] = useState<any>(null);
  const [dictError, setDictError] = useState("");

  const mockKamusi: Record<string, string> = {
    mawimbi: "Mbenuko na mbonyeo wa nishati inayosafiri katika hewa au maji (Waves).",
    mchanganyiko: "Mkusanyiko wa vitu viwili au zaidi visivyoungana kikemia (Mixtures).",
    nishati: "Uwezo wa kufanya kazi (Energy)."
  };

  const handleDictSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dictQuery.trim()) return;

    if (dictType === "kamusi") {
      const match = mockKamusi[dictQuery.toLowerCase()];
      if (match) {
        setDictData({ title: dictQuery, definition: match });
        setDictError("");
      } else {
        setDictError("Haikupatikana kwenye Kamusi.");
        setDictData(null);
      }
      return;
    }

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${dictQuery}`);
      if (!res.ok) throw new Error("Word not found.");
      const data = await res.json();
      setDictData(data[0]);
      setDictError("");
    } catch {
      setDictError("Word not found in English Dictionary.");
      setDictData(null);
    }
  };

  // 5. RELIGIOUS STUDIES SEARCHER
  const [relQuery, setRelQuery] = useState("");
  const [relData, setRelData] = useState<any>(null);

  const bibleVerses = [
    { ref: "Mark 4:39", text: "He got up, rebuked the wind and said to the waves, 'Quiet! Be still!'" },
    { ref: "Genesis 1:1", text: "In the beginning God created the heavens and the earth." }
  ];

  const quranVerses = [
    { ref: "Al-Anbya 21:30", text: "We made from water every living thing. Will they not then believe?" }
  ];

  const handleRelSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = relQuery.toLowerCase();
    
    const bibleMatches = bibleVerses.filter(v => v.text.toLowerCase().includes(q) || v.ref.toLowerCase().includes(q));
    const quranMatches = quranVerses.filter(v => v.text.toLowerCase().includes(q) || v.ref.toLowerCase().includes(q));
    
    setRelData({ bible: bibleMatches, quran: quranMatches });
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border-default/45 pb-4 flex justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
            Scientific & Languages Tools
          </h1>
          <p className="text-xs md:text-sm text-text-muted">
            Access interactive tables, calculations, unit conversions, and language lookups.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex border border-border-default p-1 rounded-lg bg-surface font-bold text-xs gap-1 overflow-x-auto select-none max-w-md">
          {[
            { id: "periodic", label: "Periodic Table" },
            { id: "calc", label: "Calculator" },
            { id: "converter", label: "Converter" },
            { id: "dictionary", label: "Languages" },
            { id: "religion", label: "Scripture" },
            { id: "coding", label: "Code Studio" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-md transition-all shrink-0 active-press ${
                activeTab === tab.id ? "bg-accent text-white" : "text-text-muted hover:text-text-default"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Viewport */}
      <div className="space-y-6">
        
        {/* 1. Periodic Table */}
        {activeTab === "periodic" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-in">
            {/* Table Grid (60%) */}
            <div className="lg:col-span-3 rounded-xl border border-border-default bg-surface p-5 space-y-4 hover-bloom shadow-md">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <AtomIcon className="h-4.5 w-4.5 text-accent animate-pulse" />
                <span>Chemistry Periodic Table</span>
              </h3>
              
              <div className="grid grid-cols-4 gap-2">
                {elements.map((el) => (
                  <button
                    key={el.num}
                    onClick={() => setSelectedElement(el)}
                    className={`p-3 rounded-lg border text-center transition-all duration-150 active-press ${el.groupClass} ${
                      selectedElement?.num === el.num ? "ring-2 ring-accent border-transparent scale-[1.03]" : ""
                    }`}
                  >
                    <span className="block text-[10px] font-bold text-text-muted">{el.num}</span>
                    <span className="block text-lg font-black">{el.symbol}</span>
                    <span className="block text-[8px] font-bold truncate">{el.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Element Detail Panel (40%) */}
            <div className="lg:col-span-2 rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md min-h-[300px]">
              {selectedElement ? (
                <div className="space-y-4 animate-fade-in text-xs font-semibold text-text-default">
                  <div className="flex justify-between items-center border-b border-border-default/20 pb-3">
                    <div>
                      <h4 className="text-base font-black text-text-default">{selectedElement.name} ({selectedElement.symbol})</h4>
                      <p className="text-[10px] text-text-muted uppercase font-bold">{selectedElement.category} element</p>
                    </div>
                    <span className="text-2xl font-black text-accent">{selectedElement.num}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-background/25 rounded border border-border-default/45">
                      <p className="text-[9px] text-text-muted font-bold uppercase">Atomic Mass</p>
                      <p className="font-bold text-sm mt-0.5">{selectedElement.weight}</p>
                    </div>
                    <div className="p-3 bg-background/25 rounded border border-border-default/45">
                      <p className="text-[9px] text-text-muted font-bold uppercase">Valency</p>
                      <p className="font-bold text-sm mt-0.5">{selectedElement.valency}</p>
                    </div>
                    <div className="p-3 bg-background/25 rounded border border-border-default/45">
                      <p className="text-[9px] text-text-muted font-bold uppercase">Bohr Electron Shells</p>
                      <p className="font-bold text-sm mt-0.5">{selectedElement.bohrConfig}</p>
                    </div>
                    <div className="p-3 bg-background/25 rounded border border-border-default/45">
                      <p className="text-[9px] text-text-muted font-bold uppercase">Boiling Point</p>
                      <p className="font-bold text-sm mt-0.5">{selectedElement.boilPoint}</p>
                    </div>
                  </div>

                  {/* Ask Orbis contextual trigger */}
                  <Link
                    href={`/orbis?context=PeriodicTable&query=Tell me more about ${selectedElement.name}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white py-2 font-bold shadow active-press hover-bloom"
                  >
                    <Sparkles className="h-4 w-4 text-accent fill-accent" />
                    <span>Ask Orbis about {selectedElement.symbol}</span>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                  <AtomIcon className="h-10 w-10 text-text-muted opacity-30 animate-pulse" />
                  <p className="text-xs text-text-muted font-semibold">Select an element on the left to inspect atomic configurations.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. Calculator */}
        {activeTab === "calc" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-in">
            {/* scientific calculations Keypad (3/5) */}
            <div className="lg:col-span-3 rounded-xl border border-border-default bg-surface p-5 space-y-4 hover-bloom shadow-md">
              <div className="bg-background/40 p-4 rounded-xl border border-border-default/60 text-right space-y-1">
                <div className="text-xs text-text-muted min-h-[16px] font-mono">{calcInput || "0"}</div>
                <div className="text-xl font-bold text-text-default min-h-[28px] font-mono">{calcResult || "0"}</div>
              </div>

              {/* Grid buttons */}
              <div className="grid grid-cols-5 gap-1.5 text-xs font-mono font-bold">
                {["sin(", "cos(", "tan(", "log(", "ln(", "π", "e", "^", "√(", "DEL", "C", "(", ")", "/", "*", "7", "8", "9", "-", "+", "4", "5", "6", "1", "2", "3", "0", ".", "="].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleCalcClick(btn)}
                    className={`p-3 rounded-lg border transition-all active-press ${
                      btn === "=" ? "col-span-2 bg-primary text-white border-primary" :
                      btn === "C" || btn === "DEL" ? "bg-passion/10 text-passion border-passion/30" : "bg-background border-border-default hover:bg-background/80"
                    }`}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>

            {/* Reference formula sheet constants (2/5) */}
            <div className="lg:col-span-2 rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <Lightbulb className="h-4.5 w-4.5 text-accent" />
                <span>Reference Constants</span>
              </h3>
              
              <div className="space-y-2 text-xs font-semibold">
                <div className="p-3 bg-background/25 border border-border-default rounded flex justify-between">
                  <span className="text-text-muted">Speed of Light (c)</span>
                  <span className="text-text-default font-mono">3.0 x 10^8 m/s</span>
                </div>
                <div className="p-3 bg-background/25 border border-border-default rounded flex justify-between">
                  <span className="text-text-muted">Acceleration (g)</span>
                  <span className="text-text-default font-mono">9.81 m/s²</span>
                </div>
                <div className="p-3 bg-background/25 border border-border-default rounded flex justify-between">
                  <span className="text-text-muted">Planck Constant (h)</span>
                  <span className="text-text-default font-mono">6.626 x 10^-34 J·s</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Unit Converter */}
        {activeTab === "converter" && (
          <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-6 hover-bloom shadow-md animate-fade-in max-w-xl mx-auto">
            <div className="flex gap-2 p-1 border border-border-default rounded-lg bg-background/40 font-bold text-[10px] uppercase text-center">
              {[
                { id: "length", label: "Length" },
                { id: "temp", label: "Temperature" },
                { id: "mass", label: "Mass" }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setConvType(t.id as any);
                    setConvFrom(t.id === "length" ? "m" : t.id === "temp" ? "c" : "kg");
                    setConvTo(t.id === "length" ? "km" : t.id === "temp" ? "f" : "g");
                    setConvResult("0.001");
                  }}
                  className={`flex-1 py-1 rounded transition-all ${
                    convType === t.id ? "bg-accent text-white" : "text-text-muted hover:text-text-default"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-text-muted uppercase">From Value</label>
                <input
                  type="number"
                  value={convVal}
                  onChange={(e) => {
                    setConvVal(e.target.value);
                    handleConvert(e.target.value, convFrom, convTo, convType);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border-default bg-background/45 text-text-default focus:border-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-text-muted uppercase">From Unit</label>
                <select
                  value={convFrom}
                  onChange={(e) => {
                    setConvFrom(e.target.value);
                    handleConvert(convVal, e.target.value, convTo, convType);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border-default bg-background/45 text-text-default focus:border-accent"
                >
                  {convType === "length" && (
                    <>
                      <option value="m">Meter (m)</option>
                      <option value="km">Kilometer (km)</option>
                      <option value="cm">Centimeter (cm)</option>
                      <option value="mm">Millimeter (mm)</option>
                    </>
                  )}
                  {convType === "temp" && (
                    <>
                      <option value="c">Celsius (°C)</option>
                      <option value="f">Fahrenheit (°F)</option>
                      <option value="k">Kelvin (K)</option>
                    </>
                  )}
                  {convType === "mass" && (
                    <>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="g">Gram (g)</option>
                      <option value="mg">Milligram (mg)</option>
                    </>
                  )}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-bold text-text-muted uppercase">To Unit</label>
                <select
                  value={convTo}
                  onChange={(e) => {
                    setConvTo(e.target.value);
                    handleConvert(convVal, convFrom, e.target.value, convType);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-border-default bg-background/45 text-text-default focus:border-accent"
                >
                  {convType === "length" && (
                    <>
                      <option value="m">Meter (m)</option>
                      <option value="km">Kilometer (km)</option>
                      <option value="cm">Centimeter (cm)</option>
                      <option value="mm">Millimeter (mm)</option>
                    </>
                  )}
                  {convType === "temp" && (
                    <>
                      <option value="c">Celsius (°C)</option>
                      <option value="f">Fahrenheit (°F)</option>
                      <option value="k">Kelvin (K)</option>
                    </>
                  )}
                  {convType === "mass" && (
                    <>
                      <option value="kg">Kilogram (kg)</option>
                      <option value="g">Gram (g)</option>
                      <option value="mg">Milligram (mg)</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 text-center text-xs font-black text-text-default hover-bloom">
              Result: {convResult} {convTo}
            </div>
          </div>
        )}

        {/* 4. Languages (English & Swahili Kamusi) */}
        {activeTab === "dictionary" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-in">
            {/* Search Input (3/5) */}
            <div className="lg:col-span-3 rounded-xl border border-border-default bg-surface p-5 space-y-4 hover-bloom shadow-md">
              <div className="flex gap-2 p-1 border border-border-default rounded-lg bg-background/40 font-bold text-[9px] uppercase text-center w-48 shrink-0">
                <button
                  onClick={() => { setDictType("english"); setDictData(null); }}
                  className={`flex-1 py-1 rounded transition-all ${
                    dictType === "english" ? "bg-accent text-white" : "text-text-muted hover:text-text-default"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => { setDictType("kamusi"); setDictData(null); }}
                  className={`flex-1 py-1 rounded transition-all ${
                    dictType === "kamusi" ? "bg-accent text-white" : "text-text-muted hover:text-text-default"
                  }`}
                >
                  Kamusi
                </button>
              </div>

              <form onSubmit={handleDictSearch} className="flex gap-2">
                <input
                  type="text"
                  value={dictQuery}
                  onChange={(e) => setDictQuery(e.target.value)}
                  placeholder={dictType === "english" ? "Search English word..." : "Tafuta neno la Kamusi..."}
                  className="flex-1 bg-background border border-border-default px-3 py-1.5 rounded-lg text-xs text-text-default focus:border-accent focus:outline-none"
                />
                <button type="submit" className="p-2 rounded-lg bg-primary hover:bg-primary/95 text-white active-press">
                  <Search className="h-4.5 w-4.5" />
                </button>
              </form>

              {dictData ? (
                <div className="p-4 rounded-xl border border-border-default bg-background/30 space-y-3">
                  <h4 className="text-xs font-bold text-accent uppercase tracking-wider">{dictData.word || dictData.title}</h4>
                  <p className="text-xs text-text-default leading-relaxed bg-background/30 p-2.5 rounded border border-border-default/40">
                    {dictData.definition || dictData.meanings?.[0]?.definitions?.[0]?.definition}
                  </p>
                </div>
              ) : dictError ? (
                <p className="text-xs text-passion font-semibold">{dictError}</p>
              ) : (
                <p className="text-xs text-text-muted font-medium italic">Search vocabulary above.</p>
              )}
            </div>

            {/* Language Tips (2/5) */}
            <div className="lg:col-span-2 rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <BookText className="h-4.5 w-4.5 text-accent" />
                <span>Languages Guide</span>
              </h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Try searching Kiswahili vocabulary like **Mawimbi** or **Nishati** inside the Swahili Kamusi mode!
              </p>
            </div>
          </div>
        )}

        {/* 5. Religious Scripture verse searcher */}
        {activeTab === "religion" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-in">
            {/* Search Input (3/5) */}
            <div className="lg:col-span-3 rounded-xl border border-border-default bg-surface p-5 space-y-4 hover-bloom shadow-md">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <BookMarked className="h-4.5 w-4.5 text-accent" />
                <span>Religious Studies Scripture Searcher</span>
              </h3>

              <form onSubmit={handleRelSearch} className="flex gap-2">
                <input
                  type="text"
                  value={relQuery}
                  onChange={(e) => setRelQuery(e.target.value)}
                  placeholder="Search Bible or Qur'an keywords (e.g. wave, creation)..."
                  className="flex-1 bg-background border border-border-default px-3 py-1.5 rounded-lg text-xs text-text-default focus:border-accent focus:outline-none"
                />
                <button type="submit" className="p-2 rounded-lg bg-primary hover:bg-primary/95 text-white active-press">
                  <Search className="h-4.5 w-4.5" />
                </button>
              </form>

              {relData && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-wider mb-2">Bible Matches</h4>
                    {relData.bible.length > 0 ? (
                      relData.bible.map((v: any, idx: number) => (
                        <div key={idx} className="p-3 bg-background/25 rounded border border-border-default text-xs mb-2">
                          <p className="font-bold text-accent">{v.ref}</p>
                          <p className="text-text-default leading-relaxed mt-1">&quot;{v.text}&quot;</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-text-muted italic">No Bible matches found.</p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-wider mb-2">Qur&apos;an Matches</h4>
                    {relData.quran.length > 0 ? (
                      relData.quran.map((v: any, idx: number) => (
                        <div key={idx} className="p-3 bg-background/25 rounded border border-border-default text-xs mb-2">
                          <p className="font-bold text-accent">{v.ref}</p>
                          <p className="text-text-default leading-relaxed mt-1">&quot;{v.text}&quot;</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-[10px] text-text-muted italic">No Qur&apos;an matches found.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Info panel (2/5) */}
            <div className="lg:col-span-2 rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 hover-bloom shadow-md">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">CRE & IRE Concordance</h3>
              <p className="text-[11px] text-text-muted leading-relaxed">
                Scripture matching checks matching keywords across both Christian and Islamic syllabus contexts to aid comparative essay writes.
              </p>
            </div>
          </div>
        )}

        {/* 6. Coding Studio tab */}
        {activeTab === "coding" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex justify-between items-center text-xs font-semibold text-text-muted">
              <span>Execute wave and physics algorithm tests client-side.</span>
              <span className="text-[10px] font-bold text-accent">Active Sandbox Mode</span>
            </div>
            <CodingStudio />
          </div>
        )}

      </div>
    </div>
  );
}
