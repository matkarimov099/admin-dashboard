import { format } from 'date-fns';

export function humanizeDate(date: string | number | Date) {
	if (!date) return '—';

	// Handle ISO 8601 with a timezone offset (e.g., "2025-10-05T23:59:59+05:00[Asia/Tashkent]")
	let dateString = date;
	if (typeof date === 'string' && date.includes('[')) {
		// Remove timezone name in brackets
		dateString = date.split('[')[0];
	}

	const parsedDate = new Date(dateString);
	if (Number.isNaN(parsedDate.getTime())) return 'Invalid date';
	return format(parsedDate, 'dd-MM-yyyy');
}

export function humanizeDateTime(date: string | number | Date) {
	if (!date) return '—'; // Handle null/undefined

	// Handle ISO 8601 with timezone offset (e.g., "2025-10-05T23:59:59+05:00[Asia/Tashkent]")
	let dateString = date;
	if (typeof date === 'string' && date.includes('[')) {
		// Remove timezone name in brackets
		dateString = date.split('[')[0];
	}

	const parsedDate = new Date(dateString);
	if (Number.isNaN(parsedDate.getTime())) return 'Invalid date'; // Handle invalid dates

	return format(parsedDate, 'dd/MM/yyyy HH:mm'); // Format valid date
}

export function humanizeTime(date: string | number | Date) {
	if (!date) return '—'; // Handle null/undefined

	// Handle ISO 8601 with timezone offset (e.g., "2025-10-05T23:59:59+05:00[Asia/Tashkent]")
	let dateString = date;
	if (typeof date === 'string' && date.includes('[')) {
		// Remove timezone name in brackets
		dateString = date.split('[')[0];
	}

	const parsedDate = new Date(dateString);
	if (Number.isNaN(parsedDate.getTime())) return 'Invalid time'; // Handle invalid dates

	return format(parsedDate, 'HH:mm'); // Format only time
}

export function humanizeBirthday(date: string | number | Date) {
	if (!date) return '—';

	// Handle ISO 8601 with timezone offset (e.g., "2025-10-05T23:59:59+05:00[Asia/Tashkent]")
	let dateString = date;
	if (typeof date === 'string' && date.includes('[')) {
		// Remove timezone name in brackets
		dateString = date.split('[')[0];
	}

	const parsedDate = new Date(dateString);
	if (Number.isNaN(parsedDate.getTime())) return 'Invalid date';
	return format(parsedDate, 'dd/MM/yyyy');
}

export function humanizeCurrency(amount: number) {
	return amount.toLocaleString('uz-UZ');
}

export const formatNumber = (
	value: number | undefined,
	format: 'space' | 'dot' | 'comma',
	currencySymbol?: string,
	disableDecimals: boolean = Boolean(true) // Default to no decimals
): string => {
	if (value === undefined || value === null) return '';

	const formatter = new Intl.NumberFormat('uz-UZ', {
		minimumFractionDigits: disableDecimals ? 0 : 2,
		maximumFractionDigits: disableDecimals ? 0 : 2,
	});

	let formattedValue = formatter.format(value);

	switch (format) {
		case 'space':
			formattedValue = formattedValue.replace(/,/g, ' '); // 1 000 000
			break;
		case 'dot':
			formattedValue = formattedValue.replace(/,/g, '.'); // 1.000.000
			break;
		default:
			break; // "comma" remains unchanged, so no need to assign it to itself
	}

	return currencySymbol ? `${formattedValue} ${currencySymbol}` : formattedValue; // Append currency
};

/**
 * Formats a number into a compact, human-readable string representation
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Formatted string (e.g., "1.5K", "2.3M", "500")
 *
 * @example
 * humanizeCompactNumber(1500) // "1.5K"
 * humanizeCompactNumber(2300000) // "2.3M"
 * humanizeCompactNumber(500) // "500"
 * humanizeCompactNumber(1500, { decimals: 0 }) // "2K"
 * humanizeCompactNumber(1500000, { notation: 'standard' }) // "1,500,000"
 */
export function humanizeCompactNumber(
	value: number | undefined | null,
	options?: {
		decimals?: number;
		locale?: string;
		notation?: 'compact' | 'standard';
		useGrouping?: boolean;
	}
): string {
	if (value === undefined || value === null || Number.isNaN(value)) {
		return '0';
	}

	const {
		decimals = 1,
		locale = 'en-US',
		notation = 'compact',
		useGrouping = true,
	} = options || {};

	// For compact notation, use Intl.NumberFormat with compact display
	if (notation === 'compact') {
		const formatter = new Intl.NumberFormat(locale, {
			notation: 'compact',
			compactDisplay: 'short',
			maximumFractionDigits: decimals,
			minimumFractionDigits: 0,
			useGrouping: false,
		});

		return formatter.format(value);
	}

	// For standard notation with grouping
	const formatter = new Intl.NumberFormat(locale, {
		notation: 'standard',
		maximumFractionDigits: decimals,
		minimumFractionDigits: 0,
		useGrouping,
	});

	return formatter.format(value);
}

/**
 * Formats duration in minutes to a human-readable string
 * @param minutes - Duration in minutes
 * @returns Formatted string (e.g., "34m", "1h 12m", "2h")
 *
 * @example
 * humanizeDuration(34) // "34m"
 * humanizeDuration(72) // "1h 12m"
 * humanizeDuration(120) // "2h"
 */
export function humanizeDuration(minutes: number): string {
	if (minutes < 60) {
		return `${minutes}m`;
	}
	const hours = Math.floor(minutes / 60);
	const mins = minutes % 60;
	return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Converts HH:mm time string to ISO date string (using today's date)
 * @param timeStr - Time in HH:mm format
 * @returns ISO date string
 *
 * @example
 * timeToISOString('09:30') // "2025-10-06T09:30:00.000Z"
 * timeToISOString('14:45') // "2025-10-06T14:45:00.000Z"
 */
export function timeToISOString(timeStr: string): string {
	if (!timeStr) return '';
	const today = new Date();
	const [hours, minutes] = timeStr.split(':').map(Number);
	today.setHours(hours, minutes, 0, 0);
	return today.toISOString();
}

/**
 * Converts ISO date string to HH:mm time string
 * @param isoStr - ISO date string
 * @returns Time in HH:mm format
 *
 * @example
 * isoToTimeString('2025-10-06T09:30:00.000Z') // "09:30"
 * isoToTimeString('2025-10-06T14:45:00.000Z') // "14:45"
 */
export function isoToTimeString(isoStr: string): string {
	if (!isoStr) return '';
	const date = new Date(isoStr);
	if (Number.isNaN(date.getTime())) return '';
	return date.toTimeString().slice(0, 5);
}
