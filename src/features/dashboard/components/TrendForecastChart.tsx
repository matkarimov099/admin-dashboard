import { format } from 'date-fns';
import { Minus, TrendingDown, TrendingUp } from 'lucide-react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import type { TrendForecast } from '@/features/dashboard/types';

interface TrendForecastChartProps {
	data?: TrendForecast;
}

export function TrendForecastChart({ data }: TrendForecastChartProps) {
	// Ensure arrays exist and are valid
	const safeHistorical = Array.isArray(data?.historical) ? data.historical : [];
	const safeForecast = Array.isArray(data?.forecast) ? data.forecast : [];

	if (!data || safeHistorical.length === 0 || safeForecast.length === 0) {
		return (
			<Card className="col-span-2">
				<CardHeader>
					<CardTitle>Monthly Hours Forecast</CardTitle>
					<CardDescription>
						Projected team hours for the next 4 weeks based on historical trends
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="py-8 text-center">
						<Typography variant="muted">No forecast data available</Typography>
					</div>
				</CardContent>
			</Card>
		);
	}

	const combinedData = [
		...safeHistorical.map((d) => ({ ...d, type: 'historical' })),
		...safeForecast.map((d) => ({ ...d, type: 'forecast' })),
	];

	const getTrendIcon = () => {
		if (data.trend === 'increasing') return <TrendingUp className="h-5 w-5 text-green-500" />;
		if (data.trend === 'decreasing') return <TrendingDown className="h-5 w-5 text-red-500" />;
		return <Minus className="h-5 w-5 text-gray-500" />;
	};

	return (
		<Card className="col-span-2">
			<CardHeader>
				<CardTitle>Monthly Hours Forecast</CardTitle>
				<CardDescription>
					Projected team hours for the next 4 weeks based on historical trends
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width="100%" height={300}>
					<LineChart data={combinedData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" tickFormatter={(date) => format(new Date(date), 'MMM dd')} />
						<YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="value"
							data={safeHistorical}
							stroke="#8884d8"
							strokeWidth={2}
							name="Actual Hours"
							dot={{ r: 4 }}
						/>
						<Line
							type="monotone"
							dataKey="value"
							data={safeForecast}
							stroke="#82ca9d"
							strokeWidth={2}
							strokeDasharray="5 5"
							name="Forecasted Hours"
							dot={{ r: 4 }}
						/>
					</LineChart>
				</ResponsiveContainer>

				<div className="mt-4 grid grid-cols-3 gap-4">
					<div className="text-center">
						<Typography variant="small" className="text-muted-foreground">
							Trend
						</Typography>
						<div className="flex items-center justify-center gap-1">
							{getTrendIcon()}
							<Typography variant="p" className="font-bold">
								{data.trendPercentage > 0 && '+'}
								{data.trendPercentage.toFixed(1)}%
							</Typography>
						</div>
					</div>

					<div className="text-center">
						<Typography variant="small" className="text-muted-foreground">
							Next Week Prediction
						</Typography>
						<Typography variant="p" className="font-bold">
							{safeForecast[0]?.value.toFixed(1)}h
						</Typography>
					</div>

					<div className="text-center">
						<Typography variant="small" className="text-muted-foreground">
							Confidence
						</Typography>
						<Typography variant="p" className="font-bold">
							{safeForecast[0]?.confidence.toFixed(0)}%
						</Typography>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
