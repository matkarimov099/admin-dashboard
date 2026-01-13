import { Card, CardTitle } from '@/components/ui/card';
import { Column16Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column16() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-2 col-start-5 row-start-7">
      <CardTitle infoTitle={<Column16Info />}>{t('declarationForm.infoLabel.column16.name')}</CardTitle>
    </Card>
  );
}
