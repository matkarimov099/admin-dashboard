import { useTranslations } from '@/hooks/use-translations';

export function Column2Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.column2.title')}</p>

      <p>{t('declarationForm.infoLabel.column2.description')}</p>

      <div className="space-y-2">
        <p className="font-medium">{t('declarationForm.infoLabel.column2.label')}</p>

        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="mb-2 font-medium">
            {t('declarationForm.infoLabel.column2.individualPerson.title')}
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.column2.individualPerson.description')}
          </p>
        </div>

        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="mb-2 font-medium">
            {t('declarationForm.infoLabel.column2.legalEntity.title')}
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.column2.legalEntity.description')}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium">{t('declarationForm.infoLabel.column2.exampleLabel')}</p>
        <div className="space-y-1 rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.column2.individualPersonExample')}
            </span>
            <br />
            {t('declarationForm.infoLabel.column2.individualPersonExampleText')}
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.column2.legalEntityExample')}
            </span>
            <br />
            {t('declarationForm.infoLabel.column2.legalEntityExampleText')}
          </p>
        </div>
      </div>

      <p>{t('declarationForm.infoLabel.column2.additionalInfo')}</p>

      <div className="rounded-md border border-border bg-muted/50 p-3">
        <p className="text-muted-foreground text-sm">
          {t('declarationForm.infoLabel.column2.additionalExample')}
        </p>
      </div>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.column2.note1')}
      </p>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.column2.note2')}
      </p>
    </div>
  );
}
