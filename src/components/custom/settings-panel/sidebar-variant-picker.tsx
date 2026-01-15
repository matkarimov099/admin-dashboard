import { PanelLeft, Square } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SIDEBAR_VARIANT_OPTIONS } from '@/config/theme/theme-config.constants';
import type { SidebarVariant } from '@/config/theme/theme-config.types';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { PickerItem } from './picker-item';

// ============================
// Sidebar Variant Picker
// ============================

export function SidebarVariantPicker() {
  const { t } = useTranslation();
  const { config, setSidebarVariant } = useThemeConfig();

  // Icon mapping for each sidebar variant
  const getVariantIcon = (variant: SidebarVariant) => {
    switch (variant) {
      case 'floating':
        return PanelLeft;
      case 'sidebar':
        return Square;
      default:
        return PanelLeft;
    }
  };

  // Create translated sidebar variants map
  const translatedVariants = SIDEBAR_VARIANT_OPTIONS.map(variant => ({
    ...variant,
    label: t(`settingsPanel.variants.sidebarVariant.${variant.value}`),
    description: t(`settingsPanel.variants.sidebarVariantDescriptions.${variant.value}`),
  }));

  return (
    <div className="isolate grid grid-cols-2 gap-2 py-1">
      {translatedVariants.map(variant => (
        <PickerItem
          key={variant.value}
          isSelected={config.sidebarVariant === variant.value}
          icon={getVariantIcon(variant.value)}
          label={variant.label}
          description={variant.description}
          onClick={() => setSidebarVariant(variant.value)}
        />
      ))}
    </div>
  );
}
