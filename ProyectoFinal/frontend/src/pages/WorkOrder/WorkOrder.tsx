import { MaintenanceForm } from "@/components/WorkOrderForm/MaintenanceForm";
import { WorkOrderForm } from "@/components/WorkOrderForm/WorkOrderForm";

export function WorkOrder() {  
    return(
        <div>
            <h1>Work Order Form</h1>
            <WorkOrderForm />
            <MaintenanceForm    />
        </div>  
    )
}