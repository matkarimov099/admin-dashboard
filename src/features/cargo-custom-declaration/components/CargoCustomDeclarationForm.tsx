import { zodResolver } from '@hookform/resolvers/zod';
import { TruckIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import {
  Column1,
  Column2,
  Column3,
  Column4,
  Column5,
  Column6,
  Column7,
  Column8,
  Column9,
  Column10,
  Column11,
  Column12,
  Column13,
  Column14,
  Column15,
  Column15A,
  Column16,
  Column17,
  Column17A,
  Column18,
  Column19,
  Column20,
  Column21,
  Column22,
  Column23,
  Column24,
  Column25,
  Column26,
  Column27,
  Column28,
  Column29,
  Column30,
  ColumnA,
} from '@/features/cargo-custom-declaration/components/columns';
import {
  type CargoCustomDeclarationSchema,
  cargoCustomDeclarationSchema,
} from '@/features/cargo-custom-declaration/schema/declaration.schema.ts';
import type { TaskCreate } from '@/features/tasks/types.ts';
import { useTranslations } from '@/hooks/use-translations';

export function CargoCustomDeclarationForm() {
  const { t } = useTranslations();

  const form = useForm<CargoCustomDeclarationSchema>({
    resolver: zodResolver(cargoCustomDeclarationSchema),
  });

  function onSubmit(data: TaskCreate) {
    console.log(data);
  }
  return (
    <div className="container mx-auto p-1 md:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TruckIcon className="size-6 text-(--color-primary)" />
          <h1 className="font-bold text-md uppercase">
            {t('declarationForm.title')}: <span className="font-normal">EK20260000879</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-8 grid-rows-12 gap-0.5">
        {/*Column 2*/}
        <Column2 form={form} onSubmit={onSubmit} />
        {/*Column 1*/}
        <Column1 form={form} onSubmit={onSubmit} />
        <Column3 />
        <Column4 />
        <Column5 />
        <Column6 />
        <ColumnA />
        <Column7 />
        <Column8 />
        <Column9 />
        <Column10 />
        <Column11 />
        <Column12 />
        <Column13 />
        <Column14 />
        <Column15 />
        <Column15A />
        <Column17A />
        <Column16 />
        <Column17 />
        <Column18 />
        <Column19 />
        <Column20 />
        <Column21 />
        <Column22 />
        <Column23 />
        <Column24 />
        <Column25 />
        <Column26 />
        <Column27 />
        <Column28 />
        <Column29 />
        <Column30 />
      </div>
    </div>
  );
}
