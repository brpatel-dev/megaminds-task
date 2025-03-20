import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { 
    Toolbar, 
    Typography, 
    Button, 
    Box, 
    Avatar, 
    Menu, 
    MenuItem, 
    Paper
} from "@mui/material";
import { 
    MenuBook as MenuBookIcon, 
    AccountCircle, 
    Logout as LogoutIcon,
    Person as PersonIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon
} from '@mui/icons-material';
import { useState } from "react";
import { logout } from "@/redux/authSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const user = useSelector(state => state.auth.user);
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push("/auth/login");
        handleClose();
    };

    const handleProfile = () => {
        router.push("/profile");
        handleClose();
    };

    return (
        <Paper 
            elevation={1}
            sx={{ 
                borderRadius: 2,
                mb: 3
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MenuBookIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                            fontWeight: 'bold',
                            color: 'primary.main' 
                        }}
                    >
                        BookShelf
                    </Typography>
                </Box>

                <Box>
                    <Button
                        color="inherit"
                        onClick={handleMenu}
                        endIcon={<KeyboardArrowDownIcon />}
                        sx={{ 
                            textTransform: 'none',
                            borderRadius: 1
                        }}
                        startIcon={
                            <Avatar 
                                sx={{ 
                                    width: 28, 
                                    height: 28,
                                    bgcolor: 'primary.main'
                                }}
                            >
                                <PersonIcon fontSize="small" />
                            </Avatar>
                        }
                    >
                        {user?.email || 'User'}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            sx: { 
                                minWidth: 180,
                                borderRadius: 1,
                                mt: 0.5
                            }
                        }}
                    >
                        <MenuItem onClick={handleLogout}>
                            <LogoutIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
                            <Typography variant="body2" color="error">Logout</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </Paper>
    );
};

export default Navbar;