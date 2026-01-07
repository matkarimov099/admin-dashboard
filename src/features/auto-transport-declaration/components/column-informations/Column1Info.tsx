import { useTranslations } from '@/hooks/use-translations';

export function Column1Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.declarationTypeInfo.title')}</p>
      <div className="space-y-1">
        <div>
          В <span className="font-medium">первом подразделе</span> графы{' '}
          {t('declarationForm.infoLabel.declarationTypeInfo.subsection1')}
        </div>
        <div>
          В <span className="font-medium">втором подразделе</span> графы{' '}
          {t('declarationForm.infoLabel.declarationTypeInfo.subsection2')}
        </div>
        <div>
          <span className="font-medium">третий подраздел</span> графы{' '}
          {t('declarationForm.infoLabel.declarationTypeInfo.subsection3')}
        </div>
      </div>
    </div>
  );
}
