import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api/books";

export default function BookListScreen() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch books.");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError("Could not load books. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto", padding: "0 20px" }}>
      <h2 style={{ marginBottom: "15px" }}>My Books</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

      {!loading && !error && books.length === 0 && <p>No books yet.</p>}

      {!loading && !error && books.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {books.map((book) => (
            <li
              key={book.id}
              onClick={() => navigate("/books/" + book.id)}
              style={{
                padding: "12px 10px",
                marginBottom: "8px",
                border: "1px solid #ccc",
                background: "white",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <strong>{book.title}</strong>
              <span style={{ color: "#555", fontSize: "14px" }}>{book.author}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => navigate("/books/add")}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          background: "#3a86ff",
          color: "white",
          fontSize: "28px",
          border: "none",
          cursor: "pointer"
        }}
      >
        +
      </button>
    </div>
  );
}
