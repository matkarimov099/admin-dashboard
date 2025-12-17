import {
	keepPreviousData,
	skipToken,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import type { ApiResponse, ServerError } from '@/types/common.ts';
import {
	assignToMe,
	createTask,
	deleteTask,
	deleteTaskAsset,
	getMyTasks,
	getTaskById,
	getTaskByKey,
	getTasks,
	unassignFromMe,
	updateTask,
	updateTaskStatus,
} from '../services/tasks.service.ts';
import type { TaskCreate, TaskFilter, TaskUpdate, UpdateTaskStatus } from '../types.ts';

const QUERY_KEYS = {
	TASKS: 'tasks',
	MY_TASKS: 'my-tasks',
	TASKS_DETAIL: 'tasks-detail',
	TASKS_BY_KEY: 'tasks-by-key',
};

// ==================== QUERIES ====================

/**
 * Get tasks with optional purpose for query key differentiation
 * @param filter - Task filter parameters
 * @param purpose - Purpose of the query (table, dropdown, etc.) to differentiate cache keys
 */
export function useGetTasks(filter?: TaskFilter, purpose?: string) {
	return useQuery({
		queryKey: purpose ? [QUERY_KEYS.TASKS, purpose, filter] : [QUERY_KEYS.TASKS, filter],
		queryFn: filter ? () => getTasks(filter) : skipToken,
		placeholderData: keepPreviousData,
	});
}
useGetTasks.isQueryHook = true;

export function useGetMyTasks(filter?: TaskFilter) {
	return useQuery({
		queryKey: [QUERY_KEYS.MY_TASKS, filter],
		queryFn: () => getMyTasks(filter),
		placeholderData: keepPreviousData,
	});
}
useGetMyTasks.isQueryHook = true;

export function useGetTaskById(id: string | undefined) {
	return useQuery({
		queryKey: [QUERY_KEYS.TASKS_DETAIL, id],
		queryFn: id ? () => getTaskById(id) : skipToken,
	});
}
useGetTaskById.isQueryHook = true;

export function useGetTaskByKey(taskKey: string | undefined) {
	return useQuery({
		queryKey: [QUERY_KEYS.TASKS_BY_KEY, taskKey],
		queryFn: taskKey ? () => getTaskByKey(taskKey) : skipToken,
	});
}
useGetTaskByKey.isQueryHook = true;

// ==================== MUTATIONS ====================

export function useCreateTask(purpose?: string) {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse, ServerError, TaskCreate>({
		mutationFn: createTask,
		onSuccess: () => {
			// Invalidate only the specific purpose query (table or board)
			if (purpose) {
				void queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.TASKS, purpose],
				});
			}
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MY_TASKS],
			});
		},
	});
}

export function useUpdateTask(purpose?: string) {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse, ServerError, { id: string; data: TaskUpdate }>({
		mutationFn: ({ id, data }) => updateTask(id, data),
		onSuccess: () => {
			// Invalidate only the specific purpose query (table or board)
			if (purpose) {
				void queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.TASKS, purpose],
				});
			}
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MY_TASKS],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_DETAIL],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_BY_KEY],
			});
		},
	});
}

export function useUpdateTaskStatus() {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse, ServerError, UpdateTaskStatus>({
		mutationFn: updateTaskStatus,
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS, 'board'],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MY_TASKS],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_DETAIL],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_BY_KEY],
			});
		},
	});
}

export function useDeleteTask(purpose?: string) {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse, ServerError, string>({
		mutationFn: (id: string) => deleteTask(id),
		onSuccess: () => {
			// Invalidate the specific purpose query if provided
			if (purpose) {
				void queryClient.invalidateQueries({
					queryKey: [QUERY_KEYS.TASKS, purpose],
				});
			}
			// Also invalidate detail queries
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_DETAIL],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_BY_KEY],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MY_TASKS],
			});
		},
	});
}

export function useAssignToMe() {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse, ServerError, string>({
		mutationFn: (taskId: string) => assignToMe(taskId),
		onSuccess: () => {
			// Invalidate queries to refetch updated data
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_DETAIL],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_BY_KEY],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS, 'table'],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS, 'board'],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MY_TASKS],
			});
		},
	});
}

export function useUnassignFromMe() {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse, ServerError, string>({
		mutationFn: (taskId: string) => unassignFromMe(taskId),
		onSuccess: () => {
			// Invalidate queries to refetch updated data
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_DETAIL],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_BY_KEY],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS, 'table'],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS, 'board'],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.MY_TASKS],
			});
		},
	});
}

export function useDeleteTaskAsset() {
	const queryClient = useQueryClient();
	return useMutation<ApiResponse, ServerError, { assetId: string }>({
		mutationFn: ({ assetId }) => deleteTaskAsset(assetId),
		onSuccess: () => {
			// Invalidate queries to refetch updated task data with new assets
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_DETAIL],
			});
			void queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.TASKS_BY_KEY],
			});
		},
	});
}
