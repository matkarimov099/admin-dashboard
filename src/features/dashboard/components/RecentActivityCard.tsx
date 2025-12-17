import { formatDistanceToNow } from 'date-fns';
import { Activity } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Typography } from '@/components/ui/typography';
import type { RecentActivitiesResponse } from '@/features/dashboard/types';

interface RecentActivityCardProps {
	activities?: RecentActivitiesResponse;
}

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
	// Ensure activities.activities is always an array
	const safeActivities = Array.isArray(activities?.activities) ? activities.activities : [];

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Activity className="h-5 w-5 animate-pulse text-green-500" />
					Recent Activity
				</CardTitle>
				<CardDescription>Latest team updates</CardDescription>
			</CardHeader>
			<CardContent>
				<ScrollArea className="h-96">
					<div className="space-y-3">
						{safeActivities.length === 0 ? (
							<div className="py-8 text-center">
								<Typography variant="muted">No recent activities</Typography>
							</div>
						) : (
							safeActivities.map((activity) => (
								<div
									key={activity.id}
									className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
								>
									{activity.avatarUrl ? (
										<Avatar className="h-8 w-8">
											<AvatarImage src={activity.avatarUrl} />
											<AvatarFallback>{activity.userName[0]}</AvatarFallback>
										</Avatar>
									) : (
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-lg">
											{activity.icon}
										</div>
									)}

									<div className="flex-1 space-y-1">
										<div className="flex items-baseline gap-2">
											<Typography variant="p" className="font-semibold">
												{activity.userName}
											</Typography>
											<Typography variant="small" className="text-muted-foreground">
												{activity.description}
											</Typography>
										</div>

										<Typography variant="small" className="text-muted-foreground">
											{formatDistanceToNow(new Date(activity.timestamp), {
												addSuffix: true,
											})}
										</Typography>

										{activity.metadata && (
											<div className="flex gap-2">
												{activity.metadata.workType && (
													<Badge variant="outline" className="text-xs">
														{activity.metadata.workType}
													</Badge>
												)}
												{activity.metadata.hours && (
													<Badge variant="secondary" className="text-xs">
														{activity.metadata.hours.toFixed(1)}h
													</Badge>
												)}
											</div>
										)}
									</div>
								</div>
							))
						)}
					</div>
				</ScrollArea>
			</CardContent>
		</Card>
	);
}
