import { CheckIcon } from 'lucide-react';
import { FONT_FAMILIES } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { cn } from '@/utils/utils';

// ============================
// Font Picker
// ============================

export function FontPicker() {
  const { config, setFontFamily } = useThemeConfig();

  return (
    <div className="grid grid-cols-2 gap-1.5">
      {FONT_FAMILIES.map(font => {
        const isSelected = config.fontFamily === font.value;

        return (
          <button
            key={font.value}
            type="button"
            onClick={() => setFontFamily(font.value)}
            className={cn(
              'group relative flex flex-col items-center gap-1 rounded-md border p-2 text-center transition-all duration-200',
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

            {/* Font Name */}
            <span
              className={cn('font-medium text-sm', isSelected ? 'text-primary' : 'text-foreground')}
              style={{ fontFamily: font.previewFont }}
            >
              {font.label}
            </span>

            {/* Description */}
            {font.description && (
              <span className="text-[10px] text-muted-foreground leading-tight">
                {font.description}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
