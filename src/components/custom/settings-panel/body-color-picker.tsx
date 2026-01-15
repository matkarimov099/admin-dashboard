import { CheckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { BODY_COLOR_OPTIONS } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';

// ============================
// Body Color Picker
// ============================

export function BodyColorPicker() {
  const { t } = useTranslation();
  const { config, setBodyColor } = useThemeConfig();

  return (
    <div className="grid grid-cols-3 gap-2">
      {BODY_COLOR_OPTIONS.map(color => {
        const isSelected = config.bodyColor === color.value;

        return (
          <button
            key={color.value}
            type="button"
            onClick={() => setBodyColor(color.value)}
            className="group flex flex-col items-center gap-1.5"
          >
            {/* Color Preview */}
            <div
              className={cn(
                'relative flex h-10 w-full items-center justify-center rounded-md transition-all duration-200',
                'ring-offset-2 ring-offset-background',
                isSelected
                  ? 'ring-2 ring-primary'
                  : 'ring-1 ring-border hover:ring-2 hover:ring-primary/50'
              )}
              style={{
                backgroundColor: color.previewColor,
              }}
            >
              {isSelected && (
                <CheckIcon className="h-4 w-4 text-gray-600 drop-shadow-sm" />
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                'text-[10px]',
                isSelected ? 'font-medium text-foreground' : 'text-muted-foreground'
              )}
            >
              {t(`settingsPanel.variants.bodyColors.${color.value}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
