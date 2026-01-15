import { CheckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  BACKGROUND_GRADIENT_OPTIONS,
  BACKGROUND_GRADIENT_VALUES,
} from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';

// ============================
// Background Gradient Picker (Light mode only)
// ============================

export function BackgroundGradientPicker() {
  const { t } = useTranslation();
  const { config, setBackgroundGradient } = useThemeConfig();

  return (
    <div className="grid grid-cols-3 gap-2">
      {BACKGROUND_GRADIENT_OPTIONS.map(gradient => {
        const isSelected = config.backgroundGradient === gradient.value;
        const gradientValues = BACKGROUND_GRADIENT_VALUES[gradient.value];
        const isDefault = gradient.value === 'default';

        return (
          <button
            key={gradient.value}
            type="button"
            onClick={() => setBackgroundGradient(gradient.value)}
            className="group flex flex-col items-center gap-1.5"
          >
            {/* Gradient Preview */}
            <div
              className={cn(
                'relative flex h-10 w-full items-center justify-center rounded-md transition-all duration-200',
                'ring-offset-2 ring-offset-background',
                isSelected
                  ? 'ring-2 ring-primary'
                  : 'ring-1 ring-border hover:ring-2 hover:ring-primary/50'
              )}
              style={{
                background: isDefault
                  ? 'var(--card-bg)'
                  : gradientValues.sidebar,
                border: isDefault ? '1px dashed var(--border)' : 'none',
              }}
            >
              {isSelected && (
                <CheckIcon
                  className="h-4 w-4 drop-shadow-sm"
                  style={{ color: isDefault ? 'var(--foreground)' : '#ffffff' }}
                />
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                'text-[10px]',
                isSelected ? 'font-medium text-foreground' : 'text-muted-foreground'
              )}
            >
              {t(`settingsPanel.variants.gradients.${gradient.value}`)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
