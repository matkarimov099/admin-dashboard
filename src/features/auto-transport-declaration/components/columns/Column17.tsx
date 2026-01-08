import { Card, CardTitle } from '@/components/ui/card';
import { Column17Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column17() {
  return (
    <Card className="col-span-2 col-start-7 row-start-7">
      <CardTitle infoTitle={<Column17Info />}>17.Страна назначения</CardTitle>
    </Card>
  );
}
