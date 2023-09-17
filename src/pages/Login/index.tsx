import React from "react";
import { useAuth } from "../../contexts/auth";

export const Login = () => {
    const { signIn } = useAuth();

    async function handleLogin() {
        await signIn({ email: 'heuderdev@gmail.com', password: '123456' });
    }

    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}