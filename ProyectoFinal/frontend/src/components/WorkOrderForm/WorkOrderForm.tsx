import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkOrderSchema, type WorkOrderRequestType } from "@/interfaces/WorkOrder";
import { SelectWithLabel } from "../ui/SelectWithLabel";
import { Form } from "@/components/ui/form";
import { getUsers } from "@/api/User.API";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { InputWithLabel } from "../ui/InputWithLabel";
import { DatePickerWithLabel } from "../ui/DatePickerWithLabel";

// Definir el tipo para la referencia
interface WorkOrderFormRef {
    getFormData: () => Promise<WorkOrderRequestType | null>;
    resetForm: () => void;
}

export const WorkOrderForm = forwardRef<WorkOrderFormRef, {}>((_, ref) => {
    const [selectUser, setSelectUser] = useState<{ id: string; description: string }[]>([]);

    const form = useForm<WorkOrderRequestType>({
        mode: "onBlur",
        resolver: zodResolver(WorkOrderSchema),
        defaultValues: {
            estado: "",
            fecha_asignacion: new Date(),
            descripcion_trabajo: "",
            mantenimiento: "",
            usuario_asignado: ""
        },
    });

    useImperativeHandle(ref, () => ({
        getFormData: async () => {
            console.log("WorkOrderForm - getFormData called");
            const formData = form.getValues();
            console.log("WorkOrderForm - Form data:", formData);
            
            const isValid = await form.trigger();
            console.log("WorkOrderForm - Validation result:", isValid);
            
            if (!isValid) {
                const errors = form.formState.errors;
                console.log("WorkOrderForm - Validation errors:", errors);
                return null;
            }
            return formData;
        },
        resetForm: () => {
            console.log("WorkOrderForm - resetForm called");
            form.reset();
        }
    }), [form]);


    
    const workOrderType = [
    { id: "Generada", description: "Generada" },
    { id: "Asignada", description: "Asignada" },
    { id: "En Curso", description: "En Curso" },
    { id: "Completada", description: "Completada" },
    { id: "Cancelada", description: "Cancelada" },
    ];

    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            setSelectUser((users  ?? []).map((item) => ({ id: item.id, description: item.first_name + " " + item.last_name + " - " + item.role })));
        } catch (error) {
            console.error("Error fetching type equipment:", error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    
    return (
        <Form {...form}>
            <div className="grid gap-4 max-w-md p-4 border rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Agregar Orden de Trabajo</h2>
                
                <InputWithLabel<any>
                    type="text"
                    fieldTittle="Descripción del Trabajo"
                    nameInSchema="descripcion_trabajo"
                />

                <DatePickerWithLabel
                    fieldTittle="Fecha de Asignación"
                    nameInSchema="fecha_asignacion"
                />
                
                <SelectWithLabel
                    data={workOrderType}
                    fieldTittle="Estado de la Orden de Trabajo"
                    nameInSchema="estado"
                />
                <SelectWithLabel
                    data={selectUser}
                    fieldTittle="Usuario Asignado"
                    nameInSchema="usuario_asignado"
                    className="mb-7"
                />
            </div>
        </Form>
    );
});

WorkOrderForm.displayName = "WorkOrderForm";