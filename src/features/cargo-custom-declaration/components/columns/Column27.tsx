import { Card, CardTitle } from '@/components/ui/card';
import { Column27Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column27() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-2 col-start-3 row-start-10">
      <CardTitle infoTitle={<Column27Info />}>{t('declarationForm.infoLabel.column27.name')}</CardTitle>
    </Card>
  );
}
