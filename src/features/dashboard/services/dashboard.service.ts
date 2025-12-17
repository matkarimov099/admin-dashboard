import type {
  BurnoutRiskResponse,
  CodeQualityScore,
  DashboardOverview,
  DayPerformanceResponse,
  MVPResponse,
  PeakProductivityResponse,
  RecentActivitiesResponse,
  SprintMetricsResponse,
  TrendForecast,
  UserBadgesResponse,
  WorkTypeComparison,
} from '@/features/dashboard/types.ts';
import axiosClient from '@/plugins/axios.ts';

/**
 * Get a dashboard overview with all KPIs
 */
export async function getDashboardOverview(): Promise<DashboardOverview> {
  const response = await axiosClient.get<DashboardOverview>('/dashboard/overview');
  return response.data;
}

/**
 * Get peak productivity hours heatmap
 */
export async function getPeakProductivityHours(data?: {
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<PeakProductivityResponse> {
  const response = await axiosClient.post<PeakProductivityResponse>(
    '/dashboard/peak-productivity-hours',
    data
  );
  return response.data;
}

/**
 * Get burnout risk analysis
 */
export async function getBurnoutRisks(params?: {
  userIds?: string[];
  weeksToAnalyze?: number;
}): Promise<BurnoutRiskResponse> {
  const response = await axiosClient.post<BurnoutRiskResponse>(
    '/dashboard/burnout-risk/calculate',
    params
  );
  return response.data;
}

/**
 * Get a weekly MVP (Most Valuable Player)
 */
export async function getWeeklyMVP(data?: {
  weekOffset?: number;
  topN?: number;
}): Promise<MVPResponse> {
  const response = await axiosClient.post<MVPResponse>('/dashboard/weekly-mvp', data);
  return response.data;
}

/**
 * Get day-of-week performance
 */
export async function getDayPerformance(data?: {
  weeksToAnalyze?: number;
  userId?: string;
}): Promise<DayPerformanceResponse> {
  const response = await axiosClient.post<DayPerformanceResponse>(
    '/dashboard/day-performance',
    data
  );
  return response.data;
}

/**
 * Get remote versus office work comparison
 */
export async function getWorkTypeComparison(data?: {
  weeksToAnalyze?: number;
}): Promise<WorkTypeComparison> {
  const response = await axiosClient.post<WorkTypeComparison>(
    '/dashboard/work-type-comparison',
    data
  );
  return response.data;
}

/**
 * Calculate code quality score
 */
export async function calculateCodeQuality(data: {
  userId: string;
  projectId: string;
  weeksToAnalyze?: number;
}): Promise<CodeQualityScore> {
  const response = await axiosClient.post<CodeQualityScore>(
    '/dashboard/code-quality/calculate',
    data
  );
  return response.data;
}

/**
 * Get recent team activities
 */
export async function getRecentActivities(data?: {
  since?: string;
  limit?: number;
  userId?: string;
}): Promise<RecentActivitiesResponse> {
  const response = await axiosClient.post<RecentActivitiesResponse>(
    '/dashboard/recent-activities',
    data
  );
  return response.data;
}

/**
 * Get a monthly trend forecast
 */
export async function getTrendForecast(data?: {
  weeksToAnalyze?: number;
  forecastWeeks?: number;
}): Promise<TrendForecast> {
  const response = await axiosClient.post<TrendForecast>('/dashboard/trend-forecast', data);
  return response.data;
}

/**
 * Get sprint velocity metrics
 */
export async function getSprintMetrics(data?: {
  sprintCount?: number;
  sprintDuration?: number;
}): Promise<SprintMetricsResponse> {
  const response = await axiosClient.post<SprintMetricsResponse>('/dashboard/sprint-metrics', data);
  return response.data;
}

/**
 * Get user achievement badges
 */
export async function getUserBadges(userId: string): Promise<UserBadgesResponse> {
  const response = await axiosClient.get<UserBadgesResponse>(`/dashboard/badges/${userId}`);
  return response.data;
}
