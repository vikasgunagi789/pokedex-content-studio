
import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import App from "./App";
import "./auth.css";

const LOCAL_POKEMON_KEY = "pokedex-content-studio";
const LOCAL_VIDEOS_KEY = "vg-pokestudio-videos";

export default function AuthGate() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [dataReady, setDataReady] = useState(false);
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Listen for Firebase authentication state.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setAuthReady(true);
      },
      (authError) => {
        console.error("Authentication state error:", authError);
        setError("Unable to check your login. Please refresh the page.");
        setAuthReady(true);
      }
    );

    return unsubscribe;
  }, []);

  // Restore progress after the user is authenticated.
  useEffect(() => {
    let cancelled = false;

    async function restoreCloudProgress() {
      if (!user) {
        setDataReady(false);
        return;
      }

      setDataReady(false);
      setError("");

      try {
        const [pokemonSnap, videosSnap] = await Promise.all([
          getDoc(doc(db, "users", user.uid, "progress", "pokemon")),
          getDoc(doc(db, "users", user.uid, "progress", "videos")),
        ]);

        if (cancelled) return;

        if (
          pokemonSnap.exists() &&
          Array.isArray(pokemonSnap.data().items)
        ) {
          localStorage.setItem(
            LOCAL_POKEMON_KEY,
            JSON.stringify(pokemonSnap.data().items)
          );
        }

        if (
          videosSnap.exists() &&
          Array.isArray(videosSnap.data().items)
        ) {
          localStorage.setItem(
            LOCAL_VIDEOS_KEY,
            JSON.stringify(videosSnap.data().items)
          );
        }
      } catch (e) {
        console.error("Unable to restore cloud progress:", e);

        if (!cancelled) {
          setError(
            "Couldn't load cloud progress. Check your Firestore rules and internet connection. Your existing browser data has not been deleted."
          );
        }
      } finally {
        if (!cancelled) {
          setDataReady(true);
        }
      }
    }

    if (authReady) {
      restoreCloudProgress();
    }

    return () => {
      cancelled = true;
    };
  }, [user, authReady]);

  // Email/password sign-in and account creation.
  async function submit(event) {
    event.preventDefault();
    setError("");
    setBusy(true);

    try {
      const cleanEmail = email.trim();

      if (mode === "signup") {
        await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );
      }
    } catch (e) {
      console.error("Email authentication error:", e);

      const messages = {
        "auth/email-already-in-use":
          "An account already exists for this email. Please sign in.",
        "auth/invalid-credential":
          "Email or password is incorrect.",
        "auth/user-not-found":
          "No account was found. Create an account first.",
        "auth/wrong-password":
          "Incorrect password. Please try again.",
        "auth/weak-password":
          "Choose a password with at least 6 characters.",
        "auth/invalid-email":
          "Please enter a valid email address.",
        "auth/operation-not-allowed":
          "Enable Email/Password in Firebase Console → Authentication → Sign-in method.",
        "auth/too-many-requests":
          "Too many attempts. Please wait and try again.",
      };

      setError(
        messages[e.code] ||
          e.message ||
          "Authentication failed. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  // Google sign-in.
  async function googleSignIn() {
    setError("");
    setBusy(true);

    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error("Google authentication error:", e);

      if (
        e.code === "auth/popup-blocked" ||
        e.code === "auth/cancelled-popup-request"
      ) {
        try {
          await signInWithRedirect(auth, provider);
        } catch (redirectError) {
          setError(
            redirectError.message || "Google sign-in failed."
          );
        }
      } else if (e.code === "auth/popup-closed-by-user") {
        setError("The Google sign-in window was closed. Please try again.");
      } else if (e.code === "auth/unauthorized-domain") {
        setError(
          "Add your deployed website's hostname in Firebase Console → Authentication → Settings → Authorized domains."
        );
      } else {
        setError(e.message || "Google sign-in failed.");
      }
    } finally {
      setBusy(false);
    }
  }

  // Sign out of the current account.
  async function logout() {
    setError("");

    try {
      await signOut(auth);
      setPassword("");
    } catch (e) {
      console.error("Sign-out error:", e);
      setError("Unable to sign out. Please try again.");
    }
  }

  // Wait until Firebase determines whether a user is signed in.
  if (!authReady) {
    return (
      <div className="auth-loading">
        Loading Pokédex Content Studio…
      </div>
    );
  }

  // IMPORTANT: Never render the dashboard for a signed-out visitor.
  if (!user) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-mark">⚡</div>

          <p className="auth-eyebrow">VG POKESTUDIO</p>

          <h1>
            {mode === "signup"
              ? "Create your account"
              : "Welcome back"}
          </h1>

          <p className="auth-subtitle">
            Sign in to keep your Pokémon content and production
            progress synced across devices.
          </p>

          <button
            type="button"
            className="auth-google"
            onClick={googleSignIn}
            disabled={busy}
          >
            {busy ? "Please wait…" : "Continue with Google"}
          </button>

          <div className="auth-divider">
            <span>or use email</span>
          </div>

          <form onSubmit={submit} className="auth-form">
            <label>
              Email address
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={busy}
              />
            </label>

            <label>
              Password
              <input
                type="password"
                autoComplete={
                  mode === "signup"
                    ? "new-password"
                    : "current-password"
                }
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                disabled={busy}
              />
            </label>

            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="auth-primary"
              type="submit"
              disabled={busy}
            >
              {busy
                ? "Please wait…"
                : mode === "signup"
                  ? "Create account"
                  : "Sign in"}
            </button>
          </form>

          <p className="auth-switch">
            {mode === "signup"
              ? "Already have an account?"
              : "New to PokéStudio?"}{" "}

            <button
              type="button"
              disabled={busy}
              onClick={() => {
                setMode(
                  mode === "signup" ? "signin" : "signup"
                );
                setError("");
                setPassword("");
              }}
            >
              {mode === "signup" ? "Sign in" : "Create account"}
            </button>
          </p>

          <p className="auth-footnote">
            Sign in to access your account and saved progress
            across devices.
          </p>
        </section>
      </main>
    );
  }

  // Do not display the dashboard until progress restoration finishes.
  if (!dataReady) {
    return (
      <div className="auth-loading">
        Syncing your saved progress…
      </div>
    );
  }

  // Authenticated users can now access the application.
  return (
    <>
      <div className="account-bar">
        <span>
          Signed in as{" "}
          <strong>
            {user.email || user.displayName || "PokéStudio user"}
          </strong>
        </span>

        <button type="button" onClick={logout}>
          Sign out
        </button>
      </div>

      {error && (
        <div className="sync-warning" role="status">
          {error}
        </div>
      )}

      <App user={user} />
    </>
  );
}
