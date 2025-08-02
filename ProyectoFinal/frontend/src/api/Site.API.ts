import type { SiteType, SiteTypeResponse } from "@/interfaces/Site";

const API = "http://127.0.0.1:8000/";

export async function getSites(): Promise<SiteType[] | null> {
  try {
    const token = localStorage.getItem("accessToken");
    console.log(token);

    const response = await fetch(`${API}clients/sedes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: SiteType[] = await response.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch sites:", error);
    return null;
  }
}

export async function getSiteById(id: string): Promise<SiteType | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}clients/sedes/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: SiteType = await response.json();
    return data;

  } catch (error) {
    console.error(`Failed to fetch site ${id}:`, error);
    return null;
  }
}

export async function createSite(site: SiteType): Promise<SiteType | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}clients/sedes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: SiteType = await response.json();
    return data;

  } catch (error) {
    console.error("Failed to create site:", error);
    return null;
  }
}

export async function updateSite(id: string, site: SiteType): Promise<SiteType | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}clients/sedes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(site),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: SiteType = await response.json();
    return data;

  } catch (error) {
    console.error(`Failed to update site ${id}:`, error);
    return null;
  }
}

export async function deleteSite(id: string): Promise<boolean> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}clients/sedes/${id}/`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return true;

  } catch (error) {
    console.error(`Failed to delete site ${id}:`, error);
    return false;
  }
}

export async function getSitesClients(clientId: string): Promise<SiteTypeResponse[] | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}clients/clientes/${clientId}/sedes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: SiteTypeResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return null;
  }
}