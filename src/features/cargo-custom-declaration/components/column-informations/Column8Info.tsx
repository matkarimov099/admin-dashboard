import { useTranslations } from '@/hooks/use-translations';

export function Column8Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold">{t('declarationForm.infoLabel.importerSectionInfo.title')}</p>

      <p>{t('declarationForm.infoLabel.importerSectionInfo.description')}</p>

      <div className="space-y-2">
        <p className="font-medium">{t('declarationForm.infoLabel.importerSectionInfo.label')}</p>

        <div className="space-y-1">
          <p className="font-medium">
            {t('declarationForm.infoLabel.importerSectionInfo.sameEntity.title')}
          </p>
          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="mb-2 font-medium">
              {t('declarationForm.infoLabel.importerSectionInfo.sameEntity.individualPerson.title')}
            </p>
            <p className="text-muted-foreground">
              {t(
                'declarationForm.infoLabel.importerSectionInfo.sameEntity.individualPerson.description'
              )}
            </p>
          </div>

          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="mb-2 font-medium">
              {t(
                'declarationForm.infoLabel.importerSectionInfo.sameEntity.individualPersonNonResident.title'
              )}
            </p>
            <p className="text-muted-foreground">
              {t(
                'declarationForm.infoLabel.importerSectionInfo.sameEntity.individualPersonNonResident.description'
              )}
            </p>
          </div>

          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="mb-2 font-medium">
              {t('declarationForm.infoLabel.importerSectionInfo.sameEntity.legalEntity.title')}
            </p>
            <p className="text-muted-foreground">
              {t(
                'declarationForm.infoLabel.importerSectionInfo.sameEntity.legalEntity.description'
              )}
            </p>
          </div>

          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="mb-2 font-medium">
              {t('declarationForm.infoLabel.importerSectionInfo.sameEntity.structuralUnit.title')}
            </p>
            <p className="text-muted-foreground">
              {t(
                'declarationForm.infoLabel.importerSectionInfo.sameEntity.structuralUnit.description'
              )}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-medium">
            {t('declarationForm.infoLabel.importerSectionInfo.differentEntity.title')}
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.importerSectionInfo.differentEntity.description')}
          </p>
          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="text-muted-foreground text-sm">
              {t('declarationForm.infoLabel.importerSectionInfo.differentEntity.example')}
            </p>
          </div>
        </div>

        <p>{t('declarationForm.infoLabel.importerSectionInfo.sameAsColumn9')}</p>
      </div>

      <div className="space-y-2">
        <p className="font-medium">
          {t('declarationForm.infoLabel.importerSectionInfo.topRightSection.title')}
        </p>
        <div className="space-y-1 rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t(
                'declarationForm.infoLabel.importerSectionInfo.topRightSection.individualResident'
              )}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t(
                'declarationForm.infoLabel.importerSectionInfo.topRightSection.individualNonResident'
              )}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.importerSectionInfo.topRightSection.stateShare')}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.importerSectionInfo.topRightSection.diplomatic')}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.importerSectionInfo.topRightSection.internationalOrg')}
            </span>
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.importerSectionInfo.topRightSection.other')}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium">
          {t('declarationForm.infoLabel.importerSectionInfo.bottomSection.title')}
        </p>
        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground text-sm">
            {t('declarationForm.infoLabel.importerSectionInfo.bottomSection.description')}
          </p>
        </div>
        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground text-sm">
            {t('declarationForm.infoLabel.importerSectionInfo.bottomSection.noTin')}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.importerSectionInfo.note')}
      </p>
    </div>
  );
}
