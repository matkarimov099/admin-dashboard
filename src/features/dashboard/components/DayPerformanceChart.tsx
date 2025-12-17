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
import { Typography } from '@/components/ui/typography';
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
						<Typography variant="small" className="text-muted-foreground">
							Best Day
						</Typography>
						<Typography variant="p" className="font-bold">
							{data.insights.bestDay}
						</Typography>
					</div>
					<div className="text-center">
						<Typography variant="small" className="text-muted-foreground">
							Avg Weekly Hours
						</Typography>
						<Typography variant="p" className="font-bold">
							{data.insights.avgWeeklyHours.toFixed(1)}h
						</Typography>
					</div>
					<div className="text-center">
						<Typography variant="small" className="text-muted-foreground">
							Peak Performance
						</Typography>
						<Typography variant="p" className="font-bold">
							{data.insights.peakPerformance.toFixed(0)}%
						</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
