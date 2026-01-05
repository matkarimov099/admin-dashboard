import { useTranslations } from '@/hooks/use-translations';

export function VersionInfo() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.versionInfo.title')}</p>
      <div className="space-y-1">
        <div>
          <span className="font-medium">Рабочая</span> — {t('declarationForm.infoLabel.versionInfo.working')}
        </div>
        <div>
          <span className="font-medium">Оформленная</span> — {t('declarationForm.infoLabel.versionInfo.formatted')}
        </div>
        <div>
          <span className="font-medium">Аннулированная</span> — {t('declarationForm.infoLabel.versionInfo.cancelled')}
        </div>
        <div>
          <span className="font-medium">Черновик</span> — {t('declarationForm.infoLabel.versionInfo.draft')}
        </div>
      </div>
    </div>
  );
}
