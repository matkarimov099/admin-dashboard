import { Card, CardTitle } from '@/components/ui/card';
import { Column24Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column24() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-8 row-start-9">
      <CardTitle infoTitle={<Column24Info />}>{t('declarationForm.infoLabel.column24.name')}</CardTitle>
    </Card>
  );
}
