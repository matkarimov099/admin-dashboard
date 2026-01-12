import { Card, CardTitle } from '@/components/ui/card';
import { Column18Info } from '@/features/cargo-custom-declaration/components/column-informations';

export function Column18() {
  return (
    <Card className="col-span-3 row-start-8">
      <CardTitle infoTitle={<Column18Info />}>18.Транспортное средство при отправлении</CardTitle>
    </Card>
  );
}
