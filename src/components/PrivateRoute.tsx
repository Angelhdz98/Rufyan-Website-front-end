



import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../pages/ControlPanel/authStore";
import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../types/typesIndex";
import { useEffect, useState } from "react";

const PrivateRoute = () => {
    const [isAdminAuth, setIsAdminAuth] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const accessToken = getAccessToken();

            if (!accessToken) {
                setIsAdminAuth(false);
                return;
            }

            try {
                const jwt = jwtDecode<TokenPayload>(accessToken);
                console.log("Token decodificado en PrivateRoute:", jwt);
                console.log("Rol:", jwt.role);

                // Verificar si el rol es ROLE_ADMIN
                if (jwt.role === 'ROLE_ADMIN') {
                    setIsAdminAuth(true);
                } else {
                    setIsAdminAuth(false);
                }
            } catch (error) {
                console.error("Error decodificando token:", error);
                setIsAdminAuth(false);
            }
        };

        // Revisar autenticación al montar el componente
        checkAuth();

        // Escuchar cambios en localStorage (cuando el usuario hace login en otra pestaña)
        const handleStorageChange = () => {
            checkAuth();
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    // Mientras se verifica, mostrar nada (o un loader si prefieres)
    if (isAdminAuth === null) {
        return <div>Verificando autenticación...</div>;
    }

    return isAdminAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;