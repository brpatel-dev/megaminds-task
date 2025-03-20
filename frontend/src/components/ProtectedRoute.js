import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login"); // Redirect to login page
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, router]);

    if (loading) return <p>Loading...</p>; // Prevent flicker on page load

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;
