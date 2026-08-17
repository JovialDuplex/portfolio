const API_BASE = import.meta.env.VITE_URL_BACKEND;
const IS_PRODUCTION = import.meta.env.VITE_NODE_ENV === "production";

export const FALLBACK_LOGO = "/logo.png";

export function resolveAssetUrl(path) {
    if (!path) return FALLBACK_LOGO;
    if (/^https?:\/\//i.test(path)) return path;
    if (IS_PRODUCTION) return path;
    return `${API_BASE}/${path}`;
}
