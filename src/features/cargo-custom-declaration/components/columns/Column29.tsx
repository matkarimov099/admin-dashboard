import { Card, CardTitle } from '@/components/ui/card';
import { Column29Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column29() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-2 col-start-1 row-start-11">
      <CardTitle infoTitle={<Column29Info />}>{t('declarationForm.infoLabel.column29.name')}</CardTitle>
    </Card>
  );
}
