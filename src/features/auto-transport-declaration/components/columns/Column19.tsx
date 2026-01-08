import { Card, CardTitle } from '@/components/ui/card';
import { Column19Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column19() {
  return (
    <Card className="col-start-4 row-start-8">
      <CardTitle infoTitle={<Column19Info />}>19.Конт</CardTitle>
    </Card>
  );
}
