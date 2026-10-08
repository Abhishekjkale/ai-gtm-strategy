import { HofstedeDimensionScore, GtmLocalizationRow, FeatureTierItem, ArbitrageTelemetryStep } from '../types';

export const MERMAID_DIAGRAM_CODE = `flowchart TB
    %% ==========================================
    %% GLOBAL INGRESS & USER LAYER
    %% ==========================================
    subgraph Users["Global User & Client Applications"]
        direction LR
        UserEU["🇪🇺 EU Enterprise Clients\\n(Frankfurt, Paris, Amsterdam)"]
        UserUS["🇺🇸 US Enterprise Clients\\n(New York, SF, FedGov)"]
        UserSEA["🇸🇬 SEA Enterprise Clients\\n(Singapore, Jakarta, Bangkok)"]
    end

    %% ==========================================
    %% REGIONAL EDGE & API GATEWAYS
    %% ==========================================
    subgraph Gateways["Dynamic Regional API Gateways"]
        direction TB
        GW_EU["🇪🇺 EU Edge Gateway (Frankfurt/Dublin)\\n• mTLS + Zero-Knowledge Auth\\n• Egress Geo-Fencing\\n• Sovereign Token Broker"]
        GW_US["🇺🇸 US Edge Gateway (US-East/US-West)\\n• SAML 2.0 / Okta Enterprise SSO\\n• FedRAMP Moderate / High Ingress\\n• IPsec Peering / AWS PrivateLink"]
        GW_SEA["🇸🇬 SEA Edge Gateway (Singapore/Jakarta)\\n• Multi-CDN Edge Low-Latency Proxies\\n• Multi-Currency Metering (SGD/IDR/THB)\\n• ASEAN Cross-Border Router"]
    end

    %% ==========================================
    %% REGIONAL COMPLIANCE PLUG-INS (DYNAMIC ATTACHMENT)
    %% ==========================================
    subgraph CompliancePlugins["Dynamic Regional Compliance Plug-ins (Sidecar & Interceptor APIs)"]
        direction TB

        subgraph EU_Plugin["🇪🇺 EU Compliance Stack (EU AI Act & GDPR)"]
            direction TB
            EU_FRIA["EU AI Act Art. 27 FRIA Engine\\n• High-Risk Classification Check\\n• Human-in-the-Loop Logging\\n• Algorithmic Impact Scoring"]
            EU_GDPR["GDPR Vault & Confidential Enclave\\n• Ephemeral Data Tokenization\\n• Right-to-be-Forgotten Vault\\n• Zero-Log EU Sovereign KMS"]
            EU_BIAS["Bias & Fairness Audit Trail\\n• Counterfactual Disparate Impact Logs\\n• Art. 50 Synthetic Watermarker\\n• Explainability (SHAP/LIME) Export"]
        end

        subgraph US_Plugin["🇺🇸 US Compliance Stack (NIST AI RMF & EO 14110)"]
            direction TB
            US_NIST["NIST AI RMF 1.0 Governor\\n• GOVERN / MAP / MEASURE / MANAGE Logs\\n• Adversarial Vulnerability Scanner\\n• Continuous Red-Team Telemetry"]
            US_COPYRIGHT["Copyright & IP Indemnification Filter\\n• Vector Distance vs Known IP Corpora\\n• Source Code Fingerprint Verifier\\n• Fair Use Risk Scoring Engine"]
            US_EO["White House EO 14110 & EAR Checks\\n• Dual-Use Cyber-Capability Classifier\\n• Defense / ITAR Ingress Restrictor\\n• Federal Safety Benchmark Attestor"]
        end

        subgraph SEA_Plugin["🇸🇬 SEA Compliance Stack (PDPA & Cultural Harmony)"]
            direction TB
            SEA_PDPA["Multi-Jurisdictional PDPA Router\\n• Singapore PDPA Consent Ledger\\n• Indonesia UU 27/2022 Data Boundary\\n• Thailand PDPA / Cross-Border CBDF"]
            SEA_CULTURE["Cultural Alignment & Moderation Filter\\n• Multi-Faith & Religious Sensitivity\\n• Lèse-Majesté & Regional Legal Rules\\n• SARA Harmony Engine (ID/MY/SG)"]
            SEA_SOVEREIGN["Sovereign Hybrid On-Prem Relay\\n• Local GLC / Banking Data Retention\\n• In-Country Ingest Sanitizer\\n• Multi-Lingual Sanitizer (ID/TH/EN)"]
        end
    end

    %% ==========================================
    %% CORE STANDARDIZED AI LAYER
    %% ==========================================
    subgraph CoreAILayer["Core Standardized AI Engine (Central Orchestration)"]
        direction TB
        
        subgraph UniversalRails["Universal Safety & Pre-Processing"]
            direction LR
            SafetyRail["Universal Guardrails Engine\\n• Prompt Injection Detection\\n• Jailbreak / Sandboxing Validator\\n• Baseline PII Scrubber"]
            EmbeddingEngine["Enterprise Embedding & Vector Fabric\\n• Shared High-Dimensional Semantic Space\\n• Domain Knowledge RAG Orchestrator"]
        end

        subgraph ModelCluster["Centralized LLM Orchestration"]
            direction LR
            Orchestrator["Inference Orchestration Engine\\n• Speculative Decoding & Routing\\n• Task Decomposition & Agent Graph\\n• Dynamic LoRA Adapter Ingestion"]
            FoundationModels["Standardized Foundation LLMs\\n• Global Multi-Modal LLM Tier-1\\n• Latency-Optimized Frontier SLM\\n• Code / Structured Synthesis Engine"]
        end

        subgraph Observability["Global Auditing & Telemetry Hub"]
            direction LR
            Telemetry["Unified OpenTelemetry Collector\\n(Non-PII Latency, Cost, Model Drift)"]
            SecAudit["Cryptographic Attestation Ledger\\n(Signed Output Hashes & Provenance)"]
        end
    end

    %% ==========================================
    %% TOPOLOGY CONNECTIONS
    %% ==========================================
    UserEU -->|"TLS 1.3 / eIDAS"| GW_EU
    UserUS -->|"Zero-Trust / mTLS"| GW_US
    UserSEA -->|"Edge CDN / Anycast"| GW_SEA

    GW_EU <-->|"Pre/Post Hook API"| EU_Plugin
    GW_US <-->|"Pre/Post Hook API"| US_Plugin
    GW_SEA <-->|"Pre/Post Hook API"| SEA_Plugin

    EU_Plugin -->|"Sanitized & Attested Payload"| SafetyRail
    US_Plugin -->|"Indemnified & RMF Scored Payload"| SafetyRail
    SEA_Plugin -->|"Culturally Filtered Payload"| SafetyRail

    SafetyRail --> EmbeddingEngine
    EmbeddingEngine --> Orchestrator
    Orchestrator --> FoundationModels
    FoundationModels --> SecAudit
    FoundationModels --> Telemetry

    SecAudit -.->|"Signed Verification Receipt"| GW_EU
    SecAudit -.->|"IP Indemnity Certificate"| GW_US
    SecAudit -.->|"PDPA Audit Record"| GW_SEA

    %% Styling
    classDef userClass fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#f8fafc;
    classDef gwClass fill:#1e293b,stroke:#06b6d4,stroke-width:2px,color:#f8fafc;
    classDef euClass fill:#1e1b4b,stroke:#6366f1,stroke-width:2px,color:#e0e7ff;
    classDef usClass fill:#172554,stroke:#3b82f6,stroke-width:2px,color:#dbeafe;
    classDef seaClass fill:#064e3b,stroke:#10b981,stroke-width:2px,color:#d1fae5;
    classDef coreClass fill:#18181b,stroke:#f59e0b,stroke-width:3px,color:#fef3c7;

    class UserEU,UserUS,UserSEA userClass;
    class GW_EU,GW_US,GW_SEA gwClass;
    class EU_FRIA,EU_GDPR,EU_BIAS euClass;
    class US_NIST,US_COPYRIGHT,US_EO usClass;
    class SEA_PDPA,SEA_CULTURE,SEA_SOVEREIGN seaClass;
    class SafetyRail,EmbeddingEngine,Orchestrator,FoundationModels,Telemetry,SecAudit coreClass;
`;

