import { useTranslations } from '@/hooks/use-translations';

export function Column9Info() {
  const { t } = useTranslations();

  return (
    <div className="space-y-3 text-sm">
      <p className="font-semibold">
        {t('declarationForm.infoLabel.financialSettlementInfo.title')}
      </p>

      <p>{t('declarationForm.infoLabel.financialSettlementInfo.description')}</p>

      <div className="space-y-2">
        <p className="font-medium">
          {t('declarationForm.infoLabel.financialSettlementInfo.topRightSection.title')}
        </p>
        <div className="space-y-1 rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t(
                'declarationForm.infoLabel.financialSettlementInfo.topRightSection.individualResident'
              )}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t(
                'declarationForm.infoLabel.financialSettlementInfo.topRightSection.individualNonResident'
              )}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.financialSettlementInfo.topRightSection.stateShare')}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t('declarationForm.infoLabel.financialSettlementInfo.topRightSection.diplomatic')}
            </span>
          </p>
          <p className="text-muted-foreground">
            <span className="font-medium">
              {t(
                'declarationForm.infoLabel.financialSettlementInfo.topRightSection.internationalOrg'
              )}
            </span>
          </p>
          <p className="text-muted-foreground">
            {t('declarationForm.infoLabel.financialSettlementInfo.topRightSection.other')}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <p className="font-medium">
          {t('declarationForm.infoLabel.financialSettlementInfo.bottomSection.title')}
        </p>
        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground text-sm">
            {t('declarationForm.infoLabel.financialSettlementInfo.bottomSection.description')}
          </p>
        </div>
        <div className="rounded-md border border-border bg-muted/50 p-3">
          <p className="text-muted-foreground text-sm">
            {t('declarationForm.infoLabel.financialSettlementInfo.bottomSection.noTin')}
          </p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs">
        {t('declarationForm.infoLabel.financialSettlementInfo.note')}
      </p>
    </div>
  );
}
