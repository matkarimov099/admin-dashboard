import { lazy } from 'react';
import { ListTodo, Table } from 'lucide-react';
import type { MenuItemConfig } from '@/types/navigation.ts';

const tasks: MenuItemConfig = {
  id: 'task-management',
  title: 'Task Management',
  type: 'collapse',
  icon: <ListTodo />,
  roles: [],
  children: [
    {
      id: 'tasks-table',
      title: 'Tasks Table',
      type: 'item',
      path: '/tasks/table',
      icon: <Table />,
      component: lazy(() => import('@/pages/tasks/TasksTable.tsx')),
      breadcrumbs: true,
    },
  ],
};

export default tasks;
