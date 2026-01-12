import { useTranslations } from '@/hooks/use-translations';

export function Column2Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.exporterSectionInfo.title')}</p>

      <p>{t('declarationForm.infoLabel.exporterSectionInfo.description')}</p>

      <div className="space-y-2">
        <p className="font-medium">{t('declarationForm.infoLabel.exporterSectionInfo.label')}</p>

        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="mb-2 font-medium">
            {t('declarationForm.infoLabel.exporterSectionInfo.individualPerson.title')}
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.exporterSectionInfo.individualPerson.description')}
          </p>
        </div>

        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="mb-2 font-medium">
            {t('declarationForm.infoLabel.exporterSectionInfo.legalEntity.title')}
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.exporterSectionInfo.legalEntity.description')}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium">
          {t('declarationForm.infoLabel.exporterSectionInfo.exampleLabel')}
        </p>
        <div className="space-y-1 rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.exporterSectionInfo.individualPersonExample')}
            </span>
            <br />
            {t('declarationForm.infoLabel.exporterSectionInfo.individualPersonExampleText')}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.exporterSectionInfo.legalEntityExample')}
            </span>
            <br />
            {t('declarationForm.infoLabel.exporterSectionInfo.legalEntityExampleText')}
          </p>
        </div>
      </div>

      <p>{t('declarationForm.infoLabel.exporterSectionInfo.additionalInfo')}</p>

      <div className="rounded-md border border-border bg-muted/50 p-3">
        <p className="text-muted-foreground text-sm">
          {t('declarationForm.infoLabel.exporterSectionInfo.additionalExample')}
        </p>
      </div>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.exporterSectionInfo.note1')}
      </p>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.exporterSectionInfo.note2')}
      </p>
    </div>
  );
}
