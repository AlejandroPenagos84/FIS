import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type ClientType,
  ClientSchema,
  mapClientResponseToClientType,
} from "@/interfaces/Client";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import { SelectWithLabel } from "@/components/ui/SelectWithLabel";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postClient, getClient, updateClient } from "@/api/Client.API";

function ClienteForm() {
  const navigate = useNavigate();
  const { clientId } = useParams<{ clientId: string }>();
  const [, setClient] = useState<ClientType | null>(null);

  const form = useForm<ClientType>({
    mode: "onBlur",
    resolver: zodResolver(ClientSchema),
    defaultValues: {
      type: "",
      identification: "",
      name: "",
      country: "",
      phone: "",
      email: "",
      address: ""
    },
  });

  const dataPeopleType = [
    { id: "Cedula", description: "Cédula" },
    { id: "Cedula Extranjeria", description: "Cédula de Extranjería" },
  ];

  const fetchClient = async () => {
    try {
      if (clientId) {
        const data = await getClient(clientId);
        if (data) {
          const mappedClient = mapClientResponseToClientType(data);
          setClient(mappedClient);
          form.reset(mappedClient);
        }
      }
    } catch (error) {
      console.error("Error fetching client:", error);
    }
  };


  useEffect(() => {
    fetchClient();
  }, [clientId]);

  async function submitForm(data: ClientType) {
    const finalData = {
      ...data
    };

    try {
      if (clientId) {
        const updated = await updateClient(clientId, finalData);
        if (updated) alert("Cliente actualizado correctamente");
        navigate(`/clients`);
        
      } else {
        const created = await postClient(finalData);
        if (created) alert("Cliente agregado correctamente");
        navigate(`/clients`);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:px-8 py-6 lg:shadow-md rounded-xl bg-white max-w-4xl mx-auto">
      <h2 className="text-center text-3xl font-semibold text-gray-800">
        {clientId ? "Editar Cliente" : "Registrar Cliente"}
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <SelectWithLabel
            data={dataPeopleType}
            fieldTittle="Tipo de documento"
            nameInSchema="type"
          />
          <InputWithLabel
            type="text"
            fieldTittle="Identificación"
            nameInSchema="identification"
          />
          <InputWithLabel
            type="text"
            fieldTittle="Razón Social (Firmename)"
            nameInSchema="name"
          />
          <InputWithLabel
            type="text"
            fieldTittle="País"
            nameInSchema="country"
          />
          <InputWithLabel
            type="text"
            fieldTittle="Teléfono"
            nameInSchema="phone"
          />
          <InputWithLabel
            type="text"
            fieldTittle="Email"
            nameInSchema="email"
          />
          <InputWithLabel
            type="text"
            fieldTittle="Dirección"
            nameInSchema="address"
          />

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              className="w-fit px-6 py-2 font-medium hover:bg-primaryBlue transition duration-300"
            >
              {clientId ? "Actualizar" : "Agregar"}
            </Button>
          </div>
        </form>
      </Form>
      {clientId && (
        <Button
          onClick={() => navigate(`/clients/modify/${clientId}/sites`)}
        >
          Agregar Sedes
        </Button>
      )}
    </div>
  );
}

export default ClienteForm;
