// import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaintenanceSchema, type MaintenanceRequestType } from "@/interfaces/Maintenance";
import { SelectWithLabel } from "../ui/SelectWithLabel";
import { Button } from "../ui/button";
import { Form } from "@/components/ui/form";
import { createMaintenance } from "@/api/Maintenance.API";
import { getEquipments } from "@/api/Equipment.API";
import { getUsers } from "@/api/User.API";
import { useEffect, useState } from "react";
// import { DynamicServiceAreaForm } from "../ServiceAreaForm/DynamicServiceAreaForm";
// import { useParams } from "react-router-dom";

export function MaintenanceForm() {
    // const { userId } = useParams<{ usertId: string }>();
    const [selectEquipment, setSelectEquipment] = useState<{ id: string; description: string }[]>([]);
    const [selectUser, setSelectUser] = useState<{ id: string; description: string }[]>([]);

    const form = useForm<MaintenanceRequestType>({
        mode: "onBlur",
        resolver: zodResolver(MaintenanceSchema),
        defaultValues: {
            tipo: "",
            estado: "",
            equipo: "",
            usuario: ""
        },
    });

    async function submitForm(data: MaintenanceRequestType) {
        const finalData = {
            ...data,
        };

        console.log("Final Data:", finalData);
        const createdMaintenance = await createMaintenance(finalData);
        if (createdMaintenance) {
            alert("Mantenimiento creado exitosamente:");
            form.reset();
        }else {
            alert("Error al crear el mantenimiento. Por favor, inténtelo de nuevo.");
        }
    }
    const maintenanceType = [
    { id: "Preventivo", description: "Preventivo" },
    { id: "Correctivo", description: "Correctivo" },
    { id: "Predictivo", description: "Predictivo" },
    ];
    const maintenanceState = [
    { id: "Registrado", description: "Registrado" },
    { id: "Programado", description: "Programado" },
    { id: "En Ejecucion", description: "En Ejecucion" },
    { id: "Completado", description: "Compleatdo" },
    { id: "Cancelado", description: "Cancelado" },
    ]
    const fetchEquipment = async () => {
        try {
            const equipments = await getEquipments();
            setSelectEquipment((equipments  ?? []).map((item) => ({ id: item.id, description: item.marca + item.modelo +item.numero_serie })));
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
        fetchEquipment();
        fetchUsers();
    }, []);
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(submitForm)}
                className="grid gap-4 max-w-md p-4 border rounded-lg"
            >
                <h2 className="text-lg font-semibold mb-2">Agregar Mantenimiento</h2>

                <SelectWithLabel
                    data={maintenanceType}
                    fieldTittle="Tipo de mantenimiento"
                    nameInSchema="tipo"
                />

                <SelectWithLabel
                    data={maintenanceState}
                    fieldTittle="Tipo de mantenimiento"
                    nameInSchema="estado"
                />
                <SelectWithLabel
                    data={selectEquipment}
                    fieldTittle="Equipo"
                    nameInSchema="equipo"
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
