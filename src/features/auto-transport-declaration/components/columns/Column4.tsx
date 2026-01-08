import { Card, CardTitle } from '@/components/ui/card';
import { Column4Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column4() {
  return (
    <Card className="col-start-6 row-start-2">
      <CardTitle infoTitle={<Column4Info />}>4.Отгр. спец.</CardTitle>
    </Card>
  );
}
