import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { jwt } from "better-auth/plugins/jwt";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";


const uri = process.env.MONGODB_URI;

if (!uri) {
    throw new Error("MONGODB_URI is missing!");
}

const client = new MongoClient(uri);
const db = client.db("Mentor-Lagbe");

/**
 * Roles that may be chosen during public registration.
 * The "admin" role can NEVER be created through public registration —
 * it is only assigned by the operator via the backend
 * `scripts/promote-admin.mjs` script (direct database write).
 */
const PUBLIC_ROLES = ["student", "tutor"] as const;

/**
 * Social providers (Google, GitHub) are dynamically registered when their credentials exist.
 */
const googleClientId =
  process.env.GOOGLE_CLIENT_ID ||
  process.env.GOOGLE_AUTH_CLIENT_ID ||
  process.env.GIT_AUTH_CLIENT_ID;

const googleClientSecret =
  process.env.GOOGLE_CLIENT_SECRET ||
  process.env.GOOGLE_AUTH_SECRET_KEY ||
  process.env.GIT_AUTH_SECRET_KEY;

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

const configuredSocialProviders = {
  ...(googleClientId && googleClientSecret
    ? {
        google: {
          clientId: googleClientId.trim(),
          clientSecret: googleClientSecret.trim(),
        },
      }
    : {}),
  ...(githubClientId && githubClientSecret
    ? {
        github: {
          clientId: githubClientId.trim(),
          clientSecret: githubClientSecret.trim(),
        },
      }
    : {}),
};

const socialProviders =
  Object.keys(configuredSocialProviders).length > 0
    ? configuredSocialProviders
    : undefined;

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: { 
    enabled: true, 
  },
  /**
   * The logical `users` collection is the Better Auth `user` collection.
   * No duplicate collection is created; existing users keep working.
   *
   * - role: clients may send it at sign-up only, and it is re-validated
   *   server-side by the database hook below (admin is rejected).
   * - plan: `input: false` means Better Auth itself rejects any attempt
   *   to send or change it from a client. Defaults to "free".
   */
  user: {
  additionalFields: {
    role: {
      type: "string",
      required: false,
      returned: true,
      input: true,
      defaultValue: "student",
    },
    plan: {
      type: "string",
      required: false,
      returned: true,
      input: false,
      defaultValue: "free",
    },
  },
},
  /**
   * Server-side authority for role & plan. Runs for every user creation
   * path (email/password and social) and every update, regardless of
   * what any client sent.
   */
  databaseHooks: {
    user: {
      create: {
        before: async (user, context?: unknown) => {
          let requested =
            typeof user.role === "string" && user.role
              ? user.role.toLowerCase()
              : "";

          // If role was not provided directly (e.g. social sign-in), check cookie header
          if (!requested && context && typeof context === "object" && "headers" in context) {
            try {
              const headers = (context as { headers?: { get?: (name: string) => string | null } }).headers;
              const cookieHeader = headers?.get ? headers.get("cookie") || "" : "";
              const match = cookieHeader.match(/mentorlagbe_signup_role=([a-z]+)/i);
              if (match && match[1]) {
                requested = match[1].toLowerCase();
              }
            } catch {
              // fallback gracefully
            }
          }

          if (!requested) {
            requested = "student";
          }

          if (!(PUBLIC_ROLES as readonly string[]).includes(requested)) {
            throw new APIError("FORBIDDEN", {
              message:
                "Invalid role. Only student or tutor can register. Admin accounts are created by the administrator.",
            });
          }

          return {
            data: {
              ...user,
              role: requested,
              plan: "free",
            },
          };
        },
      },
      update: {
        before: async (data) => {
          // Users can never change their own role or subscription plan
          // through any Better Auth endpoint (e.g. /update-user).
          // NOTE: returning a modified object would NOT work, because
          // better-auth merges hook results into the original update data
          // (see dist/db/with-hooks.mjs) — throwing aborts the request
          // before any database or session-cookie write happens.
          if ("role" in data && data.role !== undefined) {
              throw new APIError("FORBIDDEN", {
                  message: "Your role cannot be changed.",
              });
          }
          if ("plan" in data && data.plan !== undefined) {
              throw new APIError("FORBIDDEN", {
                  message: "Your subscription plan cannot be changed here.",
              });
          }
        },
      },
    },
  },
  socialProviders,
  /**
   * Official Better Auth JWT plugin (bundled with better-auth 1.7.26).
   * Issues JWKS-signed session JWTs via GET /api/auth/token and lets the
   * Express backend verify them with `auth.api.verifyJWT`. Creates the
   * Better Auth internal `jwks` collection.
   */
  plugins: [jwt()],
});
