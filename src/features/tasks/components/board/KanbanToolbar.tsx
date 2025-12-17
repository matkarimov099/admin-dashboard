import { FilterX, Plus } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { SearchInput } from '@/components/custom/search-input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetUsers } from '@/features/users/hooks/use-users';
import type { TaskPriority, TaskStatus } from '../../types';
import { TaskPriorityOptions } from '../../types';
import { PriorityBadge } from '../badges/PriorityBadge';
import { KanbanColumnVisibility } from './KanbanColumnVisibility';

const CreateTask = lazy(() => import('../actions/CreateTask'));

interface KanbanToolbarProps {
  searchQuery?: string;
  onSearchChange: (value: string) => void;
  selectedPriority?: TaskPriority;
  selectedProjectIds: string[];
  selectedAssigneeId?: string;
  onPriorityChange: (priority: TaskPriority | undefined) => void;
  onProjectChange: (projectIds: string[]) => void;
  onAssigneeChange: (assigneeId: string | undefined) => void;
  visibleColumns: TaskStatus[];
  onToggleColumn: (status: TaskStatus) => void;
  onResetVisibility: () => void;
}

export function KanbanToolbar({
  searchQuery,
  onSearchChange,
  selectedPriority,
  selectedProjectIds,
  selectedAssigneeId,
  onPriorityChange,
  onProjectChange,
  onAssigneeChange,
  visibleColumns,
  onToggleColumn,
  onResetVisibility,
}: KanbanToolbarProps) {
  const { data: usersResponse } = useGetUsers({ page: 1, limit: 100 });
  const users = usersResponse?.data.data ?? [];

  const hasActiveFilters =
    searchQuery || selectedPriority || selectedProjectIds.length > 0 || selectedAssigneeId;

  const handleClearFilters = () => {
    onSearchChange('');
    onPriorityChange(undefined);
    onProjectChange([]);
    onAssigneeChange(undefined);
  };

  return (
    <div className="flex flex-col gap-3 pb-2.5 sm:flex-row sm:items-center sm:justify-between">
      {/* Left Side - Search Input */}
      <SearchInput
        showClearButton={true}
        value={searchQuery || ''}
        onValueChange={onSearchChange}
        placeholder="Search tasks..."
        className="w-full sm:w-auto"
        inputClassName="!w-full sm:!w-auto sm:min-w-[300px] sm:max-w-[400px]"
        debounceDelay={500}
      />

      {/* Right Side - Filters and Actions */}
      <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
        <Select
          value={selectedAssigneeId ?? 'all'}
          onValueChange={value => onAssigneeChange(value === 'all' ? undefined : value)}
        >
          <SelectTrigger className="w-full sm:w-fit">
            <SelectValue placeholder="All Assignees" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Assignees</SelectItem>
            {users.map(user => (
              <SelectItem key={user.id} value={user.id}>
                {user.firstName && user.lastName
                  ? `${user.firstName} ${user.lastName}`
                  : user.username}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedPriority ?? 'all'}
          onValueChange={value =>
            onPriorityChange(value === 'all' ? undefined : (value as TaskPriority))
          }
        >
          <SelectTrigger className="w-full sm:w-fit">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {TaskPriorityOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                <PriorityBadge priority={option.value} showIcon={false} size="xs" />
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          {hasActiveFilters && (
            <Button
              onClick={handleClearFilters}
              variant="ghost"
              size="default"
              leftIcon={<FilterX className="h-4 w-4" />}
              className="flex-1 sm:flex-initial"
            >
              <span className="sm:hidden">Clear Filters</span>
              <span className="sr-only hidden sm:inline">Clear</span>
            </Button>
          )}

          <KanbanColumnVisibility
            visibleColumns={visibleColumns}
            onToggleColumn={onToggleColumn}
            onReset={onResetVisibility}
            size="default"
          />

          <Suspense
            fallback={
              <Button
                leftIcon={<Plus className="h-4 w-4" />}
                disabled
                className="flex-1 sm:flex-initial"
              >
                Create Task
              </Button>
            }
          >
            <CreateTask purpose="board" />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
