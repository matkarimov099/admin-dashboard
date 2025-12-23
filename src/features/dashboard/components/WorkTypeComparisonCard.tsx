import { Building, Home, Wifi } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { WorkTypeComparison } from '@/features/dashboard/types';

interface WorkTypeComparisonCardProps {
  data: WorkTypeComparison;
}

export function WorkTypeComparisonCard({ data }: WorkTypeComparisonCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Remote vs Office Performance
        </CardTitle>
        <CardDescription>Work mode comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {/* Remote Column */}
          <div className="space-y-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:bg-blue-950">
            <div className="flex items-center gap-2">
              <Wifi className="h-5 w-5 text-blue-600" />
              <h3 className="scroll-m-20 font-semibold text-lg tracking-tight sm:text-xl md:text-2xl">
                Remote Work
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                  Avg Hours/Session
                </small>
                <h2 className="scroll-m-20 pb-2 font-semibold text-xl tracking-tight first:mt-0 sm:text-2xl md:text-3xl">
                  {data.remote.avgHours.toFixed(1)}h
                </h2>
              </div>

              <div>
                <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                  Total Sessions
                </small>
                <p className="font-semibold text-sm leading-6 sm:text-base sm:leading-7">
                  {data.remote.totalSessions}
                </p>
              </div>

              <div>
                <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                  Avg Break Time
                </small>
                <p className="font-semibold text-sm leading-6 sm:text-base sm:leading-7">
                  {data.remote.avgPauseMinutes.toFixed(0)} min
                </p>
              </div>

              <div>
                <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                  Team Members
                </small>
                <p className="font-semibold text-sm leading-6 sm:text-base sm:leading-7">
                  {data.remote.userCount}
                </p>
              </div>
            </div>
          </div>

          {/* Office Column */}
          <div className="space-y-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:bg-green-950">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-green-600" />
              <h3 className="scroll-m-20 font-semibold text-lg tracking-tight sm:text-xl md:text-2xl">
                Office Work
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                  Avg Hours/Session
                </small>
                <h2 className="scroll-m-20 pb-2 font-semibold text-xl tracking-tight first:mt-0 sm:text-2xl md:text-3xl">
                  {data.office.avgHours.toFixed(1)}h
                </h2>
              </div>

              <div>
                <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                  Total Sessions
                </small>
                <p className="font-semibold text-sm leading-6 sm:text-base sm:leading-7">
                  {data.office.totalSessions}
                </p>
              </div>

              <div>
                <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                  Avg Break Time
                </small>
                <p className="font-semibold text-sm leading-6 sm:text-base sm:leading-7">
                  {data.office.avgPauseMinutes.toFixed(0)} min
                </p>
              </div>

              <div>
                <small className="font-medium text-muted-foreground text-xs leading-none sm:text-sm">
                  Team Members
                </small>
                <p className="font-semibold text-sm leading-6 sm:text-base sm:leading-7">
                  {data.office.userCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="mt-6 rounded-lg bg-muted p-4">
          <p className="font-semibold text-sm leading-6 sm:text-base sm:leading-7">📊 Insights</p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              Remote workers average{' '}
              <strong>
                {data.insights.hoursComparisonPercent > 0 ? '+' : ''}
                {data.insights.hoursComparisonPercent.toFixed(1)}%
              </strong>{' '}
              {data.insights.hoursComparisonPercent > 0 ? 'more' : 'fewer'} hours
            </li>
            <li>
              Preferred mode: <strong>{data.insights.preferredMode}</strong>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
