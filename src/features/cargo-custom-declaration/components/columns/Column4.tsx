import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Column4Info } from '@/features/cargo-custom-declaration/components/column-informations';

export function Column4() {
  return (
    <Card className="col-start-6 row-start-2 gap-y-3">
      <CardTitle infoTitle={<Column4Info />}>4.Отгр. спец.</CardTitle>
      <CardContent className="p-0">some</CardContent>
    </Card>
  );
}
