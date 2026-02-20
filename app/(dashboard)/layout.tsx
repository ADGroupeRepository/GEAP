import { Navbar } from "@/components/layout/navigations/nav-bar/nav-bar";
import SideNav from "@/components/layout/navigations/side-bar/side-nav";

function Layout({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideNav />
      <main className="flex flex-col h-screen w-full">
        <Navbar />
        <div className="grow">{children}</div>
      </main>
    </div>
  );
}

export default Layout;
