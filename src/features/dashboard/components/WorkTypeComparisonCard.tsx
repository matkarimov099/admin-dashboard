import { Building, Home, Wifi } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
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
							<Typography variant="h3">Remote Work</Typography>
						</div>

						<div className="space-y-3">
							<div>
								<Typography variant="small" className="text-muted-foreground">
									Avg Hours/Session
								</Typography>
								<Typography variant="h2">{data.remote.avgHours.toFixed(1)}h</Typography>
							</div>

							<div>
								<Typography variant="small" className="text-muted-foreground">
									Total Sessions
								</Typography>
								<Typography variant="p" className="font-semibold">
									{data.remote.totalSessions}
								</Typography>
							</div>

							<div>
								<Typography variant="small" className="text-muted-foreground">
									Avg Break Time
								</Typography>
								<Typography variant="p" className="font-semibold">
									{data.remote.avgPauseMinutes.toFixed(0)} min
								</Typography>
							</div>

							<div>
								<Typography variant="small" className="text-muted-foreground">
									Team Members
								</Typography>
								<Typography variant="p" className="font-semibold">
									{data.remote.userCount}
								</Typography>
							</div>
						</div>
					</div>

					{/* Office Column */}
					<div className="space-y-4 rounded-lg border border-green-200 bg-green-50 p-4 dark:bg-green-950">
						<div className="flex items-center gap-2">
							<Building className="h-5 w-5 text-green-600" />
							<Typography variant="h3">Office Work</Typography>
						</div>

						<div className="space-y-3">
							<div>
								<Typography variant="small" className="text-muted-foreground">
									Avg Hours/Session
								</Typography>
								<Typography variant="h2">{data.office.avgHours.toFixed(1)}h</Typography>
							</div>

							<div>
								<Typography variant="small" className="text-muted-foreground">
									Total Sessions
								</Typography>
								<Typography variant="p" className="font-semibold">
									{data.office.totalSessions}
								</Typography>
							</div>

							<div>
								<Typography variant="small" className="text-muted-foreground">
									Avg Break Time
								</Typography>
								<Typography variant="p" className="font-semibold">
									{data.office.avgPauseMinutes.toFixed(0)} min
								</Typography>
							</div>

							<div>
								<Typography variant="small" className="text-muted-foreground">
									Team Members
								</Typography>
								<Typography variant="p" className="font-semibold">
									{data.office.userCount}
								</Typography>
							</div>
						</div>
					</div>
				</div>

				{/* Insights */}
				<div className="mt-6 rounded-lg bg-muted p-4">
					<Typography variant="p" className="font-semibold">
						📊 Insights
					</Typography>
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
