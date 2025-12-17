import { useQuery } from '@tanstack/react-query';
import {
  getBurnoutRisks,
  getDashboardOverview,
  getDayPerformance,
  getPeakProductivityHours,
  getRecentActivities,
  getSprintMetrics,
  getTrendForecast,
  getUserBadges,
  getWeeklyMVP,
  getWorkTypeComparison,
} from '@/features/dashboard/services/dashboard.service.ts';

const QUERY_KEYS = {
  OVERVIEW: 'dashboard-overview',
  PEAK_HOURS: 'peak-productivity-hours',
  BURNOUT_RISKS: 'burnout-risks',
  WEEKLY_MVP: 'weekly-mvp',
  DAY_PERFORMANCE: 'day-performance',
  WORK_TYPE_COMPARISON: 'work-type-comparison',
  RECENT_ACTIVITIES: 'recent-activities',
  TREND_FORECAST: 'trend-forecast',
  SPRINT_METRICS: 'sprint-metrics',
  USER_BADGES: 'user-badges',
};

// Toggle this to use mock data instead of real API
const USE_MOCK_DATA = false;

/**
 * Hook to get a complete dashboard overview
 */
export function useDashboardOverview() {
  return useQuery({
    queryKey: [QUERY_KEYS.OVERVIEW],
    queryFn: getDashboardOverview,
    staleTime: 60000, // 1 minute
    refetchInterval: USE_MOCK_DATA ? false : 120000, // Don't auto-refetch for mock data
  });
}

/**
 * Hook to get peak productivity hours
 */
export function usePeakProductivityHours(params?: {
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  return useQuery({
    queryKey: [QUERY_KEYS.PEAK_HOURS, params],
    queryFn: () => getPeakProductivityHours(params),
    staleTime: 300000, // 5 minutes
  });
}

/**
 * Hook to get burnout risks
 */
export function useBurnoutRisks(params?: { userIds?: string[]; weeksToAnalyze?: number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.BURNOUT_RISKS, params],
    queryFn: () => getBurnoutRisks(params),
    staleTime: 300000, // 5 minutes
  });
}

/**
 * Hook to get weekly MVP
 */
export function useWeeklyMVP(params?: { weekOffset?: number; topN?: number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.WEEKLY_MVP, params],
    queryFn: () => getWeeklyMVP(params),
    staleTime: 300000, // 5 minutes
  });
}

/**
 * Hook to get day-of-week performance
 */
export function useDayPerformance(params?: { weeksToAnalyze?: number; userId?: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.DAY_PERFORMANCE, params],
    queryFn: () => getDayPerformance(params),
    staleTime: 300000, // 5 minutes
  });
}

/**
 * Hook to get work type comparison
 */
export function useWorkTypeComparison(params?: { weeksToAnalyze?: number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.WORK_TYPE_COMPARISON, params],
    queryFn: () => getWorkTypeComparison(params),
    staleTime: 300000, // 5 minutes
  });
}

/**
 * Hook to get recent activities with auto-refresh
 */
export function useRecentActivities(params?: { since?: string; limit?: number; userId?: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.RECENT_ACTIVITIES, params],
    queryFn: () => getRecentActivities(params),
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Refetch every 30 seconds for live updates
  });
}

/**
 * Hook to get trend forecast
 */
export function useTrendForecast(params?: { weeksToAnalyze?: number; forecastWeeks?: number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.TREND_FORECAST, params],
    queryFn: () => getTrendForecast(params),
    staleTime: 600000, // 10 minutes
  });
}

/**
 * Hook to get sprint metrics
 */
export function useSprintMetrics(params?: { sprintCount?: number; sprintDuration?: number }) {
  return useQuery({
    queryKey: [QUERY_KEYS.SPRINT_METRICS, params],
    queryFn: () => getSprintMetrics(params),
    staleTime: 600000, // 10 minutes
  });
}

/**
 * Hook to get user badges
 */
export function useUserBadges(userId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_BADGES, userId],
    queryFn: () => getUserBadges(userId),
    staleTime: 300000, // 5 minutes
    enabled: !!userId,
  });
}
