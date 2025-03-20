import { Container } from "@mui/material";
import ProtectedRoute from "@/components/ProtectedRoute";
import BookList from "@/components/BookList";

export default function Home() {

  return (
    <ProtectedRoute>
      <Container>
       <BookList />
      </Container>
    </ProtectedRoute>
  );
}