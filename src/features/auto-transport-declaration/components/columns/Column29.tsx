import { Card, CardTitle } from '@/components/ui/card';
import { Column29Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column29() {
  return (
    <Card className="col-span-2 col-start-1 row-start-11">
      <CardTitle infoTitle={<Column29Info />}>29.Таможня на границе</CardTitle>
    </Card>
  );
}
