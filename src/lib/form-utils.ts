import type { ChangeEvent } from 'react';

/**
 * Handle number input change events
 * Converts empty string to empty value, otherwise parses as number
 */
export function handleNumberInputChange(onChange: (value: number | '') => void) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value === '' ? '' : Number(value));
  };
}

/**
 * Format number for display in input field
 */
export function formatNumberInput(value: number | ''): string | number {
  return value;
}
