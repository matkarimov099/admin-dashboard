import { Card, CardTitle } from '@/components/ui/card';
import { Column26Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column26() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-2 row-start-10">
      <CardTitle infoTitle={<Column26Info />}>{t('declarationForm.infoLabel.column26.name')}</CardTitle>
    </Card>
  );
}
