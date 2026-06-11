import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UserProvider } from "@/components/user-provider";
import { currentUser } from "@/lib/session";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  return (
    <UserProvider user={user}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </UserProvider>
  );
}
