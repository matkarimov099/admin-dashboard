import { Card, CardTitle } from '@/components/ui/card';
import { Column28Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column28() {
  return (
    <Card className="col-span-4 col-start-5 row-span-2 row-start-10">
      <CardTitle infoTitle={<Column28Info />}>28.Финансовые и банковские сведения</CardTitle>
    </Card>
  );
}
