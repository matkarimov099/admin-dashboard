import { PaletteIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button.tsx';
import { ScrollArea } from '@/components/ui/scroll-area.tsx';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet.tsx';
import { useThemeConfig } from '@/hooks/use-theme-config.ts';
import { FontPicker } from '../custom/settings-panel/font-picker.tsx';
import { LayoutModePicker } from '../custom/settings-panel/layout-mode-picker.tsx';
import { RadiusPicker } from '../custom/settings-panel/radius-picker.tsx';
import { SettingsActions } from '../custom/settings-panel/settings-actions.tsx';
import { SettingsSection } from '../custom/settings-panel/settings-section.tsx';
import { ShadowPicker } from '../custom/settings-panel/shadow-picker.tsx';
import { ThemeColorPicker } from '../custom/settings-panel/theme-color-picker.tsx';
import { ThemeModeToggle } from '../custom/settings-panel/theme-mode-toggle.tsx';

// ============================
// Settings Trigger Button
// ============================

export function SettingsTrigger() {
  const { t } = useTranslation();

  return (
    <SheetTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        data-header-trigger="true"
        className="group relative h-9 w-9 overflow-hidden bg-card p-0 backdrop-blur-sm transition-all duration-200"
      >
        <PaletteIcon className="h-5! w-5! transition-transform duration-200 group-hover:scale-110 group-hover:text-foreground" />
        <span className="sr-only">{t('settingsPanel.customizeTheme')}</span>
      </Button>
    </SheetTrigger>
  );
}

// ============================
// Main Settings Panel
// ============================

export function SettingsPanel() {
  const { t } = useTranslation();
  const { config } = useThemeConfig();

  // Get border radius value for styling (only left side corners)
  const radiusClass = {
    none: 'rounded-none',
    small: 'rounded-l-sm',
    default: 'rounded-l-md',
    medium: 'rounded-l-lg',
    large: 'rounded-l-xl',
  }[config.borderRadius];

  return (
    <Sheet>
      <SettingsTrigger />

      <SheetContent
        side="right"
        className={`w-full p-0 sm:max-w-md ${radiusClass}`}
        style={{ borderRadius: '' }}
      >
        {/* Header */}
        <SheetHeader className="space-y-1 border-b px-4 py-3">
          <SheetTitle className="text-base">{t('settingsPanel.title')}</SheetTitle>
          <SheetDescription className="text-xs">{t('settingsPanel.description')}</SheetDescription>
        </SheetHeader>

        {/* Scrollable Content */}
        <ScrollArea className="h-[calc(100vh-10.5rem)]">
          <div className="space-y-4 px-4 py-2">
            {/* Theme Mode */}
            <SettingsSection
              title={t('settingsPanel.themeMode')}
              description={t('settingsPanel.themeModeDescription')}
            >
              <ThemeModeToggle />
            </SettingsSection>

            {/* Layout Mode */}
            <SettingsSection
              title={t('settingsPanel.layoutMode')}
              description={t('settingsPanel.layoutModeDescription')}
            >
              <LayoutModePicker />
            </SettingsSection>

            {/* Style Variant */}
            {/*<SettingsSection title={t('settingsPanel.styleVariant')}>*/}
            {/*  <StyleVariantPicker />*/}
            {/*</SettingsSection>*/}

            {/* Theme Color */}
            <SettingsSection title={t('settingsPanel.themeColor')}>
              <ThemeColorPicker />
            </SettingsSection>

            {/* Font Family */}
            <SettingsSection title={t('settingsPanel.font')}>
              <FontPicker />
            </SettingsSection>

            {/* Border Radius */}
            <SettingsSection title={t('settingsPanel.radius')}>
              <RadiusPicker />
            </SettingsSection>

            {/* Shadow */}
            <SettingsSection title={t('settingsPanel.shadow')}>
              <ShadowPicker />
            </SettingsSection>
          </div>
        </ScrollArea>

        {/* Footer Actions */}
        <SheetFooter className="border-t px-4 py-2">
          <SettingsActions />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
