import { Card, CardTitle } from '@/components/ui/card';
import { Column15Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column15() {
  return (
    <Card className="col-span-2 col-start-5 row-start-6">
      <CardTitle infoTitle={<Column15Info />}>15.Страна отправления</CardTitle>
    </Card>
  );
}
