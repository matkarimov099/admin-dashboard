import { useTranslations } from '@/hooks/use-translations';

export function Column7Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.column7.title')}</p>
      <p>{t('declarationForm.infoLabel.column7.description')}</p>
    </div>
  );
}
