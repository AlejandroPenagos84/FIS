import type { EquipmentRequestType, EquipmentResponse } from "@/interfaces/Equipment";

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

export async function createEquipment(
  equipmentData: EquipmentRequestType
): Promise<EquipmentResponse | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}equipment/equipos/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(equipmentData),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const createdEquipment: EquipmentResponse = await response.json();
    return createdEquipment;
  } catch (error) {
    console.error("Failed to create equipment:", error);
    return null;
  }
}

export async function updateEquipment(
  id: string,
  equipmentData: EquipmentRequestType
): Promise<EquipmentResponse | null> {
  try {

    const token = localStorage.getItem("accessToken");
    console.log(equipmentData);

    
    const response = await fetch(`${API}equipment/equipos/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(equipmentData),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const updatedEquipment: EquipmentResponse = await response.json();
    console.log(updateEquipment);
    return updatedEquipment;
  } catch (error) {
    console.error("Failed to update equipment:", error);
    return null;
  }
}

export async function deleteEquipment(id: string): Promise<boolean> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}equipment/equipos/${id}/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return true; // Eliminación exitosa
  } catch (error) {
    console.error("Failed to delete equipment:", error);
    return false;
  }
}
