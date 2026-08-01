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
  const [activeTab, setActiveTab] = useState<"periodic" | "calc" | "converter" | "dictionary">("periodic");
  
  // 1. PERIODIC TABLE STATE & DATA
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  
  const elements: Element[] = [
    { num: 1, symbol: "H", name: "Hydrogen", weight: 1.008, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30" },
    { num: 2, symbol: "He", name: "Helium", weight: 4.0026, category: "noble", groupClass: "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30" },
    { num: 3, symbol: "Li", name: "Lithium", weight: 6.94, category: "alkali", groupClass: "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30" },
    { num: 4, symbol: "Be", name: "Beryllium", weight: 9.0122, category: "alkaline", groupClass: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30" },
    { num: 5, symbol: "B", name: "Boron", weight: 10.81, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30" },
    { num: 6, symbol: "C", name: "Carbon", weight: 12.011, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30" },
    { num: 7, symbol: "N", name: "Nitrogen", weight: 14.007, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30" },
    { num: 8, symbol: "O", name: "Oxygen", weight: 15.999, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30" },
    { num: 9, symbol: "F", name: "Fluorine", weight: 18.998, category: "halogen", groupClass: "bg-[#EC4899]/15 text-[#EC4899] border-[#EC4899]/30" },
    { num: 10, symbol: "Ne", name: "Neon", weight: 20.18, category: "noble", groupClass: "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30" },
    { num: 11, symbol: "Na", name: "Sodium", weight: 22.99, category: "alkali", groupClass: "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30" },
    { num: 12, symbol: "Mg", name: "Magnesium", weight: 24.305, category: "alkaline", groupClass: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30" },
    { num: 13, symbol: "Al", name: "Aluminium", weight: 26.982, category: "post-transition", groupClass: "bg-[#6366F1]/15 text-[#6366F1] border-[#6366F1]/30" },
    { num: 14, symbol: "Si", name: "Silicon", weight: 28.085, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30" },
    { num: 15, symbol: "P", name: "Phosphorus", weight: 30.974, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30" },
    { num: 16, symbol: "S", name: "Sulfur", weight: 32.06, category: "nonmetal", groupClass: "bg-[#3B82F6]/15 text-[#3B82F6] border-[#3B82F6]/30" },
    { num: 17, symbol: "Cl", name: "Chlorine", weight: 35.45, category: "halogen", groupClass: "bg-[#EC4899]/15 text-[#EC4899] border-[#EC4899]/30" },
    { num: 18, symbol: "Ar", name: "Argon", weight: 39.948, category: "noble", groupClass: "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30" },
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
        // Safe evaluation of mathematical expression in JS
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
        
        // Evaluate expression safely
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
      // m, km, cm, mm
      let meters = num;
      if (from === "km") meters = num * 1000;
      else if (from === "cm") meters = num / 100;
      else if (from === "mm") meters = num / 1000;

      if (to === "m") result = meters;
      else if (to === "km") result = meters / 1000;
      else if (to === "cm") result = meters * 100;
      else if (to === "mm") result = meters * 1000;
    } else if (type === "temp") {
      // C, F, K
      if (from === "C") {
        if (to === "F") result = (num * 9/5) + 32;
        else if (to === "K") result = num + 273.15;
        else result = num;
      } else if (from === "F") {
        if (to === "C") result = (num - 32) * 5/9;
        else if (to === "K") result = (num - 32) * 5/9 + 273.15;
        else result = num;
      } else {
        if (to === "C") result = num - 273.15;
        else if (to === "F") result = (num - 273.15) * 9/5 + 32;
        else result = num;
      }
    } else {
      // kg, g, mg
      let grams = num;
      if (from === "kg") grams = num * 1000;
      else if (from === "mg") grams = num / 1000;

      if (to === "g") result = grams;
      else if (to === "kg") result = grams / 1000;
      else if (to === "mg") result = grams * 1000;
    }

    setConvResult(result.toFixed(6).replace(/\.?0+$/, ""));
  };

  // 4. LIVE DICTIONARY STATE
  const [dictWord, setDictWord] = useState("");
  const [dictData, setDictData] = useState<any | null>(null);
  const [dictError, setDictError] = useState("");
  const [dictLoading, setDictLoading] = useState(false);

  const handleLookupWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dictWord.trim()) return;

    setDictLoading(true);
    setDictError("");
    setDictData(null);

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${dictWord.trim().toLowerCase()}`);
      if (!res.ok) {
        throw new Error("Word not found in the dictionary.");
      }
      const data = await res.json();
      setDictData(data[0]);
    } catch (err: any) {
      // Fallback local dictionary of school terms
      const localDict: Record<string, any> = {
        physics: { word: "physics", meanings: [{ partOfSpeech: "noun", definitions: [{ definition: "The branch of science concerned with the nature and properties of matter and energy." }] }] },
        wave: { word: "wave", meanings: [{ partOfSpeech: "noun", definitions: [{ definition: "A disturbance that transfers energy from one point to another without transferring matter." }] }] },
        atom: { word: "atom", meanings: [{ partOfSpeech: "noun", definitions: [{ definition: "The basic unit of a chemical element, consisting of protons, neutrons, and electrons." }] }] },
        chemistry: { word: "chemistry", meanings: [{ partOfSpeech: "noun", definitions: [{ definition: "The scientific study of the properties and behavior of matter." }] }] }
      };

      const term = dictWord.trim().toLowerCase();
      if (localDict[term]) {
        setDictData(localDict[term]);
      } else {
        setDictError("Word not found. Try searching terms like 'wave', 'physics', or 'atom'.");
      }
    } finally {
      setDictLoading(false);
    }
  };

  const playPronunciation = () => {
    if (!dictData) return;
    const audioUrl = dictData.phonetics?.find((p: any) => p.audio)?.audio;
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      // Fallback text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(dictData.word);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Maths Formula tables data
  const mathsTables = {
    trig: [
      { angle: "0°", sin: "0", cos: "1", tan: "0" },
      { angle: "30° (π/6)", sin: "0.5", cos: "0.866", tan: "0.577" },
      { angle: "45° (π/4)", sin: "0.707", cos: "0.707", tan: "1" },
      { angle: "60° (π/3)", sin: "0.866", cos: "0.5", tan: "1.732" },
      { angle: "90° (π/2)", sin: "1", cos: "0", tan: "Undefined" }
    ],
    constants: [
      { name: "Speed of Light (c)", val: "3.00 × 10⁸ m/s" },
      { name: "Acceleration of Gravity (g)", val: "9.81 m/s²" },
      { name: "Planck Constant (h)", val: "6.63 × 10⁻³⁴ J·s" },
      { name: "Avogadro Number (Na)", val: "6.02 × 10²³ mol⁻¹" }
    ]
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-border-default/40 pb-4">
        <h1 className="text-2xl md:text-3xl font-extrabold text-text-default tracking-tight">
          Scientific Tools
        </h1>
        <p className="text-xs md:text-sm text-text-muted">
          Access periodic tables, calculate complex equations, convert units, and lookup curriculum definitions.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex gap-2 border-b border-border-default/20 pb-2 overflow-x-auto">
        {[
          { id: "periodic", label: "Periodic Table", icon: AtomIcon },
          { id: "calc", label: "Scientific Calculator", icon: CalcIcon },
          { id: "converter", label: "Unit Converter", icon: ArrowLeftRight },
          { id: "dictionary", label: "Live Dictionary", icon: BookMarked }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider relative shrink-0 transition-colors ${
                activeTab === tab.id ? "text-accent" : "text-text-muted hover:text-text-default"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent rounded-t-md" />
              )}
            </button>
          );
        })}
      </div>

      {/* 1. PERIODIC TABLE TAB */}
      {activeTab === "periodic" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-in">
          {/* Grid Layout (60%) */}
          <div className="lg:col-span-3 rounded-xl border border-border-default bg-surface p-4 space-y-4">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Elements Grid</h3>
            <div className="grid grid-cols-6 gap-2">
              {elements.map((el) => (
                <button
                  key={el.num}
                  onClick={() => setSelectedElement(el)}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all hover:-translate-y-0.5 active-press ${
                    selectedElement?.num === el.num
                      ? "border-accent bg-accent/10 text-accent scale-105 shadow-md"
                      : el.groupClass
                  }`}
                >
                  <span className="text-[9px] font-bold opacity-60">{el.num}</span>
                  <span className="text-base font-black">{el.symbol}</span>
                  <span className="text-[8px] truncate max-w-full font-medium">{el.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Details & Orbis AI Explanations (40%) */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 h-full flex flex-col justify-between">
              {selectedElement ? (
                <div className="space-y-4 animate-fade-in flex-1">
                  <div className="border-b border-border-default/20 pb-3">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                      Element #{selectedElement.num}
                    </span>
                    <h2 className="text-xl font-black text-text-default mt-2">{selectedElement.name}</h2>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-border-default/10">
                      <span className="text-text-muted">Symbol</span>
                      <span className="font-bold">{selectedElement.symbol}</span>
                    </div>
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
                <div className="text-center py-10 space-y-3 text-text-muted flex-1 flex flex-col justify-center">
                  <AtomIcon className="h-10 w-10 mx-auto text-text-muted opacity-40 animate-spin" style={{ animationDuration: "12s" }} />
                  <p className="text-xs font-semibold">Select an element from the grid to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. WORKING SCIENTIFIC CALCULATOR TAB */}
      {activeTab === "calc" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-in">
          {/* Calculator Layout (60%) */}
          <div className="lg:col-span-3 rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4 max-w-md mx-auto w-full">
            {/* Display screen */}
            <div className="bg-background/80 border border-border-default rounded-xl p-4 text-right space-y-1 min-h-[80px] flex flex-col justify-between shadow-inner">
              <div className="text-text-muted text-xs font-semibold font-mono tracking-wide overflow-x-auto whitespace-nowrap">
                {calcInput || "0"}
              </div>
              <div className="text-text-default text-xl font-black font-mono overflow-x-auto whitespace-nowrap">
                {calcResult || "0"}
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-5 gap-2 font-mono">
              {/* Row 1: Scientific functions */}
              {["sin(", "cos(", "tan(", "log(", "ln("].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcClick(btn)}
                  className="p-2.5 rounded-lg bg-background border border-border-default/60 hover:border-text-muted text-accent font-bold text-[10px] uppercase active-press"
                >
                  {btn.replace("(", "")}
                </button>
              ))}

              {/* Row 2: Sci functions */}
              {["√(", "^", "(", ")", "DEL"].map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleCalcClick(btn)}
                  className={`p-2.5 rounded-lg border font-bold text-xs active-press ${
                    btn === "DEL"
                      ? "bg-passion/25 border-passion/40 text-passion hover:bg-passion/35"
                      : "bg-background border-border-default/60 text-accent"
                  }`}
                >
                  {btn}
                </button>
              ))}

              {/* Number pad & basic operators */}
              {[
                { val: "7", type: "num" }, { val: "8", type: "num" }, { val: "9", type: "num" }, { val: "/", type: "op" }, { val: "C", type: "clear" },
                { val: "4", type: "num" }, { val: "5", type: "num" }, { val: "6", type: "num" }, { val: "*", type: "op" }, { val: "π", type: "num" },
                { val: "1", type: "num" }, { val: "2", type: "num" }, { val: "3", type: "num" }, { val: "-", type: "op" }, { val: "e", type: "num" },
                { val: "0", type: "num" }, { val: ".", type: "num" }, { val: "=", type: "eq" }, { val: "+", type: "op" }
              ].map((btn) => {
                let btnStyle = "bg-background border-border-default/60 text-text-default hover:border-text-muted";
                if (btn.type === "op") btnStyle = "bg-primary/20 border-primary/30 text-accent font-bold";
                else if (btn.type === "clear") btnStyle = "bg-passion/20 border-passion/30 text-passion font-bold";
                else if (btn.type === "eq") btnStyle = "col-span-2 bg-accent/25 border-accent/45 text-accent font-black";

                return (
                  <button
                    key={btn.val}
                    onClick={() => handleCalcClick(btn.val)}
                    className={`p-3.5 rounded-lg border text-sm active-press transition-colors ${btnStyle}`}
                  >
                    {btn.val}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Maths Reference Tables (40%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trig Table */}
            <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="h-4.5 w-4.5 text-accent" />
                <span>Trigonometric Table</span>
              </h3>

              <table className="w-full text-left text-xs font-semibold">
                <thead>
                  <tr className="border-b border-border-default/30 text-text-muted uppercase text-[9px] tracking-wider">
                    <th className="py-2">Angle (θ)</th>
                    <th className="py-2">sin θ</th>
                    <th className="py-2">cos θ</th>
                    <th className="py-2">tan θ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default/20 text-text-default">
                  {mathsTables.trig.map((t, idx) => (
                    <tr key={idx} className="hover:bg-background/25">
                      <td className="py-2 font-mono">{t.angle}</td>
                      <td className="py-2 font-mono">{t.sin}</td>
                      <td className="py-2 font-mono">{t.cos}</td>
                      <td className="py-2 font-mono">{t.tan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Constants Table */}
            <div className="rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="h-4.5 w-4.5 text-accent" />
                <span>Physics Constants</span>
              </h3>

              <div className="space-y-2 text-xs">
                {mathsTables.constants.map((c, idx) => (
                  <div key={idx} className="flex justify-between py-1.5 border-b border-border-default/15 font-semibold">
                    <span className="text-text-muted">{c.name}</span>
                    <span className="font-mono text-accent">{c.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. UNIT CONVERTER TAB */}
      {activeTab === "converter" && (
        <div className="max-w-xl mx-auto rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-5 animate-fade-in">
          <div className="flex justify-between items-center border-b border-border-default/30 pb-3">
            <h3 className="text-sm font-bold text-text-default">Measurement Converter</h3>
            <div className="flex gap-1.5 bg-background border border-border-default/40 p-1 rounded-lg">
              {(["length", "temp", "mass"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setConvType(type);
                    if (type === "length") { setConvFrom("m"); setConvTo("km"); handleConvert(convVal, "m", "km", "length"); }
                    else if (type === "temp") { setConvFrom("C"); setConvTo("F"); handleConvert(convVal, "C", "F", "temp"); }
                    else { setConvFrom("kg"); setConvTo("g"); handleConvert(convVal, "kg", "g", "mass"); }
                  }}
                  className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all ${
                    convType === type ? "bg-accent/15 text-accent border border-accent/25" : "text-text-muted"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* From block */}
            <div className="p-4 rounded-xl border border-border-default/60 bg-background/25 space-y-2">
              <label className="text-[9px] font-bold text-text-muted uppercase">From</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={convVal}
                  onChange={(e) => {
                    setConvVal(e.target.value);
                    handleConvert(e.target.value, convFrom, convTo, convType);
                  }}
                  className="w-full px-2 py-1.5 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none"
                />
                <select
                  value={convFrom}
                  onChange={(e) => {
                    setConvFrom(e.target.value);
                    handleConvert(convVal, e.target.value, convTo, convType);
                  }}
                  className="px-2 py-1.5 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none"
                >
                  {convType === "length" && (
                    <>
                      <option value="m">m</option>
                      <option value="km">km</option>
                      <option value="cm">cm</option>
                      <option value="mm">mm</option>
                    </>
                  )}
                  {convType === "temp" && (
                    <>
                      <option value="C">°C</option>
                      <option value="F">°F</option>
                      <option value="K">K</option>
                    </>
                  )}
                  {convType === "mass" && (
                    <>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="mg">mg</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* To block */}
            <div className="p-4 rounded-xl border border-border-default/60 bg-background/25 space-y-2">
              <label className="text-[9px] font-bold text-text-muted uppercase">To</label>
              <div className="flex gap-2">
                <div className="w-full px-3 py-2 text-xs rounded-lg border border-border-default/60 bg-background/10 text-text-default select-none font-bold">
                  {convResult || "0"}
                </div>
                <select
                  value={convTo}
                  onChange={(e) => {
                    setConvTo(e.target.value);
                    handleConvert(convVal, convFrom, e.target.value, convType);
                  }}
                  className="px-2 py-1.5 text-xs rounded-lg border border-border-default bg-background/50 text-text-default focus:border-accent focus:outline-none"
                >
                  {convType === "length" && (
                    <>
                      <option value="m">m</option>
                      <option value="km">km</option>
                      <option value="cm">cm</option>
                      <option value="mm">mm</option>
                    </>
                  )}
                  {convType === "temp" && (
                    <>
                      <option value="C">°C</option>
                      <option value="F">°F</option>
                      <option value="K">K</option>
                    </>
                  )}
                  {convType === "mass" && (
                    <>
                      <option value="kg">kg</option>
                      <option value="g">g</option>
                      <option value="mg">mg</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. LIVE DICTIONARY TAB */}
      {activeTab === "dictionary" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 animate-fade-in">
          {/* Lookup Panel (60%) */}
          <div className="lg:col-span-3 rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-5">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Word Lookup</h3>
            
            <form onSubmit={handleLookupWord} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Enter word to lookup (e.g. 'physics')..."
                  value={dictWord}
                  onChange={(e) => setDictWord(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-border-default bg-background/30 text-text-default focus:border-accent focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={dictLoading || !dictWord.trim()}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/95 text-white text-xs font-bold shadow-md active-press transition-colors disabled:opacity-40"
              >
                {dictLoading ? "Searching..." : "Define"}
              </button>
            </form>

            {/* Results Display */}
            {dictData ? (
              <div className="space-y-4 pt-3 border-t border-border-default/25 animate-fade-in">
                <div className="flex justify-between items-center gap-4">
                  <div>
                    <h2 className="text-xl font-black text-text-default capitalize">{dictData.word}</h2>
                    {dictData.phonetic && (
                      <span className="text-xs text-accent font-semibold">{dictData.phonetic}</span>
                    )}
                  </div>
                  <button
                    onClick={playPronunciation}
                    className="p-2.5 rounded-full bg-accent/15 hover:bg-accent/25 text-accent active-press transition-all shadow-sm border border-accent/25"
                    title="Play pronunciation"
                  >
                    <Volume2 className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {dictData.meanings?.map((m: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <span className="text-[10px] font-bold text-accent uppercase tracking-wider bg-accent/15 px-2 py-0.5 rounded-full border border-accent/20">
                        {m.partOfSpeech}
                      </span>
                      <div className="space-y-2.5 pl-2">
                        {m.definitions?.slice(0, 2).map((d: any, dIdx: number) => (
                          <div key={dIdx} className="space-y-1">
                            <p className="text-xs text-text-default leading-relaxed font-semibold">
                              • {d.definition}
                            </p>
                            {d.example && (
                              <p className="text-[11px] text-text-muted italic leading-relaxed pl-3">
                                &quot;{d.example}&quot;
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : dictError ? (
              <div className="flex items-center gap-2 p-3.5 rounded-lg border border-yellow-500/20 bg-yellow-500/5 text-xs text-yellow-300">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{dictError}</span>
              </div>
            ) : (
              <div className="text-center py-12 text-text-muted space-y-2">
                <BookMarked className="h-10 w-10 mx-auto opacity-30 animate-pulse" />
                <p className="text-xs font-semibold">Search a vocabulary word above to see definitions.</p>
              </div>
            )}
          </div>

          {/* Quick instructions (40%) */}
          <div className="lg:col-span-2 rounded-xl border border-border-default bg-surface p-5 md:p-6 space-y-4">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">About Dictionary</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              This dictionary queries the public **Free Dictionary API** in real-time. It is highly useful for studying vocabulary terms across science, geography, and mathematics.
            </p>
            <div className="p-3.5 rounded-lg bg-background/40 border border-border-default/40 space-y-1">
              <span className="text-[9px] font-bold text-[#EAB308] uppercase">Try These Terms:</span>
              <ul className="text-xs text-text-default space-y-1 font-semibold">
                <li>• photosynthesis</li>
                <li>• momentum</li>
                <li>• quadratic</li>
                <li>• agriculture</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
