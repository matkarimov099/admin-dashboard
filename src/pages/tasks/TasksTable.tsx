import { lazy } from 'react';
import { LazyComponent } from '@/components/common/lazy-component';

// Lazy load the heavy tasks table component
const TasksTable = lazy(() => import('@/features/tasks/components/tasks-table'));

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
