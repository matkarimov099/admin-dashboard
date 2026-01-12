import { Card, CardTitle } from '@/components/ui/card';
import { Column8Info } from '@/features/cargo-custom-declaration/components/column-informations';

export function Column8() {
  return (
    <Card className="col-span-4 row-span-2 row-start-4">
      <CardTitle infoTitle={<Column8Info />}>8.Получатель/импортер</CardTitle>
    </Card>
  );
}
