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
              'group relative flex flex-col items-center gap-1.5 rounded-md border-2 p-2.5 transition-colors duration-200',
              'bg-card',
              isSelected
                ? 'border-(--color-primary)'
                : 'border-border hover:border-(--color-primary)/60'
            )}
          >
            {/* Icon */}
            <div
              className={cn(
                'flex h-5 w-5 items-center justify-center rounded-lg transition-colors duration-200',
                isSelected
                  ? 'bg-(--color-primary) text-white'
                  : 'bg-muted-foreground/80 text-muted-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
            </div>

            {/* Label */}
            <span
              className={cn(
                'font-medium text-xs transition-colors duration-200',
                isSelected ? 'text-[var(--color-primary)] font-semibold' : 'text-foreground'
              )}
            >
              {option.label}
            </span>

            {/* Check Icon */}
            {isSelected && (
              <div className="absolute -top-1.5 -right-1.5 bg-[var(--color-primary)] rounded-full p-0.5 shadow-md border border-white">
                <CheckIcon className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
