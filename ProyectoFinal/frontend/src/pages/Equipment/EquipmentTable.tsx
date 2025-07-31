import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEquipments } from "@/api/Equipment.API";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EquipmentResponse } from "@/interfaces/Equipment";

export function EquipmentTable() {
  const [equipments, setEquipments] = useState<EquipmentResponse[]>([]);
  const navigate = useNavigate();

  const fetchEquipments = async () => {
    try {
      const data = await getEquipments();
      if (data) {
        setEquipments(data);
      }
    } catch (error) {
      console.error("Error fetching equipments:", error);
    }
  };

  useEffect(() => {
    fetchEquipments();
  }, []);

  const handleSelect = (equipmentId: number) => {
    navigate(`/equipments/${equipmentId}`);
  };

  const handleAdd = () => {
    navigate(`/equipments/register`);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Equipos registrados</h2>
        <Button onClick={handleAdd}>Agregar Equipo</Button>
      </div>

      <Table>
        <TableCaption>Listado de equipos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>N° Serie</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Tipo equipo</TableHead>
            <TableHead>Área servicio</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className="text-center">Ver</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {equipments.map((eq) => (
            <TableRow key={eq.id}>
              <TableCell>{eq.id}</TableCell>
              <TableCell>{eq.numero_serie}</TableCell>
              <TableCell>{eq.marca}</TableCell>
              <TableCell>{eq.modelo}</TableCell>
              <TableCell>{eq.estado_display}</TableCell>
              <TableCell>{eq.tipo_equipo_name}</TableCell>
              <TableCell>{eq.area_servicio_name}</TableCell>
              <TableCell>{eq.cliente_name}</TableCell>
              <TableCell className="text-center">
                <Button onClick={() => handleSelect(eq.id)} variant="secondary">
                  Ver
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
