// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import * as authService from "../services/authService";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const user = await authService.me();

      setUser(!user.name ? null : user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function signup(name: string, email: string, password: string) {
    try {
      await authService.register(name, email, password);
      setLoading(true);
      await authService.login(email, password);
    } catch (err: any) {
      alert(err.response?.data?.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const user = await authService.login(email, password);
    setUser(user);
  }

  async function logout() {
    await authService.logout();
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
