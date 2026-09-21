import { useState } from "react";

const CREDENTIALS = { username: "admin", password: "book123" };

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      onLogin();
    } else {
      setError("Invalid username or password.");
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
      <div style={{ width: "300px", padding: "20px", border: "1px solid #ccc", background: "white" }}>
        <h2 style={{ marginBottom: "15px" }}>Book Manager Login</h2>

        {error && <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              style={{ width: "100%", padding: "6px", fontSize: "14px" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", marginBottom: "4px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={{ width: "100%", padding: "6px", fontSize: "14px" }}
            />
          </div>

          <button
            type="submit"
            style={{ width: "100%", padding: "8px", background: "#3a86ff", color: "white", border: "none", cursor: "pointer" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
