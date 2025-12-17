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
    <div className="grid grid-cols-2 gap-1.5">
      {SHADOW_OPTIONS.map(shadow => {
        const isSelected = config.shadow === shadow.value;

        // Visual preview shadow mapping - using explicit colors for better visibility
        const previewShadow = {
          none: 'none',
          small: '0 1px 3px rgba(0, 0, 0, 0.3)',
          default: '0 4px 6px rgba(0, 0, 0, 0.3)',
          medium: '0 8px 16px rgba(0, 0, 0, 0.4)',
          large: '0 16px 32px rgba(0, 0, 0, 0.5)',
        }[shadow.value];

        return (
          <button
            key={shadow.value}
            type="button"
            onClick={() => setShadow(shadow.value)}
            className={cn(
              'group relative flex flex-col items-center gap-1 rounded-md border p-1.5 text-center transition-all duration-200',
              'hover:border-primary/50 hover:bg-muted/50',
              isSelected ? 'border-primary bg-primary/5' : 'border-border bg-card'
            )}
          >
            {/* Check Icon */}
            {isSelected && (
              <div className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center">
                <CheckIcon className="h-3 w-3 text-foreground" />
              </div>
            )}

            {/* Visual Preview */}
            <div className="h-6 w-6 rounded-md bg-muted" style={{ boxShadow: previewShadow }} />

            {/* Label */}
            <span
              className={cn(
                'font-medium text-[10px]',
                isSelected ? 'text-primary' : 'text-foreground'
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
