/**
 * Helper for talking to the Express backend (mentorlagbe-backend).
 *
 * Authentication uses the official Better Auth JWT plugin:
 * 1. the browser holds only the Better Auth session cookie (httpOnly),
 * 2. `getAuthToken()` exchanges that session for a short-lived JWT via
 *    Better Auth's own `GET /api/auth/token` endpoint,
 * 3. `apiFetch()` sends it as `Authorization: Bearer <jwt>`.
 *
 * The backend verifies the JWT with `auth.api.verifyJWT` and always
 * re-reads the user's role from the database — never from the token.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const AUTH_BASE = process.env.NEXT_PUBLIC_AUTH_URL ?? "";

type CachedToken = { token: string; expiresAt: number };

let cachedToken: CachedToken | null = null;

function decodeJwtExp(token: string): number | null {
    try {
        const payload = token.split(".")[1];
        if (!payload) return null;
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
        const json = JSON.parse(atob(padded)) as { exp?: number };
        return typeof json.exp === "number" ? json.exp * 1000 : null;
    } catch {
        return null;
    }
}

/** Returns a valid Better Auth JWT, or null when not signed in. */
export async function getAuthToken(): Promise<string | null> {
    // Refresh 15s before expiry.
    if (cachedToken && cachedToken.expiresAt - Date.now() > 15_000) {
        return cachedToken.token;
    }

    try {
        const res = await fetch(`${AUTH_BASE}/api/auth/token`, {
            credentials: "include",
        });

        if (!res.ok) {
            cachedToken = null;
            return null;
        }

        const data = (await res.json()) as { token?: string };
        if (!data.token) return null;

        const expiresAt = decodeJwtExp(data.token) ?? Date.now() + 60_000;
        cachedToken = { token: data.token, expiresAt };
        return data.token;
    } catch {
        return null;
    }
}

/** Clears the cached JWT (call after sign-out). */
export function clearAuthToken(): void {
    cachedToken = null;
}

export class ApiError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

/** Fetch wrapper that attaches the JWT to Express API requests. */
export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
    const token = await getAuthToken();

    const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        credentials: "include",
        headers: {
            ...(init.headers ?? {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    let body: unknown = null;
    try {
        body = await res.json();
    } catch {
        body = null;
    }

    if (!res.ok) {
        const message =
            body && typeof body === "object" && "message" in body
                ? String((body as { message: unknown }).message)
                : `Request failed with status ${res.status}`;
        throw new ApiError(message, res.status);
    }

    return body as T;
}
