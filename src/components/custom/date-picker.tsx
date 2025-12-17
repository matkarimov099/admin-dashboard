import { formatInTimeZone, toDate } from 'date-fns-tz';
import { CalendarIcon, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { cn } from '@/utils/utils';

interface DatePickerProps extends React.HTMLAttributes<HTMLButtonElement> {
	className?: string;
	date?: Date;
	closeOnSelect?: boolean;
	yearsRange?: number;
	onDateSelect: (date: Date | undefined) => void;
	placeholder?: string;
	disabled?: boolean;
	allowClear?: boolean;
	variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	size?: 'xs' | 'default' | 'sm' | 'lg' | 'md' | 'xl';
	popoverAlign?: 'start' | 'center' | 'end';
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
	(
		{
			className,
			date,
			closeOnSelect = true,
			yearsRange = 10,
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
		const [selectedYear, setSelectedYear] = React.useState<number | undefined>(
			date?.getFullYear() || new Date().getFullYear()
		);

		const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

		const today = React.useMemo(() => new Date(), []);
		const years = React.useMemo(
			() =>
				Array.from({ length: yearsRange + 1 }, (_, i) => today.getFullYear() - yearsRange / 2 + i),
			[yearsRange, today]
		);

		const months = React.useMemo(
			() => [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			],
			[]
		);

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
		};

		const handleDateSelect = (selectedDate: Date | undefined) => {
			if (selectedDate) {
				const processedDate = toDate(selectedDate, { timeZone });
				onDateSelect(processedDate);
				setSelectedMonth(selectedDate);
				setSelectedYear(selectedDate.getFullYear());
				if (closeOnSelect) {
					setIsPopoverOpen(false);
				}
			}
		};

		const handleMonthChange = React.useCallback(
			(newMonthIndex: number) => {
				if (selectedYear !== undefined) {
					if (newMonthIndex < 0 || newMonthIndex > 11) return;
					const newMonth = new Date(selectedYear, newMonthIndex, 1);
					setSelectedMonth(newMonth);
				}
			},
			[selectedYear]
		);

		const handleYearChange = React.useCallback(
			(newYear: number) => {
				if (years.includes(newYear)) {
					const currentMonth = selectedMonth ? selectedMonth.getMonth() : 0;
					const newMonth = new Date(newYear, currentMonth, 1);
					setSelectedMonth(newMonth);
					setSelectedYear(newYear);
				}
			},
			[years, selectedMonth]
		);

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
							id="date"
							ref={ref}
							{...props}
							variant={variant}
							className={cn('relative w-auto justify-start pr-8 text-left font-normal', className)}
							size={size}
							onClick={handleTogglePopover}
							disabled={disabled}
							suppressHydrationWarning
							aria-label={placeholder || 'Select a date'}
							aria-expanded={isPopoverOpen}
							aria-haspopup="dialog"
						>
							<CalendarIcon className="mr-2 h-4 w-4" />
							<span className="flex-1">
								{date ? (
									<>
										<span className="date-part">{formatWithTz(date, 'dd')}</span>{' '}
										<span className="date-part">{formatWithTz(date, 'LLL')}</span>,{' '}
										<span className="date-part">{formatWithTz(date, 'y')}</span>
									</>
								) : (
									<span className="text-secondary text-sm">{placeholder || 'Select a date'}</span>
								)}
							</span>
							{allowClear && date && (
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
							aria-label={placeholder || 'Select a date'}
						>
							<div
								className="flex max-h-[85vh] flex-col overflow-y-auto p-4"
								onWheel={handleWheel}
								style={{
									overscrollBehavior: 'contain',
									WebkitOverflowScrolling: 'touch',
								}}
							>
								<div className="mb-4 flex items-center justify-center gap-4">
									<div className="flex gap-2">
										<Select
											onValueChange={(value) => {
												handleMonthChange(months.indexOf(value));
											}}
											value={selectedMonth ? months[selectedMonth.getMonth()] : undefined}
										>
											<SelectTrigger className="w-fit font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
												<SelectValue placeholder={'Month'} />
											</SelectTrigger>
											<SelectContent>
												{months.map((month) => (
													<SelectItem key={month} value={month}>
														{month}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<Select
											onValueChange={(value) => {
												handleYearChange(Number(value));
											}}
											value={selectedYear ? selectedYear.toString() : undefined}
										>
											<SelectTrigger className="w-fit font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
												<SelectValue placeholder={'Year'} />
											</SelectTrigger>
											<SelectContent>
												{years.map((year) => (
													<SelectItem key={year} value={year.toString()}>
														{year}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="w-full">
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
							</div>
						</PopoverContent>
					)}
				</Popover>
			</>
		);
	}
);

DatePicker.displayName = 'DatePicker';
