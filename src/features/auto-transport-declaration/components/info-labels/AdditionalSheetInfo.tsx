import { useTranslations } from '@/hooks/use-translations';

export function AdditionalSheetInfo() {
  const { t } = useTranslations();

  return (
    <div className="space-y-2 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.additionalSheetInfo.title')}</p>

      <p>{t('declarationForm.infoLabel.additionalSheetInfo.description')}</p>

      <div className="rounded-md border border-border bg-muted/50 p-3">
        <p className="mb-2 font-medium">{t('declarationForm.infoLabel.additionalSheetInfo.exampleLabel')}</p>
        <div className="space-y-1 text-muted-foreground">
          <p>{t('declarationForm.infoLabel.additionalSheetInfo.example1')}</p>
          <p>{t('declarationForm.infoLabel.additionalSheetInfo.example2')}</p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.additionalSheetInfo.note')}
      </p>
    </div>
  );
}
