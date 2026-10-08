import React, { useState } from 'react';
import { FULL_STRATEGIC_MARKDOWN_DELIVERABLES } from '../data/strategicArtifacts';
import { Copy, Check, Download, Printer, FileText, Sparkles, Terminal } from 'lucide-react';

export const RawMarkdownViewer: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [filterView, setFilterView] = useState<'ALL' | 'D1' | 'D2' | 'D3'>('ALL');

  const getFilteredContent = () => {
    if (filterView === 'ALL') return FULL_STRATEGIC_MARKDOWN_DELIVERABLES;
    
    if (filterView === 'D1') {
      const match = FULL_STRATEGIC_MARKDOWN_DELIVERABLES.match(/# DELIVERABLE 1: MODULAR REGULATORY ARCHITECTURE DIAGRAM[\s\S]*?(?=# DELIVERABLE 2:)/);
      return match ? match[0].trim() : FULL_STRATEGIC_MARKDOWN_DELIVERABLES;
    }
    
    if (filterView === 'D2') {
      const match = FULL_STRATEGIC_MARKDOWN_DELIVERABLES.match(/# DELIVERABLE 2: CROSS-CULTURAL GTM LOCALIZATION MATRIX[\s\S]*?(?=# DELIVERABLE 3:)/);
      return match ? match[0].trim() : FULL_STRATEGIC_MARKDOWN_DELIVERABLES;
    }
    
    if (filterView === 'D3') {
      const match = FULL_STRATEGIC_MARKDOWN_DELIVERABLES.match(/# DELIVERABLE 3: GRAY MARKET PRICING DEFENSE SHEET[\s\S]*/);
      return match ? match[0].trim() : FULL_STRATEGIC_MARKDOWN_DELIVERABLES;
    }

    return FULL_STRATEGIC_MARKDOWN_DELIVERABLES;
  };

  const currentContent = getFilteredContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GenAI_Global_Strategy_${filterView}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PRODUCTION ARTIFACTS
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Raw Markdown Source
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Strategic Artifacts Document Repository
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Copy, inspect, or download the exact production-ready Markdown with valid Mermaid.js diagrams, comparative matrices, and legal clauses.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setFilterView('ALL')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                  filterView === 'ALL' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Full Dossier
              </button>
              <button
                onClick={() => setFilterView('D1')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                  filterView === 'D1' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                D1: Architecture
              </button>
              <button
                onClick={() => setFilterView('D2')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                  filterView === 'D2' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                D2: GTM Matrix
              </button>
              <button
                onClick={() => setFilterView('D3')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition ${
                  filterView === 'D3' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                D3: Pricing Defense
              </button>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition shadow"
            >
              <Download className="w-3.5 h-3.5" />
              Download .md
            </button>

            {/* Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Code Editor Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-200 font-semibold">global_genai_enterprise_strategy.md</span>
            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
              UTF-8 • {currentContent.length.toLocaleString()} characters
            </span>
          </div>
          <span className="text-emerald-400">Syntax: GitHub Flavored Markdown + Mermaid.js</span>
        </div>

        <pre className="p-6 text-xs font-mono text-slate-200 leading-relaxed overflow-x-auto whitespace-pre-wrap select-all max-h-[750px] overflow-y-auto">
          {currentContent}
        </pre>
      </div>
    </div>
  );
};
