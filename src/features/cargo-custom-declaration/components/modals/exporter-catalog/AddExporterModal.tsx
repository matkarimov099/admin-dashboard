import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/common/modal.tsx';
import CountrySelect from '@/components/form-inputs/country-select.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import {
  type ExporterSchema,
  exporterSchema,
} from '@/features/cargo-custom-declaration/schema/exporter.schema';
import { useTranslations } from '@/hooks/use-translations';
import type { Exporter } from '@/features/cargo-custom-declaration/types';

export interface AddExporterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exporter?: Exporter | null;
  onSave: (data: z.infer<typeof exporterSchema>) => void;
  isPending?: boolean;
}

export function AddExporterModal({
  open,
  onOpenChange,
  exporter,
  onSave,
  isPending = false,
}: AddExporterModalProps) {
  const { currentLanguage } = useTranslations();

  const form = useForm<ExporterSchema>({
    resolver: zodResolver(exporterSchema),
    defaultValues: {
      nameAndAddress: exporter?.nameAndAddress || '',
      country: exporter?.country || '',
    },
  });

  // Reset form when exporter changes
  useEffect(() => {
    if (exporter) {
      form.reset({
        nameAndAddress: exporter.nameAndAddress,
        country: exporter.country,
      });
    } else {
      form.reset({
        nameAndAddress: '',
        country: '',
      });
    }
  }, [exporter, form]);

  const onSubmit = (data: ExporterSchema) => {
    onSave(data);
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="sm:min-w-xl">
        <ModalHeader>
          <ModalTitle>
            {exporter ? 'Eksportchini tahrirlash' : "Yangi eksportchi qo'shish"}
          </ModalTitle>
        </ModalHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <ModalBody className="space-y-4">
              <FormField
                control={form.control}
                name="nameAndAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomi va manzil</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Eksportchining nomi va manzilini kiriting"
                        className="min-h-24 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Davlat</FormLabel>
                    <FormControl>
                      <CountrySelect
                        locale={currentLanguage}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Davlatni tanlang..."
                        showFlags={true}
                        allowClear
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ModalBody>

            <ModalFooter className="gap-2">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isPending}>
                Bekor qilish
              </Button>
              <Button type="submit" variant="success" loading={isPending} loadingText="Saqlash...">
                Saqlash
              </Button>
            </ModalFooter>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
}
