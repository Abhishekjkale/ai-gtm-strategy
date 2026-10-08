import React, { useState } from 'react';
import { FEATURE_FENCING_MATRIX, ARBITRAGE_SCENARIO_DATA } from '../data/strategicArtifacts';
import { 
  ShieldAlert, 
  DollarSign, 
  Lock, 
  Network, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Terminal, 
  Scale, 
  Sliders, 
  Copy, 
  Check, 
  Eye, 
  Zap, 
  Radio
} from 'lucide-react';

export const PricingDefenseModel: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedClause, setCopiedClause] = useState<boolean>(false);

  // Economic Model Simulator State
  const [usListPrice, setUsListPrice] = useState<number>(120000); // $120k/year enterprise tier
  const [seaDiscountPercent, setSeaDiscountPercent] = useState<number>(65); // 65% PPP discount ($42k)
  const [simulatedSeats, setSimulatedSeats] = useState<number>(250);

  const seaPrice = Math.round(usListPrice * (1 - seaDiscountPercent / 100));
  const arbitrageOpportunity = usListPrice - seaPrice;
  const arbitragePercentage = seaDiscountPercent;

  const categories = ['All', 'Compute & Throughput', 'Model Customization', 'Security & Privacy', 'Enterprise Governance'];

  const filteredFeatures = selectedCategory === 'All' 
    ? FEATURE_FENCING_MATRIX 
    : FEATURE_FENCING_MATRIX.filter(f => f.category === selectedCategory);

  const copyClauseText = () => {
    const clauseText = `Master Service Agreement (MSA) Section 14.3 — Territorial Restrictions & Gray-Market Non-Circumvention:
"Licensee warrants that software tokens and application access provisioned under Tier 2 SEA shall be queried exclusively by bona fide employees and technical workloads physically located within ASEAN member states. Query volumes exceeding 10% from IP addresses outside ASEAN constitute a material breach, immediately voiding all SLAs, triggering automatic contract reclassification to Tier 1 Western rates retroactively, and assessing liquidated damages equal to 200% of the price differential."`;
    navigator.clipboard.writeText(clauseText);
    setCopiedClause(true);
    setTimeout(() => setCopiedClause(false), 2000);
  };

  const currentStepData = ARBITRAGE_SCENARIO_DATA.find(s => s.stepNumber === activeStep) || ARBITRAGE_SCENARIO_DATA[0];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                DELIVERABLE 3
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Triple-Lock Economic Model
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Gray Market Pricing Defense Sheet & Forensic Arbitrage Defense
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Protecting 80%+ Western enterprise gross margins while scaling with Purchasing Power Parity (PPP) in Southeast Asia.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-slate-300">
              PPP Arbitrage Protection Active
            </span>
          </div>
        </div>
      </div>

      {/* Economic Model & Arbitrage Incentive Calculator */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              Economic Parity vs. Arbitrage Incentive Dynamics
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate the price spread that incentivizes Western enterprise procurement teams to seek unauthorized gray-market licensing.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Interactive Model Sensitivity
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-850">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">US/EU List Price (Annual Enterprise)</span>
                <span className="font-mono text-blue-400 font-bold">${usListPrice.toLocaleString()}/yr</span>
              </div>
              <input
                type="range"
                min="50000"
                max="300000"
                step="5000"
                value={usListPrice}
                onChange={(e) => setUsListPrice(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">SEA Purchasing Power Discount</span>
                <span className="font-mono text-emerald-400 font-bold">{seaDiscountPercent}% Off</span>
              </div>
              <input
                type="range"
                min="30"
                max="80"
                step="5"
                value={seaDiscountPercent}
                onChange={(e) => setSeaDiscountPercent(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Enterprise Seats Deployed</span>
                <span className="font-mono text-white font-bold">{simulatedSeats} seats</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={simulatedSeats}
                onChange={(e) => setSimulatedSeats(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Metric Outputs */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950/90 border border-slate-850 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                Tier 1 US/EU Rate
              </span>
              <div className="my-2">
                <span className="text-2xl font-bold font-mono text-blue-400">
                  ${usListPrice.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block">per organization / year</span>
              </div>
              <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-800">
                Full SLAs, Dedicated PTU, Direct VPC, Customer HSM keys
              </div>
            </div>

            <div className="bg-slate-950/90 border border-slate-850 rounded-xl p-4 flex flex-col justify-between">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                Tier 2 SEA PPP Rate
              </span>
              <div className="my-2">
                <span className="text-2xl font-bold font-mono text-emerald-400">
                  ${seaPrice.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 block">per organization / year</span>
              </div>
              <div className="text-[11px] text-slate-400 bg-slate-900 p-2 rounded border border-slate-850">
                Bound to ASEAN nodes, burst-capped, 8x5 support
              </div>
            </div>

            <div className="bg-slate-950/90 border border-amber-900/40 rounded-xl p-4 flex flex-col justify-between bg-amber-950/10">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 block font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Arbitrage Delta
              </span>
              <div className="my-2">
                <span className="text-2xl font-bold font-mono text-amber-300">
                  ${arbitrageOpportunity.toLocaleString()}
                </span>
                <span className="text-xs text-amber-400/80 block">Arbitrage incentive gap ({arbitragePercentage}%)</span>
              </div>
              <div className="text-[11px] text-amber-300/80 bg-amber-950/40 p-2 rounded border border-amber-800/40">
                Protected via Feature Fencing, BGP Geofencing, and Section 14.3
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mechanism 1: Feature Fencing Strategy */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300">
                MECHANISM 1
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Feature Fencing Strategy
              </span>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-400" />
              Architectural Capability Partitioning
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              High-value capabilities locked behind Western enterprise contracts to make SEA tier technically insufficient for Western production.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-semibold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-slate-300 font-semibold border-b border-slate-800">
                <th className="p-3 w-56">Feature / Capability</th>
                <th className="p-3 w-36">Category</th>
                <th className="p-3 w-44">Tier 1: US / EU Enterprise</th>
                <th className="p-3 w-44">Tier 2: SEA Growth Tier</th>
                <th className="p-3">Arbitrage Defense & Business Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredFeatures.map((f, idx) => (
                <tr key={idx} className="hover:bg-slate-850/40 transition">
                  <td className="p-3 font-semibold text-white">{f.featureName}</td>
                  <td className="p-3">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                      {f.category}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-blue-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                      {f.tier1Western}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-400">
                    <span className={`inline-block px-2 py-0.5 rounded text-[11px] ${
                      f.tier2Sea === 'Not Available' 
                        ? 'bg-rose-950/40 text-rose-300 border border-rose-900/40' 
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {f.tier2Sea}
                    </span>
                  </td>
                  <td className="p-3 text-slate-400 leading-relaxed text-[11px]">
                    {f.grayMarketMitigationValue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mechanism 2: SLA Geo-Locking & Boundaries */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <div className="mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
              MECHANISM 2
            </span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              SLA Geo-Locking & Boundaries
            </span>
          </div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-400" />
            Technical, Legal & Infrastructure-Level Boundaries
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Four interlocking defense perimeters preventing a US or EU corporation from operating under an SEA software license.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Boundary 1 */}
          <div className="bg-slate-950/70 border border-slate-850 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-semibold">Boundary 1 • Technical</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">BGP / Egress</span>
            </div>
            <h4 className="font-semibold text-white text-sm">Synthetic Latency Floor & IP Geofencing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tier 2 API keys are strictly bound to AWS ap-southeast-1 (Singapore) and GCP asia-southeast2 (Jakarta). Any inbound connection terminating from outside ASEAN CIDR IP ranges is dynamically routed into synthetic delay containers introducing an un-bypassable <strong>180ms–350ms latency floor</strong>, completely disqualifying the API for latency-sensitive Western enterprise production.
            </p>
          </div>

          {/* Boundary 2 */}
          <div className="bg-slate-950/70 border border-slate-850 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-semibold">Boundary 2 • Support SLA</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">Timezone Lock</span>
            </div>
            <h4 className="font-semibold text-white text-sm">Localized Support Hours & Language Gating</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Support SLAs for Tier 2 are strictly limited to <strong>8x5 Singapore Time (SGT)</strong> in English and Bahasa Indonesia with a 4-hour initial response time. Critical 24/7/365 Tier-1 support with a 15-minute response SLA and a designated Technical Account Manager (TAM) is exclusively accessible under Western Tier 1 Master Service Agreements.
            </p>
          </div>

          {/* Boundary 3 */}
          <div className="bg-slate-950/70 border border-slate-850 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-semibold">Boundary 3 • Commercial</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">Tax & Entity</span>
            </div>
            <h4 className="font-semibold text-white text-sm">In-Territory Incorporation & Local Currency</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Procurement requires verified in-country tax residency (Singapore ACRA, Indonesian NIB, or Malaysian SSM). Invoicing is strictly denominated in SGD, IDR, or THB with statutory local withholding tax (WHT) deductions. Invoicing an SEA entity creates statutory transfer-pricing scrutiny for Western parent holding corporations.
            </p>
          </div>

          {/* Boundary 4 */}
          <div className="bg-slate-950/70 border border-slate-850 rounded-xl p-4.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-semibold">Boundary 4 • Legal</span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-mono">Section 14.3</span>
            </div>
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-white text-sm">Territorial Non-Circumvention Clause</h4>
              <button
                onClick={copyClauseText}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono"
              >
                {copiedClause ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedClause ? 'Copied' : 'Copy Clause'}
              </button>
            </div>
            <p className="text-xs text-slate-300 font-mono bg-slate-950 p-2.5 rounded border border-slate-850 leading-relaxed">
              "Query volumes exceeding 10% from IP addresses outside ASEAN constitute a material breach, immediately voiding all SLAs, triggering automatic contract reclassification to Tier 1 Western rates retroactively, and assessing liquidated damages equal to 200% of the price differential."
            </p>
          </div>
        </div>
      </div>

      {/* Mechanism 3: Arbitrage Defense Scenario: FinGlobal Corp */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300">
                MECHANISM 3
              </span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Concrete Arbitrage Defense Scenario
              </span>
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              Forensic Attack & Automated Triage: "FinGlobal Corp"
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulating an attempt by a New York hedge fund to acquire 250 enterprise seats via a nominee Singapore shell entity at 71% discount.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            5-Stage Detection & Enforcement Lifecycle
          </div>
        </div>

        {/* Step Progression Timeline */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          {ARBITRAGE_SCENARIO_DATA.map((step) => (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStep(step.stepNumber)}
              className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                activeStep === step.stepNumber
                  ? 'bg-rose-950/40 border-rose-500/60 shadow-lg'
                  : 'bg-slate-950/60 border-slate-850 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400">STAGE {step.stepNumber}</span>
                  <span className={`w-2 h-2 rounded-full ${
                    step.status === 'suspicious' ? 'bg-amber-400' :
                    step.status === 'flagged' ? 'bg-orange-500' :
                    step.status === 'quarantined' ? 'bg-rose-500 animate-pulse' :
                    step.status === 'blocked' ? 'bg-emerald-400' : 'bg-slate-400'
                  }`} />
                </div>
                <div className="text-xs font-bold text-white line-clamp-1">{step.phase}</div>
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block font-mono">
                {step.status.toUpperCase()}
              </span>
            </button>
          ))}
        </div>

        {/* Current Step Forensic Details */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-850">
            <div>
              <span className="text-xs font-mono text-rose-400 font-semibold block">
                {currentStepData.timestamp} • {currentStepData.vector}
              </span>
              <h4 className="text-base font-bold text-white">{currentStepData.phase}</h4>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">System State:</span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase ${
                currentStepData.status === 'quarantined' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                currentStepData.status === 'flagged' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                currentStepData.status === 'blocked' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}>
                {currentStepData.status}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
                  Actor Activity / Client Action
                </span>
                <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-850 leading-relaxed">
                  {currentStepData.action}
                </p>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1">
                  Heuristic & Detection Engine Response
                </span>
                <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-850 leading-relaxed">
                  {currentStepData.systemDetection}
                </p>
              </div>
            </div>

            {/* Forensic Telemetry Console */}
            <div>
              <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-1 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                Live Forensic Telemetry Inspection
              </span>
              <div className="bg-slate-900 rounded-lg p-3.5 border border-slate-800 font-mono text-[11px] space-y-2">
                {Object.entries(currentStepData.technicalDetails).map(([key, val]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 pb-1.5 border-b border-slate-850 last:border-0 last:pb-0">
                    <span className="text-indigo-300 font-semibold">{key}:</span>
                    <span className="text-slate-300 text-right sm:max-w-[65%] break-words">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-850">
            <button
              onClick={() => setActiveStep(s => Math.max(1, s - 1))}
              disabled={activeStep === 1}
              className="px-3 py-1.5 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 transition"
            >
              Previous Stage
            </button>
            <span className="text-xs text-slate-400 font-mono">
              Stage {activeStep} of 5
            </span>
            <button
              onClick={() => setActiveStep(s => Math.min(5, s + 1))}
              disabled={activeStep === 5}
              className="px-3 py-1.5 rounded text-xs font-medium bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:hover:bg-rose-600 text-white transition flex items-center gap-1"
            >
              Next Stage <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
