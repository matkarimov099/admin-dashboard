import { Card, CardTitle } from '@/components/ui/card';
import { Column18Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column18() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-3 row-start-8">
      <CardTitle infoTitle={<Column18Info />}>{t('declarationForm.infoLabel.column18.name')}</CardTitle>
    </Card>
  );
}
