import type { Month } from 'date-fns';
import { enUS, type Locale, ru, uz, uzCyrl } from 'date-fns/locale';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import * as React from 'react';
import { type DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants.tsx';
import { cn } from '@/utils/utils';

// Short weekday names for all languages
const shortWeekdays = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  uz: ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'],
  uzcyrl: ['Як', 'Душ', 'Сеш', 'Чор', 'Пай', 'Жум', 'Шан'],
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  language = 'en',
  formatters,
  components,
  size = 'default',
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant'];
  size?: 'default' | 'large' | 'full';
  language?: string;
}) {
  const defaultClassNames = getDefaultClassNames();

  // Map language to date-fns locale object
  const getDateFnsLocale = (lang: string) => {
    switch (lang) {
      case 'uz':
        return uz;
      case 'uzcyrl':
        return uzCyrl;
      case 'ru':
        return ru;
      default:
        return enUS;
    }
  };

  const locale = getDateFnsLocale(language);

  // Map language code to BCP 47 locale code for toLocaleString
  const getLocaleCode = (lang: string): string => {
    switch (lang) {
      case 'uz':
        return 'uz-Latn';
      case 'uzcyrl':
        return 'uz-Cyrl';
      case 'ru':
        return 'ru-RU';
      default:
        return 'en-US';
    }
  };

  const localeCode = getLocaleCode(language);

  // Get short weekday names for the current language
  const getShortWeekday = (date: Date): string => {
    const dayIndex = date.getDay();
    return (
      shortWeekdays[language as keyof typeof shortWeekdays]?.[dayIndex] ||
      shortWeekdays.en[dayIndex]
    );
  };

  return (
    <DayPicker
      locale={locale}
      showOutsideDays={showOutsideDays}
      className={cn(
        'group/calendar bg-background in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent p-1',
        size === 'default' && '[--cell-size:--spacing(8)]',
        size === 'large' && '[--cell-size:--spacing(10)]',
        size === 'full' && 'w-full [--cell-size:--spacing(12)]',
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: date => {
          // Use locale's own month formatting if available
          const localeWithMonth = locale as Locale;
          if (localeWithMonth.localize?.month) {
            return localeWithMonth.localize.month(date.getMonth() as Month);
          }
          // Fallback to toLocaleString
          return date.toLocaleString(localeCode, { month: 'long' });
        },
        formatWeekdayName: date => {
          // Always use short weekday names from our custom mapping
          return getShortWeekday(date);
        },
        ...formatters,
      }}
      classNames={{
        root: cn(size === 'full' ? 'w-full' : 'w-fit', defaultClassNames.root),
        months: cn('flex gap-4 flex-col md:flex-row relative', defaultClassNames.months),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-[--cell-size] aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          'size-[--cell-size] aria-disabled:opacity-50 p-0 select-none',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex items-center justify-center h-[--cell-size] w-full px-[--cell-size]',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'w-full flex items-center text-sm font-medium justify-center h-[--cell-size] gap-1.5',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative has-focus:border-blue-500 border border-input shadow-xs has-focus:ring-blue-500/50 has-focus:ring-[3px] rounded-md',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : 'rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:size-3.5',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
          defaultClassNames.weekday
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn('select-none w-[--cell-size]', defaultClassNames.week_number_header),
        week_number: cn(
          'text-[0.8rem] select-none text-muted-foreground',
          defaultClassNames.week_number
        ),
        day: cn(
          'relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none',
          defaultClassNames.day
        ),
        range_start: cn('rounded-l-md bg-accent', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('rounded-r-md bg-accent', defaultClassNames.range_end),
        today: cn(
          'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
          defaultClassNames.today
        ),
        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),
        disabled: cn('text-muted-foreground opacity-50', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return <ChevronLeftIcon className={cn('size-4', className)} {...props} />;
          }

          if (orientation === 'right') {
            return <ChevronRightIcon className={cn('size-4', className)} {...props} />;
          }

          return <ChevronDownIcon className={cn('size-4', className)} {...props} />;
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        'flex aspect-square size-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none hover:bg-accent hover:text-accent-foreground data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md data-[range-end=true]:rounded-r-md data-[range-start=true]:rounded-l-md data-[range-end=true]:bg-blue-500 data-[range-middle=true]:bg-blue-200 data-[range-start=true]:bg-blue-500 data-[selected-single=true]:bg-blue-500 data-[range-end=true]:text-white data-[range-middle=true]:text-blue-900 data-[range-start=true]:text-white data-[selected-single=true]:text-white group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:border-blue-500 group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-blue-500/50 [&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
