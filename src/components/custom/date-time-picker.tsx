import { formatInTimeZone, toDate } from 'date-fns-tz';
import { CalendarIcon, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/utils';

interface DateTimePickerProps extends React.HTMLAttributes<HTMLButtonElement> {
	className?: string;
	date?: Date;
	closeOnSelect?: boolean;
	onDateSelect: (date: Date | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	allowClear?: boolean;
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	size?: 'xs' | 'default' | 'sm' | 'lg' | 'md' | 'xl';
	popoverAlign?: 'start' | 'center' | 'end';
}

export const DateTimePicker = React.forwardRef<HTMLButtonElement, DateTimePickerProps>(
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
		const [selectedMonth, setSelectedMonth] = React.useState<Date | undefined>(date || new Date());
		const [selectedHour, setSelectedHour] = React.useState<number>(date?.getHours() || 0);
		const [selectedMinute, setSelectedMinute] = React.useState<number>(date?.getMinutes() || 0);

		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		const hours = React.useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
		const minutes = React.useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

		// Refs for scrolling
		const hourScrollRef = React.useRef<HTMLDivElement>(null);
		const minuteScrollRef = React.useRef<HTMLDivElement>(null);

		// Update time when date prop changes
		React.useEffect(() => {
			if (date) {
				setSelectedHour(date.getHours());
				setSelectedMinute(date.getMinutes());
			}
		}, [date]);

		// Auto-scroll to selected hour/minute
		React.useEffect(() => {
			if (isPopoverOpen && hourScrollRef.current) {
				const selectedElement = hourScrollRef.current.querySelector(
					`[data-hour="${selectedHour}"]`
				) as HTMLElement;
				if (selectedElement) {
					selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
				}
			}
		}, [isPopoverOpen, selectedHour]);

		React.useEffect(() => {
			if (isPopoverOpen && minuteScrollRef.current) {
				const selectedElement = minuteScrollRef.current.querySelector(
					`[data-minute="${selectedMinute}"]`
				) as HTMLElement;
				if (selectedElement) {
					selectedElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
				}
			}
		}, [isPopoverOpen, selectedMinute]);

		const handleClose = () => setIsPopoverOpen(false);

		const handleTogglePopover = (e: React.MouseEvent<HTMLButtonElement>) => {
			// Check if click is on a clear button (it has data-clear attribute)
			const target = e.target as HTMLElement;
			if (target.closest('[data-clear]')) {
				return; // Don't toggle if clicking clear button
			}
			if (!disabled) {
				setIsPopoverOpen((prev) => !prev);
			}
		};

		const handleWheel = (e: React.WheelEvent) => {
			// Always stop propagation to prevent modal from scrolling
			// This ensures wheel events are handled only within the popover
			e.stopPropagation();
		};

		const handleClearSelection = (e: React.MouseEvent) => {
			e.stopPropagation();
			e.preventDefault();
			onDateSelect(undefined);
			setSelectedHour(0);
			setSelectedMinute(0);
		};

		const handleDateSelect = (selectedDate: Date | undefined) => {
			if (selectedDate) {
				// Combine selected date with current time
				const newDate = new Date(selectedDate);
				newDate.setHours(selectedHour);
				newDate.setMinutes(selectedMinute);

				const processedDate = toDate(newDate, { timeZone });
				onDateSelect(processedDate);
				setSelectedMonth(selectedDate);
			}
		};

		const handleTimeChange = (hour: number, minute: number) => {
			setSelectedHour(hour);
			setSelectedMinute(minute);

			// If a date is already selected, update it with new time
			if (date) {
				const newDate = new Date(date);
				newDate.setHours(hour);
				newDate.setMinutes(minute);
				const processedDate = toDate(newDate, { timeZone });
				onDateSelect(processedDate);
			}
		};

		const formatWithTz = React.useCallback(
			(date: Date, fmt: string) => {
				// Custom formatting for different locales
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

				if (fmt === 'HH:mm') {
					return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
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
							id="datetime"
							ref={ref}
							{...props}
							variant={variant}
							className={cn('relative w-auto justify-start px-4 text-left font-normal', className)}
							size={size}
							onClick={handleTogglePopover}
							disabled={disabled}
							suppressHydrationWarning
							aria-label={placeholder || 'Select date and time'}
							aria-expanded={isPopoverOpen}
							aria-haspopup="dialog"
						>
							<div className="flex items-center gap-2">
								<CalendarIcon className="h-4 w-4" />
								<span className="flex-1">
									{date ? (
										<>
											<span className="date-part">{formatWithTz(date, 'dd')}</span>{' '}
											<span className="date-part">{formatWithTz(date, 'LLL')}</span>,{' '}
											<span className="date-part">{formatWithTz(date, 'y')}</span>
											<span className="date-part px-2">{formatWithTz(date, 'HH:mm')}</span>
										</>
									) : (
										<span className="text-secondary text-sm">
											{placeholder || 'Select date and time'}
										</span>
									)}
								</span>
								{allowClear && date && (
									<button
										type="button"
										data-clear
										tabIndex={0}
										onClick={handleClearSelection}
										onKeyDown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												e.preventDefault();
												handleClearSelection(e as unknown as React.MouseEvent);
											}
										}}
										className="absolute top-1/2 right-1 z-10 -translate-y-1/2 cursor-pointer rounded-sm bg-background opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
										aria-label={'Clear'}
									>
										<X className="h-3 w-3" />
									</button>
								)}
							</div>
						</Button>
					</PopoverTrigger>
					{isPopoverOpen && (
						<PopoverContent
							className="z-[9999] min-w-fit p-0"
							align={popoverAlign}
							avoidCollisions={false}
							onInteractOutside={handleClose}
							onEscapeKeyDown={handleClose}
							aria-label={placeholder || 'Select date and time'}
						>
							<div
								className="max-h-[85vh] overflow-y-auto p-4"
								onWheel={handleWheel}
								style={{
									overscrollBehavior: 'contain',
									WebkitOverflowScrolling: 'touch',
								}}
							>
								<div className="grid grid-cols-1 md:grid-cols-2">
									{/* Calendar Section */}
									<div className="min-w-[250px]">
										<Calendar
											mode="single"
											selected={date}
											onSelect={handleDateSelect}
											month={selectedMonth}
											onMonthChange={setSelectedMonth}
											showOutsideDays={false}
											size="full"
											className={className}
										/>
									</div>

									{/* Time Selection Section - Scrollable Columns */}
									<div className="flex items-center justify-center gap-2">
										{/* Hour Column */}
										<div className="flex flex-col">
											<span className="mb-1 text-center text-muted-foreground text-xs">Hour</span>
											<div
												ref={hourScrollRef}
												className="h-[280px] w-20 snap-y snap-mandatory overflow-y-auto scroll-smooth rounded-md border"
												style={{
													scrollbarWidth: 'thin',
												}}
											>
												{hours.map((hour) => (
													<button
														key={hour}
														type="button"
														data-hour={hour}
														onClick={() => handleTimeChange(hour, selectedMinute)}
														className={`w-full snap-center py-2 text-center transition-colors ${
															hour === selectedHour
																? 'bg-primary font-semibold text-primary-foreground'
																: 'hover:bg-accent'
														}`}
													>
														{hour.toString().padStart(2, '0')}
													</button>
												))}
											</div>
										</div>

										<span className="mt-5 font-semibold text-lg">:</span>

										{/* Minute Column */}
										<div className="flex flex-col">
											<span className="mb-1 text-center text-muted-foreground text-xs">Min</span>
											<div
												ref={minuteScrollRef}
												className="h-[280px] w-20 snap-y snap-mandatory overflow-y-auto scroll-smooth rounded-md border"
												style={{
													scrollbarWidth: 'thin',
												}}
											>
												{minutes.map((minute) => (
													<button
														key={minute}
														type="button"
														data-minute={minute}
														onClick={() => handleTimeChange(selectedHour, minute)}
														className={`w-full snap-center py-2 text-center transition-colors ${
															minute === selectedMinute
																? 'bg-primary font-semibold text-primary-foreground'
																: 'hover:bg-accent'
														}`}
													>
														{minute.toString().padStart(2, '0')}
													</button>
												))}
											</div>
										</div>
									</div>
								</div>

								{closeOnSelect && (
									<div className="mt-4 border-t pt-4">
										<Button size="sm" className="w-full" onClick={() => setIsPopoverOpen(false)}>
											Done
										</Button>
									</div>
								)}
							</div>
						</PopoverContent>
					)}
				</Popover>
			</>
		);
	}
);

DateTimePicker.displayName = 'DateTimePicker';
