
export interface ContentIdea {
  title: string;
  format: string;
  description: string;
}

export interface KeyPillar {
    pillar: string;
    description: string;
}

export interface DistributionChannel {
    channel: string;
    strategy: string;
}

export interface Kpi {
    metric: string;
    goal: string;
}

export interface GeneratedStrategy {
  keyPillars: KeyPillar[];
  contentIdeas: ContentIdea[];
  distributionChannels: DistributionChannel[];
  kpis: Kpi[];
}

export interface StrategyInput {
    topic: string;
    goal: string;
    audience: string;
    tone: string;
    framework: string;
}

export interface Strategy extends GeneratedStrategy, StrategyInput {
    id: string;
    createdAt: string;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}
