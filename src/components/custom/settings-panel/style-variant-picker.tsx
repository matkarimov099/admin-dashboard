import { CheckIcon } from 'lucide-react';
import { STYLE_VARIANTS } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';

// ============================
// Style Variant Picker
// ============================

export function StyleVariantPicker() {
  const { config, setStyleVariant } = useThemeConfig();

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {STYLE_VARIANTS.map(variant => {
        const isSelected = config.styleVariant === variant.value;

        return (
          <button
            key={variant.value}
            type="button"
            onClick={() => setStyleVariant(variant.value)}
            className={cn(
              'group relative flex flex-col items-start gap-0.5 rounded-md border p-2 text-left transition-all duration-200',
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

            {/* Label */}
            <span
              className={cn('font-medium text-xs', isSelected ? 'text-primary' : 'text-foreground')}
            >
              {variant.label}
            </span>

            {/* Description */}
            {variant.description && (
              <span className="text-[10px] text-muted-foreground leading-tight">
                {variant.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
