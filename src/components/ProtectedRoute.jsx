import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "@/store/userStore";
import { isTokenExpired } from "@/utils/tokenUtils";

/**
 * Component protecting the admin routes.
 * - Checks the presence of the user and the token in the store.
 * - Checks that the token is not expired when accessing the route.
 * - If not authenticated or token expired → redirects to /admin/login.
 * - If authenticated and token valid → renders the child routes (<Outlet />).
 */
const ProtectedRoute = function () {
    const user = useUserStore((state) => state.user);
    const token = useUserStore((state) => state.token);

    // Check: user present and valid token (not expired)
    const isAuthenticated = user && token && !isTokenExpired(token);

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
