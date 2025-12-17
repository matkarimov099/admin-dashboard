import type { Project } from '@/features/projects/types.ts';
import type { User } from '@/features/users/types.ts';
import type { Asset, PaginationFilter } from '@/types/common.ts';

// ==================== STATUS ENUMS ====================
export const TaskStatus = {
	BACKLOG: 'backlog',
	TODO: 'todo',
	IN_PROGRESS: 'in_progress',
	PAUSED: 'paused',
	IN_REVIEW: 'in_review',
	DONE: 'done',
	CANCELLED: 'cancelled',
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TaskStatusOptions: { label: string; value: TaskStatus }[] = [
	{ label: 'Backlog', value: TaskStatus.BACKLOG },
	{ label: 'To Do', value: TaskStatus.TODO },
	{ label: 'In Progress', value: TaskStatus.IN_PROGRESS },
	{ label: 'Paused', value: TaskStatus.PAUSED },
	{ label: 'In Review', value: TaskStatus.IN_REVIEW },
	{ label: 'Done', value: TaskStatus.DONE },
	{ label: 'Cancelled', value: TaskStatus.CANCELLED },
];

// ==================== PRIORITY ENUMS ====================
export const TaskPriority = {
	LOW: 'low',
	MEDIUM: 'medium',
	HIGH: 'high',
	URGENT: 'urgent',
} as const;

export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

export const TaskPriorityOptions: { label: string; value: TaskPriority }[] = [
	{ label: 'Low', value: TaskPriority.LOW },
	{ label: 'Medium', value: TaskPriority.MEDIUM },
	{ label: 'High', value: TaskPriority.HIGH },
	{ label: 'Urgent', value: TaskPriority.URGENT },
];

// ==================== WORK TYPE ENUMS ====================
export const TaskWorkType = {
	BUG: 'bug',
	TASK: 'task',
	STORY: 'story',
	EPIC: 'epic',
} as const;

export type TaskWorkType = (typeof TaskWorkType)[keyof typeof TaskWorkType];

export const TaskWorkTypeOptions: { label: string; value: TaskWorkType }[] = [
	{ label: 'Bug', value: TaskWorkType.BUG },
	{ label: 'Task', value: TaskWorkType.TASK },
	{ label: 'Story', value: TaskWorkType.STORY },
	{ label: 'Epic', value: TaskWorkType.EPIC },
];

// ==================== ENTITY TYPES ====================
export interface LinkedTask {
	url: string;
}

export interface TaskAsset {
	id: string;
	asset: Asset;
	uploadedBy: User;
	uploadedAt: string;
	url: string;
}

export interface Task {
	id: string;
	taskKey: string;
	taskNumber: number;
	title: string;
	description?: string;
	status: TaskStatus;
	priority: TaskPriority;
	workType: TaskWorkType;
	assignee: User;
	creator: User;
	creatorId: string;
	project: Project;
	projectId: string;
	linkedTasks?: LinkedTask[];
	assets?: TaskAsset[];
	estimate?: number; // Hours
	deadline?: string;
	completedAt?: string;
	createdAt: string;
	updatedAt: string;
}

// ==================== INPUT TYPES ====================
export interface TaskCreate {
	title: string;
	description?: string;
	status: TaskStatus;
	priority: TaskPriority;
	workType: TaskWorkType;
	projectId: string;
	assigneeId?: string;
	linkedTaskUrls?: string[];
	assetIds?: string[];
	estimate?: number;
	deadline?: string;
}

export interface TaskUpdate {
	title?: string;
	description?: string;
	status?: TaskStatus;
	priority?: TaskPriority;
	workType: TaskWorkType;
	projectId?: string;
	assigneeId?: string;
	linkedTaskUrls?: string[];
	addAssetIds?: string[];
	removeAssetIds?: string[];
	estimate?: number;
	deadline?: string;
}

export interface UpdateTaskStatus {
	taskId: string;
	status: TaskStatus;
}

// ==================== FILTER TYPES ====================
export interface TaskFilter extends PaginationFilter {
	title?: string;
	status?: TaskStatus;
	priority?: TaskPriority;
	projectIds?: string[];
	assigneeId?: string;
	creatorId?: string;
	fromDate?: string;
	toDate?: string;
}
