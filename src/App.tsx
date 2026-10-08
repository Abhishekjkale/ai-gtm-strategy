import React, { useState } from 'react';
import { Header } from './components/Header';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { LocalizationMatrix } from './components/LocalizationMatrix';
import { PricingDefenseModel } from './components/PricingDefenseModel';
import { RawMarkdownViewer } from './components/RawMarkdownViewer';
import { Shield, Globe, Terminal, Cpu, DollarSign, Layers } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'D1' | 'D2' | 'D3' | 'RAW'>('OVERVIEW');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Executive Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tri-Regional Status Bar */}
      <div className="bg-slate-900/60 border-b border-slate-850 px-4 sm:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400 font-mono text-[11px]">ACTIVE MARKET NODES:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px]">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-950/40 border border-indigo-800/40 text-indigo-300">
              <span>🇪🇺</span> Frankfurt: EU AI Act Art. 27 FRIA + GDPR Vault Active
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-950/40 border border-blue-800/40 text-blue-300">
              <span>🇺🇸</span> US-East: NIST AI RMF + $5M IP Indemnity Filter
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
              <span>🇸🇬</span> Singapore: ASEAN PDPA Router + SARA Cultural Rails
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-8">
        {activeTab === 'OVERVIEW' && (
          <ExecutiveSummary onNavigateTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'D1' && (
          <ArchitectureDiagram />
        )}

        {activeTab === 'D2' && (
          <LocalizationMatrix />
        )}

        {activeTab === 'D3' && (
          <PricingDefenseModel />
        )}

        {activeTab === 'RAW' && (
          <RawMarkdownViewer />
        )}
      </main>

      {/* Executive Strategic Footer */}
      <footer className="bg-slate-950 border-t border-slate-850 mt-16 px-4 sm:px-8 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-slate-300 font-semibold">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>Global Enterprise GenAI Strategy & Architecture Suite</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Produced for C-Suite Briefings, Global Product Architecture, and Regulatory Conformity.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-slate-400">
            <span>EU AI Act (Reg 2024/1689)</span>
            <span>•</span>
            <span>NIST AI RMF 1.0</span>
            <span>•</span>
            <span>ASEAN Model Contractual Clauses</span>
            <span>•</span>
            <span>Hofstede Sociological Model</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
