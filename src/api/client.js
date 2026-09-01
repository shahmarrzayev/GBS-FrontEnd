import { API_BASE } from "./config";

/**
 * Builds a Strapi query string. Nested keys are written out literally
 * ("filters[slug][$eq]") because Strapi parses bracket notation server-side.
 * Entries with a nullish value are dropped.
 */
export const query = (params) => {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.append(key, value);
  }

  const queryString = search.toString();
  return queryString ? `?${queryString}` : "";
};

const parseJson = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export async function get(path, { signal } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  const body = await parseJson(response);

  if (!response.ok) {
    throw new Error(
      body?.error?.message || `GET ${path} failed with ${response.status}`
    );
  }
  return body?.data ?? null;
}

export async function post(path, data, { signal } = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    // Strapi expects the payload wrapped in a "data" envelope.
    body: JSON.stringify({ data }),
  });
  const body = await parseJson(response);

  if (!response.ok) {
    throw new Error(
      body?.error?.message || `POST ${path} failed with ${response.status}`
    );
  }
  return body?.data ?? null;
}
