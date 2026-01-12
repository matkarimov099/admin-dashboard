import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
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
} from '@/components/common/modal.tsx';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { useUpdateUser } from '@/features/users/hooks/use-users';
import { type UserUpdateSchema, userUpdateSchema } from '@/features/users/schema/users.schema.ts';
import type { User } from '@/features/users/types';
import { PositionOptions, RoleOptions } from '@/types/common.ts';

interface UpdateUserProps {
  user: User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateUser({ user, open, onOpenChange }: UpdateUserProps) {
  const { mutate: updateUser, isPending } = useUpdateUser();

  const form = useForm<UserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema()),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      role: undefined,
      position: undefined,
    },
  });

  // Populate a form with user data when user changes or modal opens
  useEffect(() => {
    if (user && open) {
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        role: user.role,
        position: user.position,
      });
    }
  }, [user, open, form]);

  function onSubmit(data: UserUpdateSchema) {
    updateUser(
      { id: user.id, data },
      {
        onSuccess: response => {
          toast.success(response?.message || 'User updated successfully');
          onOpenChange(false);
        },
        onError: error => {
          toast.error(error.message || 'Failed to update user');
        },
      }
    );
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Update User</ModalTitle>
          <ModalDescription>
            Update user information. Modify the fields below and save changes.
          </ModalDescription>
        </ModalHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <ModalBody>
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>First Name</FormLabel>
                      <FormControl>
                        <Input inputSize="lg" placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Last Name</FormLabel>
                      <FormControl>
                        <Input inputSize="lg" placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Fields Row */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          inputSize="lg"
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Username</FormLabel>
                      <FormControl>
                        <Input inputSize="lg" placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Role & Position Fields Row */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Role</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger size="lg" className="w-full">
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {RoleOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value || undefined}>
                        <FormControl>
                          <SelectTrigger size="lg" className="w-full">
                            <SelectValue placeholder="Select a position" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PositionOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                type="button"
                size="lg"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" variant="primary" disabled={isPending}>
                {isPending ? 'Updating...' : 'Update User'}
              </Button>
            </ModalFooter>
          </form>
        </Form>
      </ModalContent>
    </Modal>
  );
}

// Default export for lazy loading
export default UpdateUser;
