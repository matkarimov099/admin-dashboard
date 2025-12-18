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
    <div className="grid grid-cols-2 gap-2">
      {STYLE_VARIANTS.map(variant => {
        const isSelected = config.styleVariant === variant.value;

        return (
          <button
            key={variant.value}
            type="button"
            onClick={() => setStyleVariant(variant.value)}
            className={cn(
              'group relative flex items-center gap-3 rounded-md border-2 px-3 py-2.5 text-left transition-all duration-200',
              'hover:border-(--color-primary)/60 hover:bg-(--color-primary)/5',
              isSelected
                ? 'border-(--color-primary) bg-(--color-primary)/10 shadow-sm'
                : 'border-border bg-card hover:shadow-sm'
            )}
          >
            {/* Preview Icon */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-(--color-primary)/10">
              {variant.label.charAt(0)}
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span
                  className={cn(
                    'font-medium text-sm transition-colors duration-200',
                    isSelected ? 'text-(--color-primary)' : 'text-foreground'
                  )}
                >
                  {variant.label}
                </span>
                {/* Check Icon */}
                {isSelected && (
                  <div className="bg-(--color-primary) rounded-full p-0.5 shadow-sm border border-white">
                    <CheckIcon className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              {/* Description */}
              {variant.description && (
                <div className="text-muted-foreground text-xs leading-tight">
                  {variant.description}
                </div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
