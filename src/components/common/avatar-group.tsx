import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface User {
  id: string;
  name: string;
  image?: string;
  role?: string;
}

interface AvatarGroupProps {
  users: User[];
  maxVisible?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const AvatarGroup = ({ users, maxVisible = 5, size = 'md' }: AvatarGroupProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;

  const sizeClasses = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const textSizeClasses = {
    xs: 'text-[10px]',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="-space-x-2 flex *:ring-1 *:ring-border">
        {visibleUsers.map((user, index) => (
          <Tooltip key={user.id}>
            <TooltipTrigger asChild>
              <Avatar
                className={`transition-transform ${sizeClasses[size]} ${
                  activeIndex === index ? 'z-10 scale-110' : ''
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className={`${textSizeClasses[size]} font-medium`}>
                  {user.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm sm:text-base leading-6 sm:leading-7 font-semibold">
                {user.name}
              </p>
              {user.role && (
                <small className="text-xs sm:text-sm font-medium leading-none text-muted-foreground">
                  {user.role}
                </small>
              )}
            </TooltipContent>
          </Tooltip>
        ))}

        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className={`transition-transform ${sizeClasses[size]} bg-muted`}>
                <AvatarFallback className={`${textSizeClasses[size]} font-medium`}>
                  +{remainingCount}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <small className="text-xs sm:text-sm font-medium leading-none">
                {remainingCount} more user{remainingCount > 1 ? 's' : ''}
              </small>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};
