import { Card, CardTitle } from '@/components/ui/card';
import { Column23Info } from '@/features/auto-transport-declaration/components/column-informations';

export function Column23() {
  return (
    <Card className="col-start-7 row-start-9">
      <CardTitle infoTitle={<Column23Info />}>23.Курс валюты</CardTitle>
    </Card>
  );
}
