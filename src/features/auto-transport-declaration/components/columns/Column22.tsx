import { Card, CardTitle } from '@/components/ui/card';
import { Column22Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column22() {
  return (
    <Card className="col-span-2 col-start-5 row-start-9">
      <CardTitle infoTitle={<Column22Info />}>22.Валюта и общ. факт. стоим. товаров</CardTitle>
    </Card>
  );
}
