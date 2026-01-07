import { CirclePlusIcon, TruckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import {
  Column1Info,
  Column2Info,
  Column3Info,
  Column4Info,
  Column5Info,
  Column6Info,
  Column7Info,
  Column8Info,
  Column9Info,
  Column10Info,
  Column11Info,
  Column12Info,
  Column13Info,
  Column14Info,
  Column15AInfo,
  Column15Info,
  Column16Info,
  Column17AInfo,
  Column17Info,
  Column18Info,
  Column19Info,
  Column20Info,
  Column21Info,
  Column22Info,
  Column23Info,
  Column24Info,
  Column25Info,
  Column26Info,
  Column27Info,
  Column28Info,
  Column29Info,
  Column30Info,
  ColumnAInfo,
} from '@/features/auto-transport-declaration/components/column-informations';
import { useTranslations } from '@/hooks/use-translations';

export function AutoTransportForm() {
  const { t } = useTranslations();

  return (
    <div className="p-1 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TruckIcon className="size-6 text-(--color-primary)" />
          <h1 className="font-bold text-md uppercase">
            {t('declarationForm.title')}: <span className="font-normal">EK20260000879</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-8 grid-rows-12 gap-1">
        <Card className="col-span-4 row-span-3">
          <CardTitle
            infoTitle={<Column2Info />}
            rightSection={
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
                </Button>
                <Button size="icon" variant="ghost">
                  <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
                </Button>
              </div>
            }
          >
            2.Отправитель/экспортер
          </CardTitle>
        </Card>
        <Card className="col-span-2 col-start-5">
          <CardTitle
            infoTitle={<Column1Info />}
            rightSection={
              <Button size="icon" variant="ghost">
                <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
              </Button>
            }
          >
            1.Тип декларации
          </CardTitle>
        </Card>
        <Card className="col-start-5 row-start-2">
          <CardTitle infoTitle={<Column3Info />}>3.Доб. лист</CardTitle>
        </Card>
        <Card className="col-start-6 row-start-2">
          <CardTitle infoTitle={<Column4Info />}>4.Отгр. спец.</CardTitle>
        </Card>
        <Card className="col-start-5 row-start-3">
          <CardTitle infoTitle={<Column5Info />}>5.Всего наи. т-ов</CardTitle>
        </Card>
        <Card className="col-start-6 row-start-3">
          <CardTitle infoTitle={<Column6Info />}>6.Кол-во мест</CardTitle>
        </Card>
        <Card className="col-span-2 col-start-7 row-span-2 row-start-1">
          <CardTitle infoTitle={<ColumnAInfo />}>A</CardTitle>
        </Card>
        <Card className="col-span-2 col-start-7 row-start-3">
          <CardTitle infoTitle={<Column7Info />}>7.Справочный номер</CardTitle>
        </Card>
        <Card className="col-span-4 row-span-2 row-start-4">
          <CardTitle infoTitle={<Column8Info />}>8.Получатель/импортер</CardTitle>
        </Card>
        <Card className="col-span-4 col-start-5 row-start-4">
          <CardTitle infoTitle={<Column9Info />}>
            9.Лицо, ответственное за финансовое урегулирование
          </CardTitle>
        </Card>
        <Card className="col-start-5 row-start-5">
          <CardTitle infoTitle={<Column10Info />}>10.Страна 1-го назнач</CardTitle>
        </Card>
        <Card className="col-start-6 row-start-5">
          <CardTitle infoTitle={<Column11Info />}>11.Торг. страна</CardTitle>
        </Card>
        <Card className="col-start-7 row-start-5">
          <CardTitle infoTitle={<Column12Info />}>12</CardTitle>
        </Card>
        <Card className="col-start-8 row-start-5">
          <CardTitle infoTitle={<Column13Info />}>13</CardTitle>
        </Card>
        <Card className="col-span-4 row-span-2 row-start-6">
          <CardTitle infoTitle={<Column14Info />}>14.Декларант/представитель</CardTitle>
        </Card>
        <Card className="col-span-2 col-start-5 row-start-6">
          <CardTitle infoTitle={<Column15Info />}>15.Страна отправления</CardTitle>
        </Card>
        <Card className="col-start-7 row-start-6">
          <CardTitle infoTitle={<Column15AInfo />}>15a.Код страны отпр.</CardTitle>
        </Card>
        <Card className="col-start-8 row-start-6">
          <CardTitle infoTitle={<Column17AInfo />}>17a.Код страны назнач</CardTitle>
        </Card>
        <Card className="col-span-2 col-start-5 row-start-7">
          <CardTitle infoTitle={<Column16Info />}>16.Страна происхождения</CardTitle>
        </Card>
        <Card className="col-span-2 col-start-7 row-start-7">
          <CardTitle infoTitle={<Column17Info />}>17.Страна назначения</CardTitle>
        </Card>
        <Card className="col-span-3 row-start-8">
          <CardTitle infoTitle={<Column18Info />}>
            18.Транспортное средство при отправлении
          </CardTitle>
        </Card>
        <Card className="col-start-4 row-start-8">
          <CardTitle infoTitle={<Column19Info />}>19.Конт</CardTitle>
        </Card>
        <Card className="col-span-4 col-start-5 row-start-8">
          <CardTitle infoTitle={<Column20Info />}>20.Условия поставки</CardTitle>
        </Card>
        <Card className="col-span-4 row-start-9">
          <CardTitle infoTitle={<Column21Info />}>21.Транспортное средство на границе</CardTitle>
        </Card>
        <Card className="col-span-2 col-start-5 row-start-9">
          <CardTitle infoTitle={<Column22Info />}>22.Валюта и общ. факт. стоим. товаров</CardTitle>
        </Card>
        <Card className="col-start-7 row-start-9">
          <CardTitle infoTitle={<Column23Info />}>23.Курс валюты</CardTitle>
        </Card>
        <Card className="col-start-8 row-start-9">
          <CardTitle infoTitle={<Column24Info />}>24.Характер сделки</CardTitle>
        </Card>
        <Card className="row-start-10">
          <CardTitle infoTitle={<Column25Info />}>25.Вид транспорта на границе</CardTitle>
        </Card>
        <Card className="col-start-2 row-start-10">
          <CardTitle infoTitle={<Column26Info />}>26.Вид транспорта внутри страны</CardTitle>
        </Card>
        <Card className="col-span-2 col-start-3 row-start-10">
          <CardTitle infoTitle={<Column27Info />}>27.Место погрузки / разгрузки</CardTitle>
        </Card>
        <Card className="col-span-2 col-start-1 row-start-11">
          <CardTitle infoTitle={<Column29Info />}>29.Таможня на границе</CardTitle>
        </Card>
        <Card className="col-span-2 col-start-3 row-start-11">
          <CardTitle infoTitle={<Column30Info />}>30.Место досмотра товара</CardTitle>
        </Card>
        <Card className="col-span-4 col-start-5 row-span-2 row-start-10">
          <CardTitle infoTitle={<Column28Info />}>28.Финансовые и банковские сведения</CardTitle>
        </Card>
      </div>
    </div>
  );
}
