import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Column5Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column5() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-5 row-start-3 gap-y-3">
      <CardTitle infoTitle={<Column5Info />}>
        {t('declarationForm.infoLabel.column5.name')}
      </CardTitle>
      <CardContent className="flex items-center justify-center p-0">1</CardContent>
    </Card>
  );
}
