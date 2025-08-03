import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type EquipmentRequestType,
  EquipmentSchema,
} from "@/interfaces/Equipment";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createEquipment, getEquipment, updateEquipment } from "@/api/Equipment.API";
import { EquipmentSelectForm } from "./EquipmentSelectForm";
import { TypeEquipmentDialogForm } from "@/components/TypeEquipmentForm/TypeEquipmentForm";
import { SelectWithLabel } from "@/components/ui/SelectWithLabel";

function EquipmentForm() {
  const { equipmentId } = useParams<{ equipmentId: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

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

  const equipmentStates = [
    { id: "Funcional", description: "Funcional" },
    { id: "En Mantenimiento", description: "En Mantenimiento" },
    { id: "Fuera de Servicio", description: "Fuera de Servicio" },
  ];

  async function submitForm(data: EquipmentRequestType) {
    try {
      if (equipmentId) {
        await updateEquipment(equipmentId, data);
        alert("Equipo actualizado correctamente");
      } else {
        await createEquipment(data);
        alert("Equipo agregado correctamente");
      }
      navigate(`/equipments`);
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  }

  useEffect(() => {
    const loadEquipment = async () => {
      if (equipmentId) {
        try {
          const equipmentData = await getEquipment(equipmentId);
          if (equipmentData) {
            form.reset({
              numero_serie: equipmentData.numero_serie,
              estado: equipmentData.estado,
              marca: equipmentData.marca,
              modelo: equipmentData.modelo,
              area_servicio: equipmentData.area_servicio !== null && equipmentData.area_servicio !== undefined ? String(equipmentData.area_servicio) : null,
              tipo_equipo: equipmentData.tipo_equipo !== null && equipmentData.tipo_equipo !== undefined ? String(equipmentData.tipo_equipo) : null,
              cliente: equipmentData.cliente !== null && equipmentData.cliente !== undefined ? String(equipmentData.cliente) : null,
            });
          }
        } catch (error) {
          console.error("Error al cargar los datos del equipo:", error);
        }
      }
    };

    loadEquipment();
  }, [equipmentId]);


  return (
    <div className="flex flex-col gap-4 sm:px-8 py-6 lg:shadow-md rounded-xl bg-white max-w-4xl mx-auto">
      <h2 className="text-center text-3xl font-semibold text-gray-800">
        {equipmentId ? "Editar Equipo" : "Registrar Equipo"}
      </h2>
      <Form {...form}>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={form.handleSubmit(submitForm)}
        >
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
          {!equipmentId && (
            <EquipmentSelectForm isDialogOpen={isDialogOpen} />
          )}
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
      {!equipmentId && (
        <TypeEquipmentDialogForm
          open={isDialogOpen}
          setOpen={setIsDialogOpen}
          onClose={() => {}}
        />
      )}
    </div>
  );
}

export default EquipmentForm;
