"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface User {
  correo: string;
  rol: string;
}

interface AuthContextType {
  estaAutenticado : boolean;
  user: User | null;
  login: (correo: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [estaAutenticado, setEstaAutenticado] = useState<boolean>(false);

  const login = async (correo: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post("https://adolfoturismo-vlaln-bk-04aae011277a.herokuapp.com/api/route/Validar_Credenciales_Usuario", {
        correo,
        password,
      });

      const data = res.data;

      if (data.codigoRespuesta === 0) {
        setEstaAutenticado(true);
        setUser(data.detalle);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setEstaAutenticado(false);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout, estaAutenticado }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};