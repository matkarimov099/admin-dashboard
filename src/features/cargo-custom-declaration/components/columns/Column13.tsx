import { Card, CardTitle } from '@/components/ui/card';
import { Column13Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column13() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-8 row-start-5">
      <CardTitle infoTitle={<Column13Info />}>{t('declarationForm.infoLabel.column13.name')}</CardTitle>
    </Card>
  );
}
