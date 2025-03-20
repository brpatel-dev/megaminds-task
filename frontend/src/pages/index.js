import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks, setLoading, setError } from "../redux/bookSlice";
import { fetchBooks, addBook, updateBook, deleteBook } from "../services/bookService";
import { Container, Typography, CircularProgress, Button, List, ListItem, ListItemText, Box } from "@mui/material";
import BookForm from "../components/BookForm";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Home() {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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
    try {
      const newBook = await addBook(bookData);
      dispatch(setBooks([...books, newBook]));
      setFormOpen(false);
    } catch (err) {
      dispatch(setError(err));
    }
  };

  const handleEditBook = async (bookData) => {
    try {
      const updatedBook = await updateBook(selectedBook._id, bookData);
      dispatch(setBooks(books.map((b) => (b._id === selectedBook._id ? updatedBook : b))));
      setFormOpen(false);
      setSelectedBook(null);
    } catch (err) {
      dispatch(setError(err));
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
    <ProtectedRoute>
      <Container>
        <Typography variant="h4" gutterBottom>
          Book Management
        </Typography>

        <Button variant="contained" color="primary" onClick={() => setFormOpen(true)} sx={{ mb: 2 }}>
          Add New Book
        </Button>

        {loading && <CircularProgress />}
        {error && <Typography color="error">{error?.msg}</Typography>}

        <List>
          {books?.map((book) => (
            <ListItem key={book._id} divider>
              <ListItemText primary={book.title} secondary={`Author: ${book.author}`} />
              <Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => { setSelectedBook(book); setFormOpen(true); }}
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteBook(book._id)}>
                  Delete
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>

        <BookForm
          open={formOpen}
          handleClose={() => { setFormOpen(false); setSelectedBook(null); }}
          onSubmit={selectedBook ? handleEditBook : handleAddBook}
          initialData={selectedBook}
        />
      </Container>
    </ProtectedRoute>
  );
}