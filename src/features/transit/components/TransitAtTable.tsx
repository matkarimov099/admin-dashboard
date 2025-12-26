import {DataTable} from '@/components/data-table/data-table';
import {getColumns} from '@/features/transit/components/Columns.tsx';
import {useExportConfig} from '../utils/config';
import {useTasksData} from '../utils/data-fetching';
import {tasksTableConfig} from '../utils/table-config';
import {useEffect, useState} from "react";
import type {Task} from "@/features/transit/types.ts";

const TransitAtTable = () => {
    const {
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
    } = useTasksData();

    const [dataArray, setDataArray] = useState<Task[]>([]);

    async function getUsers() {
        const res = await fetch('/user.json');
        const data = await res.json();
        setDataArray(data);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const exportConfig = useExportConfig();
    const columns = getColumns(null);

    return (
        <DataTable
            <Task>
            getColumns={() => columns}
            data={dataArray ?? []}
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
            config={tasksTableConfig}
        />
    );
};

export default TransitAtTable;
