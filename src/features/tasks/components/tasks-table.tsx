import { DataTable } from '@/components/data-table/data-table';
import type { Task } from '../types';
import { useExportConfig } from '../utils/config';
import { useTasksData } from '../utils/data-fetching';
import { tasksTableConfig } from '../utils/table-config';
import { getColumns } from './columns';
import { ToolbarOptions } from './toolbar-options';

const TasksTable = () => {
  const {
    tasks,
    total,
    isFetching,
    currentPage,
    pageSize,
    onPageChange,
    onPageSizeChange,
    sorting,
    onSortingChange,
    search,
    onSearchChange,
    selectedStatus,
    selectedPriority,
    selectedProjectIds,
    selectedAssigneeId,
    onStatusChange,
    onPriorityChange,
    onProjectChange,
    onAssigneeChange,
  } = useTasksData();

  const exportConfig = useExportConfig();

  const toolbarSections = ToolbarOptions({
    selectedStatus,
    selectedPriority,
    selectedProjectIds,
    selectedAssigneeId,
    onStatusChange,
    onPriorityChange,
    onProjectChange,
    onAssigneeChange,
  });

  return (
    <DataTable<Task>
      getColumns={getColumns}
      data={tasks}
      totalItems={total}
      isLoading={isFetching}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sorting={sorting}
      onSortingChange={onSortingChange}
      searchValue={search}
      onSearchChange={onSearchChange}
      exportConfig={exportConfig}
      idField="id"
      pageSizeOptions={[10, 20, 30, 40, 50, 100]}
      renderToolbarContent={() => toolbarSections}
      config={tasksTableConfig}
    />
  );
};

export default TasksTable;
