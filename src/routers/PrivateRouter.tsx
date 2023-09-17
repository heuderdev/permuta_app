import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/auth"

export interface AuxProps {
    children: React.ReactNode
}

export const PrivateRouter = ({ children }: AuxProps) => {
    const { signed } = useAuth()
    
    if (!signed) {
        return <Navigate to="/login" />
    }

    return children
}