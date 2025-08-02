import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiteSchema, type SiteType } from "@/interfaces/Site";
import { InputWithLabel } from "../ui/InputWithLabel";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { createSite } from "@/api/Site.API";
import { DynamicServiceAreaForm } from "../ServiceAreaForm/DynamicServiceAreaForm";
import { useParams } from "react-router-dom";

export function SiteAndServiceAreaForm() {
  const [savedSiteName, setSavedSiteName] = useState<SiteType | null>(null);
  const {clientId} = useParams<{ clientId: string }>();
  
  const form = useForm<SiteType>({
    mode: "onBlur",
    resolver: zodResolver(SiteSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  async function submitForm(data: SiteType) {
    const finalData = {
      ...data,
      cliente: clientId
    };

    console.log("Final Data:", finalData);
    const createdSite = await createSite(finalData); 
    setSavedSiteName(createdSite);
  }

  if (savedSiteName) {
    return (
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Agregar Áreas de Servicio para "{savedSiteName?.name}"</h2>
        <DynamicServiceAreaForm sede={savedSiteName} />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitForm)}
        className="grid gap-4 max-w-md p-4 border rounded-lg"
      >
        <h2 className="text-lg font-semibold mb-2">Agregar Sede</h2>

        <InputWithLabel
          type="text"
          fieldTittle="Nombre Sede"
          nameInSchema="name"
        />

        <InputWithLabel
          type="text"
          fieldTittle="Dirección"
          nameInSchema="address"
        />

        <div className="flex justify-end mt-4 gap-2">
          <Button type="button" onClick={() => form.reset()}>
            Cancelar
          </Button>
          <Button type="submit">
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
}
