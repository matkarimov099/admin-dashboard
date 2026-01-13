import { Card, CardTitle } from '@/components/ui/card';
import { Column10Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column10() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-5 row-start-5">
      <CardTitle infoTitle={<Column10Info />}>
        {t('declarationForm.infoLabel.column10.name')}
      </CardTitle>
    </Card>
  );
}
