import { MaintenanceForm } from "@/components/WorkOrderForm/MaintenanceForm";
import { WorkOrderForm } from "@/components/WorkOrderForm/WorkOrderForm";
import { Button } from "../../components/ui/button";
import { useRef, useState } from "react";
import { createMaintenance } from "@/api/Maintenance.API";
import { createWorkOrder } from "@/api/WorkOrder";

// Definir el tipo para las referencias de los formularios
interface FormRef {
    getFormData: () => Promise<any>;
    resetForm: () => void;
}

export function WorkOrder() {
    const maintenanceFormRef = useRef<FormRef>(null);
    const workOrderFormRef = useRef<FormRef>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        try {
            console.log("=== Iniciando proceso de envío ===");
            console.log("maintenanceFormRef.current:", maintenanceFormRef.current);
            console.log("workOrderFormRef.current:", workOrderFormRef.current);
            
            // Validar ambos formularios antes de enviar
            const maintenanceData = await maintenanceFormRef.current?.getFormData();
            const workOrderData = await workOrderFormRef.current?.getFormData();
            
            console.log("Datos de mantenimiento recibidos:", maintenanceData);
            console.log("Datos de orden de trabajo recibidos:", workOrderData);
            
            if (!maintenanceData || !workOrderData) {
                alert("Por favor, complete todos los campos requeridos en ambos formularios.");
                setIsSubmitting(false);
                return;
            }

            console.log("Datos del mantenimiento:", maintenanceData);
            console.log("Datos de la orden de trabajo:", workOrderData);

            // 1. Crear el mantenimiento primero
            const createdMaintenance = await createMaintenance(maintenanceData);
            
            console.log("Mantenimiento creado:", createdMaintenance);
            
            if (!createdMaintenance) {
                alert("Error al crear el mantenimiento. Por favor, inténtelo de nuevo.");
                return;
            }

            // 2. Obtener el ID del mantenimiento creado (la respuesta debería incluir el ID)
            const maintenanceId = (createdMaintenance as any).id;
            
            if (!maintenanceId) {
                alert("Error: No se pudo obtener el ID del mantenimiento creado.");
                return;
            }

            // 3. Usar el ID del mantenimiento creado para la orden de trabajo
            const workOrderDataWithMaintenance = {
                ...workOrderData,
                mantenimiento: maintenanceId.toString()
            };

            console.log("Datos de orden de trabajo con mantenimiento:", workOrderDataWithMaintenance);

            // 4. Crear la orden de trabajo
            const createdWorkOrder = await createWorkOrder(workOrderDataWithMaintenance);
            
            console.log("Orden de trabajo creada:", createdWorkOrder);
            
            if (!createdWorkOrder) {
                alert("El mantenimiento se creó correctamente, pero hubo un error al crear la orden de trabajo.");
                return;
            }

            // 5. Si todo fue exitoso, reiniciar ambos formularios
            maintenanceFormRef.current?.resetForm();
            workOrderFormRef.current?.resetForm();
            
            alert("Mantenimiento y orden de trabajo creados exitosamente!");
            
        } catch (error) {
            console.error("Error durante el proceso:", error);
            alert("Ocurrió un error durante el proceso. Por favor, inténtelo de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        maintenanceFormRef.current?.resetForm();
        workOrderFormRef.current?.resetForm();
    };

    return (
        <div>
            <h1>Work Order Form</h1>
            <MaintenanceForm ref={maintenanceFormRef} />
            <WorkOrderForm ref={workOrderFormRef} />
            <div className="flex justify-end mt-4 gap-2">
                <Button 
                    type="button" 
                    onClick={handleCancel}
                    disabled={isSubmitting}
                >
                    Cancelar
                </Button>
                <Button 
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Guardando..." : "Guardar"}
                </Button>
            </div>
        </div>
    )
}