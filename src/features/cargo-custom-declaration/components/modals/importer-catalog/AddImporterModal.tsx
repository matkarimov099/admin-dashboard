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
  type ImporterSchema,
  importerSchema,
} from '@/features/cargo-custom-declaration/schema/importer.schema';
import type { Importer } from '@/features/cargo-custom-declaration/types';

export interface AddImporterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: Importer | null;
  onSave: (data: z.infer<typeof importerSchema>) => void;
  isPending?: boolean;
}

export function AddImporterModal({
  open,
  onOpenChange,
  item,
  onSave,
  isPending = false,
}: AddImporterModalProps) {
  const form = useForm<ImporterSchema>({
    resolver: zodResolver(importerSchema),
    defaultValues: {
      ktut: item?.ktut || '',
      stir: item?.stir || '',
      nameAndAddress: item?.nameAndAddress || '',
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        ktut: item.ktut || '',
        stir: item.stir || '',
        nameAndAddress: item.nameAndAddress,
      });
    } else {
      form.reset({
        ktut: '',
        stir: '',
        nameAndAddress: '',
      });
    }
  }, [item, form]);

  const onSubmit = (data: ImporterSchema) => {
    onSave(data);
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="sm:max-w-md">
        <ModalHeader>
          <ModalTitle>
            {item ? 'Edit Importer' : 'Add New Importer'}
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
                name="ktut"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KTUT:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter KTUT number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>STIR:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter STIR number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nameAndAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name and Address:*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter name and address"
                        className="min-h-24 resize-y"
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
                Cancel
              </Button>
              <Button type="submit" variant="success" loading={isPending} loadingText="Saving...">
                Save
              </Button>
            </ModalFooter>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
}
