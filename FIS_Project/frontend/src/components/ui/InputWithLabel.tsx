import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


import { Input } from "@/components/ui/input";
import type { InputHTMLAttributes } from "react";
import { PasswordInput } from "./password-input";
import { useFormContext } from "react-hook-form";


type Props<S> = {
    type: string,
    fieldTittle: string,
    nameInSchema: keyof S & string,
    className?: string
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<S>({
    type,
    fieldTittle,
    nameInSchema,
    className,
    ...props
}: Props<S>) {
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="mt-4">
                        {fieldTittle}
                    </FormLabel>

                    <FormControl>
                        {type === "password" ? (
                            <PasswordInput
                                id={nameInSchema}
                                className="w-full max-w-xs"
                                {...props}
                                {...field}
                            />
                        ) : (
                            <Input
                                id={nameInSchema}
                                className="w-full max-w-xs"
                                {...props}
                                {...field}
                            />
                        )}
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}

