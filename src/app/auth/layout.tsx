import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ShopLayout({children}: {
 children: React.ReactNode;
}) {

  const session = await auth();

  if(session?.user) {
    redirect('/');
  }

  return (
    <main className="w-full min-h-screen mx-auto sm:w-[600px] px-5 flex flex-col justify-center items-center">
        {children}
    </main>
  );
}