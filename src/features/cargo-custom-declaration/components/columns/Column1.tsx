import { CirclePlusIcon } from 'lucide-react';
import { useCallback } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import DeclarationTypesPopover from '@/components/form-inputs/declaration-types-popover.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { declarationTypes } from '@/data/declaration-types.ts';
import { Column1Info } from '@/features/cargo-custom-declaration/components/column-informations';
import type { AutoTransportDeclarationSchema } from '@/features/cargo-custom-declaration/schema/declaration.schema.ts';

interface Column1Props {
  form: UseFormReturn<AutoTransportDeclarationSchema>;
  onSubmit: (data: any) => void;
}

export function Column1({ form, onSubmit }: Column1Props) {
  // Handle declaration type selection from popover
  const handleDeclarationTypeChange = useCallback(
    (code: string) => {
      const selectedType = declarationTypes.find(item => item.code === code);
      if (selectedType) {
        // Populate both type and code fields
        form.setValue('declarationType.type', selectedType.type);
        form.setValue('declarationType.code', selectedType.code);
      }
    },
    [form]
  );

  return (
    <Card className="col-span-2 col-start-5 gap-y-3">
      <CardTitle
        infoTitle={<Column1Info />}
        rightSection={
          <DeclarationTypesPopover
            showNpa={true}
            onChange={handleDeclarationTypeChange}
            trigger={
              <Button size="icon" variant="ghost" hoverText="Deklaratsiya turini tanlang">
                <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
              </Button>
            }
            data={declarationTypes}
          />
        }
      >
        1.Тип декларации
      </CardTitle>
      <CardContent className="px-0 py-2">
        <Form {...form}>
          <form
            onSubmit={e => {
              form.handleSubmit(onSubmit)(e);
            }}
            className="flex items-center gap-2"
          >
            <FormField
              control={form.control}
              name="declarationType.type"
              render={({ field }) => (
                <FormItem>
                  {/*<FormLabel required>BYuD rejimi turi</FormLabel>*/}
                  <FormControl>
                    <Input inputSize="md" placeholder="Masalan: IM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="declarationType.code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input inputSize="md" placeholder="Masalan: 40" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
