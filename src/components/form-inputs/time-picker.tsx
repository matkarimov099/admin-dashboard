import { Clock } from 'lucide-react';
import * as React from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion.ts';
import { cn } from '@/utils/utils.ts';

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  hourCycle?: 12 | 24;
  inputSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showIcon?: boolean;
  disabled?: boolean;
  name?: string;
}

const SIZE_CONFIGS = {
  xs: {
    container: 'h-7 text-xs gap-1',
    input: 'h-6 w-8 text-xs',
    icon: 'size-3',
    separator: 'text-xs',
    period: 'h-6 px-2 text-xs',
  },
  sm: {
    container: 'h-8 text-sm gap-1',
    input: 'h-7 w-9 text-sm',
    icon: 'size-3.5',
    separator: 'text-sm',
    period: 'h-7 px-2.5 text-sm',
  },
  md: {
    container: 'h-9 text-base gap-1.5',
    input: 'h-8 w-10 text-base',
    icon: 'size-4',
    separator: 'text-base',
    period: 'h-8 px-3 text-base',
  },
  lg: {
    container: 'h-11 text-lg gap-2',
    input: 'h-10 w-12 text-lg',
    icon: 'size-5',
    separator: 'text-lg',
    period: 'h-10 px-4 text-lg',
  },
  xl: {
    container: 'h-12 text-xl gap-2',
    input: 'h-11 w-14 text-xl',
    icon: 'size-5',
    separator: 'text-xl',
    period: 'h-11 px-5 text-xl',
  },
} as const;

