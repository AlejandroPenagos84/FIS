import { useEffect, useState } from "react";
import { getClient } from "@/api/Client.API";
import { useParams } from "react-router-dom";
import type { ClientResponse } from "@/interfaces/Client";
import type {  SiteTypeResponse } from "@/interfaces/Site";
import { getSitesClients } from "@/api/Site.API";
import { ClientSiteInformation } from "./ClientSiteInformation";

export function ClientInformation() {
    const { clientId } = useParams<{ clientId: string }>();
    const [clientInfo, setClientInfo] = useState<ClientResponse | null>(null);
    const [sedesInfo, setSedesInfo] = useState<SiteTypeResponse[]>([]); // Adjust type as needed

    const fetchSites = async () => {
        if (clientId) {
            const data = await getSitesClients(clientId);
            setSedesInfo(data || []);
        }
    }

    useEffect(() => {
        const fetchClientInfo = async () => {
            if (clientId) {
                const data = await getClient(clientId);
                setClientInfo(data);
            }
        };
        fetchClientInfo();
        fetchSites();
    }, [clientId]);

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Información del Cliente</h2>
            {clientInfo ? (
                <div className="space-y-2">
                    <div>
                        <span className="font-semibold">Tipo de documento:</span> {clientInfo.type}
                    </div>
                    <div>
                        <span className="font-semibold">Identificación:</span> {clientInfo.identification}
                    </div>
                    <div>
                        <span className="font-semibold">Razón Social:</span> {clientInfo.name}
                    </div>
                    <div>
                        <span className="font-semibold">País:</span> {clientInfo.country}
                    </div>
                    <div>
                        <span className="font-semibold">Teléfono:</span> {clientInfo.phone}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {clientInfo.email}
                    </div>
                    <div>
                        <span className="font-semibold">Dirección:</span> {clientInfo.address}
                    </div>
                    {sedesInfo.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-xl font-bold mb-2">Sedes del Cliente</h3>
                            {sedesInfo.map((site) => (
                                <ClientSiteInformation key={site.id} site={site} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div>Cargando información...</div>
            )}
        </div>
    );
}