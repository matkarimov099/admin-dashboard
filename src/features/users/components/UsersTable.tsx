import { lazy } from 'react';
import { LazyComponent } from '@/components/common/LazyComponent.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { getColumns } from '@/features/users/components/Columns.tsx';
import type { User } from '@/features/users/types.ts';
import { useExportConfig } from '@/features/users/utils/config.ts';
import { usersTableConfig } from '@/features/users/utils/table-config.ts';
import { useUsersData } from '../utils/data-fetching';

const ToolbarOptions = lazy(() => import('@/features/users/components/ToolbarOptions.tsx'));
const UsersTable = () => {
  const {
    users,
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
  } = useUsersData();

  const exportConfig = useExportConfig();

  return (
    <DataTable<User>
      getColumns={getColumns}
      data={users || []}
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
      pageSizeOptions={[10, 20, 30, 40, 50, 100, 150]}
      renderToolbarContent={() => (
        <LazyComponent>
          <ToolbarOptions />
        </LazyComponent>
      )}
      config={usersTableConfig}
    />
  );
};

export default UsersTable;
