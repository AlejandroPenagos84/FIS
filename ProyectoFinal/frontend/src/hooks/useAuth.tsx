import { createContext, useContext, useState, useEffect } from "react";
import type { LoginUserType } from "@/interfaces/LoginUser";
import { loginUser } from "@/api/Login";

type AuthContextType = {
  user: string | null; // guardamos el token aquí
  login: (credentials: LoginUserType) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return ctx;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setUser(token);
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginUserType) => {
    const tokens = await loginUser(credentials);
    setUser(tokens.access);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
