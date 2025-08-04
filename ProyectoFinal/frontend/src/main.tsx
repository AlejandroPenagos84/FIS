import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css"
import Login from "@/pages/Login";
import ClienteForm from "@/pages/Client/ClientRegisterForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import AppLayout from "./layout/AppLayout";
import { UsersTable } from "./pages/User/UsersTable";
import UserRegisterForm from "@/pages/User/UserRegisterForm";
import { ClientsTable } from "./pages/Client/ClientsTable";
import { Home } from "./pages/Home"
import { EquipmentTable } from "./components/EquipmentComponents/EquipmentTable";
import EquipmentForm from "./components/EquipmentComponents/EquipmentRegisterForm";
import { SiteAndServiceAreaForm } from "./components/SiteForm/SiteAndServiceAreaForm";
import { ClientInformation } from "./pages/Client/ClientInformation";
import { MaintenanceForm } from "./components/WorkOrderForm/MaintenanceForm";
import { WorkOrder } from "./pages/WorkOrder/WorkOrder";
import { MaintenanceEquipmentInfo } from "./components/EquipmentComponents/MaintenanceEquipmentInfo";
import { MaintenancePage } from "./pages/Maintenance/MaintenancePage";
import { QuotationPage } from "./pages/Quotation/QuotationPage";
import { ServiceReportPage } from "./pages/ServiceReport/ServiceReportPage";

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
          { path: "clients/modify/:clientId", Component: ClienteForm },
          { path: "clients/modify/:clientId/sites", Component: SiteAndServiceAreaForm },
          { path: "clients/views/:clientId", Component: ClientInformation },
          { path: "clients", Component: ClientsTable },

          { path: "equipments/register", Component: EquipmentForm },
          { path: "equipments/register/:equipmentId", Component: EquipmentForm },
          { path: "equipments/views/:equipmentId", Component: MaintenanceEquipmentInfo },
          { path: "equipments", Component: EquipmentTable },

          {path: "services", Component: MaintenancePage },

          { path: "workOrder", Component: WorkOrder },

          {path: "quotes", Component: QuotationPage },

          {path: "serviceReport", Component: ServiceReportPage },
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