import type { WorkOrderResponse, WorkOrderRequestType } from "@/interfaces/WorkOrder";

const API = "http://127.0.0.1:8000/";

function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getOrdenesTrabajo(): Promise<WorkOrderResponse[] | null> {
    try {
        const response = await fetch(`${API}maintenance/ordenes-trabajo/`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch work orders:", error);
        return null;
    }
}

export async function getOrdenTrabajo(id: string): Promise<WorkOrderRequestType | null> {
    try {
        const response = await fetch(`${API}maintenance/ordenes-trabajo/${id}/`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch work order:", error);
        return null;
    }
}

export async function createWorkOrder(data: WorkOrderRequestType): Promise<WorkOrderRequestType | null> {
    try {
        const response = await fetch(`${API}maintenance/ordenes-trabajo/`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to create work order:", error);
        return null;
    }
}

export async function updateWorkOrder(id: string, data: WorkOrderRequestType): Promise<WorkOrderRequestType | null> {
    try {
        const response = await fetch(`${API}maintenance/ordenes-trabajo/${id}/`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to update work order:", error);
        return null;
    }
}

export async function deleteWorkOrder(id: string): Promise<boolean> {
    try {
        const response = await fetch(`${API}maintenance/ordenes-trabajo/${id}/`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        return response.ok;
    } catch (error) {
        console.error("Failed to delete work order:", error);
        return false;
    }
}