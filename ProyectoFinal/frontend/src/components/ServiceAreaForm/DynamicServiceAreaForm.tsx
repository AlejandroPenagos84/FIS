import { ServiceAreaSchema, type ServiceAreaType } from "@/interfaces/ServiceArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { ServiceAreaForm } from "./ServiceAreaForm";
import { Button } from "../ui/button";
import type { SiteType } from "@/interfaces/Site";
import { createServiceArea } from "@/api/ServiceArea.API";
import { useNavigate } from "react-router";

// Make sure the schema validates an object with a serviceAreas array
const ServiceAreasFormSchema = z.object({
    serviceAreas: z.array(ServiceAreaSchema),
});

type props = {
    sede: SiteType;
}

export function DynamicServiceAreaForm({ sede }: props) {
    const navigate = useNavigate();

    const form = useForm<{ serviceAreas: ServiceAreaType[] }>({
        resolver: zodResolver(ServiceAreasFormSchema),
        defaultValues: {
            serviceAreas: [{ name: "", sede: "" }]
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "serviceAreas",
    })

    const submitForm = (data: { serviceAreas: ServiceAreaType[] }) => {
        data.serviceAreas.forEach(async (area: ServiceAreaType) => {
            await createServiceArea(area)
        })
        navigate("/clients");
    }

    return (
        <div>
            <div>
                <h1 className="text-2xl font-bold mb-4">Sede</h1>
                <h2>{sede.name}</h2>
                <h2>{sede.address}</h2>
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-4">Áreas de Servicio</h2>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitForm)}>
                    {fields.map((field, index) => (
                        <div key={field.id} className="relative border p-4 rounded mb-4">
                            <ServiceAreaForm namePrefix={`serviceAreas.${index}`} 
                            nameSede={sede.name} sedeId={sede.id!.toString()} />
                            {fields.length > 1 && (
                                <Button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="absolute top-2 right-2"
                                    variant="destructive"
                                >
                                    Remove
                                </Button>
                            )}
                        </div>
                    ))}
                    <div className="flex justify-between">
                        <Button type="button" onClick={() => append({ name: "", sede: "" })}>
                            Agregar Área
                        </Button>
                        <Button type="submit">Guardar</Button>
                    </div>
                </form>
            </Form>
        </div>

    );
}

