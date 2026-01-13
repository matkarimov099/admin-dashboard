import { Card, CardTitle } from '@/components/ui/card';
import { Column15Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column15() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-2 col-start-5 row-start-6">
      <CardTitle infoTitle={<Column15Info />}>{t('declarationForm.infoLabel.column15.name')}</CardTitle>
    </Card>
  );
}
