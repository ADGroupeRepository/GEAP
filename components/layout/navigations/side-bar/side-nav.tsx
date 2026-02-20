import Link from "next/link";
import Image from "next/image";
import NavLinks from "./nav-links";

export default function SideNav() {
  return (
    <>
      <div className="min-w-[265px] h-screen"></div>

      <nav className="fixed z-50 bg-background top-0 h-screen overflow-scroll border-r px-4 min-w-[265px] py-4">
        <div className="gap-y-5 flex flex-col h-full">
          <Link href="/" className="flex gap-x-2 items-center">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="DRH Ministère de l'intérieur"
              priority
            />
            <p className="font-semibold text-2xl">GEAP</p>
          </Link>

          <NavLinks />
        </div>
      </nav>
    </>
  );
}
