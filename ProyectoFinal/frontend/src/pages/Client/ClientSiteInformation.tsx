import { getServiceAreasBySite } from "@/api/ServiceArea.API";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { ServiceAreaResponse } from "@/interfaces/ServiceArea";
import type { SiteTypeResponse } from "@/interfaces/Site";
import { useEffect, useState } from "react";

type Props = {
    site: SiteTypeResponse;
}

export function ClientSiteInformation({ site }: Props) {
    const [serviceAreas, setServiceAreas] = useState<ServiceAreaResponse[]>([]);

    const fetchServiceAreas = async () => {
        // Assuming you have a function to fetch service areas for the site
        if (site && site.id) {
            const areas = await getServiceAreasBySite(site.id);
            setServiceAreas(areas || []);
        }
    };

    useEffect(() => {
        fetchServiceAreas();
    }, [site]);

    return (
        <div className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Información de la Sede</h3>
            <div className="space-y-2">
                <div>
                    <span className="font-semibold">Nombre:</span> {site.name}
                </div>
                <div>
                    <span className="font-semibold">Dirección:</span> {site.address}
                </div>
            </div>
            <h3 className="text-xl font-bold mb-4">Área de servicio</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Numero Equipos</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {serviceAreas.map((serviceArea) => (
                        <TableRow key={serviceArea.id}>
                            <TableCell>{serviceArea.id}</TableCell>
                            <TableCell>{serviceArea.name}</TableCell>
                            <TableCell className="text-center">{serviceArea.equipos_count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}