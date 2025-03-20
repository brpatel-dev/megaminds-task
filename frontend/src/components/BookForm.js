import { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const BookForm = ({ open, handleClose, onSubmit, initialData }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setAuthor(initialData.author);
        } else {
            setTitle("");
            setAuthor("");
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, author });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{initialData ? "Edit Book" : "Add New Book"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    fullWidth
                    margin="dense"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Author"
                    fullWidth
                    margin="dense"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    {initialData ? "Update" : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookForm;