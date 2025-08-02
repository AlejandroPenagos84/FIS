import type { MaintenanceResponse } from "@/interfaces/Maintenance";
import { Table, TableCaption, TableRow, TableCell, TableHeader, TableHead, TableBody }
    from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getUser } from "@/api/User.API";

type MaintenanceTableProps = {
    maintenanceInfo: MaintenanceResponse[];
};

export function MaintenanceTable({ maintenanceInfo }: MaintenanceTableProps) {
    const [users, setUsers] = useState<Record<string, string>>({});

    const fetchUsers = async () => {

        if (!maintenanceInfo) return;
        const userMap: Record<string, string> = {}; // Mapa

        await Promise.all(
            maintenanceInfo.map(async (maintenance) => {
                if (maintenance.usuario) {
                    const userData = await getUser(maintenance.usuario);
                    console.log(maintenance.usuario);
                    userMap[maintenance.id] = userData
                        ? `${userData.first_name} ${userData.last_name}`
                        : "Desconocido";
                }
            })
        );

        setUsers(userMap);
    };

    useEffect(() => {
        fetchUsers();
    }, [maintenanceInfo]);

    return (
        <Table>
            <TableCaption>Listado de Mantenimientos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Estado</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {maintenanceInfo &&
                    maintenanceInfo.map((maintenance) => (
                        <TableRow key={maintenance.id}>
                            <TableCell>{maintenance.id}</TableCell>
                            <TableCell>{maintenance.tipo}</TableCell>
                            <TableCell>{users?.[maintenance.id] || "Desconocido"}</TableCell>
                            <TableCell>{maintenance.estado}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}