import { useTranslations } from '@/hooks/use-translations';

export function Column9Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold">
        {t('declarationForm.infoLabel.column9.title')}
      </p>

      <p>{t('declarationForm.infoLabel.column9.description')}</p>

      <div className="space-y-2">
        <p className="font-medium">
          {t('declarationForm.infoLabel.column9.topRightSection.title')}
        </p>
        <div className="space-y-1 rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t(
                'declarationForm.infoLabel.column9.topRightSection.individualResident'
              )}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t(
                'declarationForm.infoLabel.column9.topRightSection.individualNonResident'
              )}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.column9.topRightSection.stateShare')}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.column9.topRightSection.diplomatic')}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t(
                'declarationForm.infoLabel.column9.topRightSection.internationalOrg'
              )}
            </span>
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.column9.topRightSection.other')}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium">
          {t('declarationForm.infoLabel.column9.bottomSection.title')}
        </p>
        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground text-sm">
            {t('declarationForm.infoLabel.column9.bottomSection.description')}
          </p>
        </div>
        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground text-sm">
            {t('declarationForm.infoLabel.column9.bottomSection.noTin')}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.column9.note')}
      </p>
    </div>
  );
}
