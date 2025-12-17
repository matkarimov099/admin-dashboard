import { z } from 'zod';
import { TaskPriority, TaskStatus, TaskWorkType } from '../types.ts';

// ==================== CREATE SCHEMA ====================
export const taskCreateSchema = () => {
  return z
    .object({
      title: z
        .string()
        .min(3, 'Title must be at least 3 characters')
        .max(200, 'Title must be 200 characters or less'),
      description: z
        .string()
        .max(3000, 'Description must be 2000 characters or less')
        .optional()
        .transform(val => (val === '' ? undefined : val)),
      status: z.nativeEnum(TaskStatus, { message: 'Status is required' }),
      priority: z.nativeEnum(TaskPriority, { message: 'Priority is required' }),
      workType: z.nativeEnum(TaskWorkType, { message: 'Work type is required' }),
      projectId: z.string().min(1, 'Project is required'),
      assigneeId: z
        .string()
        .min(1, 'Assignee is required')
        .optional()
        .transform(val => (val === '' ? undefined : val)),
      linkedTaskUrls: z
        .array(z.string().url('Invalid URL format'))
        .max(20, 'Maximum 20 linked tasks allowed')
        .optional()
        .transform(val => (val?.length === 0 ? undefined : val)),
      assetIds: z
        .array(z.string())
        .max(50, 'Maximum 50 assets allowed')
        .optional()
        .transform(val => (val?.length === 0 ? undefined : val)),
      estimate: z
        .number()
        .positive('Estimate must be positive')
        .max(999.99, 'Estimate must be less than 1000 hours')
        .optional(),
      deadline: z
        .string()
        .optional()
        .transform(val => (val === '' ? undefined : val)),
    })
    .refine(
      data => {
        if (data.deadline) {
          const deadlineDate = new Date(data.deadline);
          const now = new Date();
          return deadlineDate > now;
        }
        return true;
      },
      {
        message: 'Deadline must be in the future',
        path: ['deadline'],
      }
    );
};

export type TaskCreateSchema = z.infer<ReturnType<typeof taskCreateSchema>>;

// ==================== UPDATE SCHEMA ====================
export const taskUpdateSchema = () => {
  return z.object({
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters')
      .max(200, 'Title must be 200 characters or less')
      .optional(),
    description: z
      .string()
      .max(3000, 'Description must be 2000 characters or less')
      .optional()
      .transform(val => (val === '' ? undefined : val)),
    status: z.nativeEnum(TaskStatus).optional(),
    priority: z.nativeEnum(TaskPriority).optional(),
    workType: z.nativeEnum(TaskWorkType, { message: 'Work type is required' }),
    projectId: z
      .string()
      .min(1, 'Project is required')
      .optional()
      .transform(val => (val === '' ? undefined : val)),
    assigneeId: z
      .string()
      .optional()
      .transform(val => (val === '' ? undefined : val)),
    linkedTaskUrls: z
      .array(z.string().url('Invalid URL format'))
      .max(20, 'Maximum 20 linked tasks allowed')
      .optional()
      .transform(val => (val?.length === 0 ? undefined : val)),
    addAssetIds: z
      .array(z.string())
      .max(50, 'Maximum 50 assets allowed')
      .optional()
      .transform(val => (val?.length === 0 ? undefined : val)),
    removeAssetIds: z
      .array(z.string())
      .max(50, 'Maximum 50 assets allowed')
      .optional()
      .transform(val => (val?.length === 0 ? undefined : val)),
    estimate: z
      .number()
      .positive('Estimate must be positive')
      .max(999.99, 'Estimate must be less than 1000 hours')
      .optional(),
    deadline: z
      .string()
      .optional()
      .transform(val => (val === '' ? undefined : val)),
  });
};

export type TaskUpdateSchema = z.infer<ReturnType<typeof taskUpdateSchema>>;
