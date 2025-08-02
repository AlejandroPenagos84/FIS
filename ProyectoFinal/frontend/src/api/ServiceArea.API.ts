import type { ServiceAreaResponse, ServiceAreaType } from "@/interfaces/ServiceArea";

const API = "http://127.0.0.1:8000/";

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getServiceAreas(): Promise<ServiceAreaType[] | null> {
  try {
    const response = await fetch(`${API}equipment/areas-servicio/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch service areas:", error);
    return null;
  }
}

export async function getServiceArea(id: string): Promise<ServiceAreaType | null> {
  try {
    const response = await fetch(`${API}equipment/areas-servicio/${id}/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch service area:", error);
    return null;
  }
}

export async function createServiceArea(data: ServiceAreaType): Promise<ServiceAreaType | null> {
  try {
    const response = await fetch(`${API}equipment/areas-servicio/`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to create service area:", error);
    return null;
  }
}

export async function updateServiceArea(id: string, data: ServiceAreaType): Promise<ServiceAreaType | null> {
  try {
    const response = await fetch(`${API}equipment/areas-servicio/${id}/`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to update service area:", error);
    return null;
  }
}

export async function deleteServiceArea(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API}equipment/areas-servicio/${id}/`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to delete service area:", error);
    return false;
  }
}

export async function getServiceAreasBySite(siteId: string): Promise<ServiceAreaResponse[] | null> {
  try {
    const response = await fetch(`${API}clients/sedes/${siteId}/areas_servicio/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to fetch service areas by site:", error);
    return null;
  }
}

export async function getServiceAreasPerClient(clientId: string): Promise<ServiceAreaResponse[] | null> {
  try {
    const response = await fetch(`${API}clients/clientes/${clientId}/areas_servicio/`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    const servicesAreas: ServiceAreaResponse[] = [];

    data.forEach((item:any) => {
      item.areas_servicio.forEach((area: ServiceAreaResponse) => {
        servicesAreas.push(area);
      });
    });

    return servicesAreas
  } catch (error) {
    console.error("Failed to fetch service areas for client:", error);
    return null;
  }
}