export const HOFSTEDE_DIMENSIONS_DATA: HofstedeDimensionScore[] = [
  {
    dimension: 'Power Distance Index (PDI)',
    us: 40,
    eu: 38, // Weighted avg (Germany 35, Nordics 31, France 68)
    sea: 84, // Weighted avg (Singapore 74, Malaysia 100, Indonesia 78, Philippines 94)
    description: 'Degree to which less powerful members accept and expect that power is distributed unequally.',
    strategicImpact: 'Dictates whether UI features empower individual contributors vs enforcing multi-tier executive approval hierarchies.'
  },
  {
    dimension: 'Individualism vs. Collectivism (IDV)',
    us: 91,
    eu: 67, // Germany 67, France 71, Nordics 69-74
    sea: 20, // Singapore 20, Indonesia 14, Thailand 20
    description: 'Degree of interdependence a society maintains among its members (I vs We).',
    strategicImpact: 'Drives preference for individual productivity dashboards with solo ROI vs collaborative team consensus and harmony metrics.'
  },
  {
    dimension: 'Uncertainty Avoidance Index (UAI)',
    us: 46,
    eu: 75, // Germany 65, France 86, Southern Europe 85+
    sea: 45, // Singapore 8, Indonesia 48, Malaysia 36, Thailand 64
    description: 'Extent to which members feel threatened by ambiguous, unknown, or unstructured situations.',
    strategicImpact: 'Determines tolerance for AI hallucinations, requiring strict mathematical explainability (EU) vs iterative experimentation (US).'
  },
  {
    dimension: 'Masculinity / Assertiveness (MAS)',
    us: 62,
    eu: 48, // Germany 66, France 43, Nordics 5-16
    sea: 48, // Singapore 48, Indonesia 46, Thailand 34, Malaysia 50
    description: 'Fundamental issue of what motivates people: wanting to be the best (masculine) vs liking what you do (feminine).',
    strategicImpact: 'Frames the software value proposition: aggressive competitive advantage and velocity vs stability and workplace harmony.'
  },
  {
    dimension: 'Long-Term Orientation (LTO)',
    us: 26,
    eu: 73, // Germany 83, France 63
    sea: 65, // Singapore 72, Indonesia 62, Thailand 32
    description: 'How every society maintains links with its own past while dealing with the challenges of the present and future.',
    strategicImpact: 'Influences contract length and ROI horizons: rapid quarterly payback vs multi-year institutional resilience and partnerships.'
  }
];

