import { useTranslations } from '@/hooks/use-translations';

export function Column5Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.column5.title')}</p>
      <p className="mb-4">{t('declarationForm.infoLabel.column5.description')}</p>
    </div>
  );
}
