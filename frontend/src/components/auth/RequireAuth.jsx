import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * RequireAuth Component
 * Protects routes by checking if user is authenticated
 * Redirects to landing page if not authenticated
 */
const RequireAuth = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            // Redirect to landing page if not authenticated
            navigate("/", { replace: true, state: { from: location } });
        }
    }, [user, navigate, location]);

    // Only render children if user is authenticated
    return user ? <>{children}</> : null;
};

export default RequireAuth;