export const GTM_LOCALIZATION_MATRIX: GtmLocalizationRow[] = [
  {
    region: 'United States (US)',
    regionId: 'US',
    keyHofstedeDimensions: '• Low Power Distance (PDI: 40)\n• Hyper-Individualism (IDV: 91)\n• High Assertiveness / Velocity (MAS: 62)\n• Low Uncertainty Avoidance (UAI: 46)\n• Short-Term Orientation (LTO: 26)',
    uiUxAdaptation: {
      summary: 'Solo-Contributor Power Cockpit: Speed-First, High Agency, Frictionless Autonomy',
      concreteFeatures: [
        'Personal "Velocity Counter" displaying hours saved, tasks completed, and personal output amplification.',
        'High-agency UI toggles: "Temperature Slider", "Raw Prompt Tweaker", and 1-Click Autonomous Agent delegation.',
        'Self-service workspace provisioning with direct Stripe / corporate card instant checkout.',
        'Keyboard-driven command palette (Cmd+K) optimized for engineering and product power-users.'
      ],
      dashboardParadigm: 'Individual Contributor Hero View: Highlights personal efficiency benchmarks, solo productivity lift, and granular model parameter controls.'
    },
    b2bSalesCycle: {
      cycleLength: 'Rapid 30 to 90 days',
      keyStakeholders: [
        'VP of Engineering / Head of Product (Budget Owner)',
        'Individual Contributor Champion (Bottom-Up Driver)',
        'Chief Information Security Officer (CISO - Fast-track SOC2 audit)'
      ],
      decisionDynamics: 'Champion-driven, bottom-up product-led growth (PLG) converting to enterprise site licenses. VP-level discretionary budget authority without C-suite board approval.',
      procurementChecklist: [
        'SOC 2 Type II Report & HIPAA BAA availability',
        'Standard Delaware corporate MSA with uncapped IP indemnification',
        'Direct Slack/Teams shared channel with Solutions Engineering'
      ]
    },
    aiTrustFraming: {
      coreNarrative: '“Exponential Competitive Velocity & Uncapped Operational Leverage”',
      transparencyDeliverables: [
        'Commercially insured Copyright Indemnification Guarantee ($5M policy limit).',
        'Zero Data Retention (ZDR) toggles for proprietary model training.',
        'Enterprise SLA guaranteeing 99.99% uptime with dedicated inference burst capacity.'
      ],
      riskMitigationFocus: 'Intellectual Property infringement defense and vendor lock-in prevention.'
    }
  },
  {
    region: 'European Union (EU)',
    regionId: 'EU',
    keyHofstedeDimensions: '• Moderate-Low Power Distance (PDI: 38)\n• Individualism with Social Compact (IDV: 67)\n• High Uncertainty Avoidance (UAI: 75)\n• High Quality of Life / Restraint (MAS: 48)\n• Long-Term Orientation (LTO: 73)',
    uiUxAdaptation: {
      summary: 'Institutional Governance & Audit Cockpit: Privacy by Default, Zero Surveillance, Full Explainability',
      concreteFeatures: [
        'Works Council (Betriebsrat) Compliance Mode: Complete eradication of individual worker tracking, keystroke logging, and velocity metrics.',
        'Interactive "Audit & Explainability Drawer" revealing SHAP/LIME feature importance, training corpus taxonomy, and confidence intervals.',
        'Mandatory Human-in-the-Loop (HITL) gatekeeper modal before any automated downstream execution (GDPR Art. 22 compliance).',
        'Native French, German, and Dutch localization with strict technical terminology (not superficial automated machine translations).'
      ],
      dashboardParadigm: 'Collective Trust & Governance View: Aggregated department-level utility with zero employee profiling, real-time EU AI Act conformity badges, and carbon/energy footprint telemetry.'
    },
    b2bSalesCycle: {
      cycleLength: 'Deliberate 6 to 12 months',
      keyStakeholders: [
        'Data Protection Officer (DPO / DSB - Absolute Veto Power)',
        'Works Council (Betriebsrat) Representative (Mandatory Employee Co-Determination)',
        'Chief Risk Officer (CRO) & EU AI Act Compliance Lead',
        'Business Unit Sponsor (Managing Director / Vorstand)'
      ],
      decisionDynamics: 'Consensus-driven tripartite stakeholder alignment. The sale stalls if the Works Council or DPO is not engaged from Day 1. POC requires full Data Protection Impact Assessment (DPIA).',
      procurementChecklist: [
        'Standard Contractual Clauses (SCCs) & EU Sovereign Cloud residency attestations',
        'EU AI Act Article 27 Fundamental Rights Impact Assessment (FRIA) dossier',
        'BSI C5 (Germany) or SecNumCloud (France) certification roadmap',
        'Worker representative sign-off document'
      ]
    },
    aiTrustFraming: {
      coreNarrative: '“Verifiable Ethical Compliance, Sovereign Security & Long-Term Institutional Resilience”',
      transparencyDeliverables: [
        'Detailed Algorithmic Bias Audit Ledger with demographic parity benchmarks.',
        'Article 50 Transparency Watermarking cryptographic certificate.',
        'Sovereign compute isolation guarantee inside EU borders (Frankfurt/Paris AWS/GCP regions with EU-only personnel keys).'
      ],
      riskMitigationFocus: 'Regulatory sanction avoidance (€35M or 7% global turnover under EU AI Act) and worker privacy protection.'
    }
  },
  {
    region: 'Southeast Asia (SEA)',
    regionId: 'SEA',
    keyHofstedeDimensions: '• High Power Distance (PDI: 84)\n• Strong Collectivism & Community (IDV: 20)\n• Low-Moderate Uncertainty Avoidance (UAI: 45)\n• Relationship & Consensus Driven (MAS: 48)\n• High Long-Term Relationship Orientation (LTO: 65)',
    uiUxAdaptation: {
      summary: 'Hierarchical Consensus & Harmony Workspace: Multi-Tier Endorsement, Team Harmony, Multi-Lingual Context',
      concreteFeatures: [
        'Hierarchical "Endorsement Workflow": Prompts and outputs generated by junior analysts route directly to Department Directors for formal sign-off.',
        'Team Harmony & Collaboration Index celebrating collective milestones, knowledge-sharing breadth, and group upskilling.',
        'Multi-lingual code-switching engine supporting Bahasa Indonesia, Thai, Vietnamese, and Singlish with polite honorific syntax modes.',
        'High visual density with WhatsApp / LINE / WeChat enterprise conversational webhook integrations.'
      ],
      dashboardParadigm: 'Organizational Harmony & Leadership View: Executive-first rollups showing team alignment, enterprise upskilling indexes, and hierarchical task clearance status.'
    },
    b2bSalesCycle: {
      cycleLength: 'Relationship-First 6 to 9 months',
      keyStakeholders: [
        'Group Chief Executive Officer / Conglomerate Patriarch / Chairman',
        'Government-Linked Corporation (GLC) Board or Ministry Representative',
        'Local Tier-1 System Integrator (SI) Managing Partner',
        'Head of Digital Transformation / Enterprise IT'
      ],
      decisionDynamics: 'Top-down executive mandate driven by trusted relationships (Guanxi / Rukun). Formal procurement is secondary to senior relationship building; required local SI sponsorship in Indonesia/Malaysia.',
      procurementChecklist: [
        'Local legal entity or certified domestic joint-venture partner',
        'In-country data sovereignty compliance (Indonesia UU 27/2022, Singapore MAS TRM guidelines)',
        'Local currency billing (SGD, IDR, THB) with withholding tax (WHT) mitigation',
        'Commitment to local technical workforce training and capability transfer'
      ]
    },
    aiTrustFraming: {
      coreNarrative: '“Trusted Partner for National Digital Transformation & Harmonious Workforce Empowerment”',
      transparencyDeliverables: [
        'Local cultural and multi-religious sensitivity certification (Halal digital compliance, ethnic harmony safeguards).',
        'Hybrid Sovereign Edge deployment options for state-owned enterprises and regional tier-1 banks.',
        'Joint Innovation Center memorandum of understanding (MoU) with local universities or ministries.'
      ],
      riskMitigationFocus: 'Social disharmony, regulatory revocation by communications ministries, and preservation of executive authority.'
    }
  }
];

