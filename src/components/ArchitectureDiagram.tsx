import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { MERMAID_DIAGRAM_CODE } from '../data/strategicArtifacts';
import { ZoomIn, ZoomOut, RotateCcw, Copy, Check, ShieldCheck, Cpu, Globe, Server, Play, ArrowRight } from 'lucide-react';

interface ArchitectureDiagramProps {
  onSelectComponent?: (comp: string) => void;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeInspector, setActiveInspector] = useState<'EU' | 'US' | 'SEA' | 'CORE'>('EU');
  const [simulatingFlow, setSimulatingFlow] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'Inter, sans-serif',
      themeVariables: {
        darkMode: true,
        background: '#090d16',
        primaryColor: '#1e293b',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: '#3b82f6',
        lineColor: '#64748b',
        secondaryColor: '#1e1b4b',
        tertiaryColor: '#064e3b',
      },
    });

    const renderDiagram = async () => {
      try {
        const id = `mermaid-svg-${Date.now()}`;
        const { svg } = await mermaid.render(id, MERMAID_DIAGRAM_CODE);
        setSvgContent(svg);
      } catch (err) {
        console.error('Failed to render Mermaid diagram:', err);
      }
    };

    renderDiagram();
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(MERMAID_DIAGRAM_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startSimulation = () => {
    setSimulatingFlow(true);
    setSimulationStep(1);

    const timer = setInterval(() => {
      setSimulationStep((prev) => {
        if (prev >= 6) {
          clearInterval(timer);
          setTimeout(() => setSimulatingFlow(false), 2000);
          return 6;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const simulationSteps = [
    { step: 1, title: 'Client Ingress', desc: 'Frankfurt Enterprise Client initiates request with eIDAS corporate mTLS cert.' },
    { step: 2, title: 'EU Edge Gateway', desc: 'Frankfurt Node validates token, extracts tenant policy, and isolates payload.' },
    { step: 3, title: 'EU AI Act FRIA Engine', desc: 'Article 27 High-Risk taxonomy evaluation + automated audit logging.' },
    { step: 4, title: 'GDPR Confidential Vault', desc: 'AMD SEV-SNP enclave tokenizes PII; zero-log ephemeral KMS session created.' },
    { step: 5, title: 'Core Model Inference', desc: 'Universal Guardrails + Central LLM multi-agent reasoning execution.' },
    { step: 6, title: 'Watermarking & Egress', desc: 'Article 50 synthetic metadata watermark applied; cryptographic attestation receipt emitted.' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                DELIVERABLE 1
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Production-Ready Architecture
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Modular Regulatory Architecture Diagram
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Decoupling standardized global LLM orchestration from regional compliance sidecars (EU AI Act, NIST AI RMF, ASEAN PDPA).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Simulation trigger */}
            <button
              onClick={startSimulation}
              disabled={simulatingFlow}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                simulatingFlow
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500/50 shadow-md'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              {simulatingFlow ? 'Simulating EU Pipeline...' : 'Simulate EU Request Pipeline'}
            </button>

            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-800/80 rounded-lg border border-slate-700/60 p-0.5">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
                className="p-1.5 hover:bg-slate-700 text-slate-300 rounded transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono text-slate-400 min-w-12 text-center">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(1.8, z + 0.15))}
                className="p-1.5 hover:bg-slate-700 text-slate-300 rounded transition"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1.5 hover:bg-slate-700 text-slate-300 rounded transition"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Copy Mermaid */}
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Mermaid' : 'Copy Mermaid.js'}
            </button>
          </div>
        </div>

        {/* Live Simulation Progress Bar if active */}
        {simulatingFlow && (
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                Live Request Trace: Step {simulationStep} of 6 — {simulationSteps[simulationStep - 1]?.title}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">
                {simulationSteps[simulationStep - 1]?.desc}
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {simulationSteps.map((s) => (
                <div
                  key={s.step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s.step <= simulationStep
                      ? 'bg-amber-400 shadow-sm shadow-amber-500/50'
                      : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Diagram Canvas */}
      <div className="bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-2xl relative">
        <div className="absolute top-3 left-4 z-10 flex items-center gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300 font-mono backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            SYNTAX-VALID MERMAID.JS ENGINE
          </div>
          <span className="text-slate-500 text-xs hidden sm:inline">Use zoom controls or scroll to examine architecture layers</span>
        </div>

        <div className="p-4 sm:p-8 min-h-[540px] flex items-center justify-center overflow-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
          {svgContent ? (
            <div
              ref={containerRef}
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease-out',
              }}
              className="w-full flex justify-center [&>svg]:max-w-full [&>svg]:h-auto"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-3 text-slate-400 py-20">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-mono">Compiling modular architecture flowchart...</p>
            </div>
          )}
        </div>
      </div>

      {/* Deep Component Inspector & Technical Specifications */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-400" />
              Architectural Layer Deep Dive & Technical Controls
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Examine the concrete technical hooks, RFC protocols, and enforcement mechanisms per module.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setActiveInspector('EU')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeInspector === 'EU'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇪🇺 EU Stack (AI Act & GDPR)
            </button>
            <button
              onClick={() => setActiveInspector('US')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeInspector === 'US'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇺🇸 US Stack (NIST & EO 14110)
            </button>
            <button
              onClick={() => setActiveInspector('SEA')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeInspector === 'SEA'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              🇸🇬 SEA Stack (PDPA & Culture)
            </button>
            <button
              onClick={() => setActiveInspector('CORE')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                activeInspector === 'CORE'
                  ? 'bg-amber-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚙️ Core Standardized Engine
            </button>
          </div>
        </div>

        {/* Content based on active inspector */}
        {activeInspector === 'EU' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/70 border border-indigo-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 font-semibold">EU AI Act Art. 27</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300">FRIA Engine</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Fundamental Rights Impact Assessment</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated pre-inference classifier evaluating prompt context against EU High-Risk Annexes (HR-AI). Automatically generates signed JSON-LD audit telemetry for regulatory inspection.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-indigo-400">Hook:</span> preInferenceInterceptor()</div>
                <div><span className="text-indigo-400">Audit:</span> /var/log/fria/eidas-signed.log</div>
                <div><span className="text-indigo-400">Trigger:</span> Risk_Score &gt; 0.65 -&gt; HITL Gate</div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-indigo-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 font-semibold">GDPR Art. 9/17/28</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300">Confidential Enclave</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Hardware-Isolated Sovereign Vault</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Runs inside AMD SEV-SNP confidential virtual machines in Frankfurt. Customer payloads exist strictly in volatile encrypted RAM with zero persistent disk write, guaranteeing Right to Erasure.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-indigo-400">Residency:</span> AWS eu-central-1 (Frankfurt)</div>
                <div><span className="text-indigo-400">Keys:</span> Customer BYOK / EU Cloud HSM</div>
                <div><span className="text-indigo-400">Retention:</span> 0 seconds (Ephemeral memory)</div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-indigo-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400 font-semibold">EU AI Act Art. 50</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300">Fairness & Watermark</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Disparate Impact & Synthetic Tagging</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Injects cryptographically verifiable C2PA synthetic watermarking into every output token stream. Runs counterfactual demographic parity benchmarks to prevent employment or credit scoring discrimination.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-indigo-400">Standard:</span> C2PA v1.4 / SynthID Embedding</div>
                <div><span className="text-indigo-400">Bias Metric:</span> Disparate Impact Ratio &gt; 0.80</div>
                <div><span className="text-indigo-400">Reporting:</span> Exportable Works Council Report</div>
              </div>
            </div>
          </div>
        )}

        {activeInspector === 'US' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/70 border border-blue-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 font-semibold">NIST AI RMF 1.0</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300">Continuous Risk Gov</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Govern, Map, Measure, Manage</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enterprise logging framework mapping model inputs/outputs directly to NIST AI Risk Management subcategories. Automated red-team vulnerability testing against adversarial prompt injection benchmarks.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-blue-400">Framework:</span> NIST SP 1270 & AI RMF Core</div>
                <div><span className="text-blue-400">Red Teaming:</span> Daily automated jailbreak scans</div>
                <div><span className="text-blue-400">Audit Stream:</span> Splunk / Datadog SIEM connector</div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-blue-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 font-semibold">17 U.S.C. § 107</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300">IP Indemnity Engine</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Real-Time Copyright Filter</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vector similarity engine calculating semantic and verbatim distance against copyrighted source code and training text corpora. Enables unconditional $5M corporate IP indemnification backing.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-blue-400">Threshold:</span> Cosine similarity cutoff 0.88</div>
                <div><span className="text-blue-400">Policy:</span> Automated rewrite if verbatim match</div>
                <div><span className="text-blue-400">Insurance:</span> AIG/Chubb backed policy rider</div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-blue-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 font-semibold">EO 14110 & EAR</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-300">Dual-Use Security</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Federal Defense & Export Gating</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enforces White House Executive Order 14110 dual-use capability restrictions. Automatically disables biological, chemical, and automated cyber-offensive generation pathways for non-cleared US tenants.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-blue-400">Standards:</span> FedRAMP Moderate / High Ready</div>
                <div><span className="text-blue-400">Restriction:</span> ITAR / EAR Category 4 & 5</div>
                <div><span className="text-blue-400">Identity:</span> Okta SAML 2.0 with CAC/PIV option</div>
              </div>
            </div>
          </div>
        )}

        {activeInspector === 'SEA' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/70 border border-emerald-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-semibold">ASEAN CBDF</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">PDPA Router</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Multi-Jurisdictional Privacy Router</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dynamically routes and partitions data between Singapore PDPA, Indonesia UU PDP No. 27/2022, and Thailand PDPA. Ensures Indonesian financial records never leave domestic sovereign infrastructure.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-emerald-400">Nodes:</span> Singapore (AWS) & Jakarta (GCP)</div>
                <div><span className="text-emerald-400">Banking:</span> MAS TRM / OJK compliance compliant</div>
                <div><span className="text-emerald-400">Consent:</span> Dynamic ASEAN consent ledger</div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-emerald-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-semibold">Cultural NLP</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">Harmony Engine</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Localized Cultural & Sensitivity Filters</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trained on regional socio-political and religious sensitivities across ASEAN: multi-faith harmony (Halal ethical screening), Indonesian SARA safeguards, and Thai Lèse-majesté legal enforcement.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-emerald-400">Languages:</span> Bahasa ID/MY, Thai, VN, Singlish</div>
                <div><span className="text-emerald-400">Tone:</span> Polite honorific syntactical modes</div>
                <div><span className="text-emerald-400">Latency:</span> &lt; 15ms sidecar inspection</div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-emerald-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-semibold">Hybrid Relay</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">GLC / Sovereign Edge</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Sovereign On-Prem Sanitization Relay</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pre-packaged container deployed into domestic telcos and Government-Linked Corporations (GLCs) to sanitize internal documents before querying the regional AI cluster.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-emerald-400">Partners:</span> NCS (SG), Telkomsigma (ID)</div>
                <div><span className="text-emerald-400">Billing:</span> Local SGD/IDR/THB invoicing</div>
                <div><span className="text-emerald-400">Deployment:</span> Kubernetes / OpenShift on-prem</div>
              </div>
            </div>
          </div>
        )}

        {activeInspector === 'CORE' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-950/70 border border-amber-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-semibold">Global AI Core</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300">Universal Rails</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Universal Safety & Guardrails</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Standardized fast-path classification network intercepting prompt injections, jailbreaks, recursive token bombs, and core PII without region-specific model divergence.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-amber-400">Latency:</span> &lt; 8ms sub-network overhead</div>
                <div><span className="text-amber-400">Sandboxing:</span> Dynamic instruction-isolation</div>
                <div><span className="text-amber-400">Standard:</span> Shared across all global tenants</div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-amber-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-semibold">Central LLMs</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300">Speculative Engine</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Frontier Model Orchestration</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Zero codebase forking: single centralized model weight cluster running speculative decoding with dynamic LoRA adapter loading and multi-agent DAG task decomposition.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-amber-400">Architecture:</span> MoE (Mixture of Experts)</div>
                <div><span className="text-amber-400">Adapters:</span> Dynamic multi-tenant LoRA</div>
                <div><span className="text-amber-400">Efficiency:</span> Speculative token verification</div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-amber-950/80 rounded-xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400 font-semibold">Attestation</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300">Cryptographic Ledger</span>
              </div>
              <h4 className="font-semibold text-white text-sm">Signed Provenance Root</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every token completion generates an immutable ECDSA-signed hash certifying model version, system prompts, and safety checks for feeding downstream regional compliance ledgers.
              </p>
              <div className="bg-slate-900 rounded p-2.5 text-[11px] font-mono text-slate-300 space-y-1">
                <div><span className="text-amber-400">Signature:</span> ECDSA secp256k1 signature</div>
                <div><span className="text-amber-400">Telemetry:</span> OpenTelemetry non-PII spans</div>
                <div><span className="text-amber-400">Auditability:</span> 100% reproducible execution</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
