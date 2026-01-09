import { CirclePlusIcon } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import CountrySelect from '@/components/custom/country-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Column2Info } from '@/features/auto-transport-declaration/components/column-informations';
import type { AutoTransportDeclarationSchema } from '@/features/auto-transport-declaration/schema/declaration.schema.ts';
import { useTranslations } from '@/hooks/use-translations';

interface Column2Props {
  form: UseFormReturn<AutoTransportDeclarationSchema>;
  onSubmit: (data: any) => void;
}

export function Column2({ form, onSubmit }: Column2Props) {
  const { currentLanguage } = useTranslations();

  return (
    <Card className="col-span-4 row-span-3 gap-y-3">
      <CardTitle infoTitle={<Column2Info />}>2.Отправитель/экспортер</CardTitle>
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
                  <div className="flex w-full items-center gap-2">
                    <FormControl className="flex-1">
                      <Input
                        inputSize="md"
                        placeholder="Yuk jo'natuvchining nomini kiriting"
                        infoText="Yuk jo'natuvchining to'liq nomi"
                        {...field}
                      />
                    </FormControl>
                    <Button hoverText="Yuklarni jo'natuvchi qo'llanma" size="icon" variant="ghost">
                      <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
                    </Button>
                  </div>
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
              name="exporter.name"
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
              name="exporter.name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex w-full items-center gap-2">
                    <FormControl className="flex-1">
                      <Input
                        infoText="Exportchi nomi"
                        inputSize="md"
                        placeholder="Eksportchining nomini ko'rsatish"
                        {...field}
                      />
                    </FormControl>
                    <Button hoverText="Eksportchilar katalogi" size="icon" variant="ghost">
                      <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
                    </Button>
                  </div>
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
    </Card>
  );
}
