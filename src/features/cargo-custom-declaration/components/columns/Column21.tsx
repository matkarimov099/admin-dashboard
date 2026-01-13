import { Card, CardTitle } from '@/components/ui/card';
import { Column21Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column21() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-4 row-start-9">
      <CardTitle infoTitle={<Column21Info />}>{t('declarationForm.infoLabel.column21.name')}</CardTitle>
    </Card>
  );
}
