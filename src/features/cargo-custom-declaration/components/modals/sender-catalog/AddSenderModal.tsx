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
import { Input } from '@/components/ui/input.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import {
  type SenderSchema,
  senderSchema,
} from '@/features/cargo-custom-declaration/schema/sender.schema';
import { useTranslations } from '@/hooks/use-translations';
import type { Sender } from '@/features/cargo-custom-declaration/types';

export interface AddSenderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sender?: Sender | null;
  onSave: (data: z.infer<typeof senderSchema>) => void;
  isPending?: boolean;
}

export function AddSenderModal({
  open,
  onOpenChange,
  sender,
  onSave,
  isPending = false,
}: AddSenderModalProps) {
  const { currentLanguage } = useTranslations();

  const form = useForm<SenderSchema>({
    resolver: zodResolver(senderSchema),
    defaultValues: {
      name: sender?.name || '',
      address: sender?.address || '',
      country: sender?.country || '',
      additionalInfo: sender?.additionalInfo || '',
    },
  });

  // Reset form when sender changes
  useEffect(() => {
    if (sender) {
      form.reset({
        name: sender.name,
        address: sender.address,
        country: sender.country,
        additionalInfo: sender.additionalInfo || '',
      });
    } else {
      form.reset({
        name: '',
        address: '',
        country: '',
        additionalInfo: '',
      });
    }
  }, [sender, form]);

  const onSubmit = (data: SenderSchema) => {
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
            {sender ? "Jo'natuvchini tahrirlash" : "Yangi jo'natuvchi qo'shish"}
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ism*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jo'natuvchi ismini kiriting"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manzil*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Manzilni kiriting"
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

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qo'shimcha ma'lumot</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Qo'shimcha ma'lumotni kiriting"
                        className="min-h-20 resize-y"
                        {...field}
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
