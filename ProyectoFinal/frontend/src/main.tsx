import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css"
import Login from "@/pages/Login";
import Register from "@/pages/User/UserRegisterForm";
import ClienteForm from "@/pages/Client/ClientRegisterForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import AppLayout from "./layout/AppLayout";
import { UsersTable } from "./pages/User/UsersTable";
import UserRegisterForm from "@/pages/User/UserRegisterForm";
import { ClientsTable } from "./pages/Client/ClientsTable";
import {Home} from "./pages/Home"
import { EquipmentTable } from "./pages/Equipment/EquipmentTable";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "home", Component: Home },
          
          // Primero las rutas más específicas
          { path: "users/register", Component: UserRegisterForm },
          { path: "users/:userId", Component: UserRegisterForm },
          { path: "users", Component: UsersTable },

          { path: "clients/register", Component: ClienteForm },
          { path: "clients/:clientId", Component: ClienteForm},
          { path: "clients", Component: ClientsTable },

          { path: "equipments", Component: EquipmentTable },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </AuthProvider>
);