import { zodResolver } from '@hookform/resolvers/zod';
import { FolderIcon } from 'lucide-react';
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
  type TIFLegalEntitySchema,
  tifLegalEntitySchema,
} from '@/features/cargo-custom-declaration/schema/tif-legal-entity.schema';
import type { TIFLegalEntity } from '@/features/cargo-custom-declaration/types';

export interface AddLegalEntityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: TIFLegalEntity | null;
  onSave: (data: z.infer<typeof tifLegalEntitySchema>) => void;
  isPending?: boolean;
}

export function AddLegalEntityModal({
  open,
  onOpenChange,
  item,
  onSave,
  isPending = false,
}: AddLegalEntityModalProps) {
  const form = useForm<TIFLegalEntitySchema>({
    resolver: zodResolver(tifLegalEntitySchema),
    defaultValues: {
      stir: item?.stir || '',
      ktut: item?.ktut || '',
      district: item?.district || '',
      districtCode: item?.districtCode || '',
      name: item?.name || '',
      address: item?.address || '',
      additionalInfo: item?.additionalInfo || '',
      director: item?.director || '',
      oked: item?.oked || '',
      ndsCode: item?.ndsCode || '',
      phone: item?.phone || '',
      regNo: item?.regNo || '',
      registrationDate: item?.registrationDate || '',
      settlementAccount: item?.settlementAccount || '',
      settlementBankMfo: item?.settlementBankMfo || '',
      currencyAccount: item?.currencyAccount || '',
      currencyBankMfo: item?.currencyBankMfo || '',
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        stir: item.stir,
        ktut: item.ktut || '',
        district: item.district || '',
        districtCode: item.districtCode || '',
        name: item.name,
        address: item.address,
        additionalInfo: item.additionalInfo || '',
        director: item.director || '',
        oked: item.oked || '',
        ndsCode: item.ndsCode || '',
        phone: item.phone,
        regNo: item.regNo || '',
        registrationDate: item.registrationDate || '',
        settlementAccount: item.settlementAccount || '',
        settlementBankMfo: item.settlementBankMfo || '',
        currencyAccount: item.currencyAccount || '',
        currencyBankMfo: item.currencyBankMfo || '',
      });
    } else {
      form.reset({
        stir: '',
        ktut: '',
        district: '',
        districtCode: '',
        name: '',
        address: '',
        additionalInfo: '',
        director: '',
        oked: '',
        ndsCode: '',
        phone: '',
        regNo: '',
        registrationDate: '',
        settlementAccount: '',
        settlementBankMfo: '',
        currencyAccount: '',
        currencyBankMfo: '',
      });
    }
  }, [item, form]);

  const onSubmit = (data: TIFLegalEntitySchema) => {
    onSave(data);
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="sm:max-w-xl">
        <ModalHeader>
          <ModalTitle>
            {item ? 'Edit Legal Entity' : 'Add New Legal Entity'}
          </ModalTitle>
        </ModalHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <ModalBody className="max-h-[60vh] space-y-3 overflow-y-auto">
              <FormField
                control={form.control}
                name="stir"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>STIR:*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter STIR number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District:</FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        <Input placeholder="Enter district code" {...field} />
                      </FormControl>
                      <Button type="button" variant="ghost" size="icon">
                        <FolderIcon className="h-4 w-4 text-amber-500" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name:*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter organization name"
                        className="min-h-20 resize-y"
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
                    <FormLabel>Address:*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter address"
                        className="min-h-20 resize-y"
                        {...field}
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
                    <FormLabel>Additional Info:</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter additional information"
                        className="min-h-16 resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="director"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Director:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter director name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="oked"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OKED:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter OKED code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ndsCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>VAT Code:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter VAT code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone:*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reg. No.:</FormLabel>
                    <FormControl>
                      <Input placeholder="Registration number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="registrationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Date:</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="settlementAccount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Settlement Account:</FormLabel>
                      <FormControl>
                        <Input placeholder="Account number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="settlementBankMfo"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel>Bank MFO:</FormLabel>
                      <div className="flex items-center gap-1">
                        <FormControl>
                          <Input placeholder="MFO" {...field} className="w-24" />
                        </FormControl>
                        <Button type="button" variant="ghost" size="icon">
                          <FolderIcon className="h-4 w-4 text-amber-500" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name="currencyAccount"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Currency Account:</FormLabel>
                      <FormControl>
                        <Input placeholder="Currency account number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currencyBankMfo"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormLabel>Bank MFO:</FormLabel>
                      <div className="flex items-center gap-1">
                        <FormControl>
                          <Input placeholder="MFO" {...field} className="w-24" />
                        </FormControl>
                        <Button type="button" variant="ghost" size="icon">
                          <FolderIcon className="h-4 w-4 text-amber-500" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
