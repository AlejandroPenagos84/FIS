// api/Client.ts

import type { Client, ClientResponse } from "@/interfaces/Client";

const API = "http://127.0.0.1:8000/";

export async function getClients(): Promise<ClientResponse[] | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}clients/clientes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: ClientResponse[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    return null;
  }
}

export async function getClient(id: string): Promise<ClientResponse | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}clients/clientes/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const client: ClientResponse = await response.json();
    return client;
  } catch (error) {
    console.error("Failed to fetch client:", error);
    return null;
  }
}

export async function postClient(data: Client): Promise<boolean> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}clients/clientes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(result);
    return true;
  } catch (error) {
    console.error("Failed to create client:", error);
    return false;
  }
}

export async function updateClient(id: string, data: Partial<Client>): Promise<Client | null> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}clients/clientes/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const updated: Client = await response.json();
    return updated;
  } catch (error) {
    console.error("Failed to update client:", error);
    return null;
  }
}

export async function deleteClient(id: string): Promise<boolean> {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${API}clients/clientes/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Failed to delete client:", error);
    return false;
  }
}
