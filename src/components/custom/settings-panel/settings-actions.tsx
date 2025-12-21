import { RotateCcwIcon, ShuffleIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { useThemeConfig } from '@/hooks/use-theme-config';

// ============================
// Settings Actions
// ============================

export function SettingsActions() {
  const { t } = useTranslation();
  const { randomize, reset } = useThemeConfig();

  return (
    <div className="flex w-full gap-2">
      {/* Shuffle Button */}
      <Button
        type="button"
        variant="default"
        size="sm"
        onClick={randomize}
        className="flex-1 gap-1.5 text-xs"
      >
        <ShuffleIcon className="h-3.5 w-3.5" />
        {t('settingsPanel.shuffle')}
      </Button>

      {/* Reset Button */}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={reset}
        className="flex-1 gap-1.5 text-xs"
      >
        <RotateCcwIcon className="h-3.5 w-3.5" />
        {t('settingsPanel.reset')}
      </Button>
    </div>
  );
}
