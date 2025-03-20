import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { TextField, Button, Container, Typography } from "@mui/material";
import { loginUser } from "@/services/authService";
import { loginSuccess } from "@/redux/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const res = await loginUser({ email, password });
            dispatch(loginSuccess(res.token));
            router.push("/");
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Login</Typography>
            <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
        </Container>
    );
};

export default Login;
