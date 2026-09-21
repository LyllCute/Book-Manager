import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8000/api/books";

export default function AddBookScreen() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  function validate() {
    const e = {};
    if (!title.trim()) e.title = "Title is required.";
    if (!author.trim()) e.author = "Author is required.";
    if (!genre.trim()) e.genre = "Genre is required.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ title: title.trim(), author: author.trim(), genre: genre.trim() }),
      });
      if (!res.ok) throw new Error("Failed to save book.");
      navigate("/books");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const inputStyle = { width: "100%", padding: "7px", fontSize: "14px", marginTop: "4px" };
  const labelStyle = { display: "block", fontWeight: "bold", fontSize: "14px" };
  const errStyle = { color: "red", fontSize: "12px", marginTop: "2px" };

  return (
    <div style={{ maxWidth: "480px", margin: "30px auto", padding: "0 20px" }}>
      <h2 style={{ marginBottom: "15px" }}>Add New Book</h2>

      <form onSubmit={handleSubmit}>
        {serverError && <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>{serverError}</p>}

        <div style={{ marginBottom: "12px" }}>
          <label style={labelStyle}>Book Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title" style={inputStyle} />
          {errors.title && <p style={errStyle}>{errors.title}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={labelStyle}>Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter author" style={inputStyle} />
          {errors.author && <p style={errStyle}>{errors.author}</p>}
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label style={labelStyle}>Genre</label>
          <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)}
            placeholder="Enter genre" style={inputStyle} />
          {errors.genre && <p style={errStyle}>{errors.genre}</p>}
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button type="button" onClick={() => navigate("/books")}
            style={{ padding: "8px 16px", cursor: "pointer", background: "#ccc", border: "none" }}>
            Cancel
          </button>
          <button type="submit" disabled={submitting}
            style={{ padding: "8px 16px", cursor: "pointer", background: "#3a86ff", color: "white", border: "none" }}>
            {submitting ? "Saving..." : "Save Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
