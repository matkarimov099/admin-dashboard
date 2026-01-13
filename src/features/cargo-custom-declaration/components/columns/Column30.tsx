import { Card, CardTitle } from '@/components/ui/card';
import { Column30Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column30() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-2 col-start-3 row-start-11">
      <CardTitle infoTitle={<Column30Info />}>{t('declarationForm.infoLabel.column30.name')}</CardTitle>
    </Card>
  );
}
