import { CheckIcon } from 'lucide-react';
import { BASE_COLORS } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';

// ============================
// Base Color Picker
// ============================

export function BaseColorPicker() {
  const { config, setBaseColor } = useThemeConfig();

  return (
    <div className="flex flex-wrap items-start gap-2">
      {BASE_COLORS.map(color => {
        const isSelected = config.baseColor === color.value;

        return (
          <button
            key={color.value}
            type="button"
            onClick={() => setBaseColor(color.value)}
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
              {color.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
