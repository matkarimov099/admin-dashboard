import type { TFunction } from 'i18next';
import { z } from 'zod';
import { TaskPriority, TaskStatus, TaskWorkType } from '../types.ts';

// ==================== CREATE SCHEMA ====================
export const taskCreateSchema = (t: TFunction) => {
  return z
    .object({
      title: z
        .string()
        .min(3, t('tasks.validation.title.minLength', { min: 3 }))
        .max(200, t('tasks.validation.title.maxLength', { max: 200 })),
      description: z
        .string()
        .max(3000, t('tasks.validation.description.maxLength', { max: 3000 }))
        .optional()
        .transform(val => (val === '' ? undefined : val)),
      status: z.nativeEnum(TaskStatus, { message: t('tasks.validation.status.required') }),
      priority: z.nativeEnum(TaskPriority, { message: t('tasks.validation.priority.required') }),
      workType: z.nativeEnum(TaskWorkType, { message: t('tasks.validation.workType.required') }),
      projectId: z.string().min(1, t('tasks.validation.projectId.required')),
      assigneeId: z
        .string()
        .min(1, t('tasks.validation.assigneeId.required'))
        .optional()
        .transform(val => (val === '' ? undefined : val)),
      linkedTaskUrls: z
        .array(z.string().url(t('tasks.validation.linkedTaskUrls.invalid')))
        .max(20, t('tasks.validation.linkedTaskUrls.max', { max: 20 }))
        .optional()
        .transform(val => (val?.length === 0 ? undefined : val)),
      assetIds: z
        .array(z.string())
        .max(50, t('tasks.validation.assetIds.max', { max: 50 }))
        .optional()
        .transform(val => (val?.length === 0 ? undefined : val)),
      estimate: z
        .number()
        .positive(t('tasks.validation.estimatedHours.positive'))
        .max(999.99, t('tasks.validation.estimatedHours.max', { max: 1000 }))
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
        message: t('tasks.validation.deadline.future'),
        path: ['deadline'],
      }
    );
};

export type TaskCreateSchema = z.infer<ReturnType<typeof taskCreateSchema>>;

// ==================== UPDATE SCHEMA ====================
export const taskUpdateSchema = (t: TFunction) => {
  return z.object({
    title: z
      .string()
      .min(3, t('tasks.validation.title.minLength', { min: 3 }))
      .max(200, t('tasks.validation.title.maxLength', { max: 200 }))
      .optional(),
    description: z
      .string()
      .max(3000, t('tasks.validation.description.maxLength', { max: 3000 }))
      .optional()
      .transform(val => (val === '' ? undefined : val)),
    status: z.nativeEnum(TaskStatus).optional(),
    priority: z.nativeEnum(TaskPriority).optional(),
    workType: z.nativeEnum(TaskWorkType, { message: t('tasks.validation.workType.required') }),
    projectId: z
      .string()
      .min(1, t('tasks.validation.projectId.required'))
      .optional()
      .transform(val => (val === '' ? undefined : val)),
    assigneeId: z
      .string()
      .optional()
      .transform(val => (val === '' ? undefined : val)),
    linkedTaskUrls: z
      .array(z.string().url(t('tasks.validation.linkedTaskUrls.invalid')))
      .max(20, t('tasks.validation.linkedTaskUrls.max', { max: 20 }))
      .optional()
      .transform(val => (val?.length === 0 ? undefined : val)),
    addAssetIds: z
      .array(z.string())
      .max(50, t('tasks.validation.assetIds.max', { max: 50 }))
      .optional()
      .transform(val => (val?.length === 0 ? undefined : val)),
    removeAssetIds: z
      .array(z.string())
      .max(50, t('tasks.validation.assetIds.max', { max: 50 }))
      .optional()
      .transform(val => (val?.length === 0 ? undefined : val)),
    estimate: z
      .number()
      .positive(t('tasks.validation.estimatedHours.positive'))
      .max(999.99, t('tasks.validation.estimatedHours.max', { max: 1000 }))
      .optional(),
    deadline: z
      .string()
      .optional()
      .transform(val => (val === '' ? undefined : val)),
  });
};

export type TaskUpdateSchema = z.infer<ReturnType<typeof taskUpdateSchema>>;
