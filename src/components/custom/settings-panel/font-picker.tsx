import { FONT_FAMILIES } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { PickerItem } from './picker-item';

// ============================
// Font Picker
// ============================

export function FontPicker() {
  const { config, setFontFamily } = useThemeConfig();

  return (
    <div className="grid grid-cols-2 gap-2">
      {FONT_FAMILIES.map(font => (
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
