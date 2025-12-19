import type { TFunction } from 'i18next';
import { z } from 'zod';
import type { LoginCredentials } from '@/features/auth/types.ts';

// Phone number regex for Uzbekistan
// const phoneRegex = /^(?:\+998|998|8)\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;

export const createLoginSchema = (t: TFunction) => {
  return z.object({
    username: z
      .string({ message: t('auth.username.validation.required') })
      .min(3, t('auth.username.validation.minLength', { min: 3 })),
    password: z
      .string({ message: t('auth.password.validation.required') })
      .min(4, t('auth.password.validation.minLength', { min: 5 })),
  }) satisfies z.ZodType<LoginCredentials>;
};

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;
