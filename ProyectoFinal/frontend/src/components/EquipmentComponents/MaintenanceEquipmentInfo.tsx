import { getMaintenancesByEquipment } from "@/api/Maintenance.API";
import type { MaintenanceResponse } from "@/interfaces/Maintenance";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MaintenanceTable } from "../Maintenance/MaintenanceTable";
import type { EquipmentResponse } from "@/interfaces/Equipment";
import { getEquipment } from "@/api/Equipment.API";

export function MaintenanceEquipmentInfo() {
  const { equipmentId } = useParams<string>();
  const [maintenanceInfo, setMaintenanceInfo] = useState<MaintenanceResponse[] | null>(null);
  const [equipmentInfo, setEquipmentInfo] = useState<EquipmentResponse | null>(null);

  const fetchEquipmentInfo = async () => {
    if (equipmentId) {
      const equipmentData = await getEquipment(equipmentId);
      setEquipmentInfo(equipmentData);
    }
  };

  const fetchMaintenanceInfo = async () => {
    if (!equipmentId) {
      setMaintenanceInfo(null);
      return;
    }
    const maintenanceInfo = await getMaintenancesByEquipment(equipmentId);
    setMaintenanceInfo(maintenanceInfo);
  };

  useEffect(() => {
    fetchEquipmentInfo();
    fetchMaintenanceInfo();
  }, [equipmentId]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">
        Información del Equipo
      </h2>

      {equipmentInfo ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <p><span className="font-medium">ID:</span> {equipmentInfo.id}</p>
            <p><span className="font-medium">Número de Serie:</span> {equipmentInfo.numero_serie}</p>
            <p><span className="font-medium">Tipo de Equipo:</span> {equipmentInfo.tipo_equipo_name}</p>
            <p><span className="font-medium">Área de Servicio:</span> {equipmentInfo.area_servicio_name}</p>
          </div>
          <div>
            <p><span className="font-medium">Marca:</span> {equipmentInfo.marca}</p>
            <p><span className="font-medium">Modelo:</span> {equipmentInfo.modelo}</p>
            <p><span className="font-medium">Estado:</span> {equipmentInfo.estado_display}</p>
            <p><span className="font-medium">Cliente:</span> {equipmentInfo.cliente_name}</p>
          </div>

          <div className="md:col-span-2 pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Historial de Mantenimiento
            </h3>
            <MaintenanceTable maintenanceInfo={maintenanceInfo ?? []} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Cargando información del equipo...</p>
      )}
    </div>
  );
}
