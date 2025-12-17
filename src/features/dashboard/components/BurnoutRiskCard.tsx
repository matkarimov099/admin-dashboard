import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
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
              <Typography variant="muted">No risk data available</Typography>
            </div>
          ) : (
            safeRisks.slice(0, 5).map(risk => (
              <div
                key={risk.userId}
                className={cn('rounded-lg border p-4', getRiskColor(risk.riskLevel))}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <Typography variant="p" className="font-semibold">
                      {risk.userName}
                    </Typography>
                    <Typography variant="small" className="text-muted-foreground">
                      Risk Score: {risk.score.toFixed(0)}/100
                    </Typography>
                  </div>
                  <Badge variant={getRiskBadgeVariant(risk.riskLevel)}>
                    {risk.riskLevel.toUpperCase()}
                  </Badge>
                </div>

                <div className="mb-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <Typography variant="small" className="text-muted-foreground">
                      Overtime: +{risk.factors.overtimeHours.toFixed(1)}h/week
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-muted-foreground">
                      Consecutive: {risk.factors.consecutiveDays} days
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-muted-foreground">
                      Late sessions: {risk.factors.lateNightSessions}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="small" className="text-muted-foreground">
                      Weekend: {risk.factors.weekendDays} days
                    </Typography>
                  </div>
                </div>

                {Array.isArray(risk.recommendations) && risk.recommendations.length > 0 && (
                  <div className="space-y-1">
                    <Typography variant="small" className="font-semibold">
                      Recommendations:
                    </Typography>
                    {risk.recommendations.slice(0, 2).map(rec => (
                      <Typography key={rec} variant="small" className="text-muted-foreground">
                        • {rec}
                      </Typography>
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
