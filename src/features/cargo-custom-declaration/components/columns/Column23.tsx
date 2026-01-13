import { Card, CardTitle } from '@/components/ui/card';
import { Column23Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column23() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-7 row-start-9">
      <CardTitle infoTitle={<Column23Info />}>{t('declarationForm.infoLabel.column23.name')}</CardTitle>
    </Card>
  );
}
