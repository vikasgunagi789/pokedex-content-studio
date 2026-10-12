
import { isAuthenticated, noStore } from "./_lib/auth.js";

export default function handler(req, res) {
  noStore(res);

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  return res.status(200).json({
    authenticated: isAuthenticated(req),
  });
}
