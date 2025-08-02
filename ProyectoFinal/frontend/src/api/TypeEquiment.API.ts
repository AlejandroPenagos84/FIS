// api/equipment.ts
import type {
  TypeEquipmentResponse,
  TypeEquipmentRequest,
} from "@/interfaces/TypeEquipment";

const API = "http://127.0.0.1:8000/";

// Obtener todos los tipos de equipo
export async function getTypeEquipments(): Promise<TypeEquipmentResponse[] | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}equipment/tipos-equipo/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const data: TypeEquipmentResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch equipment types:", error);
    return null;
  }
}

// Obtener un tipo de equipo por ID
export async function getTypeEquipment(
  id: string
): Promise<TypeEquipmentResponse | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}equipment/tipos-equipo/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok)
      throw new Error(`Error ${response.status}: ${response.statusText}`);

    const type: TypeEquipmentResponse = await response.json();
    return type;
  } catch (error) {
    console.error("Failed to fetch equipment type:", error);
    return null;
  }
}

// Crear un nuevo tipo de equipo
export async function createTypeEquipment(
  type: TypeEquipmentRequest
): Promise<TypeEquipmentResponse | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}equipment/tipos-equipo/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(type),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: TypeEquipmentResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to create type equipment:", error);
    return null;
  }
}

// Actualizar un tipo de equipo existente
export async function updateTypeEquipment(
  id: string,
  type: TypeEquipmentRequest
): Promise<TypeEquipmentResponse | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}equipment/tipos-equipo/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(type),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: TypeEquipmentResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to update type equipment ${id}:`, error);
    return null;
  }
}

// Eliminar un tipo de equipo
export async function deleteTypeEquipment(id: string): Promise<boolean> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}equipment/tipos-equipo/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error(`Failed to delete type equipment ${id}:`, error);
    return false;
  }
}
