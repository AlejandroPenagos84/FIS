import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import type { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Dataobj = {
    id: string,
    description: string
}

type Props<S> = {
    fieldTittle: string,
    nameInSchema: keyof S & string,
    data: Dataobj[],
    className?: string
} & InputHTMLAttributes<HTMLInputElement>;

export function SelectWithLabel<S>({
    fieldTittle,
    nameInSchema,
    data,
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

                <Select
                {...field}
                onValueChange={field.onChange}
                >
                <FormControl>
                    <SelectTrigger
                    id={nameInSchema}
                    className={`w-full max-w-xs bg-white! text-black ${className ?? ""}`}
                    >
                    <SelectValue placeholder="Por favor, selecciona" />
                    </SelectTrigger>
                </FormControl>

                <SelectContent className="bg-white text-black">
                    {data.map(item => (
                    <SelectItem
                        key={`${nameInSchema}_${item.id}`}
                        value={item.id}
                        className="bg-white text-black data-[state=checked]:bg-gray-100"
                    >
                        {item.description}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                    <FormMessage/>
                </FormItem>
            )}
        />
    )
}

