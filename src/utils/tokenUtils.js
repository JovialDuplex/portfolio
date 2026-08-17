/**
 * JWT token utilities
 * Decoding and expiration checking without any external library
 */

/**
 * Decodes the payload of a JWT token (without signature verification)
 * @param {string} token - The JWT token
 * @returns {object|null} - The decoded payload, or null if invalid
 */
export function decodeToken(token) {
    if (!token || typeof token !== "string") return null;

    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        // The payload is the 2nd part, base64url encoded
        const base64Payload = parts[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        // Add padding so that atob() works correctly
        const padded = base64Payload.padEnd(
            base64Payload.length + ((4 - (base64Payload.length % 4)) % 4),
            "="
        );

        const decoded = atob(padded);
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

/**
 * Returns the token expiration date in milliseconds (timestamp)
 * @param {string} token - The JWT token
 * @returns {number|null} - Expiration timestamp in ms, or null if invalid / missing
 */
export function getTokenExpiration(token) {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return null;
    // `exp` is in seconds per the JWT standard → convert to ms
    return payload.exp * 1000;
}

/**
 * Checks whether the JWT token is expired
 * @param {string} token - The JWT token
 * @returns {boolean} - true if expired or invalid, false if still valid
 */
export function isTokenExpired(token) {
    const expiration = getTokenExpiration(token);
    if (expiration === null) return true; // Invalid token = considered expired
    return Date.now() >= expiration;
}