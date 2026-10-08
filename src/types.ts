export type RegionId = 'EU' | 'US' | 'SEA';

export interface RegionComplianceData {
  id: RegionId;
  name: string;
  flag: string;
  frameworks: string[];
  gatewayNode: string;
  primaryJurisdiction: string;
  complianceStack: {
    title: string;
    description: string;
    technicalControl: string;
    enforcementMechanism: string;
  }[];
}

export interface HofstedeDimensionScore {
  dimension: string;
  us: number;
  eu: number;
  sea: number;
  description: string;
  strategicImpact: string;
}

export interface GtmLocalizationRow {
  region: string;
  regionId: RegionId;
  keyHofstedeDimensions: string;
  uiUxAdaptation: {
    summary: string;
    concreteFeatures: string[];
    dashboardParadigm: string;
  };
  b2bSalesCycle: {
    cycleLength: string;
    keyStakeholders: string[];
    decisionDynamics: string;
    procurementChecklist: string[];
  };
  aiTrustFraming: {
    coreNarrative: string;
    transparencyDeliverables: string[];
    riskMitigationFocus: string;
  };
}

export interface FeatureTierItem {
  featureName: string;
  category: 'Compute & Throughput' | 'Model Customization' | 'Enterprise Governance' | 'Security & Privacy';
  tier1Western: 'Included (Uncapped)' | 'Dedicated PTU' | 'Standard' | 'Full Private HSM';
  tier2Sea: 'Metered / Burst Capped' | 'Pre-Shared Pods' | 'Not Available' | 'Multi-Tenant Encrypted';
  grayMarketMitigationValue: string;
}

export interface ArbitrageTelemetryStep {
  stepNumber: number;
  phase: string;
  timestamp: string;
  action: string;
  vector: string;
  systemDetection: string;
  status: 'benign' | 'suspicious' | 'flagged' | 'blocked' | 'quarantined';
  technicalDetails: Record<string, string>;
}
