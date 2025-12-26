import {
  keepPreviousData,
  skipToken,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useMemo } from 'react';
import { taskService } from '../services/tasks.service.ts';
import type { TaskFilter, TaskUpdate } from '../types.ts';

// ============ QUERY KEYS ============
export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (filter: TaskFilter) => [...taskKeys.lists(), filter] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
  byKey: () => [...taskKeys.all, 'by-key'] as const,
  byKeyDetail: (taskKey: string) => [...taskKeys.byKey(), taskKey] as const,
  my: () => [...taskKeys.all, 'my'] as const,
  myList: (filter: TaskFilter) => [...taskKeys.my(), filter] as const,
};

// ==================== QUERIES ====================

// ============ QUERIES ============
export function useTaskList(filter?: TaskFilter) {
  const { data, isLoading, isFetching, error, isRefetching, refetch } = useQuery({
    queryKey: filter ? taskKeys.list(filter) : taskKeys.lists(),
    queryFn: filter ? () => taskService.getList(filter) : skipToken,
    placeholderData: keepPreviousData,
  });

  return useMemo(
    () => ({
      tasks: data?.data ?? [],
      total: data?.total ?? 0,
      isLoading,
      isFetching,
      error,
      refetch,
      isRefetching,
      isEmpty: !isLoading && !data?.data?.length,
    }),
    [data?.data, data?.total, isLoading, isFetching, error, refetch, isRefetching]
  );
}

export function useMyTasks(filter?: TaskFilter) {
  const { data, isLoading, isFetching, error, isRefetching } = useQuery({
    queryKey: filter ? taskKeys.myList(filter) : taskKeys.my(),
    queryFn: () => taskService.getMyTasks(filter),
    placeholderData: keepPreviousData,
  });

  return useMemo(
    () => ({
      items: data?.data ?? [],
      total: data?.total ?? 0,
      isLoading,
      isFetching,
      error,
      isRefetching,
      isEmpty: !isLoading && !data?.data?.length,
    }),
    [data, isLoading, isFetching, error, isRefetching]
  );
}

export function useTask(id: string | undefined) {
  return useQuery({
    queryKey: id ? taskKeys.detail(id) : taskKeys.details(),
    queryFn: id ? () => taskService.getById(id) : skipToken,
    enabled: !!id,
  });
}

export function useTaskByKey(taskKey: string | undefined) {
  return useQuery({
    queryKey: taskKey ? taskKeys.byKeyDetail(taskKey) : taskKeys.byKey(),
    queryFn: taskKey ? () => taskService.getByKey(taskKey) : skipToken,
    enabled: !!taskKey,
  });
}

// ============ MUTATIONS ============
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.my() });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TaskUpdate }) => taskService.update(id, data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.details() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.byKey() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.my() });
    },
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.updateStatus,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.details() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.byKey() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.my() });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.delete,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.details() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.byKey() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.my() });
    },
  });
}

export function useAssignToMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.assignToMe,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.details() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.my() });
    },
  });
}

export function useUnassignFromMe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.unassignFromMe,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.details() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.my() });
    },
  });
}

export function useDeleteTaskAsset() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: taskService.deleteAsset,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.details() });
      void queryClient.invalidateQueries({ queryKey: taskKeys.my() });
    },
  });
}
