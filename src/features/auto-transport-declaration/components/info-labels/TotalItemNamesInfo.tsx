import { useTranslations } from '@/hooks/use-translations';

export function TotalItemNamesInfo() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.totalItemsInfo.title')}</p>

      <p>{t('declarationForm.infoLabel.totalItemsInfo.description')}</p>

      <div className="rounded-md border border-border bg-muted/50 p-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Примечание:</span> {t('declarationForm.infoLabel.totalItemsInfo.note')}
        </p>
      </div>
    </div>
  );
}
