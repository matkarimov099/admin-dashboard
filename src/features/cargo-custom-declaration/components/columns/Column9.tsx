import { Card, CardTitle } from '@/components/ui/card';
import { Column9Info } from '@/features/cargo-custom-declaration/components/column-informations';

export function Column9() {
  return (
    <Card className="col-span-4 col-start-5 row-start-4">
      <CardTitle infoTitle={<Column9Info />}>
        9.Лицо, ответственное за финансовое урегулирование
      </CardTitle>
    </Card>
  );
}
