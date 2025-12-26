"use client"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {toast} from "sonner"
import {Form} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError
} from "@/components/ui/field"

const formSchema = z.object({
    name_0959673449: z.string(),
    name_5556976475: z.string(),
    name_6017987702: z.coerce.date(),
    name_2744768263: z.coerce.date(),
    name_3573919455: z.string(),
    name_8377079705: z.string(),
    name_0334706812: z.string()
});

export default function MyForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            "name_6017987702": new Date(),
            "name_2744768263": new Date()
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            toast(
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
            );
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
                <Field>
                    <FieldLabel htmlFor="name_0959673449">Email</FieldLabel>
                    <Select
                        {...form.register("name_0959673449")}
                    >
                        <SelectTrigger id="name_0959673449">
                            <SelectValue placeholder="Select a verified email to display"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                    </Select>
                    <FieldDescription>You can manage email addresses in your email settings.</FieldDescription>
                    <FieldError>{form.formState.errors.name_0959673449?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="name_5556976475">Email</FieldLabel>
                    <Select

                        {...form.register("name_5556976475")}
                    >
                        <SelectTrigger id="name_5556976475">
                            <SelectValue placeholder="Select a verified email to display"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                    </Select>
                    <FieldDescription>You can manage email addresses in your email settings.</FieldDescription>
                    <FieldError>{form.formState.errors.name_5556976475?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="name_6017987702">Date of birth</FieldLabel>
                    <Input
                        id="name_6017987702"
                        placeholder="Placeholder"
                        {...form.register("name_6017987702")}
                    />
                    <FieldDescription>Your date of birth is used to calculate your age.</FieldDescription>
                    <FieldError>{form.formState.errors.name_6017987702?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="name_2744768263">Date of birth</FieldLabel>
                    <Input
                        id="name_2744768263"
                        placeholder="Placeholder"
                        {...form.register("name_2744768263")}
                    />
                    <FieldDescription>Your date of birth is used to calculate your age.</FieldDescription>
                    <FieldError>{form.formState.errors.name_2744768263?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="name_3573919455">Email</FieldLabel>
                    <Select

                        {...form.register("name_3573919455")}
                    >
                        <SelectTrigger id="name_3573919455">
                            <SelectValue placeholder="Select a verified email to display"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                    </Select>
                    <FieldDescription>You can manage email addresses in your email settings.</FieldDescription>
                    <FieldError>{form.formState.errors.name_3573919455?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="name_8377079705">Email</FieldLabel>
                    <Select

                        {...form.register("name_8377079705")}
                    >
                        <SelectTrigger id="name_8377079705">
                            <SelectValue placeholder="Select a verified email to display"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                    </Select>
                    <FieldDescription>You can manage email addresses in your email settings.</FieldDescription>
                    <FieldError>{form.formState.errors.name_8377079705?.message}</FieldError>
                </Field>
                <Field>
                    <FieldLabel htmlFor="name_0334706812">Email</FieldLabel>
                    <Select

                        {...form.register("name_0334706812")}
                    >
                        <SelectTrigger id="name_0334706812">
                            <SelectValue placeholder="Select a verified email to display"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                    </Select>
                    <FieldDescription>You can manage email addresses in your email settings.</FieldDescription>
                    <FieldError>{form.formState.errors.name_0334706812?.message}</FieldError>
                </Field>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}