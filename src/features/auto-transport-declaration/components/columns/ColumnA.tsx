import { Card, CardTitle } from '@/components/ui/card';
import { ColumnAInfo } from '@/features/auto-transport-declaration/components/column-informations';

export function ColumnA() {
  return (
    <Card className="col-span-2 col-start-7 row-span-2 row-start-1">
      <CardTitle infoTitle={<ColumnAInfo />}>A</CardTitle>
    </Card>
  );
}
