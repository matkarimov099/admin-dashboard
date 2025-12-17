import { useMemo } from 'react';

export function useExportConfig() {
	// Mapping of data fields to export column headers
	const columnMapping = useMemo(() => {
		return {
			id: 'ID',
			title: 'Title',
			description: 'Description',
			status: 'Status',
			priority: 'Priority',
			'project.name': 'Project',
			assignees: 'Assignees',
			estimate: 'Estimate (hours)',
			linkedTasksCount: 'Linked Tasks',
			assetsCount: 'Attachments',
			deadline: 'Deadline',
			completedAt: 'Completed At',
			'creator.username': 'Created By',
			createdAt: 'Created Date',
			updatedAt: 'Updated Date',
		};
	}, []);

	// Column widths for Excel export
	const columnWidths = useMemo(() => {
		return [
			{ wch: 20 }, // ID
			{ wch: 40 }, // Title
			{ wch: 50 }, // Description
			{ wch: 15 }, // Status
			{ wch: 12 }, // Priority
			{ wch: 25 }, // Project
			{ wch: 30 }, // Assignees
			{ wch: 15 }, // Estimate
			{ wch: 12 }, // Linked Tasks
			{ wch: 12 }, // Attachments
			{ wch: 20 }, // Deadline
			{ wch: 20 }, // Completed At
			{ wch: 20 }, // Created By
			{ wch: 20 }, // Created Date
			{ wch: 20 }, // Updated Date
		];
	}, []);

	// Headers for CSV export (must match data keys)
	const headers = useMemo(() => {
		return [
			'id',
			'title',
			'description',
			'status',
			'priority',
			'project.name',
			'assignees',
			'estimate',
			'linkedTasksCount',
			'assetsCount',
			'deadline',
			'completedAt',
			'creator.username',
			'createdAt',
			'updatedAt',
		];
	}, []);

	return {
		columnMapping,
		columnWidths,
		headers,
		entityName: 'tasks',
	};
}
