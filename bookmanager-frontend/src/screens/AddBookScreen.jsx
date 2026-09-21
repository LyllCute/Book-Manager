import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AddBookScreen.module.css";

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
    if (!title.trim()) e.title = "Book title is required.";
    if (!author.trim()) e.author = "Author is required.";
    if (!genre.trim()) e.genre = "Genre is required.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
    setErrors({});
    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ title: title.trim(), author: author.trim(), genre: genre.trim() }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "Server error: " + res.status);
      }
      navigate("/books");
    } catch (err) {
      setServerError(err.message || "Failed to save book. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate("/books")} aria-label="Back">?</button>
        <h1 className={styles.headerTitle}>Add New Book</h1>
      </header>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {serverError && <div className={styles.serverError} role="alert">?? {serverError}</div>}
          <div className={styles.fieldGroup}>
            <label htmlFor="title" className={styles.label}>
              Book Title <span className={styles.req}>*</span>
            </label>
            <input id="title" type="text"
              className={styles.input + (errors.title ? " " + styles.inputError : "")}
              value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Great Gatsby" />
            {errors.title && <p className={styles.fieldError} role="alert">{errors.title}</p>}
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="author" className={styles.label}>
              Author <span className={styles.req}>*</span>
            </label>
            <input id="author" type="text"
              className={styles.input + (errors.author ? " " + styles.inputError : "")}
              value={author} onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. F. Scott Fitzgerald" />
            {errors.author && <p className={styles.fieldError} role="alert">{errors.author}</p>}
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="genre" className={styles.label}>
              Genre <span className={styles.req}>*</span>
            </label>
            <input id="genre" type="text"
              className={styles.input + (errors.genre ? " " + styles.inputError : "")}
              value={genre} onChange={(e) => setGenre(e.target.value)}
              placeholder="e.g. Classic Fiction" />
            {errors.genre && <p className={styles.fieldError} role="alert">{errors.genre}</p>}
          </div>
          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? "Saving?" : "Save Book"}
          </button>
        </form>
      </main>
    </div>
  );
}
