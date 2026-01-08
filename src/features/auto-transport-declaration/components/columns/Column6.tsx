import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Column6Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column6() {
  return (
    <Card className="col-start-6 row-start-3 gap-y-3">
      <CardTitle infoTitle={<Column6Info />}>6.Кол-во мест</CardTitle>
      <CardContent className="p-0">some</CardContent>
    </Card>
  );
}