export const FEATURE_FENCING_MATRIX: FeatureTierItem[] = [
  {
    featureName: 'Dedicated Provisioned Throughput (PTUs)',
    category: 'Compute & Throughput',
    tier1Western: 'Dedicated PTU',
    tier2Sea: 'Metered / Burst Capped',
    grayMarketMitigationValue: 'Prevents Western high-frequency quantitative or production API workloads from leveraging low-cost SEA tokens.'
  },
  {
    featureName: 'Synthetic Latency Floor & BGP Ingress',
    category: 'Compute & Throughput',
    tier1Western: 'Included (Uncapped)',
    tier2Sea: 'Metered / Burst Capped',
    grayMarketMitigationValue: 'Enforces 180ms+ synthetic round-trip latency floor if queried outside ASEAN IP address blocks.'
  },
  {
    featureName: 'Custom LoRA Adapter Training & Fine-Tuning',
    category: 'Model Customization',
    tier1Western: 'Included (Uncapped)',
    tier2Sea: 'Not Available',
    grayMarketMitigationValue: 'Locks high-margin proprietary model distillation behind Western licensing; SEA tier restricted to base inference & RAG.'
  },
  {
    featureName: 'Enterprise Private VPC Peering (AWS/GCP/Azure)',
    category: 'Security & Privacy',
    tier1Western: 'Standard',
    tier2Sea: 'Not Available',
    grayMarketMitigationValue: 'Fortune 500 security protocols mandate Direct VPC Peering; lack of VPC in SEA tier creates architectural barrier for US/EU infosec.'
  },
  {
    featureName: 'Dedicated Cloud Hardware Security Module (HSM)',
    category: 'Security & Privacy',
    tier1Western: 'Full Private HSM',
    tier2Sea: 'Multi-Tenant Encrypted',
    grayMarketMitigationValue: 'Western banks and healthcare systems cannot legally clear compliance without customer-held HSM keys.'
  },
  {
    featureName: 'Real-Time SIEM/SOAR Audit Streaming',
    category: 'Enterprise Governance',
    tier1Western: 'Standard',
    tier2Sea: 'Not Available',
    grayMarketMitigationValue: 'Splunk, Datadog, and Sentinel real-time telemetry pipelines are strictly disabled on Tier 2 licenses.'
  },
  {
    featureName: 'FedRAMP High & BSI C5 Compliance Dossiers',
    category: 'Enterprise Governance',
    tier1Western: 'Standard',
    tier2Sea: 'Not Available',
    grayMarketMitigationValue: 'Regulatory certification packages only granted to customers with verified US/EU commercial entities.'
  },
  {
    featureName: '24/7/365 Tier-1 Dedicated TAM & 15m Response SLA',
    category: 'Enterprise Governance',
    tier1Western: 'Standard',
    tier2Sea: 'Not Available',
    grayMarketMitigationValue: 'SEA license is restricted to 8x5 SGT business hours with English/Bahasa support only.'
  }
];

