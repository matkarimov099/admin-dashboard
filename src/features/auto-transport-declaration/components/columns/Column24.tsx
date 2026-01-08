import { Card, CardTitle } from '@/components/ui/card';
import { Column24Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column24() {
  return (
    <Card className="col-start-8 row-start-9">
      <CardTitle infoTitle={<Column24Info />}>24.Характер сделки</CardTitle>
    </Card>
  );
}
