import { Card, CardTitle } from '@/components/ui/card';
import { Column15AInfo } from '@/features/auto-transport-declaration/components/column-informations';

export function Column15A() {
  return (
    <Card className="col-start-7 row-start-6 gap-y-3">
      <CardTitle infoTitle={<Column15AInfo />}>15a.Код страны отпр.</CardTitle>
    </Card>
  );
}
