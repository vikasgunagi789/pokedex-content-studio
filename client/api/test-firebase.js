
import { adminDb } from "./_lib/firebaseAdmin.js";
import { isAuthenticated, noStore } from "./_lib/auth.js";

export default async function handler(req, res) {
  noStore(res);

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!isAuthenticated(req)) {
    return res.status(401).json({
      success: false,
      error: "Please log in first.",
    });
  }

  try {
    // Perform a minimal read to verify Firestore connectivity.
    await adminDb
      .collection("_connection_tests")
      .limit(1)
      .get();

    return res.status(200).json({
      success: true,
      message: "Firebase Admin connected successfully.",
    });
  } catch (error) {
    console.error(
      "Firebase connection test failed:",
      error.code || error.message
    );

    return res.status(500).json({
      success: false,
      error: "Firebase connection failed.",
    });
  }
}