export const ARBITRAGE_SCENARIO_DATA: ArbitrageTelemetryStep[] = [
  {
    stepNumber: 1,
    phase: 'Entity Onboarding & Billing Inception',
    timestamp: '2026-10-08T03:14:22Z',
    action: 'Registration of "FinGlobal Solutions Pte Ltd" on Singapore Self-Service Portal requesting Tier-2 SEA Enterprise Tier ($35k/yr vs $120k/yr US baseline).',
    vector: 'Commercial Arbitrage via Nominee Shell Entity',
    systemDetection: 'Corporate identity verification ingested. Billing address: Marina Bay Financial Centre, Singapore. Credit card issued by Singaporean merchant bank.',
    status: 'suspicious',
    technicalDetails: {
      'Entity Match': 'ACRA Registry verified (Company registered 14 days prior)',
      'Employee Footprint': 'LinkedIn headcount = 1 (Nominee Director)',
      'Domain Analysis': 'finglobal-ny.com redirected to finglobal.sg (Parent company New York address detected)'
    }
  },
  {
    stepNumber: 2,
    phase: 'mTLS Handshake & Ingress Routing',
    timestamp: '2026-10-08T04:22:10Z',
    action: 'First production API batch invocation (15,000 prompt completions/sec). Client routes through an AWS Singapore EC2 proxy instance.',
    vector: 'Technical Proxy Evasion',
    systemDetection: 'Edge Gateway inspects mTLS client certificate and TCP packet TTL. Unusually high packet round-trip time (RTT) observed before Singapore node ingress.',
    status: 'flagged',
    technicalDetails: {
      'Client IP': '13.250.xx.xx (AWS ap-southeast-1)',
      'Upstream RTT': '214 ms (Indicative of transatlantic or transpacific backhaul tunneling)',
      'TCP Fingerprint': 'Client OS signature matches Windows Server 2025 originating from US-East ASN 16509'
    }
  },
  {
    stepNumber: 3,
    phase: 'Identity & SSO Provider Deep Inspection',
    timestamp: '2026-10-08T05:01:45Z',
    action: 'Enterprise user authentication event via Okta SAML 2.0 assertions for 250 enterprise seats.',
    vector: 'Identity & Workforce Geolocation Leakage',
    systemDetection: 'SAML Assertion attributes decrypt. Identity Provider Issuer matches "finglobal-ny.okta.com". 96.8% of user session tokens resolve to residential/corporate fiber in Manhattan and New Jersey.',
    status: 'flagged',
    technicalDetails: {
      'IdP Issuer': 'https://finglobal-ny.okta.com',
      'User Geolocation': 'New York, NY (96.8%), Hoboken, NJ (3.2%), Singapore (0.0%)',
      'Working Hours': '09:00 - 17:00 Eastern Daylight Time (EDT)'
    }
  },
  {
    stepNumber: 4,
    phase: 'Heuristic Risk Engine Trigger & Synthetic Latency Penalty',
    timestamp: '2026-10-08T05:02:12Z',
    action: 'Heuristic engine calculates Arbitrage Confidence Score of 0.98. Dynamic traffic shaping activated.',
    vector: 'Active Technical Countermeasure',
    systemDetection: 'System enacts Section 14.3 Territorial Non-Circumvention. Traffic is immediately routed into the Synthetic Latency Container: 350ms artificial delay + API rate throttling to 50 req/min.',
    status: 'quarantined',
    technicalDetails: {
      'Confidence Score': '0.982 (Threshold: 0.85)',
      'Applied Action': 'Synthetic Latency Injection (350ms) + Tier 2 Concurrency Capped to 5',
      'Data Isolation': 'Payload blocked from routing to Frankfurt or US-East high-throughput clusters'
    }
  },
  {
    stepNumber: 5,
    phase: 'Commercial Remediation & Legal Cure Notice',
    timestamp: '2026-10-08T05:15:00Z',
    action: 'Automated remediation email and portal lock dispatched to FinGlobal CIO and Global Strategic Accounts Lead.',
    vector: 'Commercial Up-Sell & Contractual Enforcement',
    systemDetection: 'Account suspended from automated billing. Client issued 72-hour Cure Notice offering migration to Tier-1 Global Enterprise Multi-Region License ($140,000/yr) with 100% of paid Singapore fees credited.',
    status: 'blocked',
    technicalDetails: {
      'Contract Clause Triggered': 'Master Service Agreement Section 14.3 (Territorial Restrictions & Arbitrage Remedies)',
      'Commercial Outcome': 'FinGlobal CIO executed Global Enterprise contract within 36 hours; gross margin protected'
    }
  }
];

