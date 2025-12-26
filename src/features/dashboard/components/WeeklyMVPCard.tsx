import { Trophy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { MVPResponse } from '@/features/dashboard/types';

interface WeeklyMVPCardProps {
  mvpData?: MVPResponse;
}

export function WeeklyMVPCard({ mvpData }: WeeklyMVPCardProps) {
  // Ensure topPerformers is always an array
  const safeTopPerformers = Array.isArray(mvpData?.topPerformers) ? mvpData.topPerformers : [];

  if (!mvpData || safeTopPerformers.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-[var(--color-warning)]" />
            Weekly MVP
          </CardTitle>
          <CardDescription>Most Valuable Players</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="py-8 text-center">
            <p className="text-gray-600 text-xs sm:text-sm dark:text-gray-400">
              No MVP data available
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-[var(--color-warning)]" />
          Weekly MVP
        </CardTitle>
        <CardDescription>Most Valuable Players - Week {mvpData.week.weekNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {safeTopPerformers.slice(0, 3).map((mvp, index) => (
            <div key={mvp.userId} className="mb-4 rounded-lg border bg-white p-4 dark:bg-gray-900">
              <div className="mb-3 flex items-center gap-4">
                <div className="text-3xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</div>

                {mvp.avatarUrl && (
                  <Avatar>
                    <AvatarImage src={mvp.avatarUrl} />
                    <AvatarFallback>{mvp.userName[0]}</AvatarFallback>
                  </Avatar>
                )}

                <div className="flex-1">
                  <p className="font-bold text-sm leading-6 sm:text-base sm:leading-7">
                    {mvp.userName}
                  </p>
                  <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                    Score: {mvp.totalScore.toFixed(0)}/100
                  </small>
                </div>

                <div className="text-right">
                  <div className="font-bold text-2xl text-[var(--color-warning)]">#{mvp.rank}</div>
                </div>
              </div>

              {/* Score breakdown */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Hours ({mvp.breakdown.hoursWorked.weight}%)</span>
                  <span className="font-semibold">
                    {mvp.breakdown.hoursWorked.score.toFixed(0)}
                  </span>
                </div>
                <Progress value={mvp.breakdown.hoursWorked.score} className="h-2" />

                <div className="flex justify-between text-sm">
                  <span>Code ({mvp.breakdown.codeContribution.weight}%)</span>
                  <span className="font-semibold">
                    {mvp.breakdown.codeContribution.score.toFixed(0)}
                  </span>
                </div>
                <Progress value={mvp.breakdown.codeContribution.score} className="h-2" />
              </div>

              {/* Badges */}
              {Array.isArray(mvp.badges) && mvp.badges.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {mvp.badges.map(badge => (
                    <Badge key={badge} variant="secondary">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
