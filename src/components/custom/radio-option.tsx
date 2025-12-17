import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';
import { forwardRef } from 'react';
import type { RadioOptionProps } from '@/features/time-tracking/types';
import { cn } from '@/utils/utils';

export const RadioOption = forwardRef<HTMLButtonElement, RadioOptionProps>(
	({ value, label, icon: Icon, className, description }, ref) => {
		return (
			<RadioGroupPrimitive.Item
				ref={ref}
				value={value}
				className={cn(
					'group relative flex cursor-pointer items-center gap-3 rounded-lg border-2 p-3.5 transition-all',
					'border-border bg-card hover:bg-accent/50',
					'data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-50 data-[state=checked]:shadow-sm dark:data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-950/50',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
					className
				)}
			>
				{/* Custom Radio Visual */}
				<div className="relative flex size-5 shrink-0 items-center justify-center">
					<div
						className={cn(
							'flex size-5 items-center justify-center rounded-full border-2 transition-all',
							'border-border',
							'group-data-[state=checked]:border-blue-600 group-data-[state=checked]:bg-blue-600 dark:group-data-[state=checked]:border-blue-400 dark:group-data-[state=checked]:bg-blue-500'
						)}
					>
						<RadioGroupPrimitive.Indicator className="flex items-center justify-center">
							<Check className="size-3 text-white" strokeWidth={3} />
						</RadioGroupPrimitive.Indicator>
					</div>
				</div>

				{/* Icon */}
				{Icon && (
					<div
						className={cn(
							'rounded-lg p-2.5 transition-all',
							'bg-muted',
							'group-data-[state=checked]:bg-blue-200 group-data-[state=checked]:shadow-sm dark:group-data-[state=checked]:bg-blue-800/80'
						)}
					>
						<Icon
							className={cn(
								'size-5 transition-colors',
								'text-muted-foreground',
								'group-data-[state=checked]:text-blue-700 dark:group-data-[state=checked]:text-blue-300'
							)}
						/>
					</div>
				)}

				{/* Label Text */}
				<div className="flex-1">
					<p
						className={cn(
							'font-medium text-sm transition-colors',
							'text-foreground',
							'group-data-[state=checked]:text-blue-700 dark:group-data-[state=checked]:text-blue-300'
						)}
					>
						{label}
					</p>
					{description && <p className="mt-0.5 text-muted-foreground text-xs">{description}</p>}
				</div>
			</RadioGroupPrimitive.Item>
		);
	}
);

RadioOption.displayName = 'RadioOption';
