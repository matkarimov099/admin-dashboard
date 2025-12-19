import axiosClient from '@/plugins/axios.ts';
import type { ApiResponse, PaginatedResponse } from '@/types/common.ts';
import type { Task, TaskCreate, TaskFilter, TaskUpdate, UpdateTaskStatus } from '../types.ts';

export const taskService = {
  // POST - Create task
  create: async (data: TaskCreate): Promise<ApiResponse> => {
    const { data: response } = await axiosClient.post<ApiResponse>('/tasks', data);
    return response;
  },

  // POST - Get tasks with filter
  getList: async (filter: TaskFilter): Promise<PaginatedResponse<Task>> => {
    // Clean up empty arrays before sending to backend
    const cleanedFilter = { ...filter };

    // Remove projectIds if it's an empty array
    if (cleanedFilter.projectIds && cleanedFilter.projectIds.length === 0) {
      cleanedFilter.projectIds = undefined;
    }

    const { data } = await axiosClient.post<PaginatedResponse<Task>>('/tasks/search', cleanedFilter);
    return data;
  },

  // GET - My tasks
  getMyTasks: async (filter?: TaskFilter): Promise<PaginatedResponse<Task>> => {
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

    const { data } = await axiosClient.get<PaginatedResponse<Task>>(url);
    return data;
  },

  // GET - Single task by ID
  getById: async (id: string): Promise<Task> => {
    const { data } = await axiosClient.get<Task>(`/tasks/${id}`);
    return data;
  },

  // GET - Single task by key
  getByKey: async (taskKey: string): Promise<Task> => {
    const { data } = await axiosClient.get<Task>(`/tasks/by-key/${taskKey}`);
    return data;
  },

  // PUT - Update task
  update: async (id: string, data: TaskUpdate): Promise<ApiResponse> => {
    const { data: response } = await axiosClient.put<ApiResponse>(`/tasks/${id}`, data);
    return response;
  },

  // POST - Update task status
  updateStatus: async (data: UpdateTaskStatus): Promise<ApiResponse> => {
    const { data: response } = await axiosClient.post<ApiResponse>('/tasks/update-status', data);
    return response;
  },

  // DELETE - Delete task
  delete: async (id: string): Promise<ApiResponse> => {
    const { data } = await axiosClient.delete<ApiResponse>(`/tasks/${id}`);
    return data;
  },

  // Custom actions
  assignToMe: async (taskId: string): Promise<ApiResponse> => {
    const { data: response } = await axiosClient.get<ApiResponse>(`/tasks/assign-to-me/${taskId}`);
    return response;
  },

  unassignFromMe: async (taskId: string): Promise<ApiResponse> => {
    const { data: response } = await axiosClient.get<ApiResponse>(`/tasks/unassign-from-me/${taskId}`);
    return response;
  },

  deleteAsset: async (assetId: string): Promise<ApiResponse> => {
    const { data: response } = await axiosClient.delete<ApiResponse>(`/tasks/assets/${assetId}`);
    return response;
  }
};
