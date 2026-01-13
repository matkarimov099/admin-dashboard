import { Card, CardTitle } from '@/components/ui/card';
import { Column14Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column14() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-4 row-span-2 row-start-6">
      <CardTitle infoTitle={<Column14Info />}>{t('declarationForm.infoLabel.column14.name')}</CardTitle>
    </Card>
  );
}
