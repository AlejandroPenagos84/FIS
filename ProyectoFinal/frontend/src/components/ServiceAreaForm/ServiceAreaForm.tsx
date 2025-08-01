import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputWithLabel } from "../ui/InputWithLabel";
import { createServiceArea } from "@/api/ServiceArea.API";
import { ServiceAreaSchema, type ServiceAreaType } from "@/interfaces/ServiceArea";
import { getSites } from "@/api/Site.API";
import { useEffect, useState } from "react";
import type { SiteType } from "@/interfaces/Site";
import { SelectWithLabel } from "../ui/SelectWithLabel";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    onClose?: () => void;
};

export function ServiceAreaForm({ open, setOpen, onClose }: Props) {
    const [selectSites, setSelectSites] = useState<{ id: string; description: string }[]>([]);
    const [, setSites] = useState<SiteType[]>([]);

    const handleDialogChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen && onClose) {
            onClose();
        }
    };

    const form = useForm<ServiceAreaType>({
        mode: "onBlur",
        resolver: zodResolver(ServiceAreaSchema),
        defaultValues: {
            name: "",
            sede: "",
        },
    });

    async function submitForm(data: ServiceAreaType) {
        await createServiceArea(data);
        setOpen(false);
    }

    const fetchSites = async () => {
        try {
            const data = await getSites();
            if (data) {
                setSites(data);
                const arraySelectSites = data.map((site) => ({
                    id: site.id!.toString(),
                    description: site.name,
                }));
                setSelectSites(arraySelectSites);
            }
        } catch (error) {
            console.error("Error fetching sites:", error);
        }
    };

    useEffect(() => {
        fetchSites();
    }, []);

    return (
        <Form {...form}>
            <Dialog open={open} onOpenChange={handleDialogChange}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="text-white">Agregar Área</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Agregar Área de Servicio</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={form.handleSubmit(submitForm)} className="grid gap-4">
                        <div className="grid gap-3">
                            <InputWithLabel
                                type="text"
                                fieldTittle="Nombre del Área"
                                nameInSchema="name"
                            />
                        </div>
                        <div className="grid gap-3">
                            <SelectWithLabel
                                fieldTittle="Sede"
                                nameInSchema="sede"
                                data={selectSites}
                            />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" className="text-white">Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Guardar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Form>
    );
}
