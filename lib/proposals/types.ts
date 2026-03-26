export interface Proposal {
  slug: string;
  clientName: string;
  projectTitle: string;
  subtitle: string;
  startDate: string;
  duration: string;
  coverLabel: string;
  meta: MetaItem[];
  diagnostico: DiagnosticoSection;
  canales: CanalesSection;
  contenido: ContenidoSection;
  phases: Phase[];
  resumen: ResumenSection;
  errores: CriticalError[];
  footerQuote: string;
  footerMeta: string;
}

export interface MetaItem {
  label: string;
  value: string;
}

export interface DiagnosticoSection {
  sectionNumber: string;
  title: string;
  intro: string;
  callout: Callout;
  scorecard: ScorecardDimension[];
  assets: UnexploitedAsset[];
}

export interface Callout {
  variant: 'navy' | 'teal' | 'amber' | 'cons';
  title: string;
  text: string;
}

export interface ScorecardDimension {
  dimension: string;
  score: string;
  color: 'red' | 'amber' | 'green';
  note: string;
}

export interface UnexploitedAsset {
  type: string;
  typeColor?: string;
  description: string;
}

export interface CanalesSection {
  sectionNumber: string;
  title: string;
  intro: string;
  channels: ChannelStrategy[];
}

export interface ChannelStrategy {
  name: string;
  subtitle: string;
  headerColor: string;
  profiles?: UnexploitedAsset[];
  pillars?: ContentPillar[];
  audiences?: UnexploitedAsset[];
  keywords?: Keyword[];
}

export interface ContentPillar {
  num: number;
  name: string;
  objective: string;
}

export interface Keyword {
  text: string;
  priority: 'high' | 'medium' | 'long';
}

export interface ContenidoSection {
  sectionNumber: string;
  title: string;
  intro: string;
  callout: Callout;
  scripts: VideoScript[];
  assets: ContentAsset[];
}

export interface VideoScript {
  label: string;
  labelColor: string;
  borderColor: string;
  quote: string;
}

export interface ContentAsset {
  type: string;
  quantity: string;
  destination: string;
  highlight?: boolean;
  highlightColor?: string;
}

export interface Milestone {
  title: string;
  description: string;
  relatedTasks: string[];
}

export interface Phase {
  id: number;
  anchorId: string;
  title: string;
  subtitle: string;
  color: string;
  sessions: ConsultingSession[];
  tasks: ProposalTask[];
  milestones?: Milestone[];
  budget: BudgetSection;
}

export interface ConsultingSession {
  type: string;
  hours: string;
  price: string;
  title: string;
  description: string;
}

export interface ProposalTask {
  id: string;
  title: string;
  description: string;
  responsible: string;
  week: string;
  isConsulting: boolean;
}

export interface BudgetSection {
  items: BudgetLine[];
  consultingItems: BudgetLine[];
  total: string;
  totalLabel: string;
}

export interface BudgetLine {
  label: string;
  sublabel?: string;
  amount: string;
  isHighlight?: boolean;
}

export interface ResumenSection {
  sectionNumber: string;
  title: string;
  totals: TotalCard[];
  summaryRows: SummaryRow[];
  kpis: KpiMetric[];
}

export interface TotalCard {
  label: string;
  value: string;
  sub: string;
  color?: string;
}

export interface SummaryRow {
  phase: string;
  phaseColor: string;
  period: string;
  focus: string;
  totalCLP: string;
  consulting: string;
  leads: string;
}

export interface KpiMetric {
  name: string;
  values: KpiValue[];
  tool: string;
}

export interface KpiValue {
  period: string;
  value: string;
  isTarget?: boolean;
}

export interface CriticalError {
  title: string;
  description: string;
}
