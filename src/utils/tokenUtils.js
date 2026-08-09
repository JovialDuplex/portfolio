/**
 * Utilitaires pour la gestion des tokens JWT
 * Décodage et vérification d'expiration sans bibliothèque externe
 */

/**
 * Décode le payload d'un token JWT (sans vérification de signature)
 * @param {string} token - Le token JWT
 * @returns {object|null} - Le payload décodé ou null si invalide
 */
export function decodeToken(token) {
    if (!token || typeof token !== "string") return null;

    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;

        // Le payload est la 2e partie, encodée en base64url
        const base64Payload = parts[1]
            .replace(/-/g, "+")
            .replace(/_/g, "/");

        // Padding pour que atob() fonctionne correctement
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
 * Retourne la date d'expiration du token en millisecondes (timestamp)
 * @param {string} token - Le token JWT
 * @returns {number|null} - Timestamp ms d'expiration, ou null si invalide / absent
 */
export function getTokenExpiration(token) {
    const payload = decodeToken(token);
    if (!payload || !payload.exp) return null;
    // `exp` est en secondes dans le standard JWT → conversion en ms
    return payload.exp * 1000;
}

/**
 * Vérifie si le token JWT est expiré
 * @param {string} token - Le token JWT
 * @returns {boolean} - true si expiré ou invalide, false si encore valide
 */
export function isTokenExpired(token) {
    const expiration = getTokenExpiration(token);
    if (expiration === null) return true; // Token invalide = considéré expiré
    return Date.now() >= expiration;
}
