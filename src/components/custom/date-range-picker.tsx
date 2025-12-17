import { endOfDay, endOfMonth, startOfDay, startOfMonth } from 'date-fns';
import { formatInTimeZone, toDate } from 'date-fns-tz';
import { CalendarIcon, X } from 'lucide-react';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/utils';

interface DateRangePickerProps extends React.HTMLAttributes<HTMLButtonElement> {
	className?: string;
	date: DateRange;
	closeOnSelect?: boolean;
	yearsRange?: number;
	onDateSelect: (range: DateRange) => void;
	placeholder?: string;
	disabled?: boolean;
	allowClear?: boolean;
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	size?: 'xs' | 'default' | 'sm' | 'lg' | 'md' | 'xl';
	popoverAlign?: 'start' | 'center' | 'end';
}

export const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
	(
		{
			className,
			date,
			closeOnSelect = false,
			onDateSelect,
			variant = 'outline',
			placeholder,
			disabled = false,
			allowClear = true,
			size = 'default',
			popoverAlign = 'center',
			...props
		},
		ref
	) => {
		const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
		const [selectedMonth, setSelectedMonth] = React.useState<Date | undefined>(
			date?.from || new Date()
		);
		const [selectedPreset, setSelectedPreset] = React.useState<string | null>(null);
		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const today = React.useMemo(() => new Date(), []);

		// Quick select presets
		const presets = React.useMemo(() => {
			const firstDayOfMonth = startOfMonth(today);
			const lastDayOfMonth = endOfMonth(today);
			const fifteenthDay = new Date(today.getFullYear(), today.getMonth(), 15);

			// Previous month calculations
			const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
			const lastDayOfPreviousMonth = endOfMonth(previousMonth);
			const sixteenthDayOfPreviousMonth = new Date(
				previousMonth.getFullYear(),
				previousMonth.getMonth(),
				16
			);

			return [
				{
					label: 'This Month',
					from: firstDayOfMonth,
					to: lastDayOfMonth,
				},
				{
					label: 'First 15 Days',
					from: firstDayOfMonth,
					to: fifteenthDay,
				},
				{
					label: 'Last 15 Days',
					from: new Date(today.getFullYear(), today.getMonth(), 16),
					to: lastDayOfMonth,
				},
				{
					label: 'Prev Month Last 15',
					from: sixteenthDayOfPreviousMonth,
					to: lastDayOfPreviousMonth,
				},
			];
		}, [today]);

		const handleClose = () => setIsPopoverOpen(false);

		const handleTogglePopover = (e: React.MouseEvent<HTMLButtonElement>) => {
			const target = e.target as HTMLElement;
			if (target.closest('[data-clear]')) {
				return;
			}
			if (!disabled) {
				setIsPopoverOpen((prev) => !prev);
			}
		};

		const handleWheel = (e: React.WheelEvent) => {
			e.stopPropagation();
		};

		const handleClearSelection = (e: React.MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			onDateSelect({ from: undefined, to: undefined });
			setSelectedPreset(null);
		};

		const handleDateSelect = (range: DateRange | undefined) => {
			if (range) {
				const from = range.from ? startOfDay(toDate(range.from, { timeZone })) : undefined;
				const to = range.to ? endOfDay(toDate(range.to, { timeZone })) : from;
				onDateSelect({ from, to });
				setSelectedPreset(null);
				if (range.from) {
					setSelectedMonth(range.from);
				}
				if (closeOnSelect && from && to) {
					setIsPopoverOpen(false);
				}
			}
		};

		const handlePresetSelect = (from: Date, to: Date, label: string) => {
			onDateSelect({
				from: startOfDay(toDate(from, { timeZone })),
				to: endOfDay(toDate(to, { timeZone })),
			});
			setSelectedPreset(label);
			setSelectedMonth(from);
			if (closeOnSelect) {
				setIsPopoverOpen(false);
			}
		};

		const formatWithTz = React.useCallback(
			(date: Date, fmt: string) => {
				if (fmt === 'dd') {
					return date.getDate().toString().padStart(2, '0');
				}

				if (fmt === 'LLL') {
					const monthNames = {
						en: [
							'Jan',
							'Feb',
							'Mar',
							'Apr',
							'May',
							'Jun',
							'Jul',
							'Aug',
							'Sep',
							'Oct',
							'Nov',
							'Dec',
						],
						ru: [
							'Янв',
							'Фев',
							'Мар',
							'Апр',
							'Май',
							'Июн',
							'Июл',
							'Авг',
							'Сен',
							'Окт',
							'Ноя',
							'Дек',
						],
						uz: [
							'Yan',
							'Fev',
							'Mar',
							'Apr',
							'May',
							'Iyun',
							'Iyul',
							'Avg',
							'Sen',
							'Okt',
							'Noy',
							'Dek',
						],
					};
					const currentLang = 'en' as keyof typeof monthNames;
					const months = monthNames[currentLang] || monthNames.en;
					return months[date.getMonth()];
				}

				if (fmt === 'y') {
					return date.getFullYear().toString();
				}

				return formatInTimeZone(date, timeZone, fmt);
			},
			[timeZone]
		);

		return (
			<>
				<style>
					{`
            .date-part {
              touch-action: none;
            }
          `}
				</style>
				<Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
					<PopoverTrigger asChild>
						<Button
							id="date-range"
							ref={ref}
							{...props}
							variant={variant}
							className={cn('relative w-auto justify-start pr-8 text-left font-normal', className)}
							size={size}
							onClick={handleTogglePopover}
							disabled={disabled}
							suppressHydrationWarning
							aria-label={placeholder || 'Select a date range'}
							aria-expanded={isPopoverOpen}
							aria-haspopup="dialog"
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							<span className="flex-1">
								{date?.from ? (
									date.to ? (
										<>
											<span className="date-part">{formatWithTz(date.from, 'dd')}</span>{' '}
											<span className="date-part">{formatWithTz(date.from, 'LLL')}</span>,{' '}
											<span className="date-part">{formatWithTz(date.from, 'y')}</span>
											{' - '}
											<span className="date-part">{formatWithTz(date.to, 'dd')}</span>{' '}
											<span className="date-part">{formatWithTz(date.to, 'LLL')}</span>,{' '}
											<span className="date-part">{formatWithTz(date.to, 'y')}</span>
										</>
									) : (
										<>
											<span className="date-part">{formatWithTz(date.from, 'dd')}</span>{' '}
											<span className="date-part">{formatWithTz(date.from, 'LLL')}</span>,{' '}
											<span className="date-part">{formatWithTz(date.from, 'y')}</span>
										</>
									)
								) : (
									<span className="text-secondary text-sm">
										{placeholder || 'Select a date range'}
									</span>
								)}
							</span>
							{allowClear && date?.from && (
								<span
									data-clear
									// biome-ignore lint/a11y/useSemanticElements: Using span to avoid nested button inside Button component
									role="button"
									tabIndex={0}
									onClick={handleClearSelection}
									onKeyDown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											handleClearSelection(e as unknown as React.MouseEvent);
										}
									}}
									className="absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-sm bg-background opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
									aria-label={'Clear'}
								>
									<X className="h-3 w-3" />
								</span>
							)}
						</Button>
					</PopoverTrigger>
					{isPopoverOpen && (
						<PopoverContent
							className="z-[9999] w-fit p-0"
							align={popoverAlign}
							avoidCollisions={false}
							onInteractOutside={handleClose}
							onEscapeKeyDown={handleClose}
							aria-label={placeholder || 'Select a date range'}
						>
							<div
								className="flex max-h-[85vh] flex-col overflow-y-auto p-4"
								onWheel={handleWheel}
								style={{
									overscrollBehavior: 'contain',
									WebkitOverflowScrolling: 'touch',
								}}
							>
								{/* Quick select buttons */}
								<div className="mb-4 grid grid-cols-2 gap-2">
									{presets.map((preset) => (
										<Button
											key={preset.label}
											variant="outline"
											size="sm"
											className={cn(
												'flex-1',
												selectedPreset === preset.label &&
													'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
											)}
											onClick={() => handlePresetSelect(preset.from, preset.to, preset.label)}
										>
											{preset.label}
										</Button>
									))}
								</div>

								{/* Calendar */}
								<div className="w-full">
									<Calendar
										mode="range"
										selected={date}
										onSelect={handleDateSelect}
										month={selectedMonth}
										onMonthChange={setSelectedMonth}
										showOutsideDays={false}
										size="full"
										className={className}
									/>
								</div>
							</div>
						</PopoverContent>
					)}
				</Popover>
			</>
		);
	}
);

DateRangePicker.displayName = 'DateRangePicker';
