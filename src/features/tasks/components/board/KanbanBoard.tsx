import {
	closestCorners,
	DndContext,
	type DragEndEvent,
	DragOverlay,
	type DragStartEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import type { PaginatedResponse } from '@/types/common';
import { useKanbanColumnVisibility } from '../../hooks/use-kanban-column-visibility';
import { useUpdateTaskStatus } from '../../hooks/use-tasks';
import type { Task, TaskFilter, TaskPriority, TaskStatus } from '../../types';
import { TaskStatus as TaskStatusEnum, TaskStatusOptions } from '../../types';
import { TaskDetailModal } from '../detail/TaskDetailModal';
import { KanbanCard } from './KanbanCard';
import { KanbanColumn } from './KanbanColumn';
import { KanbanToolbar } from './KanbanToolbar';

const COLUMN_ORDER_STORAGE_KEY = 'kanban-column-order';

interface KanbanBoardProps {
	tasks: Task[];
	filters: TaskFilter;
	onFiltersChange: (filters: TaskFilter) => void;
}

export function KanbanBoard({ tasks, filters, onFiltersChange }: KanbanBoardProps) {
	const queryClient = useQueryClient();
	const { mutate: updateTaskStatus } = useUpdateTaskStatus();
	const { visibleColumns, toggleColumn, resetVisibility } = useKanbanColumnVisibility();

	const [activeTask, setActiveTask] = useState<Task | null>(null);
	const [activeColumn, setActiveColumn] = useState<TaskStatus | null>(null);

	// Modal state
	const [selectedTaskKey, setSelectedTaskKey] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Scroll position preservation
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const savedScrollPosition = useRef<number>(0);

	// Column order state with localStorage
	const [columnOrder, setColumnOrder] = useState<TaskStatus[]>(() => {
		const stored = localStorage.getItem(COLUMN_ORDER_STORAGE_KEY);
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch {
				return TaskStatusOptions.map((opt) => opt.value);
			}
		}
		return TaskStatusOptions.map((opt) => opt.value);
	});

	// Filter column order to only show visible columns
	const visibleColumnOrder = useMemo(
		() => columnOrder.filter((status) => visibleColumns.includes(status)),
		[columnOrder, visibleColumns]
	);

	// Save column order to localStorage
	useEffect(() => {
		localStorage.setItem(COLUMN_ORDER_STORAGE_KEY, JSON.stringify(columnOrder));
	}, [columnOrder]);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	);

	// Group tasks by status
	const tasksByStatus = useMemo(() => {
		const grouped: Record<TaskStatus, Task[]> = {
			[TaskStatusEnum.BACKLOG]: [],
			[TaskStatusEnum.TODO]: [],
			[TaskStatusEnum.IN_PROGRESS]: [],
			[TaskStatusEnum.PAUSED]: [],
			[TaskStatusEnum.IN_REVIEW]: [],
			[TaskStatusEnum.DONE]: [],
			[TaskStatusEnum.CANCELLED]: [],
		};

		for (const task of tasks) {
			grouped[task.status].push(task);
		}

		return grouped;
	}, [tasks]);

	// Get total counts for each status (from all tasks, not filtered)
	const statusCounts = useMemo(() => {
		const counts: Record<TaskStatus, number> = {
			[TaskStatusEnum.BACKLOG]: 0,
			[TaskStatusEnum.TODO]: 0,
			[TaskStatusEnum.IN_PROGRESS]: 0,
			[TaskStatusEnum.PAUSED]: 0,
			[TaskStatusEnum.IN_REVIEW]: 0,
			[TaskStatusEnum.DONE]: 0,
			[TaskStatusEnum.CANCELLED]: 0,
		};

		for (const task of tasks) {
			counts[task.status]++;
		}

		return counts;
	}, [tasks]);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const activeId = active.id as string;

		// Check if dragging a column
		if (columnOrder.includes(activeId as TaskStatus)) {
			setActiveColumn(activeId as TaskStatus);
			return;
		}

		// Otherwise, dragging a task
		const task = tasks.find((t) => t.id === activeId);
		if (task) {
			setActiveTask(task);
		}
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveTask(null);
		setActiveColumn(null);

		if (!over) return;

		const activeId = active.id as string;
		const overId = over.id as string;

		// Check if reordering columns
		if (
			columnOrder.includes(activeId as TaskStatus) &&
			columnOrder.includes(overId as TaskStatus)
		) {
			const oldIndex = columnOrder.indexOf(activeId as TaskStatus);
			const newIndex = columnOrder.indexOf(overId as TaskStatus);

			if (oldIndex !== newIndex) {
				setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex));
				toast.success('Column order updated');
			}
			return;
		}

		// Otherwise, moving a task
		const taskId = activeId;

		// Determine the new status - overId could be a column status or another task's ID
		let newStatus: TaskStatus;

		// Check if overId is a valid TaskStatus (column)
		if (columnOrder.includes(overId as TaskStatus)) {
			newStatus = overId as TaskStatus;
		} else {
			// overId is a task, find its status
			const targetTask = tasks.find((t) => t.id === overId);
			if (!targetTask) return;
			newStatus = targetTask.status;
		}

		const task = tasks.find((t) => t.id === taskId);
		if (!task || task.status === newStatus) return;

		// Optimistic update
		const previousTasks = queryClient.getQueryData(['tasks', 'board']);

		// Update cache optimistically
		queryClient.setQueryData<{ data: PaginatedResponse<Task> }>(['tasks', 'board'], (old) => {
			if (!old?.data?.data) return old;
			return {
				...old,
				data: {
					...old.data,
					data: old.data.data.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
				},
			};
		});

		// Update task status using correct API endpoint
		updateTaskStatus(
			{
				taskId: taskId,
				status: newStatus,
			},
			{
				onSuccess: () => {
					toast.success('Task status updated successfully');
				},
				onError: (error) => {
					// Revert optimistic update
					queryClient.setQueryData(['tasks', 'board'], previousTasks);
					toast.error(error.message || 'Failed to update task status');
				},
			}
		);
	};

	// Handle filter changes - update API filters
	const handleSearchChange = (searchTitle: string) => {
		onFiltersChange({
			...filters,
			page: 1,
			title: searchTitle || undefined,
		});
	};

	const handlePriorityChange = (priority: TaskPriority | undefined) => {
		onFiltersChange({ ...filters, priority, page: 1 });
	};

	const handleProjectChange = (projectIds: string[]) => {
		onFiltersChange({ ...filters, projectIds, page: 1 });
	};

	const handleAssigneeChange = (assigneeId: string | undefined) => {
		onFiltersChange({ ...filters, assigneeId, page: 1 });
	};

	// Handle task card click
	const handleTaskClick = (taskKey: string) => {
		// Save current scroll position
		if (scrollContainerRef.current) {
			savedScrollPosition.current = scrollContainerRef.current.scrollLeft;
		}

		setSelectedTaskKey(taskKey);
		setIsModalOpen(true);
	};

	// Handle modal close
	const handleModalClose = (open: boolean) => {
		setIsModalOpen(open);

		if (!open) {
			// Restore scroll position after modal closes
			setTimeout(() => {
				if (scrollContainerRef.current) {
					scrollContainerRef.current.scrollLeft = savedScrollPosition.current;
				}
			}, 0);
		}
	};

	return (
		<div className="grid max-h-[calc(100vh-7rem)] w-full grid-rows-[auto_1fr] overflow-hidden">
			{/* Toolbar */}
			<div className="w-full">
				<KanbanToolbar
					searchQuery={filters.title}
					onSearchChange={handleSearchChange}
					selectedPriority={filters.priority}
					selectedProjectIds={filters.projectIds ?? []}
					selectedAssigneeId={filters.assigneeId}
					onPriorityChange={handlePriorityChange}
					onProjectChange={handleProjectChange}
					onAssigneeChange={handleAssigneeChange}
					visibleColumns={visibleColumns}
					onToggleColumn={toggleColumn}
					onResetVisibility={resetVisibility}
				/>
			</div>

			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				{/* Horizontal Scrollable Container with Grid */}
				<div ref={scrollContainerRef} className="h-full w-full overflow-x-auto overflow-y-hidden">
					<SortableContext items={visibleColumnOrder} strategy={horizontalListSortingStrategy}>
						<div className="flex h-full gap-2.5 py-2">
							{visibleColumnOrder.map((status) => (
								<KanbanColumn
									key={status}
									status={status}
									tasks={tasksByStatus[status]}
									taskCount={statusCounts[status]}
									onTaskClick={handleTaskClick}
								/>
							))}
						</div>
					</SortableContext>
				</div>

				{/* Drag Overlay */}
				<DragOverlay>
					{activeTask ? (
						<div className="rotate-3 opacity-90">
							<KanbanCard task={activeTask} />
						</div>
					) : activeColumn ? (
						<div className="opacity-50">
							<KanbanColumn
								status={activeColumn}
								tasks={tasksByStatus[activeColumn]}
								taskCount={statusCounts[activeColumn]}
							/>
						</div>
					) : null}
				</DragOverlay>
			</DndContext>

			{/* Task Detail Modal */}
			{selectedTaskKey && (
				<TaskDetailModal
					taskKey={selectedTaskKey}
					open={isModalOpen}
					onOpenChange={handleModalClose}
					purpose="board"
				/>
			)}
		</div>
	);
}
