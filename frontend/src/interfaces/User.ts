export interface User {
  id: string; // solo lectura
  identification: string; // solo lectura
  username?: string; // opcional y puede ser null
  first_name?: string; // opcional
  last_name?: string; // opcional
  email: string; // requerido
  phone: string,
  password?: string; // opcional (por seguridad a veces no se devuelve)
  role?: 'Administrador' | 'Cliente' | 'Ingeniero Técnico' | 'Supervisor'; // enum aproximado
}