import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaintenanceSchema, type MaintenanceRequestType } from "@/interfaces/Maintenance";
import { SelectWithLabel } from "../ui/SelectWithLabel";
import { Form } from "@/components/ui/form";
import { getEquipments } from "@/api/Equipment.API";
import { getUsers } from "@/api/User.API";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

// Definir el tipo para la referencia
interface MaintenanceFormRef {
    getFormData: () => Promise<MaintenanceRequestType | null>;
    resetForm: () => void;
}

export const MaintenanceForm = forwardRef<MaintenanceFormRef, {}>((_, ref) => {
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

    useImperativeHandle(ref, () => ({
        getFormData: async () => {
            console.log("MaintenanceForm - getFormData called");
            const formData = form.getValues();
            console.log("MaintenanceForm - Form data:", formData);
            
            const isValid = await form.trigger();
            console.log("MaintenanceForm - Validation result:", isValid);
            
            if (!isValid) {
                const errors = form.formState.errors;
                console.log("MaintenanceForm - Validation errors:", errors);
                return null;
            }
            return formData;
        },
        resetForm: () => {
            console.log("MaintenanceForm - resetForm called");
            form.reset();
        }
    }), [form]);

    
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
            setSelectEquipment((equipments  ?? []).map((item) => ({ id: item.id, description: item.numero_serie+"-"+item.marca +"-"+ item.modelo})));
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
            <div className="grid gap-4 max-w-md p-4 border rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Informacion del Mantenimiento</h2>

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
            </div>
        </Form>
    );
});

MaintenanceForm.displayName = "MaintenanceForm";