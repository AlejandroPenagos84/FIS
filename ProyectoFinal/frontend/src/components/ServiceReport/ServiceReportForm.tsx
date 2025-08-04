import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ServiceReportSchema,
  type ServiceReportRequest,
} from "@/interfaces/ServiceReport";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "../ui/InputWithLabel";
import { SelectWithLabel } from "../ui/SelectWithLabel";
import { DatePickerWithLabel } from "../ui/DatePickerWithLabel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createServiceReport } from "@/api/ServiceReport.API";
import { useEffect, useState } from "react";
import { getUsers } from "@/api/User.API";
type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClose?: () => void;
  idMaintenance?: string;
  setMaintenance?: (value: string | null) => void;
};

export function ServiceReportDialogForm({ open, setOpen, onClose, idMaintenance, setMaintenance }: Props) {
  const [selectUser, setSelectUser] = useState<{ id: string; description: string }[]>([]);

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && onClose) {
      onClose();
    }
  };

  const form = useForm<ServiceReportRequest>({
    mode: "onBlur",
    resolver: zodResolver(ServiceReportSchema),
    defaultValues: {
      estado: "",
      contenido: "",
      fecha_emision: new Date(),
      mantenimiento: "",
      creado_por: "",
    },
  });

  const statesServiceReport = [
    { id: "No Emitido", description: "No Emitido" },
    { id: "Emitido", description: "Emitido" },
    { id: "Revisado", description: "Revisado" },
    { id: "Aprobado", description: "Aprobado" },
    { id: "No Aprobado", description: "No Aprobado" },
  ];

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setSelectUser((users ?? []).map((item) => ({ id: item.id, description: item.first_name + " " + item.last_name + " - " + item.role })));
    } catch (error) {
      console.error("Error fetching type equipment:", error);
    }
  }

  async function submitForm(data: ServiceReportRequest) {
    try {
      console.log(data);
      const createdServiceReport = await createServiceReport(data);
      console.log(createdServiceReport)
      if (createdServiceReport) {
        alert("Reporte de servicio registrado correctamente");
        form.reset();
        setOpen(false);
        if (setMaintenance)
          setMaintenance(null);
      }

    } catch (error) {
      console.error("Error al registrar reporte de servicio:", error);
    }
  }


  useEffect(() => {
    if (idMaintenance)
      form.setValue("mantenimiento", idMaintenance);
    fetchUsers();
  }, [idMaintenance, form])


  return (
    <>
      <Form {...form}>
        <Dialog open={open} onOpenChange={handleDialogChange}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Reporte de Servicio</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4"
            >
              <SelectWithLabel
                nameInSchema="estado"
                data={statesServiceReport}
                fieldTittle="Estado"
              />

              <DatePickerWithLabel
                nameInSchema="fecha_emision"
                fieldTittle="Fecha Emisión"
              />

              <InputWithLabel
                type="text"
                nameInSchema="contenido"
                fieldTittle="Contenido"
              />

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mantenimiento ID
                </label>
                <input
                  {...form.register("mantenimiento")}
                  readOnly
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100"
                />
              </div>
              <SelectWithLabel
                data={selectUser}
                nameInSchema="creado_por"
                fieldTittle="Creado Por"
                className="mb-7"
              />

              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" className="w-fit">
                  Registrar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </>
  );
}
