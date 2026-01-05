import { useTranslations } from '@/hooks/use-translations';

export function DeclarationStatusInfo() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.statusInfo.title')}</p>
      <div className="space-y-1">
        <div>
          <span className="font-medium">Новая</span> — {t('declarationForm.infoLabel.statusInfo.new')}
        </div>
        <div>
          <span className="font-medium">Перерегистрация</span> — {t('declarationForm.infoLabel.statusInfo.reregistration')}
        </div>
        <div>
          <span className="font-medium">Переоформления</span> — {t('declarationForm.infoLabel.statusInfo.redesign')}
        </div>
      </div>
    </div>
  );
}
