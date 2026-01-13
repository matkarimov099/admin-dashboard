import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Column6Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column6() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-6 row-start-3 gap-y-3">
      <CardTitle infoTitle={<Column6Info />}>
        {t('declarationForm.infoLabel.column6.name')}
      </CardTitle>
      <CardContent className="p-0"></CardContent>
    </Card>
  );
}
