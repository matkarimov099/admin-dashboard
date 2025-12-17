import type { LucideIcon } from 'lucide-react';
import {
	AlertCircle,
	AlertTriangle,
	CheckCircle2,
	Circle,
	Loader2,
	Pause,
	Search,
	Signal,
	X,
	Zap,
} from 'lucide-react';
import type { User } from '@/features/users/types.ts';
import { TaskPriority, TaskStatus } from '../types.ts';

/**
 * Get user initials from first and last name
 */
export function getUserInitials(user: User): string {
	const firstInitial = user.firstName?.[0] || '';
	const lastInitial = user.lastName?.[0] || '';
	return `${firstInitial}${lastInitial}`.toUpperCase();
}

/**
 * Get user full name
 */
export function getUserFullName(user: User): string {
	return `${user.firstName} ${user.lastName}`.trim();
}

/**
 * Check if a file is an image based on extension
 */
export function isImageFile(fileName: string): boolean {
	const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
	const lowerFileName = fileName ? fileName.toLowerCase() : '';
	return imageExtensions.some((ext) => lowerFileName.endsWith(ext));
}

/**
 * Format status text for display
 */
export function formatStatusText(status: TaskStatus): string {
	return status.replace('_', ' ').toUpperCase();
}

/**
 * Format priority text for display
 */
export function formatPriorityText(priority: TaskPriority): string {
	return priority.toUpperCase();
}

/**
 * Get status icon component
 */
export function getStatusIcon(status: TaskStatus): LucideIcon {
	const icons: Record<TaskStatus, LucideIcon> = {
		[TaskStatus.DONE]: CheckCircle2,
		[TaskStatus.IN_PROGRESS]: Loader2,
		[TaskStatus.IN_REVIEW]: Search,
		[TaskStatus.PAUSED]: Pause,
		[TaskStatus.CANCELLED]: X,
		[TaskStatus.TODO]: Circle,
		[TaskStatus.BACKLOG]: Circle,
	};

	return icons[status] || Circle;
}

/**
 * Get priority icon component
 */
export function getPriorityIcon(priority: TaskPriority): LucideIcon {
	const icons: Record<TaskPriority, LucideIcon> = {
		[TaskPriority.URGENT]: Zap,
		[TaskPriority.HIGH]: AlertCircle,
		[TaskPriority.MEDIUM]: AlertTriangle,
		[TaskPriority.LOW]: Signal,
	};

	return icons[priority] || Signal;
}
