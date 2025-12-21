import { LayoutGrid, Rows, Sidebar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LAYOUT_MODES } from '@/config/theme/theme-config.constants';
import type { LayoutMode } from '@/config/theme/theme-config.types';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { PickerItem } from './picker-item';

// ============================
// Layout Mode Picker
// ============================

export function LayoutModePicker() {
  const { t } = useTranslation();
  const { config, setLayoutMode } = useThemeConfig();

  // Icon mapping for each layout mode
  const getLayoutIcon = (mode: LayoutMode) => {
    switch (mode) {
      case 'vertical':
        return Sidebar;
      case 'horizontal':
        return Rows;
      case 'compact':
        return LayoutGrid;
      default:
        return Sidebar;
    }
  };

  // Create translated layout modes map
  const translatedLayoutModes = LAYOUT_MODES.map(mode => ({
    ...mode,
    label: t(`settingsPanel.variants.layoutMode.${mode.value}`),
    description: t(`settingsPanel.variants.layoutDescriptions.${mode.value}`)
  }));

  return (
    <div className="isolate grid grid-cols-1 gap-2 py-1 sm:grid-cols-3">
      {translatedLayoutModes.map(mode => (
        <PickerItem
          key={mode.value}
          isSelected={config.layoutMode === mode.value}
          icon={getLayoutIcon(mode.value)}
          label={mode.label}
          description={mode.description}
          onClick={() => setLayoutMode(mode.value)}
        />
      ))}
    </div>
  );
}
