"use server"

import { auth } from "@/lib/auth";
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
        if (err instanceof Error) {
            return { error: "Opps! ada yang salah saat Login" }
        }

        return { error: "Internal Server Error" }
    }
}