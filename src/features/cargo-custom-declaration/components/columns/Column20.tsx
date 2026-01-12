import { Card, CardTitle } from '@/components/ui/card';
import { Column20Info } from '@/features/cargo-custom-declaration/components/column-informations';

export function Column20() {
  return (
    <Card className="col-span-4 col-start-5 row-start-8">
      <CardTitle infoTitle={<Column20Info />}>20.Условия поставки</CardTitle>
    </Card>
  );
}
