import { Card, CardTitle } from '@/components/ui/card';
import { Column10Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column10() {
  return (
    <Card className="col-start-5 row-start-5">
      <CardTitle infoTitle={<Column10Info />}>10.Страна 1-го назнач</CardTitle>
    </Card>
  );
}
