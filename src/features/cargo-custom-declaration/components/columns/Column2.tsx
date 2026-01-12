import { CirclePlusIcon } from 'lucide-react';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import CountrySelect from '@/components/form-inputs/country-select.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Column2Info } from '@/features/cargo-custom-declaration/components/column-informations';
import { ExporterCatalogModal } from '@/features/cargo-custom-declaration/components/modals/exporter-catalog';
import type { Exporter } from '@/features/cargo-custom-declaration/types';
import type { AutoTransportDeclarationSchema } from '@/features/cargo-custom-declaration/schema/declaration.schema.ts';
import { useDisclosure } from '@/hooks/use-disclosure';
import { useTranslations } from '@/hooks/use-translations';

interface Column2Props {
  form: UseFormReturn<AutoTransportDeclarationSchema>;
  onSubmit: (data: any) => void;
}

export function Column2({ form, onSubmit }: Column2Props) {
  const { currentLanguage } = useTranslations();
  const {
    isOpen: exporterCatalogOpen,
    onOpen: openExporterCatalog,
    onOpenChange: setExporterCatalogOpen,
  } = useDisclosure();

  // Sample exporters data - in a real app, this would come from an API or state management
  const [exporters, setExporters] = useState<Exporter[]>([
    {
      id: 'exp-1',
      nameAndAddress: 'ООО "Экспорт Компания"\nг. Москва, ул. Примерная, д. 123',
      country: 'RU',
    },
    {
      id: 'exp-2',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-3',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-4',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-5',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-6',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-7',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-8',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-9',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-10',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-11',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-12',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-13',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-13',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-14',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-15',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-16',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-17',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-18',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-19',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-20',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-21',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-22',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-23',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-24',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-25',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-26',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-27',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-28',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-29',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
    {
      id: 'exp-29',
      nameAndAddress: 'ABC Export Ltd\n123 Business Street, London, UK',
      country: 'GB',
    },
    {
      id: 'exp-30',
      nameAndAddress: '中国进出口公司\n北京市朝阳区建国路88号',
      country: 'CN',
    },
  ]);

  const handleSelectExporter = (exporter: Exporter) => {
    // Populate the "anotherExporter" field when selecting from the catalog
    form.setValue('exporter.anotherExporter', exporter.nameAndAddress);
  };

  return (
    <Card className="col-span-4 row-span-3 gap-y-3">
      <CardTitle
        infoTitle={<Column2Info />}
        rightSection={
          <div className="flex items-center gap-2">
            <Button
              hoverText="Eksportchilar katalogi"
              size="icon"
              variant="ghost"
              onClick={openExporterCatalog}
            >
              <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
            </Button>
            <Button hoverText="Yuklarni jo'natuvchi qo'llanma" size="icon" variant="ghost">
              <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
            </Button>
          </div>
        }
      >
        2.Отправитель/экспортер
      </CardTitle>
      <CardContent className="px-0 py-2">
        <Form {...form}>
          <form
            onSubmit={e => {
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-3"
          >
            <FormField
              control={form.control}
              name="exporter.name"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="flex-1">
                    <Input
                      inputSize="md"
                      placeholder="Yuk jo'natuvchining nomini kiriting"
                      infoText="Yuk jo'natuvchining to'liq nomi"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exporter.address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputSize="md"
                      placeholder="Manzilni ko'rsating"
                      infoText="Yuk jo'natuvchining manzili"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exporter.moreInformation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputSize="md"
                      placeholder="Qo'shimcha ma'lumot ko'rsating"
                      infoText="Qo'shimcha ma'lumot"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="exporter.anotherExporter"
              render={({ field }) => (
                <FormItem>
                  <FormControl className="flex-1">
                    <Input
                      infoText="Exportchi nomini ko'rsatish (agar eksportchi va jo'natuvchi boshqa shaxs bo'lsa)"
                      inputSize="md"
                      placeholder="Eksportchining nomini ko'rsatish"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <FormField
                control={form.control}
                name="exporter.country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CountrySelect
                        locale={currentLanguage}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Mamlakatni tanlang..."
                        showFlags={true}
                        allowClear
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>

      {/* Exporter Catalog Modal */}
      <ExporterCatalogModal
        open={exporterCatalogOpen}
        onOpenChange={setExporterCatalogOpen}
        exporters={exporters}
        onExportersChange={setExporters}
        onSelectExporter={handleSelectExporter}
      />
    </Card>
  );
}
