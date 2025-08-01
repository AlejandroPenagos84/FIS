import { deleteUser, getUsers } from "@/api/User.API"
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { User } from "@/interfaces/User"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";


export function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const selectUser = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const addUser = () => {
    navigate(`/users/register`);
  };

  const deleteUs = async (userId: string) => {
    const confirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (!confirmed) return;

    const success = await deleteUser(userId);
    if (success) {
      await fetchUsers();
      alert("Usuario eliminado")
    } else {
      alert("No se pudo eliminar el usuario.");
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>Usuarios</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead>Names</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead className="text-center">Rol</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Seleccionar</TableHead>
            <TableHead className="text-center">Eliminar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.first_name}</TableCell>
              <TableCell>{user.last_name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell><Button key={user.id} onClick={() => selectUser(user.id)}>Seleccionar Usuario</Button></TableCell>
              <TableCell><Button key={user.id} onClick={() => deleteUs(user.id)}>X</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={()=>addUser()}>Agregar Usuario</Button>
    </div>


  )
}