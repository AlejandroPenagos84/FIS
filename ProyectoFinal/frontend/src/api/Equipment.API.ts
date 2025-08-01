import type { EquipmentResponse } from "@/interfaces/Equipment";

const API = "http://127.0.0.1:8000/";

export async function getEquipments(): Promise<EquipmentResponse[] | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}equipment/equipos/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: EquipmentResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch equipments:", error);
    return null;
  }
}

export async function getEquipment(id: string): Promise<EquipmentResponse | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}equipment/equipos/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const equipment: EquipmentResponse = await response.json();
    return equipment;
  } catch (error) {
    console.error("Failed to fetch equipment:", error);
    return null;
  }
}