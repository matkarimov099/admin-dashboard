import { Card, CardTitle } from '@/components/ui/card';
import { Column16Info } from '@/features/cargo-custom-declaration/components/column-informations';

export function Column16() {
  return (
    <Card className="col-span-2 col-start-5 row-start-7">
      <CardTitle infoTitle={<Column16Info />}>16.Страна происхождения</CardTitle>
    </Card>
  );
}