export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      className,
      value = '',
      onChange,
      hourCycle = 24,
      inputSize = 'md',
      showIcon = true,
      disabled = false,
      name,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const [hours, setHours] = React.useState('');
    const [minutes, setMinutes] = React.useState('');
    const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM');

    const hoursRef = React.useRef<HTMLInputElement>(null);
    const minutesRef = React.useRef<HTMLInputElement>(null);
    const sizeConfig = SIZE_CONFIGS[inputSize];

    // Parse external value
    React.useEffect(() => {
      if (!value) {
        setHours('');
        setMinutes('');
        setPeriod('AM');
        return;
      }

      const [h, m] = value.split(':');
      let parsedHours = Number.parseInt(h || '0', 10);

      if (hourCycle === 12) {
        const newPeriod = parsedHours >= 12 ? 'PM' : 'AM';
        parsedHours = parsedHours % 12 || 12;
        setPeriod(newPeriod);
      }

      setHours(parsedHours.toString().padStart(2, '0'));
      setMinutes((m || '00').padStart(2, '0'));
    }, [value, hourCycle]);

    // Emit formatted time
    const emitTime = React.useCallback(
      (h: string, m: string, p: 'AM' | 'PM') => {
        if (!h || !m) return;

        let finalHours = Number.parseInt(h, 10);
        const finalMinutes = Number.parseInt(m, 10);

        if (Number.isNaN(finalHours) || Number.isNaN(finalMinutes)) return;

        if (hourCycle === 12) {
          if (p === 'PM' && finalHours !== 12) {
            finalHours += 12;
          } else if (p === 'AM' && finalHours === 12) {
            finalHours = 0;
          }
        }

        const formatted = `${finalHours.toString().padStart(2, '0')}:${finalMinutes.toString().padStart(2, '0')}`;
        onChange?.(formatted);
      },
      [hourCycle, onChange]
    );

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, '');

      if (val.length === 0) {
        setHours('');
        return;
      }

      if (val.length === 1) {
        setHours(val);
        return;
      }

      // 2 digits entered
      const maxHours = hourCycle === 12 ? 12 : 23;
      const minHours = hourCycle === 12 ? 1 : 0;
      const num = Number.parseInt(val.slice(0, 2), 10);
      const clamped = Math.max(minHours, Math.min(maxHours, num));
      const formatted = clamped.toString().padStart(2, '0');

      setHours(formatted);
      emitTime(formatted, minutes, period);

      // Auto-focus to minutes
      setTimeout(() => {
        minutesRef.current?.focus();
        minutesRef.current?.select();
      }, 0);
    };

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, '');

      if (val.length === 0) {
        setMinutes('');
        return;
      }

      if (val.length === 1) {
        setMinutes(val);
        return;
      }

      // 2 digits entered
      const num = Number.parseInt(val.slice(0, 2), 10);
      const clamped = Math.max(0, Math.min(59, num));
      const formatted = clamped.toString().padStart(2, '0');

      setMinutes(formatted);
      emitTime(hours, formatted, period);
    };

    const handleHoursBlur = () => {
      if (!hours) return;
      const maxHours = hourCycle === 12 ? 12 : 23;
      const minHours = hourCycle === 12 ? 1 : 0;
      const num = Number.parseInt(hours, 10);
      const clamped = Math.max(minHours, Math.min(maxHours, num));
      const formatted = clamped.toString().padStart(2, '0');
      setHours(formatted);
      if (minutes) {
        emitTime(formatted, minutes, period);
      }
    };

    const handleMinutesBlur = () => {
      if (!minutes) return;
      const num = Number.parseInt(minutes, 10);
      const clamped = Math.max(0, Math.min(59, num));
      const formatted = clamped.toString().padStart(2, '0');
      setMinutes(formatted);
      if (hours) {
        emitTime(hours, formatted, period);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'hours' | 'minutes') => {
      if (e.key === 'ArrowRight' && type === 'hours') {
        if (e.currentTarget.selectionStart === e.currentTarget.value.length) {
          e.preventDefault();
          minutesRef.current?.focus();
          minutesRef.current?.select();
        }
      } else if (e.key === 'ArrowLeft' && type === 'minutes') {
        if (e.currentTarget.selectionStart === 0) {
          e.preventDefault();
          hoursRef.current?.focus();
          hoursRef.current?.select();
        }
      }
    };

    const togglePeriod = () => {
      if (hourCycle === 24) return;
      const newPeriod = period === 'AM' ? 'PM' : 'AM';
      setPeriod(newPeriod);
      if (hours && minutes) {
        emitTime(hours, minutes, newPeriod);
      }
    };

    const inputClasses = cn(
      'bg-transparent border-none text-center font-mono font-semibold tabular-nums',
      'focus:outline-none focus:bg-accent/30 rounded-md',
      'transition-colors',
      prefersReducedMotion ? 'duration-0' : 'duration-150',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      sizeConfig.input
    );

    const containerClasses = cn(
      'flex w-full items-center bg-control border-control rounded-md',
      'px-3 font transition-colors',
      prefersReducedMotion ? 'duration-0' : 'transition-fast',
      'focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500',
      disabled && 'opacity-60 cursor-not-allowed bg-control/50',
      sizeConfig.container,
      className
    );

    return (
      <div className="w-full" ref={ref} {...props}>
        <div className={containerClasses}>
          {showIcon && (
            <Clock
              className={cn('mr-2 flex-shrink-0 text-secondary', sizeConfig.icon)}
              aria-hidden="true"
            />
          )}

          <input
            ref={hoursRef}
            type="text"
            inputMode="numeric"
            value={hours}
            onChange={handleHoursChange}
            onBlur={handleHoursBlur}
            onKeyDown={e => handleKeyDown(e, 'hours')}
            onFocus={e => e.target.select()}
            className={inputClasses}
            disabled={disabled}
            aria-label="Hours"
            placeholder="00"
            maxLength={2}
          />

          <span className={cn('select-none font-bold text-secondary', sizeConfig.separator)}>
            :
          </span>

          <input
            ref={minutesRef}
            type="text"
            inputMode="numeric"
            value={minutes}
            onChange={handleMinutesChange}
            onBlur={handleMinutesBlur}
            onKeyDown={e => handleKeyDown(e, 'minutes')}
            onFocus={e => e.target.select()}
            className={inputClasses}
            disabled={disabled}
            aria-label="Minutes"
            placeholder="00"
            maxLength={2}
          />

          {hourCycle === 12 && (
            <button
              type="button"
              onClick={togglePeriod}
              disabled={disabled}
              className={cn(
                'ml-2 rounded-md border border-control font-semibold',
                'bg-control-ghost hover:bg-accent/30 active:scale-95',
                'transition-all focus:outline-none focus:ring-1 focus:ring-blue-500',
                'disabled:cursor-not-allowed disabled:opacity-50',
                prefersReducedMotion ? 'duration-0' : 'duration-150',
                sizeConfig.period
              )}
              aria-label={`Toggle AM/PM, currently ${period}`}
            >
              {period}
            </button>
          )}

          <input type="hidden" name={name} value={value} />
        </div>
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';
