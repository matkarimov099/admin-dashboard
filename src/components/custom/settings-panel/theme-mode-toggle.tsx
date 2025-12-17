import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme.ts';
import { cn } from '@/utils/utils';

// ============================
// Theme Mode Toggle (3 Cards)
// ============================

export function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      icon: SunIcon,
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: MoonIcon,
    },
    {
      value: 'system',
      label: 'System',
      icon: MonitorIcon,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {themeOptions.map(option => {
        const Icon = option.icon;
        const isSelected = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
            className={cn(
              'group relative flex flex-col items-center gap-1 rounded-md border p-2 transition-all duration-200',
              'hover:bg-muted/50',
              isSelected
                ? 'border-primary bg-primary text-primary-foreground shadow-sm ring-1 ring-primary/50'
                : 'border-border bg-card'
            )}
          >
            {/* Icon */}
            <Icon
              className={cn(
                'h-4 w-4',
                isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              )}
            />

            {/* Label */}
            <span
              className={cn(
                'font-medium text-[11px]',
                isSelected ? 'text-primary-foreground' : 'text-foreground'
              )}
            >
              {option.label}
            </span>

            {/* Check Icon */}
            {isSelected && (
              <div className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center">
                <CheckIcon className="h-3 w-3 text-foreground" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
