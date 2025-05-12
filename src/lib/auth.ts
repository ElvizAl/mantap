import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/db/prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";
import { normalizeName, VALID_DOMAINS } from "./utils";
import { APIError } from "better-auth/api";
import { UserRole } from "@/generated/prisma";
 
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
        autoSignIn: false,
        password: {
            hash: hashPassword,
            verify: verifyPassword
        }
    },
    hooks: {
        before: createAuthMiddleware( async (ctx) => {
            if (ctx.path === "/sign-up/email"){
                const email = String(ctx.body.email);
                const domain = email.split("@")[1];

                if (!VALID_DOMAINS().includes(domain)) {
                    throw new APIError("BAD_REQUEST", {
                        message: "Invalid Domain"
                    })
                }

                const name = normalizeName(ctx.body.name)

                return {
                    context: {
                        ...ctx,
                        body: {
                            ...ctx.body,
                            name
                        }
                    }
                }
            }
        }),
    },
    user: {
        additionalFields: {
            role: {
                type: ["USER", "ADMIN"] as Array<UserRole>,
                input: false
            }
        }
    },
    session: {
        expiresIn: 30 * 24 * 60 * 60,
    },
    advanced: {
        database: {
            generateId: false,
        },
    },
    plugins: [
        nextCookies()
    ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOW"