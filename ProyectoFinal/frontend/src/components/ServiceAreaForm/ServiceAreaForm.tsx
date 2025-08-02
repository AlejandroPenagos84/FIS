import { useFormContext } from "react-hook-form";
import { InputWithLabel } from "../ui/InputWithLabel";
import { useEffect } from "react";

type ServiceFormProps = {
    namePrefix: string; // Ej: "sites.0"
    nameSede: string;
    sedeId: string;
};

export function ServiceAreaForm({ namePrefix, nameSede, sedeId }: ServiceFormProps) {
    const { setValue } = useFormContext();
    const { register } = useFormContext();


    useEffect(() => {
        setValue(`${namePrefix}.sede`, sedeId);
    }, [namePrefix, sedeId, setValue]);

    return (
        <>
            <div className="grid gap-3">
                <InputWithLabel<any>
                    type="text"
                    fieldTittle="Nombre Area Servicio"
                    nameInSchema={`${namePrefix}.name`}
                />
            </div>
            <div className="grid gap-3">
                <div className="grid gap-1">
                    <label className="text-sm font-medium">Nombre Sede</label>
                    <input
                        type="text"
                        value={nameSede}
                        placeholder="Sede Default"
                        readOnly
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-600"
                    />
                </div>

                <input
                    type="hidden"
                    {...register(`${namePrefix}.sede`)} 
                    value={sedeId} 
                />
            </div>
        </>
    );
}
