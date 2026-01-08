import { Card, CardTitle } from '@/components/ui/card';
import { Column25Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column25() {
  return (
    <Card className="row-start-10">
      <CardTitle infoTitle={<Column25Info />}>25.Вид транспорта на границе</CardTitle>
    </Card>
  );
}
