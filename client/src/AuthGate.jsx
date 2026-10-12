
import { useEffect, useState } from "react";
import { LockKeyhole, LogIn, LogOut } from "lucide-react";
import "./AuthGate.css";

export default function AuthGate({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkSession() {
    try {
      const response = await fetch("/api/session", {
        credentials: "same-origin",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Could not verify your session.");
      }

      const data = await response.json();
      setAuthenticated(data.authenticated === true);
    } catch {
      setError("Cannot connect to the login server. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed.");
      }

      setPassword("");
      setAuthenticated(true);
    } catch (err) {
      setError(
        err.message || "Cannot connect to the login server."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      setAuthenticated(false);
      setPassword("");
      setError("");
    }
  }

  if (checking) {
    return (
      <div className="auth-loading">
        <LockKeyhole size={28} />
        <p>Checking secure access...</p>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <main className="auth-page">
        <form className="auth-card" onSubmit={handleLogin}>
          <div className="auth-logo">
            <LockKeyhole size={30} />
          </div>

          <p className="auth-eyebrow">VG POKÉSTUDIO</p>
          <h1>Team Login</h1>
          <p className="auth-description">
            Enter your team's shared password to access
            your Pokédex content studio.
          </p>

          <label htmlFor="team-password">
            Team password
          </label>

          <input
            id="team-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter team password"
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading || !password}
          >
            <LogIn size={18} />
            {loading ? "Verifying..." : "Unlock PokéStudio"}
          </button>

          <p className="auth-footer">
            Private access for your team
          </p>
        </form>
      </main>
    );
  }

  return (
    <div className="authenticated-app">
      <div className="auth-session-bar">
        <span>
          <LockKeyhole size={15} />
          Team access enabled
        </span>

        <button type="button" onClick={handleLogout}>
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {children}
    </div>
  );
}
