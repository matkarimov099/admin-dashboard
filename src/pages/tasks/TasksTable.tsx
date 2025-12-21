import { lazy } from 'react';
import { LazyComponent } from '@/components/common/lazy-component.tsx';

// Lazy load the heavy tasks table component
const TasksTable = lazy(() => import('@/features/tasks/components/TasksTable'));

const TasksTablePage = () => {
  return (
    <div>
      {/* DataTable with custom configuration */}
      <LazyComponent>
        <TasksTable />
      </LazyComponent>
    </div>
  );
};

export default TasksTablePage;
