import { useCallback, useEffect, useState } from 'react';
import { type TaskStatus, TaskStatusOptions } from '../types';

const COLUMN_VISIBILITY_STORAGE_KEY = 'kanban-column-visibility';

export function useKanbanColumnVisibility() {
  // Initialize with all columns visible
  const [visibleColumns, setVisibleColumns] = useState<TaskStatus[]>(() => {
    const stored = localStorage.getItem(COLUMN_VISIBILITY_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Validate that the stored columns are valid TaskStatus values
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // If parsing fails, return all columns
      }
    }
    // Default: all columns visible
    return TaskStatusOptions.map(opt => opt.value);
  });

  // Save to localStorage whenever visibility changes
  useEffect(() => {
    localStorage.setItem(COLUMN_VISIBILITY_STORAGE_KEY, JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  // Toggle column visibility
  const toggleColumn = useCallback((status: TaskStatus) => {
    setVisibleColumns(prev => {
      // Don't allow hiding all columns
      if (prev.length === 1 && prev.includes(status)) {
        return prev;
      }

      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      }
      return [...prev, status];
    });
  }, []);

  // Check if a column is visible
  const isColumnVisible = useCallback(
    (status: TaskStatus) => visibleColumns.includes(status),
    [visibleColumns]
  );

  // Reset to all columns visible
  const resetVisibility = useCallback(() => {
    const allColumns = TaskStatusOptions.map(opt => opt.value);
    setVisibleColumns(allColumns);
    localStorage.removeItem(COLUMN_VISIBILITY_STORAGE_KEY);
  }, []);

  return {
    visibleColumns,
    toggleColumn,
    isColumnVisible,
    resetVisibility,
  };
}
