import type { PaginationState, SortingState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce.tsx';
import { useGetTasks } from '../hooks/use-tasks.ts';
import type { TaskPriority, TaskStatus } from '../types.ts';

// LocalStorage key for tasks filters
const TASKS_FILTER_STORAGE_KEY = 'tasks-table-filters';

// Interface for saved filters
interface SavedTasksFilters {
  projectIds?: string[];
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: string;
}

// Helper to get saved filters from localStorage
const getSavedFilters = (): SavedTasksFilters => {
  try {
    const saved = localStorage.getItem(TASKS_FILTER_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Clean up empty arrays from old data
      if (parsed.projectIds && Array.isArray(parsed.projectIds) && parsed.projectIds.length === 0) {
        parsed.projectIds = undefined;
      }
      return parsed;
    }
  } catch (error) {
    console.error('Error reading tasks filters from localStorage:', error);
  }
  return {};
};

// Helper to save filters to localStorage
const saveFilters = (filters: SavedTasksFilters) => {
  try {
    const filtersToSave: Record<string, unknown> = {};

    if (filters.projectIds && filters.projectIds.length > 0) {
      filtersToSave.projectIds = filters.projectIds;
    }
    if (filters.status) {
      filtersToSave.status = filters.status;
    }
    if (filters.priority) {
      filtersToSave.priority = filters.priority;
    }
    if (filters.assigneeId) {
      filtersToSave.assigneeId = filters.assigneeId;
    }

    localStorage.setItem(TASKS_FILTER_STORAGE_KEY, JSON.stringify(filtersToSave));
  } catch (error) {
    console.error('Error saving tasks filters to localStorage:', error);
  }
};

export function useTasksData() {
  // ==================== PAGINATION STATE ====================
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });

  // ==================== SORTING STATE ====================
  const [sorting, setSorting] = useState<SortingState>([]);

  // ==================== SEARCH STATE ====================
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  // ==================== FILTER STATE ====================
  const savedFilters = getSavedFilters();

  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | undefined>(savedFilters.status);
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | undefined>(
    savedFilters.priority
  );
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>(
    savedFilters.projectIds ?? []
  );
  const [selectedAssigneeId, setSelectedAssigneeId] = useState<string | undefined>(
    savedFilters.assigneeId
  );
  const [selectedCreatorId, setSelectedCreatorId] = useState<string | undefined>(undefined);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    saveFilters({
      projectIds: selectedProjectIds,
      status: selectedStatus,
      priority: selectedPriority,
      assigneeId: selectedAssigneeId,
    });
  }, [selectedProjectIds, selectedStatus, selectedPriority, selectedAssigneeId]);

  // Date range filter
  const [dateRange, setDateRange] = useState<{
    from: string | undefined;
    to: string | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  // ==================== DERIVED VALUES ====================
  const currentPage = pagination.pageIndex + 1;
  const pageSize = pagination.pageSize;

  // ==================== HANDLERS ====================
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, pageIndex: page - 1 }));
  };

  const handlePageSizeChange = (size: number) => {
    setPagination(prev => ({ ...prev, pageSize: size, pageIndex: 0 }));
  };

  const handleSortingChange = (
    updaterOrValue: SortingState | ((prev: SortingState) => SortingState)
  ) => {
    const newSorting =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
    setSorting(newSorting);
    setPagination(prev => ({ ...prev, pageIndex: 0 })); // Reset to the first page
  };

  const handleSearchChange = (searchValue: string) => {
    setSearch(searchValue);
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const handleStatusChange = (status: TaskStatus | undefined) => {
    setSelectedStatus(status);
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const handlePriorityChange = (priority: TaskPriority | undefined) => {
    setSelectedPriority(priority);
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const handleProjectChange = (projectIds: string[]) => {
    setSelectedProjectIds(projectIds);
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const handleAssigneeChange = (assigneeId: string | undefined) => {
    setSelectedAssigneeId(assigneeId);
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const handleCreatorChange = (creatorId: string | undefined) => {
    setSelectedCreatorId(creatorId);
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const handleDateRangeChange = (range: { from: string | undefined; to: string | undefined }) => {
    setDateRange(range);
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  // ==================== FETCH DATA ====================
  const {
    data: tasksResponse,
    isFetching,
    refetch,
  } = useGetTasks(
    {
      page: currentPage,
      limit: pageSize,
      ...(debouncedSearch.length >= 2 ? { title: debouncedSearch } : {}),
      ...(selectedStatus ? { status: selectedStatus } : {}),
      ...(selectedPriority ? { priority: selectedPriority } : {}),
      ...(selectedProjectIds.length > 0 ? { projectIds: selectedProjectIds } : {}),
      ...(selectedAssigneeId ? { assigneeId: selectedAssigneeId } : {}),
      ...(selectedCreatorId ? { creatorId: selectedCreatorId } : {}),
      ...(dateRange.from ? { fromDate: dateRange.from } : {}),
      ...(dateRange.to ? { toDate: dateRange.to } : {}),
    },
    'table' // Purpose to differentiate from dropdown queries
  );

  // ==================== RETURN STATE & HANDLERS ====================
  return {
    // Data
    tasks: tasksResponse?.data.data ?? [],
    total: tasksResponse?.data.total ?? 0,
    isFetching,
    refetch,

    // Pagination
    pagination,
    setPagination,
    currentPage,
    pageSize,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,

    // Sorting
    sorting,
    setSorting,
    onSortingChange: handleSortingChange,

    // Search
    search,
    setSearch,
    onSearchChange: handleSearchChange,

    // Filters
    selectedStatus,
    selectedPriority,
    selectedProjectIds,
    selectedAssigneeId,
    selectedCreatorId,
    dateRange,
    onStatusChange: handleStatusChange,
    onPriorityChange: handlePriorityChange,
    onProjectChange: handleProjectChange,
    onAssigneeChange: handleAssigneeChange,
    onCreatorChange: handleCreatorChange,
    onDateRangeChange: handleDateRangeChange,
  };
}
