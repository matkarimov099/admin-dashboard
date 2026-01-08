import { CirclePlusIcon } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
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
import { Column2Info } from '@/features/auto-transport-declaration/components/column-informations';
import type { AutoTransportDeclarationSchema } from '@/features/auto-transport-declaration/schema/declaration.schema.ts';

interface Column2Props {
  form: UseFormReturn<AutoTransportDeclarationSchema>;
  onSubmit: (data: any) => void;
}

export function Column2({ form, onSubmit }: Column2Props) {
  return (
    <Card className="col-span-4 row-span-3">
      <CardTitle
        infoTitle={<Column2Info />}
        rightSection={
          <div className="flex items-center gap-2">
            <Button hoverText="Eksportchilar katalogi" size="icon" variant="ghost">
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
      <CardContent>
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
                  <FormLabel required>Yuk jo'natuvchining nomi</FormLabel>
                  <FormControl>
                    <Input
                      inputSize="md"
                      placeholder="Yuk jo'natuvchining nomini kiriting"
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
                  <FormLabel required>Manzil</FormLabel>
                  <FormControl>
                    <Input inputSize="md" placeholder="Manzilni ko'rsating" {...field} />
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
                  <FormLabel>Qo'shimcha ma'lumot</FormLabel>
                  <FormControl>
                    <Input inputSize="md" placeholder="Qo'shimcha ma'lumot ko'rsating" {...field} />
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
                  <FormLabel>Eksportchi nomi</FormLabel>
                  <FormControl>
                    <Input
                      inputSize="md"
                      placeholder="Eksportchining nomini ko'rsatish"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-x-2">
              <FormField
                control={form.control}
                name="exporter.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Mamlakat</FormLabel>
                    <FormControl>
                      <Input inputSize="md" placeholder="Mamlakat kodini kiriting" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                hoverText="Mamlakat tanlash"
                type="button"
                size="icon"
                variant="ghost"
                className="mt-5"
              >
                <CirclePlusIcon strokeWidth={2.2} className="text-(--color-primary)" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
