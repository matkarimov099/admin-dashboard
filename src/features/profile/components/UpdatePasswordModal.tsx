import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/custom/modal';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { useUpdatePassword } from '@/features/users/hooks/use-users';
import {
  type UpdatePasswordSchema,
  updatePasswordSchema,
} from '@/features/users/schema/users.schema';
import type { ServerError } from '@/types/common';

interface UpdatePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdatePasswordModal({ open, onOpenChange }: UpdatePasswordModalProps) {
  const { mutate: updatePassword, isPending } = useUpdatePassword();

  const form = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema()),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: UpdatePasswordSchema) => {
    updatePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: response => {
          toast.success(response.message || 'Password updated successfully!');
          form.reset();
          onOpenChange(false);
        },
        onError: error => {
          if (isAxiosError<ServerError>(error)) {
            toast.error(error.response?.data?.message || 'Failed to update password');
          } else {
            toast.error('An unexpected error occurred');
          }
        },
      }
    );
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Update Password</ModalTitle>
          <ModalDescription>
            Please enter your current password and choose a new one.
          </ModalDescription>
        </ModalHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <ModalBody>
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        inputSize="lg"
                        placeholder="Enter your current password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        inputSize="lg"
                        placeholder="Enter your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        inputSize="lg"
                        placeholder="Confirm your new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ModalBody>

            <ModalFooter className="gap-2">
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                variant="success"
                loading={isPending}
                loadingText="Updating..."
              >
                Update Password
              </Button>
            </ModalFooter>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
}
