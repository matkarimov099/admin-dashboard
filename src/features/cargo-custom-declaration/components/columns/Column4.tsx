import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Column4Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column4() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-6 row-start-2 gap-y-3">
      <CardTitle infoTitle={<Column4Info />}>
        {t('declarationForm.infoLabel.column4.name')}
      </CardTitle>
      <CardContent className="p-0"></CardContent>
    </Card>
  );
}
