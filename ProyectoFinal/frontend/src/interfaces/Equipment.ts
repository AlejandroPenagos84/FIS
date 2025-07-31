export interface EquipmentResponse {
  id: number;
  tipo_equipo_name: string;
  area_servicio_name: string;
  cliente_name: string;
  estado_display: string;

  numero_serie: string;
  estado: string;

  marca: string;
  modelo: string;

  tipo_equipo: number | null;
  area_servicio: number | null;
  cliente: number | null;
}
