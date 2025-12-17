import { FilterX } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useGetUsers } from '@/features/users/hooks/use-users';
import type { TaskPriority, TaskStatus } from '../types';
import { TaskPriorityOptions, TaskStatusOptions } from '../types';
import { PriorityBadge } from './badges/PriorityBadge.tsx';
import { StatusBadge } from './badges/StatusBadge.tsx';

const CreateTask = lazy(() => import('./actions/CreateTask'));

interface ToolbarOptionsProps {
	selectedStatus?: TaskStatus;
	selectedPriority?: TaskPriority;
	selectedProjectIds: string[];
	selectedAssigneeId?: string;
	onStatusChange: (status: TaskStatus | undefined) => void;
	onPriorityChange: (priority: TaskPriority | undefined) => void;
	onProjectChange: (projectIds: string[]) => void;
	onAssigneeChange: (assigneeId: string | undefined) => void;
}

export function ToolbarOptions({
	selectedStatus,
	selectedPriority,
	selectedProjectIds,
	selectedAssigneeId,
	onStatusChange,
	onPriorityChange,
	onProjectChange,
	onAssigneeChange,
}: ToolbarOptionsProps) {
	const { data: usersResponse } = useGetUsers({ page: 1, limit: 100 });
	const users = usersResponse?.data.data ?? [];

	const hasActiveFilters =
		selectedStatus || selectedPriority || selectedProjectIds.length > 0 || selectedAssigneeId;

	const handleClearFilters = () => {
		onStatusChange(undefined);
		onPriorityChange(undefined);
		onProjectChange([]);
		onAssigneeChange(undefined);
	};

	return {
		left: (
			<Suspense fallback={<div className="h-10 w-32 animate-pulse rounded-md bg-muted" />}>
				<CreateTask purpose="table" />
			</Suspense>
		),
		right: (
			<div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center">
				<Select
					value={selectedStatus ?? 'all'}
					onValueChange={(value) =>
						onStatusChange(value === 'all' ? undefined : (value as TaskStatus))
					}
				>
					<SelectTrigger className="w-full sm:w-auto sm:min-w-35">
						<SelectValue placeholder="All Statuses" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Statuses</SelectItem>
						{TaskStatusOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								<StatusBadge status={option.value} showIcon={false} size="xs" />
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={selectedPriority ?? 'all'}
					onValueChange={(value) =>
						onPriorityChange(value === 'all' ? undefined : (value as TaskPriority))
					}
				>
					<SelectTrigger className="w-full sm:w-auto sm:min-w-35">
						<SelectValue placeholder="All Priorities" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Priorities</SelectItem>
						{TaskPriorityOptions.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								<PriorityBadge priority={option.value} showIcon={false} size="xs" />
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={selectedAssigneeId ?? 'all'}
					onValueChange={(value) => onAssigneeChange(value === 'all' ? undefined : value)}
				>
					<SelectTrigger className="w-full sm:w-auto sm:min-w-40">
						<SelectValue placeholder="All Assignees" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Assignees</SelectItem>
						{users.map((user) => (
							<SelectItem key={user.id} value={user.id}>
								{user.firstName && user.lastName
									? `${user.firstName} ${user.lastName}`
									: user.username}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				{hasActiveFilters && (
					<Button onClick={handleClearFilters} variant="ghost" size="icon" className="px-2">
						<FilterX className="h-4 w-4" />
					</Button>
				)}
			</div>
		),
	};
}
