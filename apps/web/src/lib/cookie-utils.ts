/**
 * Utility to manage and cleanup stale auth cookies.
 */

/**
 * Decodes a JWT payload without verifying the signature (safe for client-side use).
 */
function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

/**
 * Clears a cookie by setting its expiration to the past.
 */
function clearCookie(name: string) {
  console.log(`[CookieUtils] Clearing cookie: ${name}`);
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // Also try clearing with domain if needed, but path=/ is usually enough for local/app routes
}

/**
 * Validates 'token' and 'user' cookies and clears them if they are stale or malformed.
 */
export function validateAndCleanupCookies() {
  if (typeof document === "undefined") return;

  const cookies = document.cookie.split(";").map((c) => c.trim());
  const authCookieNames = ["token", "user"];

  console.log("[CookieUtils] Starting auth cookie validation...");

  cookies.forEach((cookieStr) => {
    const [name, value] = cookieStr.split("=");
    if (authCookieNames.includes(name)) {
      console.log(`[CookieUtils] Checking cookie: ${name}`);
      
      // 1. Check if value is empty
      if (!value || value === "undefined" || value === "null") {
        console.warn(`[CookieUtils] Cookie ${name} has invalid value: ${value}`);
        clearCookie(name);
        return;
      }

      // 2. Try to parse as JWT if it looks like one
      if (value.includes(".")) {
        const payload = parseJwt(value);
        if (!payload) {
          console.warn(`[CookieUtils] Cookie ${name} is malformed JWT.`);
          clearCookie(name);
          return;
        }

        // 3. Check expiration
        const now = Math.floor(Date.now() / 1000);
        if (payload.exp && payload.exp < now) {
          console.warn(
            `[CookieUtils] Cookie ${name} is expired. (exp: ${payload.exp}, now: ${now})`
          );
          clearCookie(name);
          return;
        }

        console.log(`[CookieUtils] Cookie ${name} is valid.`);
      } else {
        // If it's not a JWT, it might be a session ID or something else.
        // For this app, we expect JWTs in these cookies.
        // If the user said it contains "old JWT tokens", we treat non-JWTs as suspicious if they are in these slots.
        console.log(`[CookieUtils] Cookie ${name} exists but is not a JWT format.`);
      }
    }
  });

  console.log("[CookieUtils] Cookie validation complete.");
}
