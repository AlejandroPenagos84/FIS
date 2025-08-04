import type { QuotationRequest } from "@/interfaces/Quotation";

const API = "http://127.0.0.1:8000/";


function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("accessToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createQuotation(data: QuotationRequest) {
  const response = await fetch(`${API}/maintenance/cotizaciones/`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear la cotización");
  }

  return await response.json();
}

export async function getQuotations() {
  const response = await fetch(`${API}/maintenance/cotizaciones/`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Error al obtener cotizaciones");
  }

  return await response.json();
}
