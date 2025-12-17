import { UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import type { User } from '@/features/users/types.ts';
import { getUserFullName, getUserInitials } from '../../utils/task-helpers.ts';

interface AssigneesCardProps {
	assignee?: User;
	isLoading?: boolean;
}

export function AssigneesCard({ assignee, isLoading }: AssigneesCardProps) {
	if (isLoading) {
		return (
			<div className="rounded-lg border bg-card text-card-foreground shadow-sm">
				<div className="flex flex-col space-y-1.5 p-6">
					<Skeleton className="h-5 w-24" />
				</div>
				<div className="p-6 pt-0">
					<Skeleton className="h-10 w-10 rounded-full" />
				</div>
			</div>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<UserIcon className="h-4 w-4" />
					<Typography variant="label">Assignee</Typography>
				</CardTitle>
			</CardHeader>
			<CardContent>
				{assignee ? (
					<Tooltip>
						<TooltipTrigger asChild>
							<Avatar className="h-10 w-10 cursor-pointer border-2 border-background transition-transform hover:z-10 hover:scale-110">
								<AvatarImage src={assignee.avatarUrl} alt={getUserFullName(assignee)} />
								<AvatarFallback className="bg-gradient-to-br from-green-500 to-teal-600 font-semibold text-white text-xs">
									{getUserInitials(assignee)}
								</AvatarFallback>
							</Avatar>
						</TooltipTrigger>
						<TooltipContent>
							<Typography variant="small" weight="medium">
								{getUserFullName(assignee)}
							</Typography>
							<Typography variant="muted">@{assignee.username}</Typography>
						</TooltipContent>
					</Tooltip>
				) : (
					<Typography variant="muted" italic>
						No assignee
					</Typography>
				)}
			</CardContent>
		</Card>
	);
}
