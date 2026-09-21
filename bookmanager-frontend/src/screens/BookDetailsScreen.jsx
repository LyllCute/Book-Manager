import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BookDetailsScreen.module.css";

const API_BASE = "http://localhost:8000/api/books";

export default function BookDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      setLoading(true); setError("");
      try {
        const res = await fetch(API_BASE + "/" + id);
        if (res.status === 404) throw new Error("Book not found.");
        if (!res.ok) throw new Error("Server error: " + res.status);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message || "Failed to load book details.");
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate("/books")} aria-label="Back to book list">?</button>
        <h1 className={styles.headerTitle}>Book Details</h1>
      </header>
      <main className={styles.main}>
        {loading && (
          <div className={styles.centered}>
            <div className={styles.spinner} aria-label="Loading" />
            <p className={styles.loadingText}>Loading?</p>
          </div>
        )}
        {!loading && error && (
          <div className={styles.errorBox} role="alert">
            <span>?? {error}</span>
            <button className={styles.backLink} onClick={() => navigate("/books")}>? Back to list</button>
          </div>
        )}
        {!loading && !error && book && (
          <div className={styles.card}>
            <div className={styles.bookEmoji}>??</div>
            <h2 className={styles.bookTitle}>{book.title}</h2>
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Author</span>
                <span className={styles.detailValue}>{book.author}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Genre</span>
                <span className={styles.genreBadge}>{book.genre}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Added</span>
                <span className={styles.detailValue}>
                  {new Date(book.created_at).toLocaleDateString("en-US", {
                    year: "numeric", month: "long", day: "numeric"
                  })}
                </span>
              </div>
            </div>
            <button className={styles.backFullBtn} onClick={() => navigate("/books")}>? Back to My Books</button>
          </div>
        )}
      </main>
    </div>
  );
}
