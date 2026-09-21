import { useState } from "react";
import styles from "./LoginScreen.module.css";

const CREDENTIALS = { username: "admin", password: "book123" };

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      setError("");
      onLogin();
    } else {
      setError("Invalid username or password. Please try again.");
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logo}>??</div>
        <h1 className={styles.title}>Book Manager</h1>
        <p className={styles.subtitle}>Sign in to your personal catalog</p>
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {error && <div className={styles.errorBanner} role="alert">{error}</div>}
          <div className={styles.fieldGroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <input id="username" type="text" className={styles.input}
              value={username} onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username" autoComplete="username" />
          </div>
          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input id="password" type="password" className={styles.input}
              value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password" autoComplete="current-password" />
          </div>
          <button type="submit" className={styles.submitBtn}>Sign In</button>
        </form>
      </div>
    </div>
  );
}
