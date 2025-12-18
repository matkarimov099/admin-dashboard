import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme.ts';
import { PickerItem } from './picker-item';

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
      {themeOptions.map(option => (
        <PickerItem
          key={option.value}
          isSelected={theme === option.value}
          icon={option.icon}
          label={option.label}
          onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
        />
      ))}
    </div>
  );
}
