import { getMaintenances } from "@/api/Maintenance.API";
import { MaintenanceTable } from "@/components/Maintenance/MaintenanceTable";
import { QuotationDialogForm } from "@/components/Quotation/QuotationForm";
import { Button } from "@/components/ui/button";
import type { MaintenanceResponse } from "@/interfaces/Maintenance";
import { useEffect, useState } from "react";

export function QuotationPage() {
  const [maintenanceData, setMaintenanceData] = useState<MaintenanceResponse[] | null>(null);
  const [idMaintenance, setIdMaintenance] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(true);

  const fetchData = async () => {
    const maintenanceData = await getMaintenances()
    setMaintenanceData(maintenanceData);
  }
    useEffect(() => {
        fetchData();
    }, []);

    const handleQuote = (maintenanceId: string) => {
      setIdMaintenance(maintenanceId);
      setOpen(true);
    };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <MaintenanceTable maintenanceInfo={maintenanceData ?? []}>
        {(id) => <Button onClick={() => handleQuote(id)}>Cotizar</Button>}
        </MaintenanceTable>
        {
            idMaintenance && (
                <QuotationDialogForm
                    open={open}
                    setOpen={setOpen}
                    idMaintenance={idMaintenance}
                    setMaintenance={setIdMaintenance}
                />
            )
        }
    </div>
  );
}