"use server"

import { auth } from "@/lib/auth";

export async function signUpEmailAction(formData: FormData) {
    const name = String(formData.get("name"));
    if (!name) return {error: "Masukkin nama dong"};
    const email = String(formData.get("email"))
    if (!email) return {error:"Masukkin email dong"};
    const password = String(formData.get("password"))
    if (!password) return {error:"Masukkin password dong"};

    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password
            },
        });

        return {error: null};
    } catch (err) {
        if (err instanceof Error) {
            return {error: "Opps! ada yang salah saat pendaftaran"}
        }

        return { error: "Internal Server Error"}
    }
}