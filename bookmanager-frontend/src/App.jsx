import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import BookListScreen from "./screens/BookListScreen";
import AddBookScreen from "./screens/AddBookScreen";
import BookDetailsScreen from "./screens/BookDetailsScreen";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn
              ? <Navigate to="/books" replace />
              : <LoginScreen onLogin={() => setIsLoggedIn(true)} />
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BookListScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/add"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddBookScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <BookDetailsScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
