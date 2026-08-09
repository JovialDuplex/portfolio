import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { isTokenExpired } from "@/utils/tokenUtils";

/**
 * Composant de protection des routes admin.
 * - Vérifie la présence de l'utilisateur et du token dans le store.
 * - Vérifie que le token n'est pas expiré au moment de l'accès à la route.
 * - Si non authentifié ou token expiré → redirige vers /admin/login.
 * - Si authentifié et token valide → rend les routes enfants (<Outlet />).
 */
const ProtectedRoute = function () {
    const user = useUserStore((state) => state.user);
    const token = useUserStore((state) => state.token);

    // Vérification : utilisateur présent et token valide (non expiré)
    const isAuthenticated = user && token && !isTokenExpired(token);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
