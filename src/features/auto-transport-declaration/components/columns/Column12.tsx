import { Card, CardTitle } from '@/components/ui/card';
import { Column12Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column12() {
  return (
    <Card className="col-start-7 row-start-5">
      <CardTitle infoTitle={<Column12Info />}>12</CardTitle>
    </Card>
  );
}
