import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { BurnoutRisk } from '@/features/dashboard/types';
import { cn } from '@/utils/utils';

interface BurnoutRiskCardProps {
  risks?: BurnoutRisk[];
}

export function BurnoutRiskCard({ risks = [] }: BurnoutRiskCardProps) {
  // Ensure risks is always an array
  const safeRisks = Array.isArray(risks) ? risks : [];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical':
        return 'border-red-500 bg-red-50 dark:bg-red-950';
      case 'high':
        return 'border-orange-500 bg-orange-50 dark:bg-orange-950';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      default:
        return 'border-green-500 bg-green-50 dark:bg-green-950';
    }
  };

  const getRiskBadgeVariant = (level: string): 'destructive' | 'default' | 'secondary' => {
    if (level === 'critical' || level === 'high') return 'destructive';
    if (level === 'medium') return 'default';
    return 'secondary';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-500" />
          Burnout Risk Monitor
        </CardTitle>
        <CardDescription>Team health and work-life balance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {safeRisks.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-600 text-xs sm:text-sm dark:text-gray-400">
                No risk data available
              </p>
            </div>
          ) : (
            safeRisks.slice(0, 5).map(risk => (
              <div
                key={risk.userId}
                className={cn('rounded-lg border p-4', getRiskColor(risk.riskLevel))}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm leading-6 sm:text-base sm:leading-7">
                      {risk.userName}
                    </p>
                    <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                      Risk Score: {risk.score.toFixed(0)}/100
                    </small>
                  </div>
                  <Badge variant={getRiskBadgeVariant(risk.riskLevel)}>
                    {risk.riskLevel.toUpperCase()}
                  </Badge>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                      Overtime: +{risk.factors.overtimeHours.toFixed(1)}h/week
                    </small>
                  </div>
                  <div>
                    <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                      Consecutive: {risk.factors.consecutiveDays} days
                    </small>
                  </div>
                  <div>
                    <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                      Late sessions: {risk.factors.lateNightSessions}
                    </small>
                  </div>
                  <div>
                    <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                      Weekend: {risk.factors.weekendDays} days
                    </small>
                  </div>
                </div>

                {Array.isArray(risk.recommendations) && risk.recommendations.length > 0 && (
                  <div className="space-y-1">
                    <small className="font-semibold text-xs leading-none sm:text-sm">
                      Recommendations:
                    </small>
                    {risk.recommendations.slice(0, 2).map(rec => (
                      <small
                        key={rec}
                        className="font-medium text-muted-foreground text-xs leading-none sm:text-sm"
                      >
                        • {rec}
                      </small>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
