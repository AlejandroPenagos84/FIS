import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
//import { getEquipment, postEquipment, updateEquipment } from "@/api/Equipment";
//import { getTiposEquipo } from "@/api/TipoEquipo";
//import { getAreasServicio } from "@/api/AreaServicio";
//import { getClients } from "@/api/Client.API";

function EquipmentForm() {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const [tiposEquipo, setTiposEquipo] = useState<{ id: number; description: string }[]>([]);
  const [areasServicio, setAreasServicio] = useState<{ id: number; description: string }[]>([]);
  const [clientes, setClientes] = useState<{ id: number; description: string }[]>([]);

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
  /*
  const fetchData = async () => {
    try {
      const [tipos, areas, clients] = await Promise.all([
        getTiposEquipo(),
        getAreasServicio(),
        getClients(),
      ]);

      setTiposEquipo(tipos.map((item) => ({ id: item.id, description: item.name })));
      setAreasServicio(areas.map((item) => ({ id: item.id, description: item.name })));
      setClientes(clients.map((item) => ({ id: item.id, description: item.name })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEquipment = async () => {
    try {
      if (equipmentId) {
        const data = await getEquipment(equipmentId);
        if (data) {
          form.reset(data);
        }
      }
    } catch (error) {
      console.error("Error fetching equipment:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchEquipment();
  }, [equipmentId]);
  
  async function submitForm(data: EquipmentRequest) {
    try {
      if (equipmentId) {
        const updated = await updateEquipment(equipmentId, data);
        if (updated) alert("Equipo actualizado correctamente");
      } else {
        const created = await postEquipment(data);
        if (created) alert("Equipo agregado correctamente");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  }
*/
  return (
    <div className="flex flex-col gap-4 sm:px-8 py-6 lg:shadow-md rounded-xl bg-white max-w-4xl mx-auto">
      <h2 className="text-center text-3xl font-semibold text-gray-800">
        {equipmentId ? "Editar Equipo" : "Registrar Equipo"}
      </h2>
      <Form {...form}>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <InputWithLabel
            type="text"
            fieldTittle="Número de Serie"
            nameInSchema="numero_serie"
          />
          <InputWithLabel
            type="text"
            fieldTittle="Estado"
            nameInSchema="estado"
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
            data={[]}
            fieldTittle="Tipo de Equipo"
            nameInSchema="tipo_equipo"
          />
          <SelectWithLabel
            data={[]}
            fieldTittle="Área de Servicio"
            nameInSchema="area_servicio"
          />
          <SelectWithLabel
            data={[]}
            fieldTittle="Cliente"
            nameInSchema="cliente"
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
    </div>
  );
}

export default EquipmentForm;
