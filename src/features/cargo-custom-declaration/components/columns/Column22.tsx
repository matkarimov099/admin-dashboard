import { Card, CardTitle } from '@/components/ui/card';
import { Column22Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column22() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-2 col-start-5 row-start-9">
      <CardTitle infoTitle={<Column22Info />}>{t('declarationForm.infoLabel.column22.name')}</CardTitle>
    </Card>
  );
}
