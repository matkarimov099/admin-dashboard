import type { Column, Table } from '@tanstack/react-table';
import { Check, GripVertical, RotateCcw, Settings2 } from 'lucide-react';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/utils';

interface DataTableViewOptionsProps<TData> {
	table: Table<TData>;
	columnMapping?: Record<string, string>;
	size?: 'sm' | 'default' | 'lg';
	tableId?: string;
}

export function DataTableViewOptions<TData>({
	table,
	columnMapping,
	size = 'default',
	tableId = 'data-table-default',
}: DataTableViewOptionsProps<TData>) {
	// Generate localStorage keys based on tableId
	const columnOrderStorageKey = `${tableId}-column-order`;
	const columnVisibilityStorageKey = `${tableId}-column-visibility`;
	// Get columns that can be hidden
	const columns = React.useMemo(
		() =>
			table
				.getAllColumns()
				.filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide()),
		[table]
	);

	// State for drag and drop
	const [draggedColumnId, setDraggedColumnId] = useState<string | null>(null);

	// Order columns based on the current table column order
	const columnOrder = table.getState().columnOrder;
	const orderedColumns = useMemo(() => {
		if (!columnOrder.length) {
			return columns;
		}

		// Create a new array with columns sorted according to the columnOrder
		return [...columns].sort((a, b) => {
			const aIndex = columnOrder.indexOf(a.id);
			const bIndex = columnOrder.indexOf(b.id);

			// If the column isn't in the order array, put it at the end
			if (aIndex === -1) return 1;
			if (bIndex === -1) return -1;

			return aIndex - bIndex;
		});
	}, [columns, columnOrder]);

	// Load column order from localStorage on initial render
	useEffect(() => {
		try {
			const savedOrder = localStorage.getItem(columnOrderStorageKey);
			if (savedOrder) {
				const columnOrder = JSON.parse(savedOrder);
				// Apply saved column order to the table
				table.setColumnOrder(columnOrder);
			}
		} catch (error) {
			console.error('Error loading column order:', error);
		}
	}, [table, columnOrderStorageKey]);

	// Load column visibility from localStorage on initial render
	// Note: This is now handled in data-table.tsx, but we keep the key for consistency
	useEffect(() => {
		try {
			const savedVisibility = localStorage.getItem(columnVisibilityStorageKey);
			if (savedVisibility) {
				const columnVisibility = JSON.parse(savedVisibility);
				// Apply saved column visibility to the table
				table.setColumnVisibility(columnVisibility);
			}
		} catch (error) {
			console.error('Error loading column visibility:', error);
		}
	}, [table, columnVisibilityStorageKey]);

	// Save column order to localStorage when it changes
	const saveColumnOrder = useCallback(
		(columnOrder: string[]) => {
			try {
				localStorage.setItem(columnOrderStorageKey, JSON.stringify(columnOrder));
			} catch (error) {
				console.error('Error saving column order:', error);
			}
		},
		[columnOrderStorageKey]
	);

	// Handle column visibility toggle
	// Note: localStorage persistence is now handled by data-table.tsx onColumnVisibilityChange handler
	const handleColumnVisibilityToggle = useCallback((column: Column<TData, unknown>) => {
		const isVisible = column.getIsVisible();
		column.toggleVisibility(!isVisible);
	}, []);

	// Handle drag start
	const handleDragStart = useCallback((e: React.DragEvent, columnId: string) => {
		setDraggedColumnId(columnId);
		e.dataTransfer.effectAllowed = 'move';
		// This helps with dragging visuals
		if (e.dataTransfer.setDragImage && e.currentTarget instanceof HTMLElement) {
			e.dataTransfer.setDragImage(e.currentTarget, 20, 20);
		}
	}, []);

	// Handle drag over
	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	}, []);

	// Handle drop
	const handleDrop = useCallback(
		(e: React.DragEvent, targetColumnId: string) => {
			e.preventDefault();

			if (!draggedColumnId || draggedColumnId === targetColumnId) return;

			// Get current column order
			const currentOrder =
				table.getState().columnOrder.length > 0
					? [...table.getState().columnOrder]
					: table.getAllLeafColumns().map((d) => d.id);

			// Find indices
			const draggedIndex = currentOrder.indexOf(draggedColumnId);
			const targetIndex = currentOrder.indexOf(targetColumnId);

			if (draggedIndex === -1 || targetIndex === -1) return;

			// Create a new order by moving the dragged column
			const newOrder = [...currentOrder];
			newOrder.splice(draggedIndex, 1);
			newOrder.splice(targetIndex, 0, draggedColumnId);

			// Update table column order
			table.setColumnOrder(newOrder);

			// Save to localStorage
			saveColumnOrder(newOrder);

			setDraggedColumnId(null);
		},
		[draggedColumnId, table, saveColumnOrder]
	);

	// Reset column order
	const resetColumnOrder = useCallback(() => {
		// Clear order by setting an empty array (table will use the default order)
		table.setColumnOrder([]);
		// Remove from localStorage
		localStorage.removeItem(columnOrderStorageKey);
	}, [table, columnOrderStorageKey]);

	// Get column display label
	const getColumnLabel = useCallback(
		(column: Column<TData, unknown>) => {
			// First, check if we have a mapping for this column
			if (columnMapping && column.id in columnMapping) {
				return columnMapping[column.id];
			}
			// Then check for meta-label
			return (
				(column.columnDef.meta as { label?: string })?.label ??
				// Finally, fall back to formatted column ID
				column.id.replace(/_/g, ' ')
			);
		},
		[columnMapping]
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					aria-label="Column visibility options"
					variant="outline"
					size={size}
					leftIcon={<Settings2 className="h-4 w-4" />}
					hideIcon={false}
					className="ml-auto"
				/>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-fit p-0">
				<Command className="bg-transparent">
					<CommandInput placeholder="Search columns..." />
					<CommandList>
						<CommandEmpty>No columns found.</CommandEmpty>
						<CommandGroup>
							{orderedColumns.map((column) => (
								<CommandItem
									key={column.id}
									onSelect={() => handleColumnVisibilityToggle(column)}
									draggable
									onDragStart={(e) => handleDragStart(e, column.id)}
									onDragOver={handleDragOver}
									onDrop={(e) => handleDrop(e, column.id)}
									className={cn(
										'flex cursor-grab items-center hover:[&_svg]:text-[var(--label)]',
										draggedColumnId === column.id && 'bg-accent opacity-50'
									)}
								>
									<GripVertical className="mr-2 h-4 w-4 cursor-grab" />
									<span className="flex-grow truncate capitalize">{getColumnLabel(column)}</span>
									<Check
										className={cn(
											'ml-auto h-4 w-4',
											column.getIsVisible() ? 'opacity-100' : 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
						<CommandSeparator />
						<CommandGroup>
							<CommandItem
								onSelect={resetColumnOrder}
								className="cursor-pointer justify-center text-center"
							>
								<RotateCcw className="mr-2 h-4 w-4" />
								Reset Column Order
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
