import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css"
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ClienteForm from "@/pages/ClientForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import AppLayout from "./layout/AppLayout";

const router = createBrowserRouter([
  { path: "/", Component: Login },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "register", Component: Register },
          { path: "client-form", Component: ClienteForm },
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