export const FULL_STRATEGIC_MARKDOWN_DELIVERABLES = `# GLOBAL GENERATIVE AI ENTERPRISE EXPANSION STRATEGY
## Modular Compliance Architecture, Cross-Cultural GTM Matrix, and Gray Market Pricing Defense
**Markets:** European Union (EU), United States (US), Southeast Asia (SEA)  
**Author:** Tech Strategy Consultant & Enterprise AI Product Architecture Practice  
**Classification:** Enterprise Strategic Briefing — Production-Ready Artifacts

---

## EXECUTIVE SUMMARY & THE "SPLINTERNET" PARADIGM

As generative artificial intelligence matures from experimental proofs-of-concept into core enterprise infrastructure, multinational software vendors face an unprecedented architectural dilemma: **The Splinternet**. The global regulatory and geopolitical landscape has fractured into three incompatible philosophical regimes:

1. **The European Union (EU):** A preemptive, fundamental-rights-first regime governed by the **EU Artificial Intelligence Act (Regulation 2024/1689)** and the **General Data Protection Regulation (GDPR)**. It mandates proactive Fundamental Rights Impact Assessments (FRIA), algorithmic transparency, strict data sovereignty, and collective labor co-determination.
2. **The United States (US):** A market-driven, speed-first, risk-management regime steered by the **NIST AI Risk Management Framework (AI RMF 1.0)**, White House Executive Orders (EO 14110), commercial copyright indemnification doctrines, and decentralized buyer autonomy.
3. **Southeast Asia (SEA):** A relationship-centric, multi-jurisdictional economic bloc characterized by localized Data Protection Acts (Singapore PDPA, Indonesia UU No. 27/2022, Thailand PDPA), state-guided digital transformation, and profound cultural/hierarchical sensitivities.

Building three bespoke codebases creates compounding technical debt, dilutes model capabilities, and destroys software gross margins. Conversely, deploying an un-localized monolith guarantees catastrophic regulatory fines in Brussels, severe IP litigation in Delaware, and cultural rejection in Jakarta and Singapore.

This document delivers a **production-ready tri-regional blueprint** that decouples the core generative AI engine from regional compliance and cultural friction, creating an operational model that scales globally while conforming locally.

---

# DELIVERABLE 1: MODULAR REGULATORY ARCHITECTURE DIAGRAM

The architecture below illustrates the decoupling of the **Standardized Core AI Layer** from the **Regional Compliance Plug-ins** via sidecar interceptors and dynamic API gateways.

\`\`\`mermaid
${MERMAID_DIAGRAM_CODE}
\`\`\`

### Architectural Specifications

#### 1. Core AI Layer (Globally Standardized)
* **Centralized LLM Orchestration:** Hosts the multi-model inference pipeline (Frontier reasoning LLMs, speculative decoding SLMs, and domain-tuned code generators). The core models undergo no regional code-forking; their weights, attention heads, and foundational prompt primitives remain globally unified to preserve engineering economies of scale.
* **Universal Guardrails Engine:** Implements baseline semantic guardrails: fast zero-shot prompt injection detection, vector jailbreak sandboxing, and baseline personally identifiable information (PII) pattern scrubbers (RFC 5322 email regexes, international credit card Luhn algorithms).
* **Enterprise Embedding & Vector Fabric:** High-dimensional semantic index facilitating Retrieval-Augmented Generation (RAG) across enterprise knowledge stores, maintaining shared document chunking and metadata namespaces.
* **Cryptographic Attestation Ledger:** Generates an immutable, cryptographically signed hash (SHA-256 with ECDSA key pair) for every generated completion, output token sequence, and prompt state. This serves as the provenance root for downstream regional compliance reporting.

#### 2. Regional API Gateways
* **EU Gateway (Frankfurt / Dublin Nodes):** Operates on AWS eu-central-1 and GCP europe-west3 sovereign partitions. Enforces mutual TLS (mTLS) with eIDAS-compliant corporate certificates, IP geofencing, and zero-knowledge ingress tokenization.
* **US Gateway (US-East / US-West Nodes):** Integrated with enterprise identity federation (SAML 2.0 / Okta / Azure AD), AWS GovCloud / FedRAMP Moderate-ready VPC endpoints, and direct IPsec / PrivateLink interconnects.
* **SEA Gateway (Singapore / Jakarta Nodes):** Leverages multi-CDN Anycast edge routing across ASEAN hubs (Singapore ap-southeast-1, Jakarta asia-southeast2), managing cross-border latency and handling multi-currency metered token billing (SGD, IDR, THB).

#### 3. Dynamic Regional Compliance Plug-ins
* **EU Compliance Stack:**
  * *EU AI Act Article 27 FRIA Engine:* Performs real-time classification against the EU AI Act High-Risk Annexes. Automatically logs model transparency parameters, intended purpose verification, and human oversight telemetry.
  * *GDPR Vault & Confidential Enclave:* Utilizes hardware-isolated confidential compute (AMD SEV-SNP) and ephemeral key management (KMS). Customer prompts are processed in-memory without persistent disk writes, ensuring strict compliance with GDPR Article 17 (Right to Erasure) and Article 28 (Processor obligations).
  * *Bias & Fairness Audit Trail:* Runs continuous counterfactual fairness evaluations and disparate impact scoring on model outputs. Automates Article 50 synthetic content watermarking using cryptographic metadata tagging.
* **US Compliance Stack:**
  * *NIST AI RMF 1.0 Governor:* Continuous telemetry mapping model behaviors into the four NIST functions: **Govern** (organizational policies), **Map** (context and threat vectors), **Measure** (quantitative benchmark drift and adversarial testing), and **Manage** (incident response orchestration).
  * *Copyright & IP Indemnification Filter:* Executes real-time vector distance checks against known copyrighted code bases and literary datasets. Outputs with a cosine similarity > 0.88 against proprietary corpora trigger automated rewrites or client-indemnified disclaimer tokens.
  * *Executive Order 14110 & EAR Checks:* Screens for dual-use cybersecurity, biological, or chemical threats; enforces ITAR restrictions and verifies export compliance under US Department of Commerce EAR regulations.
* **SEA Compliance Stack:**
  * *Multi-Jurisdictional PDPA Router:* Automatically parses and routes traffic according to jurisdictional data residency mandates: Singapore PDPA consent logs, Indonesia Law No. 27/2022 on Personal Data Protection (UU PDP) in-country processing flags, and Thailand PDPA cross-border rules.
  * *Cultural Alignment & Moderation Filter:* Custom transformer sidecar trained on localized linguistic and socio-political sensitivities: religious harmony filters, Indonesian SARA (Suku, Agama, Ras, dan Antargolongan) guidelines, and Thai Lèse-majesté compliance.
  * *Sovereign Hybrid On-Prem Relay:* Provides local caching and sanitization relays for state-owned enterprises (GLCs) and regional financial institutions requiring physical data presence within national borders.

---

# DELIVERABLE 2: CROSS-CULTURAL GTM LOCALIZATION MATRIX

A global product architecture fails if sales and interface paradigms do not respect local corporate sociology. The following matrix contrasts the US, EU, and SEA through **Hofstede’s Cultural Dimensions Theory**:

| Region | Key Hofstede Dimensions | UI/UX Adaptation Required | B2B Sales Cycle & Stakeholder Management | AI Trust & Transparency Framing |
| :--- | :--- | :--- | :--- | :--- |
| **United States (US)** | • **Low Power Distance (PDI: 40)**<br>• **Hyper-Individualism (IDV: 91)**<br>• **High Assertiveness (MAS: 62)**<br>• **Low Uncertainty Avoidance (UAI: 46)**<br>• **Short-Term Orientation (LTO: 26)** | **Solo-Contributor Power Cockpit**<br>• High-agency controls: Temperature sliders, prompt tweak drawers, and 1-click autonomous execution.<br>• Solo ROI counters: "Hours Saved This Week", "Individual Velocity Index".<br>• Frictionless self-service onboarding with instant credit card checkout and Cmd+K command palettes. | **Rapid 30–90 Day Bottom-Up Cycle**<br>• Champion-driven product-led growth (PLG) converting to enterprise site licenses.<br>• Primary Buyer: VP of Engineering or Head of Product with discretionary departmental budget.<br>• Minimal bureaucratic consensus; CISO involvement is transactional (SOC 2, SAML). | **"Exponential Velocity & Competitive Dominance"**<br>• Frame AI as an unconstrained human multiplier.<br>• Commercial insurance: $5M copyright indemnification guarantee.<br>• Trust established through velocity, uptime (99.99%), and vendor flexibility. |
| **European Union (EU)** | • **Moderate Power Distance (PDI: 38)**<br>• **Individualism with Social Compact (IDV: 67)**<br>• **High Uncertainty Avoidance (UAI: 75)**<br>• **Restraint / Workplace Well-Being (MAS: 48)**<br>• **Long-Term Orientation (LTO: 73)** | **Works Council Governance & Audit Cockpit**<br>• **Strict Zero-Surveillance:** Completely eradicate individual worker velocity metrics, keystroke telemetry, or ranking algorithms to comply with German/French labor laws.<br>• Explainability Drawer: Real-time SHAP/LIME feature importance, training corpus transparency, and confidence scores.<br>• Mandatory Human-in-the-Loop (HITL) confirmation modals for automated actions.<br>• Native multilingual interfaces (German, French, Dutch). | **Deliberate 6–12 Month Tripartite Consensus Cycle**<br>• Mandatory sign-off from: 1) Business Sponsor, 2) Data Protection Officer (DPO), and 3) Works Council (Betriebsrat).<br>• Sales team must provide pre-packaged DPIA (Data Protection Impact Assessment) dossiers on Day 1.<br>• Failure to engage employee representatives early guarantees deal veto. | **"Verifiable Ethics, Sovereign Privacy & Long-Term Resilience"**<br>• Frame AI as a compliant, safe institutional assistant.<br>• Hard deliverables: EU AI Act Article 27 FRIA certification, GDPR Art. 22 compliance, BSI C5/SecNumCloud alignment.<br>• Trust established through mathematical explainability and in-boundary sovereign cloud isolation. |
| **Southeast Asia (SEA)** | • **High Power Distance (PDI: 84)**<br>• **Strong Collectivism (IDV: 20)**<br>• **Moderate Uncertainty Avoidance (UAI: 45)**<br>• **Consensus & Relationship Focus (MAS: 48)**<br>• **Long-Term Relationship Focus (LTO: 65)** | **Hierarchical Harmony & Consensus Workspace**<br>• **Hierarchical Review Flows:** "Submit to Senior Director for Endorsement" workflow before model completions can be shared externally.<br>• Group Harmony Metrics: Team-wide collaboration scores, knowledge sharing indexes, and workforce upskilling badges.<br>• Code-switching conversational UX: Native support for Bahasa Indonesia, Thai, Vietnamese, and Singlish with honorific tone selectors.<br>• Mobile-first conversational density (WhatsApp/LINE integrations). | **Relationship-Driven 6–9 Month Top-Down Cycle**<br>• Sales initiate exclusively at Chairman, CEO, or Conglomerate Patriarch level.<br>• Mandatory local System Integrator (SI) partnership (e.g., Telkomsigma in Indonesia, NCS in Singapore).<br>• Formal procurement follows executive relationship building (Guanxi / Rukun); face-to-face executive dinners mandatory. | **"National Digital Transformation & Harmonious Empowerment"**<br>• Frame AI as a patriotic partner for corporate modernization and workforce empowerment.<br>• Emphasize local data residency (Singapore MAS TRM, Indonesia UU 27/2022).<br>• Trust established through executive personal relationships, local entity presence, and government MoU partnerships. |

---

# DELIVERABLE 3: GRAY MARKET PRICING DEFENSE SHEET

To capture high-growth market share in Southeast Asia, our enterprise pricing must be Purchasing Power Parity (PPP) adjusted (e.g., 55–65% discount against Western list prices). However, without rigorous structural fences, US and European multinational corporations will exploit this price delta via shell subsidiaries or arbitrage intermediaries. 

The strategy below establishes a **triple-lock defense mechanism** combining feature gating, technical SLA geo-locking, and heuristic arbitrage detection.

### 1. Feature Fencing Strategy
We partition product capabilities into three distinct tiers. Core cognitive utility is available globally, while capital-intensive, high-compliance features are locked behind Western enterprise tiers:

| Product Feature / Capability | Tier 1: Western Enterprise (US & EU) | Tier 2: SEA Growth Tier | Gray Market Arbitrage Mitigation Effect |
| :--- | :--- | :--- | :--- |
| **Dedicated Provisioned Throughput (PTUs)** | Included (Dedicated GPU instances) | Metered / Shared Cluster with Burst Throttling | Western high-volume production systems cannot rely on variable latency or rate-limited shared clusters. |
| **Synthetic Latency Floor & BGP Routing** | Sub-40ms Direct Cloud Routing | Enforced 180ms+ Latency Floor if accessed from non-ASEAN IPs | Prevents real-time algorithmic trading or high-velocity US operations from utilizing SEA API keys. |
| **Custom LoRA Fine-Tuning & Adapter Ingestion** | Included (Automated distributed training pipelines) | Restricted to Base Models & Standard RAG | Enterprise AI teams demanding domain-specific model distillation must purchase Tier 1 Western licenses. |
| **Enterprise Private VPC Peering** | Direct AWS PrivateLink / GCP Service Connect | Public HTTPS Endpoints only (mTLS) | Fortune 500 infosec policies forbid sending proprietary data over public internet endpoints. |
| **Dedicated Cloud HSM (Customer-Held Keys)** | Dedicated Hardware Security Module (BYOK) | Multi-Tenant Encrypted Key Storage | EU GDPR Art. 32 and US HIPAA/GLBA standards mandate customer-managed encryption keys. |
| **Real-Time SIEM / SOAR Log Streaming** | Native Datadog, Splunk, Sentinel streaming | 30-day downloadable CSV reports only | US/EU SOC teams will not certify software without real-time security telemetry ingestion. |
| **Regulatory Compliance Dossiers** | Full EU AI Act FRIA, BSI C5, and FedRAMP packages | Standard Local PDPA documentation only | Compliance officers in Western jurisdictions cannot pass external audits on Tier 2 licensing. |
| **Support SLA & Named Technical Account Mgr** | 24/7/365 Dedicated TAM, 15-minute response SLA | 8x5 Local SGT Business Hours, 4-hour response | Mission-critical Western workloads cannot accept Asian time-zone-only support coverage. |

---

### 2. Technical, Legal & SLA Geo-Locking Boundaries

#### Technical & Architectural Boundaries
1. **Compute & Data Residency Binding:** 
   Tier 2 SEA API keys are cryptographically bound to AWS ap-southeast-1 (Singapore) and GCP asia-southeast2 (Jakarta) inference nodes. Outbound token responses to non-ASEAN CIDR IP blocks are routed through synthetic latency injection containers that add a mandatory **180ms–350ms delay**, rendering the API non-viable for Western production microservices.
2. **mTLS Certificate & BGP Geofencing:** 
   API gateways inspect TCP Time-to-Live (TTL) and round-trip ping times. Requests presenting low RTT from US-East or EU-West IP addresses despite claiming to originate in Singapore trigger instant heuristic inspection and traffic rate-limiting (maximum 50 requests/minute).

#### Legal & Commercial Boundaries
1. **Territorial Entity Verification:** 
   Tier 2 contracts require certified domestic registration: Singapore ACRA, Indonesian NIB (Nomor Induk Berusaha), or Malaysian SSM company registration. Nominee shell companies formed within 90 days are subject to enhanced corporate vetting.
2. **In-Territory Currency & Tax Nexus:** 
   Tier 2 billing is executed exclusively in local currencies (SGD, IDR, THB, MYR) via local banking rails, triggering local withholding tax (WHT) and permanent establishment nexus, making multi-million dollar shell invoicing legally hazardous for Western parent companies.
3. **Master Service Agreement (MSA) Section 14.3 — Territorial Non-Circumvention Clause:**
   *"Licensee warrants that software tokens provisioned under Tier 2 SEA shall be queried exclusively by bona fide employees and technical workloads physically located within ASEAN member states. Query volumes exceeding 10% from IP addresses outside ASEAN constitute a material breach, immediately voiding all SLAs, triggering automatic contract reclassification to Tier 1 Western rates retroactively, and assessing liquidated damages equal to 200% of the price differential."*

---

### 3. Concrete Arbitrage Defense Scenario: "FinGlobal Corp"

#### Context & Threat Profile
* **Attacker:** *FinGlobal Corp*, a tier-2 quantitative market research firm headquartered in New York City with a secondary office in London.
* **Objective:** Obtain 250 enterprise seats and 100M monthly tokens at SEA pricing ($35,000/year) instead of the US Tier 1 Enterprise rate ($120,000/year), saving $85,000/year (71% discount).
* **Attack Method:** FinGlobal establishes a nominal subsidiary in Singapore (*"FinGlobal Solutions Pte Ltd"*) using a corporate secretarial service at Marina Bay Financial Centre, provisions a Tier 2 license with a local corporate card, and configures an AWS Singapore EC2 instance as a reverse proxy for their New York quantitative analyst team.

#### Multi-Stage Automated Detection & Enforcement Workflow

\`\`\`
[Stage 1: Entity Ingestion] ---> [Stage 2: Network Telemetry] ---> [Stage 3: SSO Inspection] ---> [Stage 4: Quarantine] ---> [Stage 5: Legal Cure]
\`\`\`

1. **Stage 1 — Heuristic Entity Analysis (Day 1):**
   * *Trigger:* Onboarding crawler flags that *FinGlobal Solutions Pte Ltd* was incorporated 14 days prior with a paid-up capital of $1 SGD.
   * *Data Correlation:* The corporate email domain \`@finglobal.sg\` points to MX records shared with \`finglobal-ny.com\`. Dun & Bradstreet API reveals zero local payroll headcount in Singapore. Risk Score: **0.45 (Elevated)**.

2. **Stage 2 — Network Telemetry & RTT Anomaly Detection (Day 3):**
   * *Trigger:* High-volume API calls begin routing through AWS Singapore proxy IP (\`13.250.xx.xx\`).
   * *Inspection:* Gateway deep-packet inspection measures average packet round-trip time (RTT) from the client to the proxy at 214ms. TCP handshake characteristics (OS window size and TCP timestamps) match Windows Server instances in US-East (Northern Virginia), indicating cross-continental SSH/WireGuard tunneling. Risk Score: **0.78 (High)**.

3. **Stage 3 — Identity & SSO Geolocation Leakage (Day 5):**
   * *Trigger:* User authentication assertion occurs via SAML 2.0.
   * *Inspection:* Decrypted SAML metadata reveals the Identity Provider (IdP) is \`https://finglobal-ny.okta.com\`. 242 of the 250 connected employee browser sessions originate from Comcast Business and Verizon Fios IP ranges in Manhattan and New Jersey between 09:00 and 17:00 EDT. Singapore usage is 0.0%. Risk Score: **0.98 (Confirmed Arbitrage)**.

4. **Stage 4 — Automated Technical Quarantine (Instantaneous):**
   * *Action:* The Arbitrage Defense Engine automatically triggers **Arbitrage Quarantine Level 2**:
     * Injects **350ms of synthetic latency** on every API response.
     * Throttles maximum concurrency from 500 to 5 concurrent streams.
     * Blocks API access to fine-tuned model endpoints and RAG document syncs.
     * The New York quant team's models begin timing out, immediately breaking their automated research pipelines.

5. **Stage 5 — Commercial Remediation & Conversion (Hour +2):**
   * *Action:* The automated system generates a formal **Section 14.3 Non-Circumvention Violation Notice** sent directly to the New York CIO and General Counsel, carbon-copying the Global VP of Sales.
   * *Resolution:* The portal displays an un-bypassable conversion modal:
     > *"Notice of Territorial Variance: 98.4% of traffic for account finglobal.sg originates outside the ASEAN licensed geography. Under MSA Section 14.3, this account has been converted to a Tier 1 Global Enterprise License. A balance of $85,000 has been invoiced, with previous payments credited. Click below to execute the Enterprise Addendum and restore sub-30ms throughput immediately."*
   * *Commercial Result:* Within 36 hours, the New York CIO executes the Tier 1 Global Enterprise contract. The enterprise avoids a court battle, protects its 82% software gross margin, and captures the full $120,000 contract value.
`;
