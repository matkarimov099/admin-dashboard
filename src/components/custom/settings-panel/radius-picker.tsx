import { BORDER_RADIUS_OPTIONS } from '@/config/theme/theme-config.constants';
import { useThemeConfig } from '@/hooks/use-theme-config';
import { PickerItem } from './picker-item';

// ============================
// Border Radius Picker
// ============================

// Custom radius preview component
const RadiusPreview = ({ radius, isSelected }: { radius: string; isSelected: boolean }) => {
  // Visual preview radius mapping
  const previewRadius = {
    none: '0px',
    small: '4px',
    default: '8px',
    medium: '12px',
    large: '16px',
  }[radius];

  return (
    <div className="relative">
      <div
        className="h-5 w-5 border-2 bg-muted transition-all duration-200"
        style={{
          borderRadius: previewRadius,
          borderColor: isSelected ? 'var(--color-primary)' : undefined
        }}
      />
    </div>
  );
};

export function RadiusPicker() {
  const { config, setBorderRadius } = useThemeConfig();

  return (
    <div className="grid grid-cols-3 gap-2">
      {BORDER_RADIUS_OPTIONS.map(radius => (
        <PickerItem
          key={radius.value}
          isSelected={config.borderRadius === radius.value}
          label={radius.label}
          description={radius.description}
          onClick={() => setBorderRadius(radius.value)}
        >
          <RadiusPreview radius={radius.value} isSelected={config.borderRadius === radius.value} />
        </PickerItem>
      ))}
    </div>
  );
}
