'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Form schema
const formSchema = z.object({
  name_0959673449: z.string(),
  name_5556976475: z.string(),
  name_6017987702: z.coerce.date(),
  name_2744768263: z.coerce.date(),
  name_4189644335: z.coerce.date(),
  name_3573919455: z.string(),
  name_8377079705: z.string(),
  name_0334706812: z.string(),
});

// Select fields config
const selectFields = [
  { name: 'name_0959673449', label: 'Email' },
  { name: 'name_5556976475', label: 'Email' },
  { name: 'name_3573919455', label: 'Email' },
  { name: 'name_8377079705', label: 'Email' },
  { name: 'name_0334706812', label: 'Email' },
];

export default function Undertaking() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_6017987702: new Date(),
      name_2744768263: new Date(),
      name_4189644335: new Date(),
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-lg bg-content p-4 shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
            {/* Date Inputs */}
            <Field>
              <FieldLabel>Date of Birth</FieldLabel>
              <Input type="date" {...form.register('name_6017987702')} />
              <FieldError>{form.formState.errors.name_6017987702?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Date of Birth</FieldLabel>
              <Input type="date" {...form.register('name_2744768263')} />
              <FieldError>{form.formState.errors.name_2744768263?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel>Date of Birth</FieldLabel>
              <Input type="date" {...form.register('name_4189644335')} />
              <FieldError>{form.formState.errors.name_4189644335?.message}</FieldError>
            </Field>

            {/* Select Fields */}
            {selectFields.map(field => (
              <Field key={field.name}>
                <FieldLabel>{field.label}</FieldLabel>
                <Select {...form.register(field.name)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError>{form.formState.errors[field.name]?.message}</FieldError>
              </Field>
            ))}
          </div>
        </form>
      </Form>
    </div>
  );
}
