import { useState, useEffect } from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    Box,
    Typography,
    Divider,
    CircularProgress
} from "@mui/material";
import {
    Title as TitleIcon,
    Person as PersonIcon,
    MenuBook as MenuBookIcon,
    Save as SaveIcon
} from '@mui/icons-material';

const BookForm = ({ open, isLoading, handleClose, onSubmit, initialData }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [errors, setErrors] = useState({ title: false, author: false });

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setAuthor(initialData.author);
        } else {
            setTitle("");
            setAuthor("");
        }
        setErrors({ title: false, author: false });
    }, [initialData, open]);

    const validateForm = () => {
        const newErrors = {
            title: title.trim() === "",
            author: author.trim() === ""
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({ title, author });
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    width: '100%',
                    maxWidth: '500px'
                }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MenuBookIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {initialData ? "Edit Book" : "Add New Book"}
                    </Typography>
                </Box>
            </DialogTitle>

            <Divider />

            <DialogContent sx={{ pt: 3 }}>
                <TextField
                    label="Book Title"
                    fullWidth
                    margin="normal"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    error={errors.title}
                    helperText={errors.title ? "Title is required" : ""}
                    autoFocus
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <TitleIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    label="Author Name"
                    fullWidth
                    margin="normal"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    error={errors.author}
                    helperText={errors.author ? "Author is required" : ""}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    onClick={handleClose}
                    color="inherit"
                    sx={{
                        textTransform: 'none',
                        borderRadius: 1
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 1,
                        px: 2
                    }}
                >
                    {isLoading ? (
                        <CircularProgress size={20} sx={{ color: 'white' }} />
                    ) : (
                        initialData ? "Update Book" : "Add Book"
                    )}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookForm;