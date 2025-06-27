import React from "react";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface User {
    correo: string;
    rol: string;
}

interface AuthContextType{
    user: User | null;
    login:(correo: string, password: string) => Promise<boolean>;
    logout:()=>void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () =>{
    const context=useContext(AuthContext);
    if(!context) throw new Error("El contexto tiene que implementarse en el provider")
}

export const AuthProvider = ({children}: {children: ReactNode}) =>{
    const [user, setUser] = useState<User | null>(null);

    const login = async(correo: string, password: string): Promise<boolean>=>{

        try{

            const res = await axios.post("https://raquelturismo-vlakno-be-204e937b3637.herokuapp.com/api/route/Obtener_Usuarios", 
                {
                    correo, password
                });

                const data = res.data;

                if(data.codigoRespuesta === 0){
                    setUser(data.detalle);
                    return true;
                }
            return false;
        }
        catch{
            return false;
        }

    }

    const logout= () =>{
        setUser (null);
    }

    return <AuthContext.Provider value ={{user, login, logout}}>{children}</AuthContext.Provider>;

}