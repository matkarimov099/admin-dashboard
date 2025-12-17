import * as SwitchPrimitive from '@radix-ui/react-switch';
import type * as React from 'react';

import { cn } from '@/utils/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				// Base styles with explicit sizing
				'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors',
				// Border styles - same as other components
				'border border-input',
				// Focus styles
				'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
				// Disabled styles
				'disabled:cursor-not-allowed disabled:opacity-50',
				// State-based background colors - blue when active
				'data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600',
				'data-[state=unchecked]:border-input data-[state=unchecked]:bg-gray-200',
				// Dark mode adjustments
				'dark:data-[state=unchecked]:border-gray-600 dark:data-[state=unchecked]:bg-gray-700',
				'dark:data-[state=checked]:border-blue-600 dark:data-[state=checked]:bg-blue-600',
				className
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					// Base thumb styles
					'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform',
					// Position based on state
					'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0',
					// Ensure white thumb in all states
					'data-[state=checked]:bg-white data-[state=unchecked]:bg-white',
					// Dark mode thumb colors
					'dark:bg-white dark:data-[state=checked]:bg-white dark:data-[state=unchecked]:bg-white'
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
