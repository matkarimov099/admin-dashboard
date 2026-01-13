import { Card, CardTitle } from '@/components/ui/card';
import { Column12Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column12() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-7 row-start-5">
      <CardTitle infoTitle={<Column12Info />}>{t('declarationForm.infoLabel.column12.name')}</CardTitle>
    </Card>
  );
}
