import { z } from 'zod';
import { Position, Role } from '@/types/common.ts';

export const userCreateSchema = () => {
	return z.object({
		firstName: z.string().min(3, 'First name is required'),
		lastName: z.string().min(3, 'Last name is required'),
		email: z.string().email('Invalid email address'),
		username: z
			.string()
			.min(3, 'Username is required')
			.max(16, 'Username must be 16 characters or less'),
		role: z.nativeEnum(Role, { message: 'Role is required' }),
		position: z.enum(Object.values(Position) as [Position, ...Position[]]).optional(),
	});
};

export type UserCreateSchema = z.infer<ReturnType<typeof userCreateSchema>>;

export const userUpdateSchema = () => {
	return z.object({
		firstName: z.string().min(3, 'First name is required'),
		lastName: z.string().min(3, 'Last name is required'),
		email: z.string().email('Invalid email address'),
		username: z
			.string()
			.min(3, 'Username is required')
			.max(16, 'Username must be 16 characters or less'),
		role: z.nativeEnum(Role, { message: 'Role is required' }),
		position: z.enum(Object.values(Position) as [Position, ...Position[]]).optional(),
	});
};

export type UserUpdateSchema = z.infer<ReturnType<typeof userUpdateSchema>>;

export const updatePasswordSchema = () => {
	return z
		.object({
			currentPassword: z.string().min(1, 'Current password is required'),
			newPassword: z.string().min(6, 'New password must be at least 6 characters'),
			confirmPassword: z.string().min(1, 'Please confirm your new password'),
		})
		.refine((data) => data.newPassword === data.confirmPassword, {
			message: 'Passwords do not match',
			path: ['confirmPassword'],
		});
};

export type UpdatePasswordSchema = z.infer<ReturnType<typeof updatePasswordSchema>>;
