import { getMaintenances } from "@/api/Maintenance.API";
import { MaintenanceTable } from "@/components/Maintenance/MaintenanceTable";
import type { MaintenanceResponse } from "@/interfaces/Maintenance";
import { useEffect, useState } from "react";

export function MaintenancePage() {
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceResponse[] | null>(null);
  
  const fetchData = async () => {
    const maintenanceData = await getMaintenances()
    setMaintenanceData(maintenanceData);
  }
    useEffect(() => {
        fetchData();
    }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <MaintenanceTable maintenanceInfo={maintenanceData ?? []} />
    </div>
  );
}