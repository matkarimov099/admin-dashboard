import { Card, CardTitle } from '@/components/ui/card';
import { Column25Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column25() {
  const { t } = useTranslations();

  return (
    <Card className="row-start-10">
      <CardTitle infoTitle={<Column25Info />}>{t('declarationForm.infoLabel.column25.name')}</CardTitle>
    </Card>
  );
}
