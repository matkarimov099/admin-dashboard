// Dashboard KPIs
export interface DashboardKPIs {
  todayHours: number;
  weeklyHours: number;
  productivity: number;
  activeProjects: number;
  teamSize: number;
}

// Peak Productivity Heatmap
export interface HeatmapDataPoint {
  day: string;
  hour: number;
  sessionCount: number;
  intensity: number;
  avgDuration: number;
}

export interface HeatmapMetadata {
  totalSessions: number;
  dateRange: {
    from: string;
    to: string;
  };
  peakDay: string;
  peakHour: number;
  peakValue: number;
}

export interface PeakProductivityResponse {
  data: HeatmapDataPoint[];
  metadata: HeatmapMetadata;
}

// Burnout Risk
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface BurnoutFactors {
  overtimeHours: number;
  consecutiveDays: number;
  lateNightSessions: number;
  weekendDays: number;
  avgWeeklyHours: number;
}

export interface BurnoutRisk {
  userId: string;
  userName: string;
  riskLevel: RiskLevel;
  score: number;
  factors: BurnoutFactors;
  recommendations: string[];
  calculatedAt: string;
}

export interface BurnoutRiskResponse {
  risks: BurnoutRisk[];
  teamAverage: number;
  atRiskCount: number;
}

// Weekly MVP
export interface MetricScore {
  value: number;
  score: number;
  weight: number;
}

export interface ScoreBreakdown {
  hoursWorked: MetricScore;
  codeContribution: MetricScore;
  consistency: MetricScore;
  collaboration: MetricScore;
}

export interface MVPScore {
  userId: string;
  userName: string;
  avatarUrl?: string;
  totalScore: number;
  breakdown: ScoreBreakdown;
  badges: string[];
  rank: number;
}

export interface WeekInfo {
  weekNumber: number;
  startDate: string;
  endDate: string;
}

export interface TeamStats {
  totalHours: number;
  totalCommits: number;
  avgScore: number;
  participatingUsers: number;
}

export interface MVPResponse {
  week: WeekInfo;
  topPerformers: MVPScore[];
  teamStats: TeamStats;
}

// Day Performance
export interface DayPerformance {
  day: string;
  avgHours: number;
  avgCommits: number;
  sessionCount: number;
  productivityScore: number;
}

export interface DayInsights {
  bestDay: string;
  worstDay: string;
  avgWeeklyHours: number;
  peakPerformance: number;
}

export interface DayPerformanceResponse {
  data: DayPerformance[];
  insights: DayInsights;
}

// Work Type Comparison
export interface WorkTypeStats {
  totalSessions: number;
  avgHours: number;
  totalCommits: number;
  avgPauseMinutes: number;
  userCount: number;
}

export interface ComparisonInsights {
  hoursComparisonPercent: number;
  commitsComparisonPercent: number;
  preferredMode: string;
}

export interface WorkTypeComparison {
  remote: WorkTypeStats;
  office: WorkTypeStats;
  insights: ComparisonInsights;
}

// Code Quality
export interface QualityMetrics {
  commitMessageQuality: number;
  codeChurnRate: number;
  avgCommitSize: number;
  codeDiversity: number;
}

export interface CodeQualityScore {
  userId: string;
  userName: string;
  projectName: string;
  overallScore: number;
  metrics: QualityMetrics;
  grade: string;
  recommendations: string[];
}

// Recent Activities
export interface ActivityMetadata {
  workType?: string;
  pauseReason?: string;
  hours?: number;
  projectName?: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  avatarUrl?: string;
  eventType: string;
  metadata?: ActivityMetadata;
  description: string;
  icon: string;
}

export interface RecentActivitiesResponse {
  activities: ActivityEvent[];
  lastUpdated: string;
}

// Trend Forecast
export interface DataPoint {
  date: string;
  value: number;
}

export interface ForecastPoint {
  date: string;
  value: number;
  confidence: number;
}

export interface TrendForecast {
  historical: DataPoint[];
  forecast: ForecastPoint[];
  trend: string;
  trendPercentage: number;
}

// Sprint Metrics
export interface SprintMetrics {
  sprintNumber: number;
  startDate: string;
  endDate: string;
  totalHours: number;
  totalCommits: number;
  teamSize: number;
  velocity: number;
  commitsPerPerson: number;
  completionRate: number;
}

export interface SprintMetricsResponse {
  sprints: SprintMetrics[];
  averageVelocity: number;
  trend: string;
}

// Achievement Badges
export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: BadgeRarity;
  earnedAt?: string;
}

export interface BadgeProgress {
  earned: number;
  total: number;
  percentage: number;
}

export interface UserBadgesResponse {
  userId: string;
  earnedBadges: Badge[];
  availableBadges: Badge[];
  progress: BadgeProgress;
}

// Dashboard Overview
export interface DashboardOverview {
  kpis: DashboardKPIs;
  peakHours: HeatmapDataPoint[];
  burnoutRisks: BurnoutRisk[];
  weeklyMVP: MVPResponse;
  recentActivities: RecentActivitiesResponse;
  trendForecast: TrendForecast;
}
