import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import {
  type EquipmentRequestType,
  EquipmentSchema,
} from "@/interfaces/Equipment";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import { SelectWithLabel } from "@/components/ui/SelectWithLabel";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTypeEquipments } from "@/api/TypeEquiment.API";
import { TypeEquipmentDialogForm } from "@/components/TypeEquipmentForm/TypeEquipmentForm";
import { getClients } from "@/api/Client.API";
import { getServiceAreasPerClient } from "@/api/ServiceArea.API"; // Asegúrate de tener esta API
import { createEquipment } from "@/api/Equipment.API";

function EquipmentForm() {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const [selectTypeEquipment, setSelectTypeEquipment] = useState<{ id: string; description: string }[]>([]);
  const [selectServiceAreas, setSelectServiceAreas] = useState<{ id: string; description: string }[]>([]);
  const [selectClients, setSelectClients] = useState<{ id: string; description: string }[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<EquipmentRequestType>({
    mode: "onBlur",
    resolver: zodResolver(EquipmentSchema),
    defaultValues: {
      numero_serie: "",
      estado: "",
      marca: "",
      modelo: "",
      tipo_equipo: null,
      area_servicio: null,
      cliente: null,
    },
  });

  const selectedClient = useWatch({
    control: form.control,
    name: "cliente",
  });


  const equipmentStates = [
    { id: "Funcional", description: "Funcional" },
    { id: "En Mantenimiento", description: "En Mantenimiento" },
    { id: "Fuera de Servicio", description: "Fuera de Servicio" },
  ];

  const fetchTypeEquipments = async () => {
    try {
      const typeEquipments = await getTypeEquipments();
      setSelectTypeEquipment((typeEquipments ?? []).map((item) => ({
        id: item.id,
        description: item.name,
      })));
    } catch (error) {
      console.error("Error fetching type equipment:", error);
    }
  };

  const fetchClients = async () => {
    try {
      const clients = await getClients();
      setSelectClients((clients ?? []).map((item) => ({
        id: item.id,
        description: item.name,
      })));
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchServiceAreas = async (clientId: string) => {
    try {
      const serviceAreas = await  getServiceAreasPerClient(clientId); // Asume que esta función acepta el ID del cliente
      setSelectServiceAreas((serviceAreas ?? []).map((item) => ({
        id: item.id,
        description: item.name,
      })));
    } catch (error) {
      console.error("Error fetching service areas:", error);
    }
  };

  async function submitForm(data: EquipmentRequestType) {
    try {
      if (equipmentId) {
        
        alert("Equipo actualizado correctamente");
      } else {
        // Aquí deberías llamar a la API para crear un nuevo equipo
        await createEquipment(data);
        alert("Equipo agregado correctamente");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  }

  useEffect(() => {
    fetchTypeEquipments();
    fetchClients();
  }, []);

  useEffect(() => {
    if (!isDialogOpen) {
      fetchTypeEquipments();
    }
  }, [isDialogOpen]);

  useEffect(() => {
    if (selectedClient) {
      fetchServiceAreas(selectedClient);
      console.log("Selected client:", selectedClient);
      console.log(selectServiceAreas)
    } else {
      setSelectServiceAreas([]); 
    }
  }, [selectedClient]);

  return (
    <div className="flex flex-col gap-4 sm:px-8 py-6 lg:shadow-md rounded-xl bg-white max-w-4xl mx-auto">
      <h2 className="text-center text-3xl font-semibold text-gray-800">
        {equipmentId ? "Editar Equipo" : "Registrar Equipo"}
      </h2>
      <Form {...form}>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={form.handleSubmit(submitForm)}>
          <InputWithLabel
            type="text"
            fieldTittle="Número de Serie"
            nameInSchema="numero_serie"
          />
         <SelectWithLabel
            data={equipmentStates}
            fieldTittle="Estado"
            nameInSchema="estado"
            className="mb-7"
          />
          <InputWithLabel
            type="text"
            fieldTittle="Marca"
            nameInSchema="marca"
          />
          <InputWithLabel
            type="text"
            fieldTittle="Modelo"
            nameInSchema="modelo"
          />
          <SelectWithLabel
            data={selectTypeEquipment}
            fieldTittle="Tipo de Equipo"
            nameInSchema="tipo_equipo"
            className="mb-7"
          />
          {
            selectedClient && (
              <SelectWithLabel
                data={selectServiceAreas}
                fieldTittle="Área de Servicio"
                nameInSchema="area_servicio"
                className="mb-7"
              />
            )
          }
          <SelectWithLabel
            data={selectClients}
            fieldTittle="Cliente"
            nameInSchema="cliente"
            className="mb-7"
          />
          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              className="w-fit px-6 py-2 font-medium hover:bg-primaryBlue transition duration-300"
            >
              {equipmentId ? "Actualizar" : "Agregar"}
            </Button>
          </div>
        </form>
      </Form>
      <TypeEquipmentDialogForm
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onClose={fetchTypeEquipments}
      />
    </div>
  );
}

export default EquipmentForm;
