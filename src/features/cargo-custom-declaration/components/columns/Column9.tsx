import { Card, CardTitle } from '@/components/ui/card';
import { Column9Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function Column9() {
  const { t } = useTranslations();

  return (
    <Card className="col-span-4 col-start-5 row-start-4">
      <CardTitle infoTitle={<Column9Info />}>
        {t('declarationForm.infoLabel.column9.name')}
      </CardTitle>
    </Card>
  );
}
