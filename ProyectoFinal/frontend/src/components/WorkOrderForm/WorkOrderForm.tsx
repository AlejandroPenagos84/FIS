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

<<<<<<< HEAD

=======
    // Función removida ya que el submit se maneja desde el componente padre
    // async function submitForm(data: WorkOrderRequestType) {
    //     const finalData = {
    //         ...data,
    //     };

    //     console.log("Final Data:", finalData);
    //     const createdWorkOrder = await createWorkOrder(finalData);
    //     if (createdWorkOrder) {
    //         alert("Mantenimiento creado exitosamente:");
    //         form.reset();
    //     }else {
    //         alert("Error al crear el mantenimiento. Por favor, inténtelo de nuevo.");
    //     }
    // }
>>>>>>> c69404acba04ec7b32cd59e721c6a3700ddda1a1
    
    const workOrderType = [
    { id: "Generada", description: "Generada" },
    { id: "Asignada", description: "Asignada" },
    { id: "En Curso", description: "En Curso" },
    { id: "Completada", description: "Completada" },
    { id: "Cancelada", description: "Cancelada" },
    ];
<<<<<<< HEAD

=======
    // const fetchMaintenances = async () => {
    //     try {
    //         const maintenances = await getMantenimientos();
    //         setSelectMaintenance((maintenances  ?? []).map((item) => ({ id: item.id, description: item.equipo_info ? item.equipo_info : "Sin Información" })));
    //     } catch (error) {
    //         console.error("Error fetching type equipment:", error);
    //     }
    // }
>>>>>>> c69404acba04ec7b32cd59e721c6a3700ddda1a1
    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            setSelectUser((users  ?? []).map((item) => ({ id: item.id, description: item.first_name + " " + item.last_name + " - " + item.role })));
        } catch (error) {
            console.error("Error fetching type equipment:", error);
        }
    }

    useEffect(() => {
<<<<<<< HEAD
=======
        // fetchMaintenances();
>>>>>>> c69404acba04ec7b32cd59e721c6a3700ddda1a1
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
<<<<<<< HEAD
=======

                {/* <SelectWithLabel
                    data={selectMaintenance}
                    fieldTittle="Mantenimiento"
                    nameInSchema="mantenimiento"
                    className="mb-7"
                /> */}
>>>>>>> c69404acba04ec7b32cd59e721c6a3700ddda1a1
                <SelectWithLabel
                    data={selectUser}
                    fieldTittle="Usuario Asignado"
                    nameInSchema="usuario_asignado"
                    className="mb-7"
                />
<<<<<<< HEAD
=======

                {/* <div className="flex justify-end mt-4 gap-2">
                    <Button type="button" onClick={() => form.reset()}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Guardar
                    </Button>
                </div> */}
>>>>>>> c69404acba04ec7b32cd59e721c6a3700ddda1a1
            </div>
        </Form>
    );
});

<<<<<<< HEAD
WorkOrderForm.displayName = "WorkOrderForm";
=======
WorkOrderForm.displayName = "WorkOrderForm";
>>>>>>> c69404acba04ec7b32cd59e721c6a3700ddda1a1
