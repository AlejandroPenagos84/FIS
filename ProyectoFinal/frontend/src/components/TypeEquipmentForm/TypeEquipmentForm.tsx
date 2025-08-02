import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type TypeEquipmentRequest,
  TypeEquipmentSchema,
} from "@/interfaces/TypeEquipment";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { createTypeEquipment } from "@/api/TypeEquiment.API";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClose?: () => void;
};


export function TypeEquipmentDialogForm({ open, setOpen, onClose }: Props) {
  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && onClose) {
      onClose(); // Se cerró el diálogo, disparar fetch
    }
  };

  const form = useForm<TypeEquipmentRequest>({
    mode: "onBlur",
    resolver: zodResolver(TypeEquipmentSchema),
    defaultValues: {
      name: "",
      especificaciones: "",
      valor_unitario: "",
    },
  });

  async function submitForm(data: TypeEquipmentRequest) {
    try {
      const created = await createTypeEquipment(data);
      if (created) {
        alert("Tipo de equipo registrado correctamente");
        form.reset();
        setOpen(false); // cerrar el diálogo
      }
    } catch (error) {
      console.error("Error al registrar tipo de equipo:", error);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Agregar Tipo de Equipo</Button>
      <Form {...form}>
        <Dialog open={open} onOpenChange={handleDialogChange}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Tipo de Equipo</DialogTitle>
            </DialogHeader>


            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4"
            >
              <InputWithLabel
                type="text"
                fieldTittle="Nombre"
                nameInSchema="name"
              />
              <InputWithLabel
                type="text"
                fieldTittle="Valor Unitario"
                nameInSchema="valor_unitario"
              />
              <InputWithLabel
                type="text"
                fieldTittle="Especificaciones (opcional)"
                nameInSchema="especificaciones"
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
