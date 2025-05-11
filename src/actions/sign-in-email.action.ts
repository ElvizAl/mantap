"use server"

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import {headers } from "next/headers";

export async function signInEmailAction(formData: FormData) {
    const email = String(formData.get("email"))
    if (!email) return { error: "Masukkin email dong" };
    const password = String(formData.get("password"))
    if (!password) return { error: "Masukkin password dong" };

    try {
        await auth.api.signInEmail({
            headers: await headers(),
            body: {
                email,
                password,
            },
        });
        return { error: null };
    } catch (err) {
        if (err instanceof APIError) {
            return { error: err.message }
        }

        return { error: "Internal Server Error" }
    }
}