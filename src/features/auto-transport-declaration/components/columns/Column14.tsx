import { Card, CardTitle } from '@/components/ui/card';
import { Column14Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column14() {
  return (
    <Card className="col-span-4 row-span-2 row-start-6">
      <CardTitle infoTitle={<Column14Info />}>14.Декларант/представитель</CardTitle>
    </Card>
  );
}
