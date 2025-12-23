import { CheckIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/hooks/use-theme';
import {
  DARK_MODE_GRADIENTS,
  LIGHT_MODE_GRADIENTS,
} from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';
import type { BackgroundGradient } from '@/config/theme/theme-config.types';

// ============================
// Background Gradient Picker
// ============================

interface BackgroundGradientPickerProps {
  value: BackgroundGradient;
  onChange: (gradient: BackgroundGradient) => void;
  label: string;
}

export function BackgroundGradientPicker({ value, onChange, label }: BackgroundGradientPickerProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Show different gradients based on current theme mode
  const isDarkMode = theme === 'dark';
  const gradients = isDarkMode ? DARK_MODE_GRADIENTS : LIGHT_MODE_GRADIENTS;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {gradients.map(gradient => {
          const isSelected = value === gradient.value;

          return (
            <button
              key={gradient.value}
              type="button"
              onClick={() => onChange(gradient.value)}
              className="group flex flex-col items-center gap-1.5"
            >
              {/* Gradient Swatch */}
              <div
                className={cn(
                  'relative flex h-12 w-full items-center justify-center rounded-md transition-all duration-200',
                  'ring-offset-2 ring-offset-background',
                  isSelected
                    ? 'ring-2 ring-primary'
                    : 'ring-1 ring-border hover:ring-2 hover:ring-primary/50',
                  gradient.value === 'default' && 'bg-muted'
                )}
                style={gradient.value !== 'default' ? { background: gradient.previewColor } : undefined}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md">
                    <CheckIcon className="h-4 w-4 text-white drop-shadow-md" />
                  </div>
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-[10px] text-center',
                  isSelected ? 'font-medium text-foreground' : 'text-muted-foreground'
                )}
              >
                {gradient.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================
// Combined Sidebar & Header Gradient Picker
// ============================

export function BackgroundGradientSection() {
  const { t } = useTranslation();
  const { config, setSidebarGradient, setHeaderGradient } = useThemeConfig();

  return (
    <div className="space-y-4">
      <BackgroundGradientPicker
        value={config.sidebarGradient}
        onChange={setSidebarGradient}
        label={t('settingsPanel.sections.sidebarGradient', 'Sidebar Background')}
      />
      <BackgroundGradientPicker
        value={config.headerGradient}
        onChange={setHeaderGradient}
        label={t('settingsPanel.sections.headerGradient', 'Header Background')}
      />
    </div>
  );
}
