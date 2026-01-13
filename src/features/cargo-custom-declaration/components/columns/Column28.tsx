import { Card, CardTitle } from '@/components/ui/card';
import { Column28Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column28() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-4 col-start-5 row-span-2 row-start-10">
      <CardTitle infoTitle={<Column28Info />}>{t('declarationForm.infoLabel.column28.name')}</CardTitle>
    </Card>
  );
}
