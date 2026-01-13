import { useTranslations } from '@/hooks/use-translations';

export function Column3Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.column3.title')}</p>
      <p>{t('declarationForm.infoLabel.column3.description')}</p>

      <div className="space-y-2">
        <p className="font-medium">{t('declarationForm.infoLabel.column3.exampleLabel')}</p>
        <div className="space-y-1 rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.column3.example1')}
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.column3.example2')}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.column3.note')}
      </p>
    </div>
  );
}
