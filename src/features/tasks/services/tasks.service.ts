import type { AxiosResponse } from 'axios';
import axiosClient from '@/plugins/axios.ts';
import type { ApiResponse, PaginatedResponse, ServerError } from '@/types/common.ts';
import type { Task, TaskCreate, TaskFilter, TaskUpdate, UpdateTaskStatus } from '../types.ts';

// ==================== CREATE ====================
export async function createTask(data: TaskCreate): Promise<ApiResponse> {
	return await axiosClient
		.post<ApiResponse, AxiosResponse<ApiResponse, ServerError>>('/tasks', data)
		.then((res) => res.data);
}

// ==================== READ ====================
export async function getTasks(filter: TaskFilter) {
	// Clean up empty arrays before sending to backend
	const cleanedFilter = { ...filter };

	// Remove projectIds if it's an empty array
	if (cleanedFilter.projectIds && cleanedFilter.projectIds.length === 0) {
		cleanedFilter.projectIds = undefined;
	}

	return await axiosClient.post<PaginatedResponse<Task>>('/tasks/search', cleanedFilter);
}

export async function getMyTasks(filter?: TaskFilter) {
	const params = new URLSearchParams();
	if (filter?.status) params.append('status', filter.status);
	if (filter?.priority) params.append('priority', filter.priority);
	if (filter?.projectIds && filter.projectIds.length > 0) {
		for (const id of filter.projectIds) {
			params.append('projectIds', id);
		}
	}
	if (filter?.limit) params.append('limit', filter.limit.toString());
	if (filter?.page) params.append('page', filter.page.toString());

	const queryString = params.toString();
	const url = queryString ? `/tasks/my-tasks?${queryString}` : '/tasks/my-tasks';

	return await axiosClient.get<PaginatedResponse<Task>>(url);
}

export async function getTaskById(id: string) {
	return await axiosClient.get<Task>(`/tasks/${id}`);
}

export async function getTaskByKey(taskKey: string) {
	return await axiosClient.get<Task>(`/tasks/by-key/${taskKey}`);
}

export async function assignToMe(taskId: string): Promise<ApiResponse> {
	return await axiosClient
		.get<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(`/tasks/assign-to-me/${taskId}`)
		.then((res) => res.data);
}

export async function unassignFromMe(taskId: string): Promise<ApiResponse> {
	return await axiosClient
		.get<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(`/tasks/unassign-from-me/${taskId}`)
		.then((res) => res.data);
}

// ==================== UPDATE ====================
export async function updateTask(id: string, data: TaskUpdate): Promise<ApiResponse> {
	return await axiosClient
		.put<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(`/tasks/${id}`, data)
		.then((res) => res.data);
}

export async function updateTaskStatus(data: UpdateTaskStatus): Promise<ApiResponse> {
	return await axiosClient
		.post<ApiResponse, AxiosResponse<ApiResponse, ServerError>>('/tasks/update-status', data)
		.then((res) => res.data);
}

// ==================== DELETE ====================
export async function deleteTask(id: string): Promise<ApiResponse> {
	return await axiosClient.delete(`/tasks/${id}`).then((res) => res.data);
}

export async function deleteTaskAsset(assetId: string): Promise<ApiResponse> {
	return await axiosClient
		.delete<ApiResponse, AxiosResponse<ApiResponse, ServerError>>(`/tasks/assets/${assetId}`)
		.then((res) => res.data);
}
