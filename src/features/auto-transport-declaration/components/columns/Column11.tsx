import { Card, CardTitle } from '@/components/ui/card';
import { Column11Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column11() {
  return (
    <Card className="col-start-6 row-start-5">
      <CardTitle infoTitle={<Column11Info />}>11.Торг. страна</CardTitle>
    </Card>
  );
}
