import React, { useState } from 'react';
import { GTM_LOCALIZATION_MATRIX, HOFSTEDE_DIMENSIONS_DATA } from '../data/strategicArtifacts';
import { RegionId } from '../types';
import { 
  Users, 
  Shield, 
  BarChart3, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  FileText, 
  Layers, 
  Send, 
  Lock, 
  Clock, 
  HeartHandshake,
  Check,
  Copy,
  Info
} from 'lucide-react';

export const LocalizationMatrix: React.FC = () => {
  const [activeRegionTab, setActiveRegionTab] = useState<RegionId>('US');
  const [copiedTable, setCopiedTable] = useState<boolean>(false);
  const [showExplainabilityDrawer, setShowExplainabilityDrawer] = useState<boolean>(false);
  const [endorsementSubmitted, setEndorsementSubmitted] = useState<boolean>(false);

  const copyMarkdownTable = () => {
    const tableText = `| Region | Key Hofstede Dimensions | UI/UX Adaptation Required | B2B Sales Cycle & Stakeholder Management | AI Trust & Transparency Framing |
| :--- | :--- | :--- | :--- | :--- |
${GTM_LOCALIZATION_MATRIX.map(r => `| **${r.region}** | ${r.keyHofstedeDimensions.replace(/\n/g, '<br>')} | **${r.uiUxAdaptation.summary}**<br>${r.uiUxAdaptation.concreteFeatures.map(f => `• ${f}`).join('<br>')} | **${r.b2bSalesCycle.cycleLength}**<br>• Stakeholders: ${r.b2bSalesCycle.keyStakeholders.join(', ')}<br>• Dynamics: ${r.b2bSalesCycle.decisionDynamics} | **${r.aiTrustFraming.coreNarrative}**<br>${r.aiTrustFraming.transparencyDeliverables.map(d => `• ${d}`).join('<br>')}<br>• Focus: ${r.aiTrustFraming.riskMitigationFocus} |`).join('\n')}`;

    navigator.clipboard.writeText(tableText);
    setCopiedTable(true);
    setTimeout(() => setCopiedTable(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                DELIVERABLE 2
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Hofstede Sociological Analysis
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Cross-Cultural GTM Localization Matrix & Behavioral UX
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Contrasting organizational psychology, B2B procurement power dynamics, and concrete UI adaptations across US, EU, and SEA.
            </p>
          </div>

          <button
            onClick={copyMarkdownTable}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition self-start lg:self-center"
          >
            {copiedTable ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedTable ? 'Copied Markdown Table' : 'Copy Deliverable 2 Table'}
          </button>
        </div>
      </div>

      {/* Hofstede Comparative Radar / Metric Cards */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          Hofstede Cultural Dimensions Index: Sociological Foundation
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Empirical baseline shaping enterprise willingness-to-trust generative models, executive risk tolerance, and individual software autonomy.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {HOFSTEDE_DIMENSIONS_DATA.map((dim) => (
            <div key={dim.dimension} className="bg-slate-950/70 border border-slate-850 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold block mb-1">
                  {dim.dimension.split('(')[0].trim()}
                </span>
                <p className="text-[11px] text-slate-400 mb-3 leading-tight">{dim.description}</p>
              </div>

              <div className="space-y-2 mt-2 pt-2 border-t border-slate-900">
                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-blue-400 font-medium">🇺🇸 US</span>
                    <span className="font-mono text-white font-semibold">{dim.us}</span>
                  </div>
                  <div className="h-1.5 bg-slate-850 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${dim.us}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-indigo-400 font-medium">🇪🇺 EU</span>
                    <span className="font-mono text-white font-semibold">{dim.eu}</span>
                  </div>
                  <div className="h-1.5 bg-slate-850 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${dim.eu}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-emerald-400 font-medium">🇸🇬 SEA</span>
                    <span className="font-mono text-white font-semibold">{dim.sea}</span>
                  </div>
                  <div className="h-1.5 bg-slate-850 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${dim.sea}%` }} />
                  </div>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 italic">
                  💡 {dim.strategicImpact}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Production-Ready Markdown Table Display */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="p-4 bg-slate-950/60 border-b border-slate-850 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" />
              Strategic Localization Matrix (Master Comparative Table)
            </h3>
            <p className="text-xs text-slate-400">Strictly mapped to required enterprise procurement and sociological columns.</p>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
            3 REGIONS • 5 STRATEGIC DIMENSIONS
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-300 font-semibold border-b border-slate-800">
                <th className="p-4 w-44">Region</th>
                <th className="p-4 w-56">Key Hofstede Dimensions</th>
                <th className="p-4 min-w-[280px]">UI/UX Adaptation Required</th>
                <th className="p-4 min-w-[280px]">B2B Sales Cycle & Stakeholder Management</th>
                <th className="p-4 min-w-[280px]">AI Trust & Transparency Framing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {GTM_LOCALIZATION_MATRIX.map((row) => (
                <tr key={row.regionId} className="hover:bg-slate-850/40 transition">
                  {/* Region Column */}
                  <td className="p-4 align-top font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {row.regionId === 'US' ? '🇺🇸' : row.regionId === 'EU' ? '🇪🇺' : '🇸🇬'}
                      </span>
                      <div>
                        <div className="text-sm">{row.region}</div>
                        <span className={`inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded ${
                          row.regionId === 'US' ? 'bg-blue-500/20 text-blue-300' :
                          row.regionId === 'EU' ? 'bg-indigo-500/20 text-indigo-300' :
                          'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {row.regionId === 'US' ? 'Velocity / PLG' : row.regionId === 'EU' ? 'Audit / Co-Determination' : 'Consensus / Hierarchy'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Hofstede Column */}
                  <td className="p-4 align-top text-slate-300">
                    <div className="space-y-1.5 font-mono text-[11px] bg-slate-950/60 p-3 rounded-lg border border-slate-850">
                      {row.keyHofstedeDimensions.split('\n').map((item, idx) => (
                        <div key={idx} className="text-slate-300">{item}</div>
                      ))}
                    </div>
                  </td>

                  {/* UI/UX Adaptation */}
                  <td className="p-4 align-top space-y-2">
                    <div className="font-semibold text-white text-xs flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                      {row.uiUxAdaptation.summary}
                    </div>
                    <ul className="space-y-1 text-slate-400 text-[11px]">
                      {row.uiUxAdaptation.concreteFeatures.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2 rounded border border-slate-850/60">
                      <strong className="text-slate-300">Paradigm:</strong> {row.uiUxAdaptation.dashboardParadigm}
                    </div>
                  </td>

                  {/* B2B Sales Cycle */}
                  <td className="p-4 align-top space-y-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-bold text-amber-300 text-xs">{row.b2bSalesCycle.cycleLength}</span>
                    </div>
                    <div className="text-[11px] text-slate-300">
                      <strong className="text-slate-200">Key Stakeholders:</strong>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {row.b2bSalesCycle.keyStakeholders.map((s, idx) => (
                          <span key={idx} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {row.b2bSalesCycle.decisionDynamics}
                    </p>
                    <div className="text-[11px] text-slate-400 bg-slate-950/50 p-2 rounded border border-slate-850/60">
                      <strong className="text-slate-300">Procurement:</strong> {row.b2bSalesCycle.procurementChecklist.join('; ')}
                    </div>
                  </td>

                  {/* AI Trust Framing */}
                  <td className="p-4 align-top space-y-2">
                    <div className="font-semibold text-emerald-300 text-xs italic">
                      {row.aiTrustFraming.coreNarrative}
                    </div>
                    <div className="space-y-1 text-slate-400 text-[11px]">
                      {row.aiTrustFraming.transparencyDeliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] text-rose-300/80 bg-rose-950/20 p-2 rounded border border-rose-900/30">
                      <strong>Risk Priority:</strong> {row.aiTrustFraming.riskMitigationFocus}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive UI/UX Persona Switcher: Live Interface Adaptation Demonstration */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                INTERACTIVE PROTOTYPE
              </span>
              <span className="text-xs text-slate-400">Live Sociological UI Adaptation Preview</span>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              Dynamic UI/UX Adaptation Engine: Experience the Product in Each Culture
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Click each region tab to see how the generative AI application interface mutates its layout, metrics, and controls to eliminate cultural friction.
            </p>
          </div>

          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveRegionTab('US')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                activeRegionTab === 'US'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🇺🇸</span> US: Solo Velocity Cockpit
            </button>
            <button
              onClick={() => setActiveRegionTab('EU')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                activeRegionTab === 'EU'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🇪🇺</span> EU: Works Council Governance
            </button>
            <button
              onClick={() => setActiveRegionTab('SEA')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                activeRegionTab === 'SEA'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>🇸🇬</span> SEA: Hierarchical Harmony
            </button>
          </div>
        </div>

        {/* Live Mockup Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          {/* US Cockpit */}
          {activeRegionTab === 'US' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-850">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg font-bold text-sm">
                    ⚡ Enterprise Copilot Pro
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white">Alex Mercer (Staff Quant Engineer)</span>
                    <span className="block text-[11px] text-slate-400">Autonomous Execution Mode: ACTIVE</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-blue-950/40 border border-blue-800/40 px-3 py-1 rounded text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Weekly Time Saved</span>
                    <span className="text-sm font-bold font-mono text-blue-400">14.8 hrs (+32% vs avg)</span>
                  </div>
                  <div className="bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Indemnification</span>
                    <span className="text-xs font-bold text-emerald-400">Active ($5M Policy)</span>
                  </div>
                </div>
              </div>

              {/* High agency controls */}
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-850 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-mono">Temp: 0.7</span>
                  <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" className="w-24 accent-blue-500 cursor-pointer" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-300 font-mono">Speculative Decoding:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">ON (4.2x)</span>
                </div>
                <div className="ml-auto text-slate-400 font-mono text-[11px]">
                  Cmd+K for Turbo Execution
                </div>
              </div>

              {/* Editor Workspace */}
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Prompt: Quantitative Market Sentiment Model & Code Synthesis</span>
                  <span className="text-blue-400 font-mono">Inference: 18ms</span>
                </div>
                <div className="bg-slate-950 rounded p-3 text-xs font-mono text-slate-300 border border-slate-850">
                  Synthesized PyTorch distributed embedding loader with speculative inference hooks. 
                  All copyright assertions verified against enterprise white-listed repositories.
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">Single-click autonomous run to production Kubernetes cluster</span>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-1.5 transition">
                    <Sparkles className="w-3.5 h-3.5" />
                    Deploy to Prod (1-Click)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* EU Cockpit */}
          {activeRegionTab === 'EU' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-850">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg font-bold text-sm">
                    🇪🇺 Sovereign AI Workplace
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white">Engineering Dept. — Collective Workspace</span>
                    <span className="block text-[11px] text-emerald-400 flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Works Council & GDPR Art. 22 Verified (Zero Surveillance)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-indigo-950/40 border border-indigo-800/40 px-3 py-1 rounded text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">EU AI Act Conformity</span>
                    <span className="text-xs font-bold text-indigo-300">FRIA Registered #EU-2026-88</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 px-3 py-1 rounded text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Carbon Footprint</span>
                    <span className="text-xs font-bold text-emerald-400">0.012 kg CO₂ (Green Grid)</span>
                  </div>
                </div>
              </div>

              {/* Zero surveillance notification */}
              <div className="bg-indigo-950/30 border border-indigo-800/30 rounded-lg p-3 text-xs text-indigo-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Individual performance logging, keystroke recording, and user velocity telemetry are <strong>permanently disabled</strong> in compliance with Betriebsrat guidelines.</span>
                </div>
                <button
                  onClick={() => setShowExplainabilityDrawer(!showExplainabilityDrawer)}
                  className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[11px] font-semibold shrink-0 transition"
                >
                  {showExplainabilityDrawer ? 'Hide Explainability' : 'Audit & SHAP Drawer'}
                </button>
              </div>

              {/* Interactive Explainability Drawer */}
              {showExplainabilityDrawer && (
                <div className="bg-slate-900 border border-indigo-500/40 rounded-lg p-4 space-y-3 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs border-b border-slate-850 pb-2">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Info className="w-4 h-4 text-indigo-400" /> Algorithmic Explainability & Feature Importance (SHAP/LIME)
                    </span>
                    <span className="font-mono text-emerald-400 text-[11px]">Fairness Parity: 98.4%</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400 block mb-1">Training Corpus Transparency</span>
                      <span className="font-mono text-slate-200">EU Sovereign Public Domain + Internal Docs</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400 block mb-1">Human-in-the-Loop Mandate</span>
                      <span className="font-mono text-amber-300">Mandatory Reviewer Gate Required</span>
                    </div>
                    <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                      <span className="text-slate-400 block mb-1">Confidence Interval</span>
                      <span className="font-mono text-emerald-400">96.2% Confidence (±1.4%)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Editor Workspace */}
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Draft Task: Automated Credit Underwriting Model Specification</span>
                  <span className="text-indigo-400 font-mono">Residency: AWS eu-central-1 (Frankfurt)</span>
                </div>
                <div className="bg-slate-950 rounded p-3 text-xs font-mono text-slate-300 border border-slate-850">
                  [C2PA Synthetic Tag Embedded]: Generated under human supervision. Demographic parity tests passed without disparate impact across protected age, gender, and regional classes.
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">Requires dual human confirmation before external publication</span>
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-lg shadow-indigo-500/20 flex items-center gap-1.5 transition">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Submit for Human Review
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SEA Cockpit */}
          {activeRegionTab === 'SEA' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-850">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg font-bold text-sm">
                    🇸🇬 Harmony Enterprise AI
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white">Tan & Partners Advisory — Regional ASEAN Hub</span>
                    <span className="block text-[11px] text-emerald-400 flex items-center gap-1">
                      <HeartHandshake className="w-3 h-3" /> Cultural Alignment & Multi-Faith Filter: ENABLED
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="bg-emerald-950/40 border border-emerald-800/40 px-3 py-1 rounded text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Team Harmony Index</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">94/100 (High Alignment)</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 px-3 py-1 rounded text-right">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Local Compliance</span>
                    <span className="text-xs font-bold text-emerald-300">SG PDPA & MAS TRM</span>
                  </div>
                </div>
              </div>

              {/* Language & Tone Selector */}
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-850 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-300">Dialect & Honorifics:</span>
                  <select className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded px-2 py-1">
                    <option>English (Formal Professional / SGT)</option>
                    <option>Bahasa Indonesia (Sopan Santun / Formal)</option>
                    <option>Thai (สุภาพ / Polite Royal Court)</option>
                    <option>Singlish Business Colloquial</option>
                  </select>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                  <span>Routing:</span>
                  <span className="font-mono text-emerald-400">Singapore (AWS ap-southeast-1)</span>
                </div>
              </div>

              {/* Hierarchical Approval Gate */}
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Strategic Initiative: Regional Expansion Feasibility Study for Indonesian Banking Group</span>
                  <span className="text-emerald-400 font-mono">Review Tier: Executive Director</span>
                </div>
                <div className="bg-slate-950 rounded p-3 text-xs font-mono text-slate-300 border border-slate-850">
                  Laporan analisis kelayakan ekspansi diselaraskan dengan regulasi Otoritas Jasa Keuangan (OJK) dan UU PDP No. 27/2022. 
                  Tidak memuat unsur SARA dan mengedepankan prinsip kemitraan jangka panjang yang harmonis.
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    {endorsementSubmitted 
                      ? '✓ Notification dispatched to Executive Director WhatsApp/Teams for signature' 
                      : 'Requires formal sign-off from Executive Director prior to client dissemination'}
                  </span>
                  <button
                    onClick={() => setEndorsementSubmitted(true)}
                    disabled={endorsementSubmitted}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                      endorsementSubmitted
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                    }`}
                  >
                    {endorsementSubmitted ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                    {endorsementSubmitted ? 'Endorsement Requested' : 'Submit for Director Endorsement'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
