import { createContext, useContext, useState, useCallback } from "react";
import { useCookies } from 'react-cookie';

import { api } from "../services/api";


interface TokenState {
    token: string;
}

interface AuthContextData {
    token: TokenState;
    signIn: (user: object) => Promise<void>;
    signUp: (email: string, password: string) => Promise<any>;
    signOut: () => void;
    userLogged(): boolean;
}

export interface AuxProps {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: AuxProps) => {
    const [cookies, setCookie] = useCookies(['token', 'user']);
    const [token, setToken] = useState<TokenState>(() => {

        const token = cookies.token;
        if (token) {
            api.defaults.headers.authorization = `Bearer ${token}`;
            return { token };
        }

        return {} as TokenState;
    });

    const signIn = useCallback(async (userData: object) => {
        const response = await api.post("users/session", userData)

        const token = response.data?.rows.token

        setToken(token);

        setCookie('token', token);
        setCookie('user', JSON.stringify(response.data?.rows.user))

        api.defaults.headers.Authorization = `Bearer ${token}`;

    }, [])

    const signUp = useCallback(async (email: string, password: string) => {
        const content = await api.post("/users/session", { email, password })
        return content
    }, [])

    const signOut = useCallback(() => {
        setToken({} as TokenState);
    }, [])


    const userLogged = () => {
        const token = cookies.token;

        if (token) {
            return true;
        }
        return false;
    };


    return (
        <AuthContext.Provider value={{ token, signIn, signOut, signUp, userLogged }}>
            {children}
        </AuthContext.Provider>
    )

}


export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}