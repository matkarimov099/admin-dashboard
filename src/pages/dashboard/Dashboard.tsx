import {AlertCircle} from 'lucide-react';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Skeleton} from '@/components/ui/skeleton';
import {BurnoutRiskCard} from '@/features/dashboard/components/BurnoutRiskCard';
import {DayPerformanceChart} from '@/features/dashboard/components/DayPerformanceChart';
import {KPICards} from '@/features/dashboard/components/KPICards';
import {WeeklyMVPCard} from '@/features/dashboard/components/WeeklyMVPCard';
import {WorkTypeComparisonCard} from '@/features/dashboard/components/WorkTypeComparisonCard';
import {useDashboardOverview} from '@/features/dashboard/hooks/use-dashboard';

export default function Dashboard() {
    const {data: overview, isLoading, error} = useDashboardOverview();

    if (isLoading) {
        return (
            <div className="container py-4">
                <div className="mt-6 space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                        {Array.from({length: 5}, (_, i) => `skeleton-${i}`).map(key => (
                            <Skeleton key={key} className="h-32"/>
                        ))}
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                        <Skeleton key="skeleton-left" className="h-96"/>
                        <Skeleton key="skeleton-right" className="h-96"/>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-4">
                <Alert variant="destructive" className="mt-6">
                    <AlertCircle className="h-4 w-4"/>
                    <AlertDescription>
                        Failed to load dashboard data. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!overview) {
        return null;
    }

    return (
        <div className="">
            <div className="mt-3 space-y-6">
                {/* KPI Cards */}
                <KPICards kpis={overview?.kpis}/>

                {/* Main Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Burnout Risk */}
                    <BurnoutRiskCard risks={overview?.burnoutRisks}/>

                    {/* Weekly MVP */}
                    <WeeklyMVPCard mvpData={overview?.weeklyMVP}/>
                </div>

                {/* Charts Row */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Day Performance */}
                    <DayPerformanceChart
                        data={{
                            data: [
                                {
                                    day: 'Monday',
                                    avgHours: 7.5,
                                    avgCommits: 3.2,
                                    sessionCount: 24,
                                    productivityScore: 78,
                                },
                                {
                                    day: 'Tuesday',
                                    avgHours: 8.2,
                                    avgCommits: 4.1,
                                    sessionCount: 28,
                                    productivityScore: 92,
                                },
                                {
                                    day: 'Wednesday',
                                    avgHours: 7.8,
                                    avgCommits: 3.8,
                                    sessionCount: 26,
                                    productivityScore: 85,
                                },
                                {
                                    day: 'Thursday',
                                    avgHours: 7.6,
                                    avgCommits: 3.5,
                                    sessionCount: 25,
                                    productivityScore: 82,
                                },
                                {
                                    day: 'Friday',
                                    avgHours: 6.9,
                                    avgCommits: 2.8,
                                    sessionCount: 22,
                                    productivityScore: 72,
                                },
                                {
                                    day: 'Saturday',
                                    avgHours: 2.1,
                                    avgCommits: 0.8,
                                    sessionCount: 5,
                                    productivityScore: 25,
                                },
                                {
                                    day: 'Sunday',
                                    avgHours: 1.5,
                                    avgCommits: 0.5,
                                    sessionCount: 3,
                                    productivityScore: 18,
                                },
                            ],
                            insights: {
                                bestDay: 'Tuesday',
                                worstDay: 'Sunday',
                                avgWeeklyHours: 41.6,
                                peakPerformance: 92,
                            },
                        }}
                    />

                    {/* Work Type Comparison */}
                    <WorkTypeComparisonCard
                        data={{
                            remote: {
                                totalSessions: 156,
                                avgHours: 7.8,
                                totalCommits: 234,
                                avgPauseMinutes: 45.2,
                                userCount: 12,
                            },
                            office: {
                                totalSessions: 89,
                                avgHours: 7.2,
                                totalCommits: 189,
                                avgPauseMinutes: 52.1,
                                userCount: 8,
                            },
                            insights: {
                                hoursComparisonPercent: 8.3,
                                commitsComparisonPercent: 23.8,
                                preferredMode: 'remote',
                            },
                        }}
                    />
                </div>

            </div>
        </div>
    );
}


