import { STYLE_VARIANTS } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { PickerItem } from './picker-item';

// ============================
// Style Variant Picker
// ============================

export function StyleVariantPicker() {
  const { config, setStyleVariant } = useThemeConfig();

  return (
    <div className="isolate grid grid-cols-2 gap-2 py-1">
      {STYLE_VARIANTS.map(variant => (
        <PickerItem
          key={variant.value}
          isSelected={config.styleVariant === variant.value}
          label={variant.label}
          description={variant.description}
          onClick={() => setStyleVariant(variant.value)}
        />
      ))}
    </div>
  );
}
