
import crypto from "node:crypto";

const COOKIE_NAME = "pokedex_team_session";
const SESSION_DURATION = 7 * 24 * 60 * 60;

function getSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET is not configured correctly.");
  }

  return secret;
}

function safeEqual(a, b) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);

  if (first.length !== second.length) {
    return false;
  }

  return crypto.timingSafeEqual(first, second);
}

export function verifyPassword(password) {
  const expected = process.env.APP_PASSWORD;

  if (!expected || typeof password !== "string") {
    return false;
  }

  return safeEqual(password, expected);
}

function sign(value) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(value)
    .digest("base64url");
}

export function createSession() {
  const payload = Buffer.from(
    JSON.stringify({
      exp: Math.floor(Date.now() / 1000) + SESSION_DURATION,
    })
  ).toString("base64url");

  return `${payload}.${sign(payload)}`;
}

function verifySession(token) {
  if (!token || typeof token !== "string") {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [payload, signature] = parts;

  try {
    if (!safeEqual(signature, sign(payload))) {
      return false;
    }

    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    );

    return (
      Number.isFinite(data.exp) &&
      data.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}

function getCookie(req) {
  const cookieHeader = req.headers.cookie || "";

  const cookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COOKIE_NAME}=`));

  return cookie ? cookie.slice(COOKIE_NAME.length + 1) : "";
}

export function setSessionCookie(res, token) {
  const secure =
    process.env.NODE_ENV === "production" ? "; Secure" : "";

  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_DURATION}${secure}`
  );
}

export function clearSessionCookie(res) {
  const secure =
    process.env.NODE_ENV === "production" ? "; Secure" : "";

  res.setHeader(
    "Set-Cookie",
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`
  );
}

export function isAuthenticated(req) {
  return verifySession(getCookie(req));
}

export function noStore(res) {
  res.setHeader("Cache-Control", "no-store");
}
