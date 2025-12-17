import { ClockIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { humanizeDateTime } from '@/utils/humanize.ts';

interface TimeTrackingCardProps {
	estimate?: number;
	deadline?: string;
	completedAt?: string;
}

interface TimeRowProps {
	label: string;
	value: string | number;
	isCompleted?: boolean;
}

function TimeRow({ label, value, isCompleted }: TimeRowProps) {
	return (
		<div className="flex w-full items-center justify-between gap-4">
			<Typography variant="muted">{label}</Typography>
			<Typography
				align="right"
				variant="small"
				className={isCompleted ? 'flex text-green-600 dark:text-green-400' : ''}
			>
				{value}
			</Typography>
		</div>
	);
}

function EmptyTimeRow({ label }: { label: string }) {
	return (
		<div className="flex items-center justify-between">
			<Typography variant="muted" className="[&:not(:first-child)]:mt-0">
				{label}
			</Typography>
			<Typography variant="muted" italic className="[&:not(:first-child)]:mt-0">
				Not set
			</Typography>
		</div>
	);
}

export function TimeTrackingCard({ estimate, deadline, completedAt }: TimeTrackingCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-sm">
					<ClockIcon className="h-4 w-4" />
					<Typography variant="label" className="[&:not(:first-child)]:mt-0">
						Time Tracking
					</Typography>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2.5">
				{estimate ? (
					<TimeRow label="Estimate" value={`${estimate}h`} />
				) : (
					<EmptyTimeRow label="Estimate" />
				)}

				{deadline ? (
					<TimeRow label="Deadline" value={humanizeDateTime(deadline)} />
				) : (
					<EmptyTimeRow label="Deadline" />
				)}

				{completedAt && (
					<TimeRow label="Completed" value={humanizeDateTime(completedAt)} isCompleted />
				)}
			</CardContent>
		</Card>
	);
}
