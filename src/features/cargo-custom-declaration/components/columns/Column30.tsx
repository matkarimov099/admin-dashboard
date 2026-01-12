import { Card, CardTitle } from '@/components/ui/card';
import { Column30Info } from '@/features/cargo-custom-declaration/components/column-informations';

export function Column30() {
  return (
    <Card className="col-span-2 col-start-3 row-start-11">
      <CardTitle infoTitle={<Column30Info />}>30.Место досмотра товара</CardTitle>
    </Card>
  );
}
