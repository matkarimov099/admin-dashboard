import { Card, CardTitle } from '@/components/ui/card';
import { Column13Info } from '@/features/cargo-custom-declaration/components/column-informations';

export function Column13() {
  return (
    <Card className="col-start-8 row-start-5">
      <CardTitle infoTitle={<Column13Info />}>13</CardTitle>
    </Card>
  );
}
