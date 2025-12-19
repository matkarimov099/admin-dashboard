import { lazy } from 'react';
import { LazyComponent } from '@/components/common/LazyComponent.tsx';

// Lazy load the heavy users table component
const UsersTable = lazy(() => import('@/features/users/components/UsersTable.tsx'));

const Users = () => {
  return (
    <div>
      {/* DataTable with custom configuration */}
      <LazyComponent>
        <UsersTable />
      </LazyComponent>
    </div>
  );
};

export default Users;
