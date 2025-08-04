import type { ServiceReportRequest, ServiceReportResponse } from "@/interfaces/ServiceReport";

const API = "http://127.0.0.1:8000/";

const getAuthHeaders = (): HeadersInit =>{
  const token = localStorage.getItem("accessToken");
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
} 

export async function createServiceReport(data: ServiceReportRequest): Promise<ServiceReportResponse | null>{
    try{
        const response = await fetch(`${API}maintenance/reportes-servicio/`,{
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if(!response.ok)
            throw new Error(`Error ${response.status}: ${response.statusText}`);

        const result : ServiceReportResponse = await response.json();
        return result;
    }catch{
        console.log("Error al crear el reporte de servicio");
        return null;
    }
}