import { Card, CardTitle } from '@/components/ui/card';
import { Column8Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column8() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-4 row-span-2 row-start-4">
      <CardTitle infoTitle={<Column8Info />}>
        {t('declarationForm.infoLabel.column8.name')}
      </CardTitle>
    </Card>
  );
}
