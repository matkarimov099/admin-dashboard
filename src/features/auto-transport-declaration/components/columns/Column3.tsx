import { Card, CardTitle } from '@/components/ui/card';
import { Column3Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column3() {
  return (
    <Card className="col-start-5 row-start-2">
      <CardTitle infoTitle={<Column3Info />}>3.Доб. лист</CardTitle>
    </Card>
  );
}
