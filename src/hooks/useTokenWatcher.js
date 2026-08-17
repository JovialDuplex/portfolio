import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { isTokenExpired } from "@/utils/tokenUtils";

/**
 * Hook that watches the JWT token expiration.
 * - Sets a precise setTimeout that fires exactly at expiration.
 * - Calls logoutUser() + redirects to /admin/login automatically.
 * - Resets itself on every token change (new login).
 * - Must be used in AdminLayout (only active on admin pages).
 */
const useTokenWatcher = function () {
    const navigate = useNavigate();
    const token = useUserStore((state) => state.token);
    const tokenExpiration = useUserStore((state) => state.tokenExpiration);
    const logoutUser = useUserStore((state) => state.logoutUser);

    useEffect(() => {
        // No token → nothing to watch
        if (!token || !tokenExpiration) return;

        // If already expired on mount → immediate logout
        if (isTokenExpired(token)) {
            console.warn("Token already expired on mount. Logging out immediately.");
            logoutUser();
            navigate("/admin/login", { replace: true });
            return;
        }

        // Compute the remaining time before expiration
        const delayMs = tokenExpiration - Date.now();
        console.info(
            `[TokenWatcher] Token valid. Automatic logout in ${Math.round(delayMs / 1000)}s ` +
            `(on ${new Date(tokenExpiration).toLocaleString()})`
        );

        const timerId = setTimeout(() => {
            console.warn("[TokenWatcher] Token expired. Logging out automatically.");
            logoutUser();
            navigate("/admin/login", { replace: true });
        }, delayMs);

        // Clean up the timer if the component unmounts or the token changes
        return () => {
            clearTimeout(timerId);
        };
    }, [token, tokenExpiration, navigate, logoutUser]);
};

export default useTokenWatcher;