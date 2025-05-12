import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (!session) redirect("/login")

    if (session.user.role !== "ADMIN") {
        return (
            <div>
                bukan admin
            </div>
        );
    }

    return (
        <div>ente admin</div>
    )

}