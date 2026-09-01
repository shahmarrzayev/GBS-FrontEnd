/**
 * Backend location. Set VITE_API_URL in .env to point at another environment;
 * the fallback keeps a fresh checkout working against a local Strapi.
 */
export const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:1337"
).replace(/\/+$/, "");

export const API_BASE = `${API_URL}/api`;

/**
 * Strapi returns media paths relative to the backend ("/uploads/x.png"), so they
 * need the API host prefixed. Absolute URLs (e.g. an S3/CDN provider) pass through.
 */
export const mediaUrl = (media) => {
  const url = media?.url;

  if (!url) return null;
  return /^https?:\/\//.test(url) ? url : `${API_URL}${url}`;
};
