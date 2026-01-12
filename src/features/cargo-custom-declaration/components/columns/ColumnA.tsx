import { Card, CardTitle } from '@/components/ui/card';
import { ColumnAInfo } from '@/features/cargo-custom-declaration/components/column-informations';

export function ColumnA() {
  return (
    <Card className="col-span-2 col-start-7 row-span-2 row-start-1 gap-y-3">
      <CardTitle infoTitle={<ColumnAInfo />}>A</CardTitle>
    </Card>
  );
}
