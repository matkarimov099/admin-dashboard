import { useTranslation } from 'react-i18next';
import { STYLE_VARIANTS } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { PickerItem } from './picker-item';

// ============================
// Style Variant Picker
// ============================

export function StyleVariantPicker() {
  const { t } = useTranslation();
  const { config, setStyleVariant } = useThemeConfig();

  // Create translated style variants map
  const translatedStyleVariants = STYLE_VARIANTS.map(variant => ({
    ...variant,
    label: t(`settingsPanel.variants.styleVariant.${variant.value}`),
    description: t(`settingsPanel.variants.styleDescriptions.${variant.value}`)
  }));

  return (
    <div className="isolate grid grid-cols-2 gap-2 py-1">
      {translatedStyleVariants.map(variant => (
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
