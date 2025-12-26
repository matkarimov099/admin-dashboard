import { useTranslation } from 'react-i18next';
import { FONT_FAMILIES } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { PickerItem } from './picker-item';

// ============================
// Font Picker
// ============================

export function FontPicker() {
  const { t } = useTranslation();
  const { config, setFontFamily } = useThemeConfig();

  // Create translated font families map
  const translatedFontFamilies = FONT_FAMILIES.map(font => ({
    ...font,
    label: t(`settingsPanel.variants.fonts.${font.value}`),
    description: t(`settingsPanel.variants.fontDescriptions.${font.value}`),
  }));

  return (
    <div className="isolate grid grid-cols-2 gap-2 py-1">
      {translatedFontFamilies.map(font => (
        <PickerItem
          key={font.value}
          isSelected={config.fontFamily === font.value}
          label={font.label}
          description={font.description}
          onClick={() => setFontFamily(font.value)}
        />
      ))}
    </div>
  );
}
