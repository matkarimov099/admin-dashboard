import { Card, CardTitle } from '@/components/ui/card';
import { Column17Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column17() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-2 col-start-7 row-start-7">
      <CardTitle infoTitle={<Column17Info />}>{t('declarationForm.infoLabel.column17.name')}</CardTitle>
    </Card>
  );
}
