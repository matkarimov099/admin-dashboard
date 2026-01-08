import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Column5Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column5() {
  return (
    <Card className="col-start-5 row-start-3 gap-y-3">
      <CardTitle infoTitle={<Column5Info />}>5.Всего наи. т-ов</CardTitle>
      <CardContent className="p-0">some</CardContent>
    </Card>
  );
}
