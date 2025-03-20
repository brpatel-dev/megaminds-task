import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks, setLoading, setError } from "../redux/bookSlice";
import { fetchBooks, addBook, updateBook, deleteBook } from "../services/bookService";
import { 
  Typography, 
  CircularProgress, 
  Button, 
  List, 
  ListItem, 
  Box,
  Container,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import BookForm from "@/components/BookForm";
import Navbar from "./Navbar";
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Book as BookIcon,
  MenuBook as MenuBookIcon,
  Person as PersonIcon
} from '@mui/icons-material';

export default function BookList() {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.books);
    const [formOpen, setFormOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    

    useEffect(() => {
        const loadBooks = async () => {
            dispatch(setLoading());
            try {
                const booksData = await fetchBooks();
                dispatch(setBooks(booksData));
            } catch (err) {
                dispatch(setError(err));
            }
        };

        loadBooks();
    }, [dispatch]);

    const handleAddBook = async (bookData) => {
        setisLoading(true)
        try {
            const newBook = await addBook(bookData);
            dispatch(setBooks([...books, newBook]));
            setFormOpen(false);
        } catch (err) {
            dispatch(setError(err));
        } finally {
            setisLoading(false)
        }
    };

    const handleEditBook = async (bookData) => {
        setisLoading(true)
        try {
            const updatedBook = await updateBook(selectedBook._id, bookData);
            dispatch(setBooks(books.map((b) => (b._id === selectedBook._id ? updatedBook : b))));
            setFormOpen(false);
            setSelectedBook(null);
        } catch (err) {
            dispatch(setError(err));
        } finally {
            setisLoading(false)
        }
    };

    const handleDeleteBook = async (id) => {
        try {
            await deleteBook(id);
            dispatch(setBooks(books.filter((b) => b._id !== id)));
        } catch (err) {
            dispatch(setError(err));
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Navbar />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, mt: 2 }}>
                    <Typography 
                        variant="h4" 
                        component="h1" 
                        sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}
                    >
                        <MenuBookIcon sx={{ mr: 1, fontSize: 35 }} />
                        Book Management
                    </Typography>
                    
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={() => setFormOpen(true)} 
                        startIcon={<AddIcon />}
                        sx={{ 
                            borderRadius: 1,
                            textTransform: 'none',
                            py: 1,
                            px: 2,
                            fontWeight: 'medium'
                        }}
                    >
                        Add New Book
                    </Button>
                </Box>

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                    </Box>
                )}
                
                {error && (
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: 2, 
                            mb: 3, 
                            bgcolor: '#ffebee', 
                            borderRadius: 1,
                            borderLeft: '4px solid #f44336' 
                        }}
                    >
                        <Typography color="error">{error?.msg}</Typography>
                    </Paper>
                )}

                {books?.length === 0 && !loading ? (
                    <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
                        <BookIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            No books in your collection
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Start by adding your first book
                        </Typography>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => setFormOpen(true)} 
                            startIcon={<AddIcon />}
                            sx={{ 
                                borderRadius: 1,
                                textTransform: 'none' 
                            }}
                        >
                            Add New Book
                        </Button>
                    </Paper>
                ) : (
                    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                        <List sx={{ p: 0 }}>
                            {books?.map((book, index) => (
                                <ListItem 
                                    key={book._id} 
                                    divider={index !== books.length - 1}
                                    sx={{ 
                                        py: 2,
                                        px: 3,
                                        '&:hover': { 
                                            bgcolor: 'rgba(0, 0, 0, 0.04)' 
                                        } 
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <Avatar 
                                            sx={{ 
                                                bgcolor: 'primary.main', 
                                                mr: 2 
                                            }}
                                        >
                                            <BookIcon />
                                        </Avatar>
                                        
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                                                {book.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    {book.author}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        
                                        <Box>
                                            <Tooltip title="Edit book">
                                                <IconButton 
                                                    color="primary" 
                                                    onClick={() => { setSelectedBook(book); setFormOpen(true); }}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            
                                            <Tooltip title="Delete book">
                                                <IconButton 
                                                    color="error" 
                                                    onClick={() => handleDeleteBook(book._id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}

                <BookForm
                    open={formOpen}
                    isLoading={isLoading}
                    handleClose={() => { setFormOpen(false); setSelectedBook(null); }}
                    onSubmit={selectedBook ? handleEditBook : handleAddBook}
                    initialData={selectedBook}
                />
            </Box>
        </Container>
    );
}