import { MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme.ts';
import { PickerItem } from './picker-item';

// ============================
// Theme Mode Toggle (3 Cards)
// ============================

export function ThemeModeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const themeOptions = [
    {
      value: 'light',
      label: t('settingsPanel.variants.themeMode.light'),
      icon: SunIcon,
    },
    {
      value: 'dark',
      label: t('settingsPanel.variants.themeMode.dark'),
      icon: MoonIcon,
    },
    {
      value: 'system',
      label: t('settingsPanel.variants.themeMode.system'),
      icon: MonitorIcon,
    },
  ];

  return (
    <div className="isolate grid grid-cols-3 gap-2 py-1">
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
