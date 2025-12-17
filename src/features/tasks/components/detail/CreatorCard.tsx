import { UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
import { Typography } from '@/components/ui/typography.tsx';
import type { User } from '@/features/users/types.ts';
import { getUserFullName, getUserInitials } from '../../utils/task-helpers.ts';

interface CreatorCardProps {
	creator: User;
}

export function CreatorCard({ creator }: CreatorCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<UserIcon className="h-4 w-4" />
					<Typography variant="label">Created By</Typography>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className="flex cursor-pointer items-center gap-3">
							<Avatar className="h-10 w-10">
								<AvatarImage src={creator.avatarUrl} alt={getUserFullName(creator)} />
								<AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 font-semibold text-white">
									{getUserInitials(creator)}
								</AvatarFallback>
							</Avatar>
							<div className="flex min-w-0 flex-col">
								<Typography variant="small" weight="medium" truncate>
									{getUserFullName(creator)}
								</Typography>
								<Typography variant="muted" truncate>
									@{creator.username}
								</Typography>
							</div>
						</div>
					</TooltipTrigger>
					<TooltipContent>
						<Typography variant="small" weight="medium">
							{getUserFullName(creator)}
						</Typography>
						<Typography variant="muted">@{creator.username}</Typography>
					</TooltipContent>
				</Tooltip>
			</CardContent>
		</Card>
	);
}
