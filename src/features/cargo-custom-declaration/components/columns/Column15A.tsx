import { Card, CardTitle } from '@/components/ui/card';
import { Column15AInfo } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column15A() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-7 row-start-6 gap-y-3">
      <CardTitle infoTitle={<Column15AInfo />}>{t('declarationForm.infoLabel.column15a.name')}</CardTitle>
    </Card>
  );
}
