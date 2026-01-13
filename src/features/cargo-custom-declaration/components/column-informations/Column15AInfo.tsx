import { useTranslations } from '@/hooks/use-translations';

export function Column15AInfo() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.column15a.title')}</p>
    </div>
  );
}
