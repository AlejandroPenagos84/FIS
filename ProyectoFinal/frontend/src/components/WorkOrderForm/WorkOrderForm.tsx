// import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WorkOrderSchema, type WorkOrderRequestType } from "@/interfaces/WorkOrder";
import { SelectWithLabel } from "../ui/SelectWithLabel";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { createWorkOrder } from "@/api/WorkOrder";
import { getMaintenances } from "@/api/Maintenance.API";
import { getUsers } from "@/api/User.API";
import { useEffect, useState } from "react";
import { InputWithLabel } from "../ui/InputWithLabel";
// import { DynamicServiceAreaForm } from "../ServiceAreaForm/DynamicServiceAreaForm";
// import { useParams } from "react-router-dom";

export function WorkOrderForm() {
    // const { userId } = useParams<{ usertId: string }>();
    const [selectMaintenance, setSelectMaintenance] = useState<{ id: string; description: string }[]>([]);
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

    async function submitForm(data: WorkOrderRequestType) {
        const finalData = {
            ...data,
        };

        console.log("Final Data:", finalData);
        const createdWorkOrder = await createWorkOrder(finalData);
        if (createdWorkOrder) {
            alert("Mantenimiento creado exitosamente:");
            form.reset();
        }else {
            alert("Error al crear el mantenimiento. Por favor, inténtelo de nuevo.");
        }
    }
    const workOrderType = [
    { id: "Generada", description: "Generada" },
    { id: "Asignada", description: "Asignada" },
    { id: "En Curso", description: "En Curso" },
    { id: "Completada", description: "Completada" },
    { id: "Cancelada", description: "Cancelada" },
    ];
    const fetchMaintenances = async () => {
        try {
            const maintenances = await getMaintenances();
            setSelectMaintenance((maintenances  ?? []).map((item) => ({ id: item.id, description: item.id })));
        } catch (error) {
            console.error("Error fetching type equipment:", error);
        }
    }
    const fetchUsers = async () => {
        try {
            const users = await getUsers();
            setSelectUser((users  ?? []).map((item) => ({ id: item.id, description: item.first_name + " " + item.last_name + " - " + item.role })));
        } catch (error) {
            console.error("Error fetching type equipment:", error);
        }
    }

    useEffect(() => {
        fetchMaintenances();
        fetchUsers();
    }, []);
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitForm)}
                className="grid gap-4 max-w-md p-4 border rounded-lg"
            >
                <h2 className="text-lg font-semibold mb-2">Agregar Mantenimiento</h2>
                
                <InputWithLabel<any>
                    type="text"
                    fieldTittle="Descripción del Trabajo"
                    nameInSchema="descripcion_trabajo"
                />

                <SelectWithLabel
                    data={workOrderType}
                    fieldTittle="Estado de la Orden de Trabajo"
                    nameInSchema="estado"
                />

                <SelectWithLabel
                    data={selectMaintenance}
                    fieldTittle="Mantenimiento"
                    nameInSchema="mantenimiento"
                    className="mb-7"
                />
                <SelectWithLabel
                    data={selectUser}
                    fieldTittle="Usuario Asignado"
                    nameInSchema="usuario"
                    className="mb-7"
                />

                <div className="flex justify-end mt-4 gap-2">
                    <Button type="button" onClick={() => form.reset()}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Guardar
                    </Button>
                </div>
            </form>
        </Form>
    );
}
