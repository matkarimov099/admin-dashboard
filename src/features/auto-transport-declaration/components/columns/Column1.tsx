import { CirclePlusIcon } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import CommandPopover from '@/components/custom/command-popover.tsx';
import DeclarationTypesPopover from '@/components/custom/declaration-types-popover.tsx';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { declarationTypes } from '@/data/declaration-types.ts';
import { Column1Info } from '@/features/auto-transport-declaration/components/column-informations';
import type { AutoTransportDeclarationSchema } from '@/features/auto-transport-declaration/schema/declaration.schema.ts';

interface Column1Props {
  form: UseFormReturn<AutoTransportDeclarationSchema>;
  onSubmit: (data: any) => void;
}

export function Column1({ form, onSubmit }: Column1Props) {
  return (
    <Card className="col-span-2 col-start-5 gap-y-3">
      <CardTitle
        infoTitle={<Column1Info />}
        rightSection={
          <DeclarationTypesPopover
            showNpa={true}
            trigger={
              <Button size="icon" variant="ghost">
                <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
              </Button>
            }
            data={declarationTypes}
          />
        }
      >
        1.Тип декларации
      </CardTitle>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={e => {
              form.handleSubmit(onSubmit)(e);
            }}
            className="flex items-center gap-2"
          >
            <FormField
              control={form.control}
              name="exporter.name"
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
              name="exporter.address"
              render={({ field }) => (
                <FormItem>
                  {/*<FormLabel required>BYuD rejimi kodi</FormLabel>*/}
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
