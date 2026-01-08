import { Card, CardTitle } from '@/components/ui/card';
import { Column26Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column26() {
  return (
    <Card className="col-start-2 row-start-10">
      <CardTitle infoTitle={<Column26Info />}>26.Вид транспорта внутри страны</CardTitle>
    </Card>
  );
}
