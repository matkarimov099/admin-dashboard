import { CheckIcon } from 'lucide-react';
import { SHADOW_OPTIONS } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';

// ============================
// Shadow Picker
// ============================

export function ShadowPicker() {
  const { config, setShadow } = useThemeConfig();

  return (
    <div className="grid grid-cols-3 gap-2">
      {SHADOW_OPTIONS.map(shadow => {
        const isSelected = config.shadow === shadow.value;

        // Visual preview shadow mapping - using theme color for selected state
        const getPreviewShadow = () => {
          if (isSelected) {
            return `0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--color-primary)`;
          }
          return {
            none: 'none',
            small: '0 1px 3px rgba(0, 0, 0, 0.3)',
            default: '0 4px 6px rgba(0, 0, 0, 0.3)',
            medium: '0 8px 16px rgba(0, 0, 0, 0.4)',
            large: '0 16px 32px rgba(0, 0, 0, 0.5)',
          }[shadow.value];
        };

        return (
          <button
            key={shadow.value}
            type="button"
            onClick={() => setShadow(shadow.value)}
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
                className="h-6 w-6 rounded-md bg-muted transition-all duration-200"
                style={{ boxShadow: getPreviewShadow() }}
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
              {shadow.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
