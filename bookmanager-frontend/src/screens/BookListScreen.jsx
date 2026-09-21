import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BookListScreen.module.css";

const API_URL = "http://localhost:8000/api/books";

export default function BookListScreen() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => { fetchBooks(); }, []);

  async function fetchBooks() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Server error: " + res.status);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError("Failed to load books. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.headerIcon}>??</span>
          <h1 className={styles.headerTitle}>My Book Collection</h1>
        </div>
      </header>
      <main className={styles.main}>
        {loading && (
          <div className={styles.centered}>
            <div className={styles.spinner} aria-label="Loading books" />
            <p className={styles.loadingText}>Loading your books?</p>
          </div>
        )}
        {!loading && error && (
          <div className={styles.errorBox} role="alert">
            <span>?? {error}</span>
            <button className={styles.retryBtn} onClick={fetchBooks}>Retry</button>
          </div>
        )}
        {!loading && !error && books.length === 0 && (
          <div className={styles.empty}>
            <p className={styles.emptyIcon}>??</p>
            <p className={styles.emptyText}>No books yet. Add your first one!</p>
          </div>
        )}
        {!loading && !error && books.length > 0 && (
          <ul className={styles.list} aria-label="Book list">
            {books.map((book) => (
              <li key={book.id} className={styles.card}
                onClick={() => navigate("/books/" + book.id)}
                role="button" tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate("/books/" + book.id)}
                aria-label={"View details for " + book.title}>
                <div className={styles.cardIcon}>??</div>
                <div className={styles.cardBody}>
                  <h2 className={styles.bookTitle}>{book.title}</h2>
                  <p className={styles.bookAuthor}>by {book.author}</p>
                  <span className={styles.genreBadge}>{book.genre}</span>
                </div>
                <span className={styles.chevron}>?</span>
              </li>
            ))}
          </ul>
        )}
      </main>
      <button className={styles.fab} onClick={() => navigate("/books/add")}
        aria-label="Add new book" title="Add new book">+</button>
    </div>
  );
}
