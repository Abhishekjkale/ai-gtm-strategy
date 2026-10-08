import React from 'react';
import { Shield, Globe, Scale, ArrowRight, Cpu, Layers, DollarSign, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ExecutiveSummaryProps {
  onNavigateTab: (tab: 'D1' | 'D2' | 'D3' | 'RAW') => void;
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-8">
      {/* Hero Strategic Mandate */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/60 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
              ENTERPRISE AI PRODUCT ARCHITECTURE
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
              TRI-REGIONAL EXPANSION: EU • US • SEA
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Transforming the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-300 to-emerald-400">"Splinternet"</span> into a Scalable Enterprise GenAI Operational Engine
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Deploying a global Generative AI product across the EU, US, and Southeast Asia simultaneously requires solving two compounding traps: <strong>regulatory divergence</strong> (EU AI Act vs NIST AI RMF vs ASEAN PDPAs) and <strong>commercial arbitrage</strong> (protecting 80%+ Western gross margins while scaling with Purchasing Power Parity in emerging markets).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('D1')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
            >
              Explore Deliverable 1: Modular Architecture
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigateTab('D2')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition"
            >
              Deliverable 2: Cross-Cultural GTM Matrix
            </button>
            <button
              onClick={() => onNavigateTab('D3')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 transition"
            >
              Deliverable 3: Gray Market Defense
            </button>
          </div>
        </div>
      </div>

      {/* 3 Regional Archetype Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* EU Pillar */}
        <div className="bg-slate-900/80 border border-indigo-950/80 rounded-xl p-5 hover:border-indigo-500/40 transition shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇪🇺</span>
              <h3 className="font-bold text-white text-base">European Union</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 font-semibold">
              PREEMPTIVE RIGHTS
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Governed by the <strong>EU AI Act (Regulation 2024/1689)</strong> and <strong>GDPR</strong>. Demands proactive Fundamental Rights Impact Assessments (FRIA), algorithmic transparency, zero employee surveillance, and collective Works Council approval.
          </p>
          <div className="bg-slate-950/70 rounded-lg p-3 text-xs space-y-1.5 border border-slate-850">
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Architecture Hook:</span>
              <span className="font-mono text-indigo-400">Art. 27 FRIA & GDPR Vault</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Sales Motion:</span>
              <span className="text-slate-200">6–12 mo Consensus (DPO + Betriebsrat)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Penalty Exposure:</span>
              <span className="font-mono text-rose-400">€35M or 7% global turnover</span>
            </div>
          </div>
        </div>

        {/* US Pillar */}
        <div className="bg-slate-900/80 border border-blue-950/80 rounded-xl p-5 hover:border-blue-500/40 transition shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇺🇸</span>
              <h3 className="font-bold text-white text-base">United States</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 font-semibold">
              VELOCITY & RISK MGT
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Governed by the <strong>NIST AI RMF 1.0</strong>, White House Executive Order 14110, and commercial copyright doctrines. Prioritizes bottom-up engineering velocity, individual power cockpits, and uncapped IP indemnification.
          </p>
          <div className="bg-slate-950/70 rounded-lg p-3 text-xs space-y-1.5 border border-slate-850">
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Architecture Hook:</span>
              <span className="font-mono text-blue-400">RMF Logs & Copyright Filter</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Sales Motion:</span>
              <span className="text-slate-200">30–90 day PLG to Enterprise VP</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Key Deliverable:</span>
              <span className="font-mono text-emerald-400">$5M IP Indemnity Warranty</span>
            </div>
          </div>
        </div>

        {/* SEA Pillar */}
        <div className="bg-slate-900/80 border border-emerald-950/80 rounded-xl p-5 hover:border-emerald-500/40 transition shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🇸🇬</span>
              <h3 className="font-bold text-white text-base">Southeast Asia</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 font-semibold">
              RELATIONAL HARMONY
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-jurisdictional privacy (SG PDPA, Indonesia UU 27/2022, Thailand PDPA). High Power Distance necessitates hierarchical review workflows, cultural/multi-faith filtering, and local System Integrator alliances.
          </p>
          <div className="bg-slate-950/70 rounded-lg p-3 text-xs space-y-1.5 border border-slate-850">
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Architecture Hook:</span>
              <span className="font-mono text-emerald-400">PDPA Router & SARA Filter</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Sales Motion:</span>
              <span className="text-slate-200">6–9 mo Executive Relationship (C-Suite)</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span className="text-slate-400">Pricing Defense:</span>
              <span className="font-mono text-amber-400">Section 14.3 Geo-Locking</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Architectural Tenets Grid */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-400" />
          The Tri-Regional Architectural Manifesto: 3 Guiding Rules
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="text-indigo-400 font-mono">01.</span> Zero Model Weight Divergence
            </div>
            <p className="text-slate-400 leading-relaxed">
              Never fork model training pipelines per geography. Standardize the central foundational LLM, speculative decoding SLMs, and RAG semantic space. Attach regional compliance as modular sidecars.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="text-blue-400 font-mono">02.</span> Sociological UI Alignment
            </div>
            <p className="text-slate-400 leading-relaxed">
              UI/UX is culture encoded in code. Empower US individual contributors with autonomous velocity; deliver aggregate governance to EU works councils; provide hierarchical endorsement workflows in SEA.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span className="text-emerald-400 font-mono">03.</span> Structural Triple-Lock Defense
            </div>
            <p className="text-slate-400 leading-relaxed">
              Price for Purchasing Power Parity (PPP) in emerging markets without losing Western margins. Enforce feature fencing, synthetic latency floors, local tax entity locks, and liquidated damages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
