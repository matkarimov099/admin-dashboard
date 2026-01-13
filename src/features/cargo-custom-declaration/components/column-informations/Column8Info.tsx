import { useTranslations } from '@/hooks/use-translations';

export function Column8Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.column8.title')}</p>

      <p>{t('declarationForm.infoLabel.column8.description')}</p>

      <div className="space-y-2">
        <p className="font-medium">{t('declarationForm.infoLabel.column8.label')}</p>

        <div className="space-y-1">
          <p className="font-medium">
            {t('declarationForm.infoLabel.column8.sameEntity.title')}
          </p>
          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="mb-2 font-medium">
              {t('declarationForm.infoLabel.column8.sameEntity.individualPerson.title')}
            </p>
            <p className="text-muted-foreground">
              {t(
                'declarationForm.infoLabel.column8.sameEntity.individualPerson.description'
              )}
            </p>
          </div>

          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="mb-2 font-medium">
              {t(
                'declarationForm.infoLabel.column8.sameEntity.individualPersonNonResident.title'
              )}
            </p>
            <p className="text-muted-foreground">
              {t(
                'declarationForm.infoLabel.column8.sameEntity.individualPersonNonResident.description'
              )}
            </p>
          </div>

          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="mb-2 font-medium">
              {t('declarationForm.infoLabel.column8.sameEntity.legalEntity.title')}
            </p>
            <p className="text-muted-foreground">
              {t(
                'declarationForm.infoLabel.column8.sameEntity.legalEntity.description'
              )}
            </p>
          </div>

          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="mb-2 font-medium">
              {t('declarationForm.infoLabel.column8.sameEntity.structuralUnit.title')}
            </p>
            <p className="text-muted-foreground">
              {t(
                'declarationForm.infoLabel.column8.sameEntity.structuralUnit.description'
              )}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium">
            {t('declarationForm.infoLabel.column8.differentEntity.title')}
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.column8.differentEntity.description')}
          </p>
          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="text-muted-foreground text-sm">
              {t('declarationForm.infoLabel.column8.differentEntity.example')}
            </p>
          </div>
        </div>

        <p>{t('declarationForm.infoLabel.column8.sameAsColumn9')}</p>
      </div>

      <div className="space-y-2">
        <p className="font-medium">
          {t('declarationForm.infoLabel.column8.topRightSection.title')}
        </p>
        <div className="space-y-1 rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t(
                'declarationForm.infoLabel.column8.topRightSection.individualResident'
              )}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t(
                'declarationForm.infoLabel.column8.topRightSection.individualNonResident'
              )}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.column8.topRightSection.stateShare')}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.column8.topRightSection.diplomatic')}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.column8.topRightSection.internationalOrg')}
            </span>
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.column8.topRightSection.other')}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium">
          {t('declarationForm.infoLabel.column8.bottomSection.title')}
        </p>
        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground text-sm">
            {t('declarationForm.infoLabel.column8.bottomSection.description')}
          </p>
        </div>
        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground text-sm">
            {t('declarationForm.infoLabel.column8.bottomSection.noTin')}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.column8.note')}
      </p>
    </div>
  );
}
