import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { useGetColumns } from '@/features/users/components/Columns.tsx';
import type { User } from '@/features/users/types.ts';
import { useExportConfig } from '@/features/users/utils/config.ts';
import { usersTableConfig } from '@/features/users/utils/table-config.ts';
import { useUsersData } from '../utils/data-fetching';

const ToolbarOptions = lazy(() => import('@/features/users/components/ToolbarOptions.tsx'));
const UsersTable = () => {
  const { t } = useTranslation();
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
  const columns = useGetColumns(null);

  // Get column mappings from translations
  const columnMapping = t('users.table.columns', { returnObjects: true }) as Record<string, string>;

  return (
    <DataTable<User>
      getColumns={() => columns}
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
      columnMapping={columnMapping}
    />
  );
};

export default UsersTable;
