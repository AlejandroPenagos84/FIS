import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    type QuotationRequest,
    QuotationSchema,
} from "@/interfaces/Quotation";
import { Form } from "@/components/ui/form";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { createQuotation } from "@/api/Quotation.API";
import { useEffect } from "react";
import { SelectWithLabel } from "../ui/SelectWithLabel";

type Props = {
    open: boolean;
    setOpen: (value: boolean) => void;
    onClose?: () => void;
    idMaintenance?: string;
    setMaintenance?: (value: string | null) => void;
};

export function QuotationDialogForm({
    open,
    setOpen,
    onClose,
    idMaintenance,
    setMaintenance,
}: Props) {
    const form = useForm<QuotationRequest>({
        mode: "onBlur",
        resolver: zodResolver(QuotationSchema),
        defaultValues: {
            estado: "",
            subtotal: "0",
            impuestos: "0",
            total: "",
            mantenimiento: null,
        },
    });

    const states = [
        { id: "Generada", description: "Generada" },
        { id: "Incompleta", description: "Incompleta" },
        { id: "Completa", description: "Completa" },
    ];

    const handleDialogChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen && onClose) {
            onClose();
        }
    };

    useEffect(() => {
        if (idMaintenance) {
            form.setValue("mantenimiento", idMaintenance);
        }
    }, [idMaintenance, form]);

    useEffect(() => {
        const subscription = form.watch((values) => {
            const parsedSubtotal = parseFloat(values.subtotal || "0");
            const parsedImpuestos = parseFloat(values.impuestos || "0");
            const newTotal = (parsedSubtotal + parsedImpuestos).toFixed(2);

            const currentTotal = form.getValues("total");
            if (currentTotal !== newTotal) {
                form.setValue("total", newTotal);
            }
        });

        return () => subscription.unsubscribe();
    }, [form]);

    async function submitForm(data: QuotationRequest) {
        try {
            const created = await createQuotation(data);
            if (created) {
                alert("Cotización registrada correctamente");
                form.reset();
                setOpen(false);
                if (setMaintenance) {
                    setMaintenance(null);
                }
            }
        } catch (error) {
            console.error("Error al registrar la cotización:", error);
        }
    }

    return (
        <Form {...form}>
            <Dialog open={open} onOpenChange={handleDialogChange}>
                <DialogContent className="sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Registrar Cotización</DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={form.handleSubmit(submitForm)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4"
                    >
                        <SelectWithLabel
                            data={states}
                            fieldTittle="Estado"
                            nameInSchema="estado"
                            className="mb-7"
                        />
                        <InputWithLabel
                            type="text"
                            fieldTittle="Subtotal"
                            nameInSchema="subtotal"
                        />
                        <InputWithLabel
                            type="text"
                            fieldTittle="Impuestos"
                            nameInSchema="impuestos"
                        />

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Total
                            </label>
                            <input
                                {...form.register("total")}
                                readOnly
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mantenimiento
                            </label>
                            <input
                                {...form.register("mantenimiento")}
                                readOnly
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-100"
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end">
                            <Button type="submit" className="w-fit">
                                Registrar
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </Form>
    );
}
