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
  const [notice, setNotice] = useState("");

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setAuthReady(true);
  }), []);

  useEffect(() => {
    let cancelled = false;
    async function restoreCloudProgress() {
      if (!user) { setDataReady(false); return; }
      setDataReady(false);
      setError("");
      try {
        const [pokemonSnap, videosSnap] = await Promise.all([
          getDoc(doc(db, "users", user.uid, "progress", "pokemon")),
          getDoc(doc(db, "users", user.uid, "progress", "videos")),
        ]);
        if (cancelled) return;
        // If cloud data exists, restore it before mounting the app. Otherwise
        // the current browser's local data is retained and migrated on save.
        if (pokemonSnap.exists() && Array.isArray(pokemonSnap.data().items)) {
          localStorage.setItem(LOCAL_POKEMON_KEY, JSON.stringify(pokemonSnap.data().items));
        }
        if (videosSnap.exists() && Array.isArray(videosSnap.data().items)) {
          localStorage.setItem(LOCAL_VIDEOS_KEY, JSON.stringify(videosSnap.data().items));
        }
        setDataReady(true);
      } catch (e) {
        console.error("Unable to restore cloud progress:", e);
        if (!cancelled) {
          setError("Couldn't load cloud progress. Check Firestore rules and your connection, then refresh. Your browser's local data has not been deleted.");
          setDataReady(true);
        }
      }
    }
    if (authReady) restoreCloudProgress();
    return () => { cancelled = true; };
  }, [user, authReady]);

  async function submit(event) {
    event.preventDefault(); setError(""); setNotice(""); setBusy(true);
    try {
      if (mode === "signup") await createUserWithEmailAndPassword(auth, email.trim(), password);
      else await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e) {
      setError(e.code === "auth/email-already-in-use" ? "An account already exists for this email. Sign in instead." :
        e.code === "auth/invalid-credential" ? "Email or password is incorrect." :
        e.code === "auth/weak-password" ? "Choose a password with at least 6 characters." :
        e.code === "auth/operation-not-allowed" ? "Enable Email/Password in Firebase Authentication → Sign-in method." :
        e.message || "Authentication failed.");
    } finally { setBusy(false); }
  }

  
async function googleSignIn() {
  setError("");
  setBusy(true);

  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (e) {
    if (
      e.code === "auth/popup-blocked" ||
      e.code === "auth/popup-closed-by-user" ||
      e.code === "auth/cancelled-popup-request"
    ) {
      try {
        await signInWithRedirect(auth, provider);
      } catch (redirectError) {
        setError(
          redirectError.message || "Google sign-in failed."
        );
      }
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


  async function logout() { await signOut(auth); }

  if (!authReady) return <div className="auth-loading">Loading Pokédex Content Studio…</div>;
  if (!user) return <main className="auth-page"><section className="auth-card">
    <div className="auth-mark">⚡</div><p className="auth-eyebrow">VG POKESTUDIO</p>
    <h1>{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
    <p className="auth-subtitle">Sign in to keep your Pokémon content and production progress synced across devices.</p>
    <button className="auth-google" onClick={googleSignIn} disabled={busy}>Continue with Google</button>
    <div className="auth-divider"><span>or use email</span></div>
    <form onSubmit={submit} className="auth-form">
      <label>Email address<input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
      <label>Password<input type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} minLength="6" value={password} onChange={e => setPassword(e.target.value)} required /></label>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <button className="auth-primary" type="submit" disabled={busy}>{busy ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}</button>
    </form>
    <p className="auth-switch">{mode === "signup" ? "Already have an account?" : "New to PokéStudio?"} <button onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setError(""); }}>{mode === "signup" ? "Sign in" : "Create account"}</button></p>
    <p className="auth-footnote">Your progress is saved to your account. When signing in for the first time on a device, existing local progress is migrated if no cloud save exists yet.</p>
  </section></main>;

  if (!dataReady) return <div className="auth-loading">Syncing your saved progress…</div>;
  return <><div className="account-bar"><span>Signed in as <strong>{user.email || user.displayName || "PokéStudio user"}</strong></span><button onClick={logout}>Sign out</button></div>{error && <div className="sync-warning" role="status">{error}</div>}<App user={user} /></>;
}
