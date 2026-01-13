import { Card, CardTitle } from '@/components/ui/card';
import { Column17AInfo } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column17A() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-8 row-start-6">
      <CardTitle infoTitle={<Column17AInfo />}>{t('declarationForm.infoLabel.column17a.name')}</CardTitle>
    </Card>
  );
}
