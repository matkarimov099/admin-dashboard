import { CheckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { THEME_COLORS } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';

// ============================
// Theme Color Picker
// ============================

export function ThemeColorPicker() {
  const { t } = useTranslation();
  const { config, setThemeColor } = useThemeConfig();

  return (
    <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-7">
      {THEME_COLORS.map(color => {
        const isSelected = config.themeColor === color.value;

        return (
          <button
            key={color.value}
            type="button"
            onClick={() => setThemeColor(color.value)}
            className="group flex flex-col items-center gap-1"
          >
            {/* Color Swatch */}
            <div
              className={cn(
                'relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200',
                'ring-offset-2 ring-offset-background',
                isSelected
                  ? 'ring-2 ring-primary'
                  : 'ring-1 ring-border hover:ring-2 hover:ring-primary/50'
              )}
              style={{ backgroundColor: color.previewColor }}
            >
              {isSelected && <CheckIcon className="h-3 w-3 text-white drop-shadow-sm" />}
            </div>

            {/* Label */}
            <span
              className={cn(
                'text-[10px]',
                isSelected ? 'font-medium text-foreground' : 'text-muted-foreground'
              )}
            >
              {t(`settingsPanel.variants.colors.${color.value}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
