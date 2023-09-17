import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { api } from "../services/api";



interface AuthContextData {
    signed: boolean;
    signIn: (user: object) => Promise<void>;
    signUp: (email: string, password: string) => Promise<any>;
    signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export interface AuxProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuxProps) => {
    const [user, setUser] = useState<object | null>(null);   
    

    useEffect(() => {
        const storagedUser = sessionStorage.getItem('@App:user');
        const storagedToken = sessionStorage.getItem('@App:token');

        if (storagedToken && storagedUser) {
            setUser(JSON.parse(storagedUser));
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
        }
        
    }, []);

    const signIn = async (userData: object) => {
        const response = await api.post("users/session", userData)
        
        const token = response.data?.rows.token


        api.defaults.headers.Authorization = `Bearer ${token}`;

        sessionStorage.setItem('@App:user', JSON.stringify(response.data?.rows.user));
        sessionStorage.setItem('@App:token', token);
    }

    const signUp = async (email: string, password: string) => {
        const content = await api.post("/users/session", { email, password })
        return content
    }

    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ signed: Boolean(user), signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )

}


export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}