import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { useMaskInput } from 'use-mask-input';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { useTranslations } from '@/hooks/use-translations.ts';
import { cn } from '@/utils/utils.ts';

function formatDateToMask(date: Date | undefined): string {
  if (!date) {
    return '';
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function parseDateFromMask(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }
  const parts = value.split('.');
  if (parts.length !== 3) {
    return undefined;
  }
  const [day, month, year] = parts;
  if (day.length < 2 || month.length < 2 || year.length < 4) {
    return undefined;
  }
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (isNaN(date.getTime())) {
    return undefined;
  }
  return date;
}

interface DatePickerProps {
  value?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  id?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function DatePicker({
  size = 'md',
  value,
  onChange,
  label = 'Subscription Date',
  placeholder = 'DD.MM.YYYY',
  id = 'date',
}: DatePickerProps) {
  const { currentLanguage } = useTranslations();
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);
  const [inputValue, setInputValue] = React.useState(formatDateToMask(value));

  const ref = useMaskInput({
    mask: '99.99.9999',
  });

  React.useEffect(() => {
    setMonth(value);
    setInputValue(formatDateToMask(value));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    const parsedDate = parseDateFromMask(newValue);
    if (parsedDate) {
      setMonth(parsedDate);
      onChange?.(parsedDate);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setMonth(selectedDate);
    onChange?.(selectedDate);
    setOpen(false);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor={id} className="px-1">
        {label}
      </Label>
      <div className="relative">
        <Input
          inputSize={size}
          ref={ref as React.RefObject<HTMLInputElement>}
          id={id}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              id={`${id}-picker`}
              className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
            >
              <CalendarIcon className="size-4" />
              <span className="sr-only">Select date</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="overflow-hidden" align="end" alignOffset={-8} sideOffset={10}>
            <Calendar
              mode="single"
              selected={value}
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
              language={currentLanguage}
              captionLayout="dropdown"
              classNames={{
                head_row: 'flex w-full',
                head_cell: 'w-9 font-normal text-[0.8rem] text-muted-foreground',
                row: 'flex w-full mt-2',
                cell: 'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
                day: cn(
                  'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md'
                ),
                day_range_start: 'rounded-l-md bg-primary text-primary-foreground',
                day_range_end: 'rounded-r-md bg-primary text-primary-foreground',
                day_selected:
                  'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
                day_today: 'bg-accent text-accent-foreground',
                day_outside: 'text-muted-foreground opacity-50',
                day_disabled: 'text-muted-foreground opacity-50',
                day_range_middle: 'bg-accent text-accent-foreground rounded-none',
                day_hidden: 'invisible',
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
