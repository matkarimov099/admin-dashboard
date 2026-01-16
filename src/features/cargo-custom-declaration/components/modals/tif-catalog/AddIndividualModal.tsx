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
  type TIFIndividualSchema,
  tifIndividualSchema,
} from '@/features/cargo-custom-declaration/schema/tif-individual.schema';
import type { TIFIndividual } from '@/features/cargo-custom-declaration/types';

export interface AddIndividualModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: TIFIndividual | null;
  onSave: (data: z.infer<typeof tifIndividualSchema>) => void;
  isPending?: boolean;
}

export function AddIndividualModal({
  open,
  onOpenChange,
  item,
  onSave,
  isPending = false,
}: AddIndividualModalProps) {
  const form = useForm<TIFIndividualSchema>({
    resolver: zodResolver(tifIndividualSchema),
    defaultValues: {
      pinfl: item?.pinfl || '',
      district: item?.district || '',
      districtCode: item?.districtCode || '',
      patentNumber: item?.patentNumber || '',
      fullName: item?.fullName || '',
      address: item?.address || '',
      additionalInfo: item?.additionalInfo || '',
      phone: item?.phone || '',
      passportNumber: item?.passportNumber || '',
      issueDate: item?.issueDate || '',
      issuedBy: item?.issuedBy || '',
      settlementAccount: item?.settlementAccount || '',
      settlementBankMfo: item?.settlementBankMfo || '',
      currencyAccount: item?.currencyAccount || '',
      currencyBankMfo: item?.currencyBankMfo || '',
    },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        pinfl: item.pinfl,
        district: item.district || '',
        districtCode: item.districtCode || '',
        patentNumber: item.patentNumber || '',
        fullName: item.fullName,
        address: item.address,
        additionalInfo: item.additionalInfo || '',
        phone: item.phone,
        passportNumber: item.passportNumber,
        issueDate: item.issueDate,
        issuedBy: item.issuedBy,
        settlementAccount: item.settlementAccount || '',
        settlementBankMfo: item.settlementBankMfo || '',
        currencyAccount: item.currencyAccount || '',
        currencyBankMfo: item.currencyBankMfo || '',
      });
    } else {
      form.reset({
        pinfl: '',
        district: '',
        districtCode: '',
        patentNumber: '',
        fullName: '',
        address: '',
        additionalInfo: '',
        phone: '',
        passportNumber: '',
        issueDate: '',
        issuedBy: '',
        settlementAccount: '',
        settlementBankMfo: '',
        currencyAccount: '',
        currencyBankMfo: '',
      });
    }
  }, [item, form]);

  const onSubmit = (data: TIFIndividualSchema) => {
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
            {item ? 'Edit Individual' : 'Add New Individual'}
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
                name="pinfl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PINFL:*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter PINFL number" {...field} />
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
                name="patentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Patent Number:</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter patent number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name:*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter full name"
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
                name="passportNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passport Number:*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter passport number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue Date:*</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issuedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issued By:*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter issuing authority" {...field} />
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
