import type { MaintenanceResponse, MaintenanceRequestType } from "@/interfaces/Maintenance";

const API = "http://127.0.0.1:8000/";

function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getMantenimientos(): Promise<MaintenanceResponse[] | null> {
    try {
        const response = await fetch(`${API}maintenance/mantenimientos/`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch maintenances:", error);
        return null;
    }
}

export async function getMantenimiento(id: string): Promise<MaintenanceRequestType | null> {
    try {
        const response = await fetch(`${API}maintenance/mantenimientos/${id}/`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch maintenance:", error);
        return null;
    }
}

export async function createMaintenance(data: MaintenanceRequestType): Promise<MaintenanceRequestType | null> {
    try {
        const response = await fetch(`${API}maintenance/mantenimientos/`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to create maintenance:", error);
        return null;
    }
}

export async function updateMantenance(id: string, data: MaintenanceRequestType): Promise<MaintenanceRequestType | null> {
    try {
        const response = await fetch(`${API}maintenance/mantenimientos/${id}/`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to update maintenance:", error);
        return null;
    }
}

export async function deleteMaintenance(id: string): Promise<boolean> {
    try {
        const response = await fetch(`${API}maintenance/mantenimientos/${id}/`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        return response.ok;
    } catch (error) {
        console.error("Failed to delete maintenance:", error);
        return false;
    }
}

export async function getMaintenanceByEquipment(equipmentId: string): Promise<MaintenanceResponse[] | null> {   
    try {
        const response = await fetch(`${API}equipment/equipos/${equipmentId}/historial_mantenimientos/`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch maintenances by equipment:", error);
        return null;
    }
}