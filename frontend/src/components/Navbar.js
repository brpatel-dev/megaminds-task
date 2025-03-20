import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useRouter } from "next/router";
import { Button } from "@mui/material";

const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.push("/auth/login");
    };

    return (
        <nav>
            <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
        </nav>
    );
};

export default Navbar;
