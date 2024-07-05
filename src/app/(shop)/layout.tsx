import { auth } from "@/auth";
import { Footer, Sidebar, TopMenu } from "@/components";


export const metadata = {
 title: {
  template: '%s - Teslo | Shop',
  default: 'Home'
 },
 description: 'Una tienda de productos virtuales',
};

export default async function ShopLayout({children}: {
 children: React.ReactNode;
}) {

  const session = await auth() || undefined;

  return (
    <main className=" min-h-screen flex flex-col">
        <TopMenu />

        <Sidebar session={session} />
        
        <div className="px-0 sm:px-5 flex-1">
          {children}
        </div>

        <Footer />
    </main>
  );
}