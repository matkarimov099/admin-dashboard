import { Card, CardTitle } from '@/components/ui/card';
import { Column7Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column7() {
  return (
    <Card className="col-span-2 col-start-7 row-start-3">
      <CardTitle infoTitle={<Column7Info />}>7.Справочный номер</CardTitle>
    </Card>
  );
}
