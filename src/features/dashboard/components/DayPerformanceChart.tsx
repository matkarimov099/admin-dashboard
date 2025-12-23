import { Calendar } from 'lucide-react';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { DayPerformanceResponse } from '@/features/dashboard/types';

interface DayPerformanceChartProps {
  data: DayPerformanceResponse;
}

export function DayPerformanceChart({ data }: DayPerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Weekly Performance Pattern
        </CardTitle>
        <CardDescription>Team productivity across the week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={data.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="day" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            <Radar
              name="Productivity Score"
              dataKey="productivityScore"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <small className="text-xs sm:text-sm font-medium leading-none text-muted-foreground">
              Best Day
            </small>
            <p className="text-sm sm:text-base leading-6 sm:leading-7 font-bold">
              {data.insights.bestDay}
            </p>
          </div>
          <div className="text-center">
            <small className="text-xs sm:text-sm font-medium leading-none text-muted-foreground">
              Avg Weekly Hours
            </small>
            <p className="text-sm sm:text-base leading-6 sm:leading-7 font-bold">
              {data.insights.avgWeeklyHours.toFixed(1)}h
            </p>
          </div>
          <div className="text-center">
            <small className="text-xs sm:text-sm font-medium leading-none text-muted-foreground">
              Peak Performance
            </small>
            <p className="text-sm sm:text-base leading-6 sm:leading-7 font-bold">
              {data.insights.peakPerformance.toFixed(0)}%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
