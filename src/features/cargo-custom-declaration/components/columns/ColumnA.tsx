import { Card, CardTitle } from '@/components/ui/card';
import { ColumnAInfo } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function ColumnA() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-2 col-start-7 row-span-2 row-start-1 gap-y-3">
      <CardTitle infoTitle={<ColumnAInfo />}>{t('declarationForm.infoLabel.columnA.name')}</CardTitle>
    </Card>
  );
}
