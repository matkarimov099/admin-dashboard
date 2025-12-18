import { PaletteIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useThemeConfig } from '@/hooks/use-theme-config.ts';
import { FontPicker } from './settings-panel/font-picker';
import { RadiusPicker } from './settings-panel/radius-picker';
import { SettingsActions } from './settings-panel/settings-actions';
import { SettingsSection } from './settings-panel/settings-section';
import { ShadowPicker } from './settings-panel/shadow-picker';
import { StyleVariantPicker } from './settings-panel/style-variant-picker';
import { ThemeColorPicker } from './settings-panel/theme-color-picker';
import { ThemeModeToggle } from './settings-panel/theme-mode-toggle';

// ============================
// Settings Trigger Button
// ============================

export function SettingsTrigger() {
  return (
    <SheetTrigger asChild>
      <Button
        variant="ghost"
        size="sm"
        className="group relative mr-2 h-9 w-9 overflow-hidden bg-card p-0 backdrop-blur-sm transition-colors duration-200 hover:border-[var(--color-primary)]/30 hover:bg-muted/50"
      >
        <PaletteIcon className="h-5! w-5! text-muted-foreground transition-transform duration-200 group-hover:scale-110 group-hover:text-foreground" />
        <span className="sr-only">Customize theme</span>
      </Button>
    </SheetTrigger>
  );
}

// ============================
// Main Settings Panel
// ============================

export function SettingsPanel() {
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
        className={`w-full p-0 sm:max-w-sm ${radiusClass}`}
        style={{ borderRadius: '' }}
      >
        {/* Header */}
        <SheetHeader className="space-y-1 border-b px-4 py-3">
          <SheetTitle className="text-base">Customize Theme</SheetTitle>
          <SheetDescription className="text-xs">
            Personalize your dashboard appearance
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable Content */}
        <ScrollArea className="h-[calc(100vh-10.5rem)]">
          <div className="space-y-4 px-4 py-2">
            {/* Theme Mode */}
            <SettingsSection title="Theme Mode" description="Choose your appearance preference">
              <ThemeModeToggle />
            </SettingsSection>

            {/* Style Variant */}
            <SettingsSection title="Style Variant">
              <StyleVariantPicker />
            </SettingsSection>

            {/* Theme Color */}
            <SettingsSection title="Theme Color">
              <ThemeColorPicker />
            </SettingsSection>

            {/* Font Family */}
            <SettingsSection title="Font">
              <FontPicker />
            </SettingsSection>

            {/* Border Radius */}
            <SettingsSection title="Radius">
              <RadiusPicker />
            </SettingsSection>

            {/* Shadow */}
            <SettingsSection title="Shadow">
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
