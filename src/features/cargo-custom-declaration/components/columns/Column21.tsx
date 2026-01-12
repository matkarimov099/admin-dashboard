import { Card, CardTitle } from '@/components/ui/card';
import { Column21Info } from '@/features/cargo-custom-declaration/components/column-informations';

export function Column21() {
  return (
    <Card className="col-span-4 row-start-9">
      <CardTitle infoTitle={<Column21Info />}>21.Транспортное средство на границе</CardTitle>
    </Card>
  );
}
