import { useEffect, useState } from 'react';
import { KanbanBoard } from '@/features/tasks/components/board/KanbanBoard';
import { useGetTasks } from '@/features/tasks/hooks/use-tasks';
import type { TaskFilter } from '@/features/tasks/types';

// LocalStorage key for board filters (shared with table)
const BOARD_FILTER_STORAGE_KEY = 'tasks-table-filters';

// Helper to get saved filters from localStorage
const getSavedBoardFilters = (): Partial<TaskFilter> => {
  try {
    const saved = localStorage.getItem(BOARD_FILTER_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Clean up empty arrays from old data
      if (parsed.projectIds && Array.isArray(parsed.projectIds) && parsed.projectIds.length === 0) {
        parsed.projectIds = undefined;
      }
      return parsed;
    }
  } catch (error) {
    console.error('Error reading board filters from localStorage:', error);
  }
  return {};
};

const TasksBoard = () => {
  const savedFilters = getSavedBoardFilters();

  const [filters, setFilters] = useState<TaskFilter>({
    page: 1,
    limit: 100, // Get all tasks for kanban board
    ...savedFilters,
  });

  // Save filters to localStorage whenever they change
  useEffect(() => {
    try {
      const filtersToSave: Record<string, unknown> = {};

      if (filters.projectIds && filters.projectIds.length > 0) {
        filtersToSave.projectIds = filters.projectIds;
      }
      if (filters.priority) {
        filtersToSave.priority = filters.priority;
      }
      if (filters.assigneeId) {
        filtersToSave.assigneeId = filters.assigneeId;
      }

      localStorage.setItem(BOARD_FILTER_STORAGE_KEY, JSON.stringify(filtersToSave));
    } catch (error) {
      console.error('Error saving board filters to localStorage:', error);
    }
  }, [filters.projectIds, filters.priority, filters.assigneeId]);

  const { data: tasksResponse, isFetching } = useGetTasks(filters, 'board');

  const tasks = tasksResponse?.data.data ?? [];

  if (isFetching && tasks.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full min-w-0 flex-col">
      <KanbanBoard tasks={tasks} filters={filters} onFiltersChange={setFilters} />
    </div>
  );
};

export default TasksBoard;
