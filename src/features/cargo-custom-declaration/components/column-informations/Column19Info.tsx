import { useTranslations } from '@/hooks/use-translations';

export function Column19Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.column19.title')}</p>
    </div>
  );
}
