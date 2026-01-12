import { useTranslations } from '@/hooks/use-translations';

export function Column7Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.customsPostInfo.title')}</p>

      <p>
        {t('declarationForm.infoLabel.customsPostInfo.description')}
        <span className="font-medium">
          {t('declarationForm.infoLabel.customsPostInfo.description2')}
        </span>{' '}
        {t('declarationForm.infoLabel.customsPostInfo.description3')}
      </p>

      <div className="rounded-md border border-border bg-muted/50 p-3">
        <p className="mb-1 font-medium">
          {t('declarationForm.infoLabel.customsPostInfo.exampleLabel')}
        </p>
        <p className="font-mono text-muted-foreground">12345</p>
      </div>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.customsPostInfo.note')}
      </p>
    </div>
  );
}
