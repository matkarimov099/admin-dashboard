import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Typography } from '@/components/ui/typography.tsx';

interface TaskDescriptionProps {
	description?: string;
}

export function TaskDescription({ description }: TaskDescriptionProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Description</CardTitle>
			</CardHeader>
			<CardContent className="max-h-[500px] overflow-y-auto">
				{description ? (
					<Typography
						variant="p"
						className="whitespace-pre-wrap break-words text-sm leading-relaxed sm:text-base [&:not(:first-child)]:mt-0"
					>
						{description}
					</Typography>
				) : (
					<Typography variant="muted" italic>
						No description provided
					</Typography>
				)}
			</CardContent>
		</Card>
	);
}
