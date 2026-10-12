import {
  verifyPassword,
  createSession,
  setSessionCookie,
  noStore,
} from "./_lib/auth.js";

export default function handler(req, res) {
  noStore(res);

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { password } = req.body || {};

  console.log(
    "APP_PASSWORD loaded:",
    Boolean(process.env.APP_PASSWORD)
  );

  console.log(
    "Entered password length:",
    typeof password === "string" ? password.length : "not a string"
  );

  console.log(
    "Configured password length:",
    process.env.APP_PASSWORD?.length ?? "not loaded"
  );

  if (!verifyPassword(password)) {
    return res.status(401).json({
      error: "Incorrect password.",
    });
  }

  setSessionCookie(res, createSession());

  return res.status(200).json({ success: true });
}