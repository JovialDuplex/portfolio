import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { isTokenExpired } from "@/utils/tokenUtils";

/**
 * Hook qui surveille l'expiration du token JWT.
 * - Pose un setTimeout précis qui se déclenche exactement à l'expiration.
 * - Appelle logoutUser() + redirige vers /admin/login automatiquement.
 * - Se réinitialise à chaque changement de token (nouveau login).
 * - Doit être utilisé dans AdminLayout (actif uniquement sur les pages admin).
 */
const useTokenWatcher = function () {
    const navigate = useNavigate();
    const token = useUserStore((state) => state.token);
    const tokenExpiration = useUserStore((state) => state.tokenExpiration);
    const logoutUser = useUserStore((state) => state.logoutUser);

    useEffect(() => {
        // Pas de token → rien à surveiller
        if (!token || !tokenExpiration) return;

        // Si déjà expiré au montage → déconnexion immédiate
        if (isTokenExpired(token)) {
            console.warn("Token déjà expiré au montage. Déconnexion immédiate.");
            logoutUser();
            navigate("/admin/login", { replace: true });
            return;
        }

        // Calcul du délai restant avant expiration
        const delayMs = tokenExpiration - Date.now();
        console.info(
            `[TokenWatcher] Token valide. Déconnexion automatique dans ${Math.round(delayMs / 1000)}s ` +
            `(le ${new Date(tokenExpiration).toLocaleString()})`
        );

        const timerId = setTimeout(() => {
            console.warn("[TokenWatcher] Token expiré. Déconnexion automatique.");
            logoutUser();
            navigate("/admin/login", { replace: true });
        }, delayMs);

        // Nettoyage du timer si le composant se démonte ou si le token change
        return () => {
            clearTimeout(timerId);
        };
    }, [token, tokenExpiration]);
};

export default useTokenWatcher;
