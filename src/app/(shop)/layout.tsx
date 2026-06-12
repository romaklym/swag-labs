import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UserProvider } from "@/components/user-provider";
import { RouteGuard } from "@/components/route-guard";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <RouteGuard />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </UserProvider>
  );
}
