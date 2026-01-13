import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Column7Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column7() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-2 col-start-7 row-start-3 gap-y-3">
      <CardTitle className="py-0!" infoTitle={<Column7Info />}>
        {t('declarationForm.infoLabel.column7.name')}
      </CardTitle>
      <CardContent className="p-0">some</CardContent>
    </Card>
  );
}
