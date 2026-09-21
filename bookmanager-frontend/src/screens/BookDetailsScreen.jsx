import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = "http://localhost:8000/api/books";

export default function BookDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(API_BASE + "/" + id);
        if (!res.ok) throw new Error("Book not found.");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  return (
    <div style={{ maxWidth: "500px", margin: "30px auto", padding: "0 20px" }}>
      <button
        onClick={() => navigate("/books")}
        style={{ padding: "6px 14px", cursor: "pointer", background: "#ccc", border: "none", marginBottom: "15px" }}
      >
        &larr; Back
      </button>

      <h2 style={{ marginBottom: "15px" }}>Book Details</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

      {!loading && !error && book && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            <tr>
              <th style={thStyle}>Title</th>
              <td style={tdStyle}>{book.title}</td>
            </tr>
            <tr>
              <th style={thStyle}>Author</th>
              <td style={tdStyle}>{book.author}</td>
            </tr>
            <tr>
              <th style={thStyle}>Genre</th>
              <td style={tdStyle}>{book.genre}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  background: "#f0f0f0",
  textAlign: "left",
  width: "30%",
  fontSize: "14px"
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  fontSize: "14px"
};
