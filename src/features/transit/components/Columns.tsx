import type {ColumnDef} from '@tanstack/react-table';
import {Copy} from 'lucide-react';
import {toast} from 'sonner';
import {useTranslation} from "react-i18next";
import {DataTableColumnHeader} from '@/components/data-table/column-header';
import {Checkbox} from '@/components/ui/checkbox';
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import {Typography} from '@/components/ui/typography';
import {humanizeDateTime} from '@/utils/humanize';
import {cn} from '@/utils/utils.ts';
import type {Task} from '../types';
import {PriorityBadge} from './badges/PriorityBadge.tsx';
import {StatusBadge} from './badges/StatusBadge.tsx';
import {Link} from "react-router";

export const getColumns = (
    handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<Task>[] => {
    const {t} = useTranslation();

    const baseColumns: ColumnDef<Task>[] = [
        {
            id: 'rowNumber',
            header: ({column}) => <DataTableColumnHeader column={column} title="#"/>,
            cell: ({row}) => row.index + 1,
            size: 30,
        },
        {
            accessorKey: 'uncodId',
            header: ({column}) => (
                <DataTableColumnHeader
                    column={column}
                    title={t('transit.declarationName')}
                />
            ),
            cell: ({row}) => {
                const taskKey = row.original.uncodId;

                const handleCopyTaskUrl = async (
                    e: React.MouseEvent
                ) => {
                    e.stopPropagation();
                    try {
                        await navigator.clipboard.writeText(taskKey);
                        toast.success('Deklaratsiya raqamidan nusxa olindi');
                    } catch {
                        toast.error('Nusxa olishda xatolik');
                    }
                };

                return (
                    <div className="group flex items-center gap-1 font-medium text-blue-900 dark:text-blue-100">
                        <h6
                            onClick={handleCopyTaskUrl}
                            className="cursor-pointer transition-colors hover:text-primary hover:underline"
                        >
                            <Link to="#">
                                <b>{taskKey}</b>
                            </Link>
                        </h6>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        type="button"
                                        onClick={handleCopyTaskUrl}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
                                    >
                                        <Copy className="h-4 w-4"/>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <Typography variant="small">
                                        Copy declaration code
                                    </Typography>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                );
            },
            size: 180
        },
        {
            accessorKey: 'stateNm',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.status')}/>,
            cell: ({row}) => {
                const title = row.original.stateNm;

                return (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="cursor-pointer text-left font-medium whitespace-pre-wrap">
                                    {title}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="max-w-md">
                                <Typography variant="small" className="whitespace-pre-wrap">
                                    {title}
                                </Typography>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            },
            size: 250,
            maxSize: 400,
            minSize: 180
        },
        {
            accessorKey: 'g21no',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.carNumber')}/>,
            cell: ({row}) => {
                const projectName = row.original?.g21no;
                if (!projectName) {
                    return <div className="text-muted-foreground italic">No Project</div>;
                }
                return (
                    <div className="truncate text-center font-medium">
                        {(() => {
                            const words = projectName.split(" ");
                            return words.length > 1 ? (
                                <>
                                    {words.slice(0, 1).join(" ")}
                                    <br/>
                                    {words.slice(1).join(" ")}
                                </>
                            ) : (
                                projectName
                            );
                        })()}
                    </div>
                )
            },
            size: 250,
            maxSize: 400,
            minSize: 180
        },
        {
            accessorKey: 'dlastname',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.driversName')}/>,
            cell: ({row}) => {
                return (
                    <div className={"text-center"}>
                        <div className="truncate">{row.original.dlastname}</div>
                        <div className="truncate">{row.original.dpassport}</div>
                    </div>
                )
            },
            size: 250,
            maxSize: 400,
            minSize: 180
        },
        {
            accessorKey: 'status',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.driversName')}/>,
            cell: ({row}) => {
                return <StatusBadge status={row.original.status} showIcon={false} size="xs"/>;
            },
            size: 150,
            maxSize: 400,
            minSize: 100
        },
        {
            accessorKey: 'priority',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.product')}/>,
            cell: ({row}) => {
                return <PriorityBadge priority={row.original.priority} showIcon={false} size="xs"/>;
            },
            size: 100,
        },
        {
            accessorKey: 'assignees',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.byd')}/>,
            cell: ({row}) => {
                return <PriorityBadge priority={row.original.priority} showIcon={false} size="xs"/>;
            },
            size: 180,
        },
        {
            accessorKey: 'estimate',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.singleAccount')}/>,
            cell: ({row}) => {
                const estimate = row.original.estimate;
                if (!estimate) {
                    return <div className="text-muted-foreground">-</div>;
                }
                return <div className="text-sm">{estimate}h</div>;
            },
            size: 90,
        },
        {
            accessorKey: 'deadline',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.sum')}/>,
            cell: ({row}) => {
                const deadline = row.original.deadline;
                if (!deadline) {
                    return <div className="text-muted-foreground">-</div>;
                }

                const deadlineDate = new Date(deadline);
                const now = new Date();
                const isOverdue = deadlineDate < now && row.original.status !== 'done';

                return (
                    <div className={cn('text-sm', isOverdue && 'font-medium text-destructive')}>
                        {humanizeDateTime(deadline)}
                    </div>
                );
            },
            size: 150,
        },
        {
            accessorKey: 'createdAt1',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.paid')}/>,
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
            accessorKey: 'createdAt2',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.unpaid')}/>,
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
            accessorKey: 'createdAt3',
            header: ({column}) => <DataTableColumnHeader column={column} title={t('transit.sendsCustoms')}/>,
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
            accessorKey: 'createdAt4',
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
            accessorKey: 'createdAt5',
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
            accessorKey: 'createdAt6',
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
            accessorKey: 'createdAt7',
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
            accessorKey: 'createdAt8',
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
            accessorKey: 'createdAt9',
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
                            aria-label="Select all"
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
                            aria-label="Select row"
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
