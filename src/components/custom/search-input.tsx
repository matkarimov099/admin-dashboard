import { Search, X } from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import { cn } from '@/utils/utils';

export interface SearchInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
	value?: string;
	onValueChange?: (value: string) => void;
	onClear?: () => void;
	placeholder?: string;
	className?: string;
	inputClassName?: string;
	showClearButton?: boolean;
	/** Debounce delay in milliseconds (default: 300) */
	debounceDelay?: number;
	/** Minimum characters before triggering search (default: 0) */
	minSearchLength?: number;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
	(
		{
			value = '',
			onValueChange,
			onClear,
			placeholder = 'Search...',
			className,
			inputClassName,
			showClearButton = true,
			debounceDelay = 300,
			minSearchLength = 1,
			...props
		},
		ref
	) => {
		// Local state for immediate input updates
		const [localValue, setLocalValue] = React.useState(value);

		// Track if we just cleared to prevent debounced value from triggering
		const justClearedRef = React.useRef(false);

		// Debounced value for API calls
		const debouncedValue = useDebounce(localValue, debounceDelay);

		// Sync local value with external value changes
		useEffect(() => {
			setLocalValue(value);
		}, [value]);

		// Trigger onValueChange when debounced value changes
		useEffect(() => {
			// Skip if we just cleared (to prevent old debounced value from triggering)
			if (justClearedRef.current && debouncedValue !== '') {
				justClearedRef.current = false;
				return;
			}

			// Only trigger if meets minimum length requirement or is empty (for clearing)
			if (debouncedValue.length >= minSearchLength || debouncedValue.length === 0) {
				if (debouncedValue !== value && onValueChange) {
					onValueChange(debouncedValue);
				}
			}
		}, [debouncedValue, minSearchLength, value, onValueChange]);

		const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
			justClearedRef.current = false;
			setLocalValue(event.target.value);
		}, []);

		const handleClear = React.useCallback(
			(e: React.MouseEvent<HTMLButtonElement>) => {
				e.preventDefault();
				e.stopPropagation();
				justClearedRef.current = true;
				setLocalValue('');
				onValueChange?.('');
				onClear?.();
			},
			[onValueChange, onClear]
		);

		return (
			<div className={cn('relative', className)}>
				<Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					ref={ref}
					placeholder={placeholder}
					value={localValue}
					onChange={handleChange}
					className={cn(
						'w-[300px] rounded-md border bg-background pl-9 text-foreground placeholder:text-muted-foreground',
						localValue && showClearButton ? 'pr-10' : 'pr-3',
						inputClassName
					)}
					{...props}
				/>
				{showClearButton && localValue && (
					<button
						onClick={handleClear}
						onMouseDown={(e) => {
							e.preventDefault();
						}}
						className="absolute top-1/2 right-3 z-10 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
						type="button"
						aria-label="Clear search"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</div>
		);
	}
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
