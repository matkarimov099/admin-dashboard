import { SHADOW_OPTIONS } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { PickerItem } from './picker-item';

// ============================
// Shadow Picker
// ============================

// Custom shadow preview component
const ShadowPreview = ({ shadow, isSelected }: { shadow: string; isSelected: boolean }) => {
  // Visual preview shadow mapping - using theme color for selected state
  const getPreviewShadow = () => {
    if (isSelected) {
      return `0 4px 8px rgba(0, 0, 0, 0.3), 0 0 0 1px var(--color-primary)`;
    }
    return {
      none: 'none',
      small: '0 1px 3px rgba(0, 0, 0, 0.3)',
      default: '0 4px 6px rgba(0, 0, 0, 0.3)',
      medium: '0 8px 16px rgba(0, 0, 0, 0.4)',
      large: '0 16px 32px rgba(0, 0, 0, 0.5)',
    }[shadow];
  };

  return (
    <div className="relative">
      <div
        className="h-5 w-5 rounded-md bg-muted transition-all duration-200"
        style={{ boxShadow: getPreviewShadow() }}
      />
    </div>
  );
};

export function ShadowPicker() {
  const { config, setShadow } = useThemeConfig();

  return (
    <div className="grid grid-cols-3 gap-2">
      {SHADOW_OPTIONS.map(shadow => (
        <PickerItem
          key={shadow.value}
          isSelected={config.shadow === shadow.value}
          label={shadow.label}
          description={shadow.description}
          onClick={() => setShadow(shadow.value)}
        >
          <ShadowPreview shadow={shadow.value} isSelected={config.shadow === shadow.value} />
        </PickerItem>
      ))}
    </div>
  );
}
