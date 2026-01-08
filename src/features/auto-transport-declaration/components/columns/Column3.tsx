import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Column3Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column3() {
  return (
    <Card className="col-start-5 row-start-2 gap-y-3">
      <CardTitle infoTitle={<Column3Info />}>3.Доб. лист</CardTitle>
      <CardContent className="p-0">some</CardContent>
    </Card>
  );
}
