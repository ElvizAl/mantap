"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { toast } from "sonner";

export const SignOutButton = () => {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    async function handleClick() {
        await signOut({
            fetchOptions: {
                onRequest: () => {
                    setIsPending(true)
                },
                onResponse: () => {
                    setIsPending(false)
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                },
                onSuccess: () => {
                    toast.success("Berhasil logout")
                    router.push("/login")
                }
            }
        });
    }

    return (
        <Button onClick={handleClick} size="sm" disabled={isPending} variant="destructive">
            Sign out
        </Button>
    )
}