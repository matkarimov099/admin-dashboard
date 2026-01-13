import { useTranslations } from '@/hooks/use-translations';

export function Column16Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.column16.title')}</p>
    </div>
  );
}
