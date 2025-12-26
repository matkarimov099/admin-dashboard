import type {ColumnDef} from '@tanstack/react-table';
import {useTranslation} from 'react-i18next';
import {DataTableColumnHeader} from '@/components/data-table/column-header';
import {Checkbox} from '@/components/ui/checkbox.tsx';
// import {DataTableRowActions} from '@/features/users/components/RowActions.tsx';
import type {User} from '@/features/users/types.ts';
import {humanizeDateTime} from '@/utils/humanize.ts';
import {Link} from "react-router";

export const useGetColumns = (
    handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<User>[] => {
    const {t} = useTranslation();

    // Base columns without the select column
    const baseColumns: ColumnDef<User>[] = [
        {
            id: 'rowNumber',
            header: ({column}) => <DataTableColumnHeader column={column} title="#"/>,
            cell: ({row}) => row.index + 1,
            size: 70,
        },
        {
            accessorKey: 'uncodId',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.declarationName')}/>,
            cell: ({row}) => (
                <div className="truncate text-left font-medium">
                    <h6>
                        <Link className={"text-blue-900"} to={""}><b>{`${row.original.uncodId}`}</b> </Link>
                    </h6>
                </div>
            ),
            size: 200,
        },
        {
            accessorKey: 'stateNm',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.status')}/>,
            cell: ({row}) => (
                <div className="truncate text-left font-medium">
                    {(() => {
                        const words = row.original.stateNm.split(" ");
                        return words.length > 2 ? (
                            <>
                                {words.slice(0, 2).join(" ")}
                                <br/>
                                {words.slice(2).join(" ")}
                            </>
                        ) : (
                            row.original.stateNm
                        );
                    })()}
                </div>
            ),
            size: 250,
        },
        {
            accessorKey: 'g21no',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.carNumber')}/>,
            cell: ({row}) => {
                return (
                    <div className="flex items-center">
                        <p className="truncate">
                            {(() => {
                                const words = row.original.g21no.split(" ");
                                return words.length > 1 ? (
                                    <>
                                        {words.slice(0, 1).join(" ")}
                                        <br/>
                                        {words.slice(1).join(" ")}
                                    </>
                                ) : (
                                    row.original.g21no
                                );
                            })()}
                        </p>
                    </div>
                );
            },
            size: 150,
        },
        {
            accessorKey: 'dlastname',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.driversName')}/>,
            cell: ({row}) => {
                return <div className="max-w-full truncate text-left">
                    <p className="truncate">{row.original.dlastname} <br/> {row.original.dpassport}</p>
                </div>;
            },
            size: 80,
        },
        {
            accessorKey: 'ARA/IKM/Tovar/BQB',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.product')}/>,
            cell: ({row}) => {
                return <div className="max-w-full truncate text-left">{row.original.role}</div>;
            },
            size: 100,
        },
        {
            accessorKey: 'BYD',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.byd')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {humanizeDateTime(row.original.createdAt)}
                    </div>
                );
            },
            size: 120,
        },
        {
            id: 'yagona hisob varaqasi',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.singleAccount')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {humanizeDateTime(row.original.createdAt)}
                    </div>
                );
            },
            size: 100,
        },
        {
            accessorKey: 'jami_summa',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.sum')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {row.original.jami_summa}
                    </div>
                );
            },
            size: 120,
        },
        {
            accessorKey: 'tulagan_summa',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.paid')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {row.original.tulagan_summa}
                    </div>
                );
            },
            size: 120,
        },
        {
            accessorKey: 'qolgan_summa',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.unpaid')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {row.original.qolgan_summa}
                    </div>
                );
            },
            size: 120,
        },
        {
            accessorKey: 'posts_first_code',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.sendsCustoms')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {(() => {
                            const words = row.original?.posts_first_code?.split(" ");

                            if (!words) return null;

                            return words.length > 3 ? (
                                <>
                                    {words.slice(0, 3).join(" ")}
                                    <br/>
                                    {words.slice(3).join(" ")}
                                </>
                            ) : (
                                row.original.posts_first_code
                            );
                        })()}
                    </div>
                );
            },
            size: 120,
        },
        {
            accessorKey: 'createdAt',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.destinationCustoms')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {humanizeDateTime(row.original.createdAt)}
                    </div>
                );
            },
            size: 120,
        },
        {
            accessorKey: 'createdAt',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.deliveryTime')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {humanizeDateTime(row.original.createdAt)}
                    </div>
                );
            },
            size: 120,
        },
        {
            accessorKey: 'createdAt',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.typeOfWarranty')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {humanizeDateTime(row.original.createdAt)}
                    </div>
                );
            },
            size: 120,
        },
        {
            accessorKey: 'createdAt',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.numberOfLots')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {humanizeDateTime(row.original.createdAt)}
                    </div>
                );
            },
            size: 120,
        },
        {
            accessorKey: 'createdAt',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.numberOfGoods')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {humanizeDateTime(row.original.createdAt)}
                    </div>
                );
            },
            size: 120,
        },
        {
            accessorKey: 'createdAt',
            header: ({column}) => <DataTableColumnHeader column={column}
                                                         title={t('transit.declarationSubmissionTime')}/>,
            cell: ({row}) => {
                return (
                    <div className="max-w-full truncate text-left">
                        {humanizeDateTime(row.original.createdAt)}
                    </div>
                );
            },
            size: 120,
        },
    ];

    // Only include the select column if row selection is enabled
    if (handleRowDeselection !== null) {
        return [
            {
                id: 'select',
                header: ({table}) => (
                    <div className="truncate pl-2">
                        <Checkbox
                            checked={
                                table.getIsAllPageRowsSelected() ||
                                (table.getIsSomePageRowsSelected() && 'indeterminate')
                            }
                            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                            aria-label={t('common.table.selectAll')}
                            className="translate-y-0.5 cursor-pointer"
                        />
                    </div>
                ),

                cell: ({row}) => (
                    <div className="truncate">
                        <Checkbox
                            checked={row.getIsSelected()}
                            onCheckedChange={value => {
                                if (value) {
                                    row.toggleSelected(true);
                                } else {
                                    row.toggleSelected(false);
                                    // If we have a deselection handler, use it for better cross-page tracking
                                    if (handleRowDeselection) {
                                        handleRowDeselection(row.id);
                                    }
                                }
                            }}
                            aria-label={t('common.table.selectRow')}
                            className="translate-y-0.5 cursor-pointer"
                        />
                    </div>
                ),
                enableSorting: false,
                enableHiding: false,
                size: 50,
            },
            ...baseColumns,
        ];
    }

    // Return only the base columns if row selection is disabled
    return baseColumns;
};
