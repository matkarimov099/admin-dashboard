import { CheckIcon } from 'lucide-react';
import { BORDER_RADIUS_OPTIONS } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';

// ============================
// Border Radius Picker
// ============================

export function RadiusPicker() {
  const { config, setBorderRadius } = useThemeConfig();

  return (
    <div className="grid grid-cols-3 gap-2">
      {BORDER_RADIUS_OPTIONS.map(radius => {
        const isSelected = config.borderRadius === radius.value;

        // Visual preview radius mapping
        const previewRadius = {
          none: '0px',
          small: '4px',
          default: '8px',
          medium: '12px',
          large: '16px',
        }[radius.value];

        return (
          <button
            key={radius.value}
            type="button"
            onClick={() => setBorderRadius(radius.value)}
            className={cn(
              'group relative flex flex-col items-center gap-1.5 rounded-md border-2 p-2 transition-all duration-200',
              'hover:border-[var(--color-primary)]/60 hover:bg-[var(--color-primary)]/5',
              isSelected
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-sm'
                : 'border-border bg-card hover:shadow-sm'
            )}
          >
            {/* Visual Preview */}
            <div className="relative">
              <div
                className="h-6 w-6 border-2 border-foreground/20 bg-muted transition-all duration-200"
                style={{
                  borderRadius: previewRadius,
                  borderColor: isSelected ? 'var(--color-primary)' : undefined
                }}
              />
              {/* Check Icon - positioned inside preview */}
              {isSelected && (
                <div className="absolute -top-1 -right-1 bg-[var(--color-primary)] rounded-full p-0.5 shadow-sm border border-white">
                  <CheckIcon className="h-3 w-3 text-white" />
                </div>
              )}
            </div>

            {/* Label */}
            <span
              className={cn(
                'text-xs font-medium whitespace-nowrap transition-colors duration-200',
                isSelected ? 'text-[var(--color-primary)]' : 'text-foreground'
              )}
            >
              {radius.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
