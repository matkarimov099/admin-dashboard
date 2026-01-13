import { useTranslations } from '@/hooks/use-translations';

export function Column17Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.column17.title')}</p>
    </div>
  );
}
