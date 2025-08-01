import { getClients, deleteClient } from "@/api/Client.API";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ClientResponse } from "@/interfaces/Client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function ClientsTable() {
  const [clients, setClients] = useState<ClientResponse[]>([]);
  const navigate = useNavigate();

  const fetchClients = async () => {
    try {
      const data = await getClients();
      if (data) {
        setClients(data);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const selectClient = (clientId: number) => {
    navigate(`/clients/${clientId}`);
  };

  const addClient = () => {
    navigate(`/clients/register`);
  };

  const deleteCl = async (clientId: string) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este cliente?");
    if (!confirmed) return;

    const success = await deleteClient(clientId);
    if (success) {
      await fetchClients();
      alert("Cliente eliminado");
    } else {
      alert("No se pudo eliminar el cliente.");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-center">Teléfono</TableHead>
            <TableHead className="text-center">Sede</TableHead>
            <TableHead className="text-center">Seleccionar</TableHead>
            <TableHead className="text-center">Eliminar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.id}</TableCell>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone ?? "N/A"}</TableCell>
              <TableCell>{client.sede_name ?? "Sin sede"}</TableCell>
              <TableCell>
                <Button onClick={() => selectClient(client.id)}>Seleccionar</Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => deleteCl(client.id.toString())}>X</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={addClient}>Agregar Cliente</Button>
    </div>
  );
}
