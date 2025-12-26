import { UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip.tsx';
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
          <p>Created By</p>
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
                <p>{getUserFullName(creator)}</p>
                <p>@{creator.username}</p>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{getUserFullName(creator)}</p>
            <p>@{creator.username}</p>
          </TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
