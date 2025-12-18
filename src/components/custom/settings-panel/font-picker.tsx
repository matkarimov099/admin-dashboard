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
    <div className="grid grid-cols-2 gap-2">
      {FONT_FAMILIES.map(font => {
        const isSelected = config.fontFamily === font.value;

        return (
          <button
            key={font.value}
            type="button"
            onClick={() => setFontFamily(font.value)}
            className={cn(
              'group relative flex items-center justify-between rounded-md border-2 px-3 py-2 transition-all duration-200',
              'hover:border-(--color-primary)/60 hover:bg-(--color-primary)/5',
              isSelected
                ? 'border-(--color-primary) bg-(--color-primary)/10 shadow-sm'
                : 'border-border bg-card hover:shadow-sm'
            )}
          >
            {/* Font Name */}
            <span
              className={cn(
                'truncate font-medium text-sm transition-colors duration-200',
                isSelected ? 'text-(--color-primary)' : 'text-foreground'
              )}
              style={{ fontFamily: font.previewFont }}
            >
              {font.label}
            </span>

            {/* Check Icon */}
            {isSelected && (
              <div className="rounded-full border border-white bg-(--color-primary) p-0.5 shadow-sm">
                <CheckIcon className="h-3 w-3 text-white" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
