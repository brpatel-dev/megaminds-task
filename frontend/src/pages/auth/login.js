import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Link,
    InputAdornment,
    IconButton,
    Divider,
    Stack,
    CircularProgress
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Email,
    Lock,
    Google,
    GitHub
} from '@mui/icons-material';
import { loginUser } from "@/services/authService";
import { loginSuccess } from "@/redux/authSlice";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [Loading, setLoading] = useState(false);


    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true)
        try {
            const res = await loginUser({ email, password });
            if (res?.response?.data) {
                toast.error(res?.response?.data?.msg || "Something went wrong!");
            } else {
                toast.success("Successfully Login!");
                dispatch(loginSuccess(res.token));
                router.push("/");
            }
        } catch (err) {
            console.error("Login failed:", err);
        } finally {
            setLoading(false)
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mt: 8
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: '100%',
                        borderRadius: 2
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: 'bold', mb: 3 }}
                    >
                        Welcome Back
                    </Typography>

                    <Box component="form" sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            id="password"
                            autoComplete="current-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="primary" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ mb: 2 }}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleLogin}
                            sx={{
                                mt: 2,
                                mb: 3,
                                py: 1.5,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                borderRadius: 1
                            }}
                        >
                            {Loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : "Sign In"}
                        </Button>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body1">
                                Don't have an account?{' '}
                                <Link
                                    href="register"
                                    fontWeight="medium"
                                    underline="hover"
                                    color="primary"
                                >
                                    Sign up
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
