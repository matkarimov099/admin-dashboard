import { CalendarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import { humanizeDateTime } from '@/utils/humanize.ts';

interface TimelineCardProps {
	createdAt: string;
	updatedAt: string;
}

interface TimelineRowProps {
	label: string;
	date: string;
}

function TimelineRow({ label, date }: TimelineRowProps) {
	return (
		<div className="flex w-full items-center justify-between gap-4">
			<Typography variant="muted">{label}</Typography>
			<Typography variant="small" align="right" className="flex" weight="medium">
				{humanizeDateTime(date)}
			</Typography>
		</div>
	);
}

export function TimelineCard({ createdAt, updatedAt }: TimelineCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-sm">
					<CalendarIcon className="h-4 w-4" />
					<Typography variant="label">Timeline</Typography>
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2.5">
				<TimelineRow label="Created" date={createdAt} />
				<TimelineRow label="Updated" date={updatedAt} />
			</CardContent>
		</Card>
	);
}
