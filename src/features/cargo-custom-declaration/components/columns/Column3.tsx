import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator.tsx';
import { Column3Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column3() {
  const { t } = useTranslations();

  return (
    <Card className="col-start-5 row-start-2 gap-y-3">
      <CardTitle infoTitle={<Column3Info />}>
        {t('declarationForm.infoLabel.column3.name')}
      </CardTitle>
      <CardContent className="flex items-center justify-evenly p-0">
        <p>1</p>
        <Separator orientation="vertical" className="max-h-full border" />
        <p>1</p>
      </CardContent>
    </Card>
  );
}
