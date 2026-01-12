import { Card, CardTitle } from '@/components/ui/card';
import { Column17AInfo } from '@/features/cargo-custom-declaration/components/column-informations';

export function Column17A() {
  return (
    <Card className="col-start-8 row-start-6">
      <CardTitle infoTitle={<Column17AInfo />}>17a.Код страны назнач</CardTitle>
    </Card>
  );
}
