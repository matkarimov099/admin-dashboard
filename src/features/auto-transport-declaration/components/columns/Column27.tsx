import { Card, CardTitle } from '@/components/ui/card';
import { Column27Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column27() {
  return (
    <Card className="col-span-2 col-start-3 row-start-10">
      <CardTitle infoTitle={<Column27Info />}>27.Место погрузки / разгрузки</CardTitle>
    </Card>
  );
}
