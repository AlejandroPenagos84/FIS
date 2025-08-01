import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SiteSchema, type SiteType } from "@/interfaces/Site";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputWithLabel } from "../ui/InputWithLabel";
import { createSite } from "@/api/Site.API";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClose?: () => void;
};

export function SiteForm({ open, setOpen, onClose }: Props) {

  const handleDialogChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen && onClose) {
      onClose(); // Se cerró el diálogo, disparar fetch
    }
  };

  const form = useForm<SiteType>({
    mode: "onBlur",
    resolver: zodResolver(SiteSchema),
    defaultValues: {
      name: "",
      address: ""
    },
  });

  async function submitForm(data: SiteType) {
    await createSite(data);
    setOpen(false);
  }



  return (
    <Form {...form}>
      <Dialog open={open} onOpenChange={handleDialogChange}>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-white">Agregar Sede</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar Sede</DialogTitle>
          </DialogHeader>

          {/* Formulario va aquí */}
          <form onSubmit={form.handleSubmit(submitForm)} className="grid gap-4">
            <div className="grid gap-3">
              <InputWithLabel
                type="text"
                fieldTittle="Nombre Sede"
                nameInSchema="name"
              />
            </div>
            <div className="grid gap-3">
              <InputWithLabel
                type="text"
                fieldTittle="Dirección"
                nameInSchema="address"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="text-white">Cancel</Button>
              </DialogClose>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>

  )
}