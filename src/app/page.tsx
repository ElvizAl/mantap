import { SignOutButton } from "@/components/auth/sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <p>hello</p>
  }
  return (
    <div>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        {JSON.stringify(session, null, 2)}
        <SignOutButton />
      </div>
      <div>
        
      </div>
    </div>
  );
}
