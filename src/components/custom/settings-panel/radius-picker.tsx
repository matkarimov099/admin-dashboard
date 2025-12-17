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
    <div className="grid grid-cols-2 gap-1.5">
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
            <div
              className="h-6 w-6 border-2 border-foreground/20 bg-muted"
              style={{ borderRadius: previewRadius }}
            />

            {/* Label */}
            <span
              className={cn(
                'font-medium text-[10px]',
                isSelected ? 'text-primary' : 'text-foreground'
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
