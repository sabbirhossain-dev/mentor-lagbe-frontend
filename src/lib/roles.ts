import type { auth } from "@/lib/auth";

/** Application roles. "admin" can never be self-registered. */
export type Role = "student" | "tutor" | "admin";

/**
 * Shape of the authenticated user returned by Better Auth, including the
 * custom `role` and `plan` additional fields. Type-only import: no runtime
 * dependency on the server auth instance.
 */
export type SessionUser = (typeof auth)["$Infer"]["Session"]["user"];

/** Role-based landing page after sign-in / sign-up. */
export const ROLE_DASHBOARD: Record<Role, string> = {
    student: "/dashboard/student",
    tutor: "/dashboard/tutor",
    admin: "/dashboard/admin",
};

/**
 * Users created before roles existed have no `role` field in the database.
 * They are treated as students (never as admin) until promoted.
 */
export function normalizeRole(role: string | null | undefined): Role {
    if (role === "tutor" || role === "admin") return role;
    return "student";
}

/** Dashboard path for a role (missing/unknown role → student dashboard). */
export function dashboardPathFor(role: string | null | undefined): string {
    return ROLE_DASHBOARD[normalizeRole(role)];
}
