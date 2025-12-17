import { ExternalLink, LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import type { LinkedTask } from '@/features/tasks/types.ts';

interface LinkedTasksListProps {
	linkedTaskUrls: LinkedTask[];
}

export function LinkedTasksList({ linkedTaskUrls }: LinkedTasksListProps) {
	if (!linkedTaskUrls || linkedTaskUrls.length === 0) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-base sm:text-lg">
					<LinkIcon className="h-4 w-4 sm:h-5 sm:w-5" />
					<Typography variant="label">Linked Tasks</Typography>
					<Typography variant="muted">({linkedTaskUrls.length})</Typography>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					{linkedTaskUrls.map((link) => (
						<Typography
							variant="a"
							key={link.url}
							href={link.url}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-2 rounded-lg border border-border p-3 transition-colors hover:border-primary hover:bg-accent/50"
						>
							<ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
							<Typography
								variant="small"
								weight="medium"
								className="min-w-0 flex-1 break-all text-primary hover:underline"
							>
								{link.url}
							</Typography>
						</Typography>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
