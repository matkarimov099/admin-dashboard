import { Card, CardTitle } from '@/components/ui/card';
import { Column11Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column11() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-6 row-start-5">
      <CardTitle infoTitle={<Column11Info />}>
        {t('declarationForm.infoLabel.column11.name')}
      </CardTitle>
    </Card>
  );
}
