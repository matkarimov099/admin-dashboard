import { Card, CardTitle } from '@/components/ui/card';
import { Column20Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column20() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-4 col-start-5 row-start-8">
      <CardTitle infoTitle={<Column20Info />}>{t('declarationForm.infoLabel.column20.name')}</CardTitle>
    </Card>
  );
}
