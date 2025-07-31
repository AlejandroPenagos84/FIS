import { Button } from "./button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {useFormContext} from "react-hook-form";
import { Input } from "@/components/ui/input"; // Si tienes un input estilizado en tu proyecto

interface DynamicInputListProps {
  label: string;
  name: string;
  type?: string;
  fields:{id: string, value: string}[];
  append: (value: { value: string }) => void;
  remove: (index: number) => void;
  placeholder?: string;
}

export function DynamicInputList({
  label,
  name,
  type = "text",
  fields,
  append,
  remove,
  placeholder,
}: DynamicInputListProps) {
  const form = useFormContext();
  return (
    <div className="mb-7">
      <FormLabel className="mb-2 block font-semibold">{label}</FormLabel>

        {fields.map((field, index) => (
        <FormField
            key={field.id}
            control={form.control}
            name={`${name}.${index}.value`} // 👈 Esto es clave
            render={({ field }) => (
            <FormItem className="flex gap-2 items-center mb-2">
                <FormControl>
                <Input
                    {...field}
                    type={type}
                    placeholder={placeholder}
                    className="flex-grow"
                />
                </FormControl>
                <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
                >
                X
                </Button>
                <FormMessage />
            </FormItem>
            )}
        />
        ))}


      <Button
        type="button"
        onClick={() => append({ value: "" })}
        className="mt-2"
      >
        Añadir {label}
      </Button>
    </div>
  );
}