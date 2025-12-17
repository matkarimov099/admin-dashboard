import * as React from 'react';
import { forwardRef } from 'react';

import { Typography } from '@/components/ui/typography';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/utils/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	inputSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
	label?: string;
	error?: string;
	helperText?: string;
	suffix?: React.ReactNode;
	prefix?: React.ReactNode;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	separator?: ' ' | ',' | '-';
};

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			inputSize = 'md',
			label,
			error,
			helperText,
			suffix,
			prefix,
			leftIcon,
			rightIcon,
			id,
			separator,
			value,
			onChange,
			'aria-describedby': ariaDescribedBy,
			...props
		},
		ref
	) => {
		const prefersReducedMotion = useReducedMotion();
		const generatedId = React.useId();
		const inputId = id || generatedId;
		const errorId = error ? `${inputId}-error` : undefined;
		const helperTextId = helperText ? `${inputId}-helper` : undefined;

		const describedBy =
			[ariaDescribedBy, errorId, helperTextId].filter(Boolean).join(' ') || undefined;

		// Format number with separator
		const formatValue = (val: string | number): string => {
			if (!separator) return String(val);

			const str = String(val).replace(/[^\d.]/g, '');
			if (!str) return '';

			const parts = str.split('.');
			parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);

			return parts.join('.');
		};

		// Handle change for formatted input
		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!separator || !onChange) {
				onChange?.(e);
				return;
			}

			const rawValue = e.target.value.replace(/[^\d.]/g, '');
			const formatted = formatValue(rawValue);

			e.target.value = rawValue;
			onChange(e);

			// Update display after onChange
			setTimeout(() => {
				if (e.target) {
					e.target.value = formatted;
				}
			}, 0);
		};

		// Display formatted value
		const displayValue =
			separator && value !== undefined && (typeof value === 'string' || typeof value === 'number')
				? formatValue(value)
				: value;

		// Apply reduced motion classes if the user prefers reduced motion
		const motionAwareClassName = React.useMemo(() => {
			return cn(
				'flex w-full bg-control border-control rounded-md text-primary font file:border-0 file:bg-transparent file:font-medium file:text-primary placeholder:text-secondary placeholder:opacity-75 placeholder:text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 appearance-none',
				// Focus styles - blue focus ring (smaller)
				'focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus:border-blue-500',
				// Transition with conditional duration
				prefersReducedMotion ? 'transition-colors duration-0' : 'transition-fast',
				// Size-specific classes
				inputSize === 'xs' && 'h-7 text-xs px-2 py-1 rounded-sm',
				inputSize === 'sm' && 'h-8 text-sm px-3 py-1.5 rounded-md',
				inputSize === 'md' && 'h-9 text-base px-4 py-2 rounded-md',
				inputSize === 'lg' && 'h-11 text-lg px-5 py-2.5 rounded-lg',
				inputSize === 'xl' && 'h-12 text-xl px-6 py-3 rounded-lg',
				// Error state
				error && 'border-[var(--system-red)] focus:border-[var(--system-red)]',
				className
			);
		}, [inputSize, className, prefersReducedMotion, error]);

		return (
			<div className="space-y-1">
				{label && (
					<label htmlFor={inputId} className="font block text-primary text-sm">
						{label}
						{props.required && (
							<span className="ml-1 text-red" aria-label="required">
								*
							</span>
						)}
					</label>
				)}

				{leftIcon || rightIcon || suffix || prefix ? (
					<div className="relative w-full">
						{leftIcon && (
							<span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-secondary">
								{leftIcon}
							</span>
						)}
						{prefix && !leftIcon && (
							<span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-secondary">
								{prefix}
							</span>
						)}
						<input
							type={separator ? 'text' : type}
							id={inputId}
							data-size={inputSize}
							className={cn(
								motionAwareClassName,
								(leftIcon || prefix) && 'pl-10',
								(rightIcon || suffix) && 'pr-10'
							)}
							ref={ref}
							value={displayValue}
							onChange={handleChange}
							aria-describedby={describedBy}
							aria-invalid={error ? 'true' : undefined}
							{...props}
						/>
						{rightIcon && (
							<span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-secondary">
								{rightIcon}
							</span>
						)}
						{suffix && !rightIcon && (
							<span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-secondary">
								{suffix}
							</span>
						)}
					</div>
				) : (
					<input
						type={separator ? 'text' : type}
						id={inputId}
						data-size={inputSize}
						className={motionAwareClassName}
						ref={ref}
						value={displayValue}
						onChange={handleChange}
						aria-describedby={describedBy}
						aria-invalid={error ? 'true' : undefined}
						{...props}
					/>
				)}

				{error && (
					<Typography
						id={errorId}
						variant="small"
						className="font text-red"
						role="alert"
						aria-live="polite"
					>
						{error}
					</Typography>
				)}

				{helperText && !error && (
					<Typography id={helperTextId} variant="small" className="font text-secondary">
						{helperText}
					</Typography>
				)}
			</div>
		);
	}
);
Input.displayName = 'Input';

export { Input };
