import { useState } from "react";
import { registerUser } from "../../services/authService";
import { TextField, Button, Container, Typography } from "@mui/material";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            await registerUser({ email, password });
            alert("User registered successfully");
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Register</Typography>
            <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" color="primary" onClick={handleRegister}>Register</Button>
        </Container>
    );
};

export default Register;
