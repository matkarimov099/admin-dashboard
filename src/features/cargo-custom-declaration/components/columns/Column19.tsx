import { Card, CardTitle } from '@/components/ui/card';
import { Column19Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column19() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-4 row-start-8">
      <CardTitle infoTitle={<Column19Info />}>{t('declarationForm.infoLabel.column19.name')}</CardTitle>
    </Card>
  );
}
