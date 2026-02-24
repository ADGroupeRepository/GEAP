"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

export function NavSearch() {
  const pathname = usePathname();

  if (pathname === "/") {
    return <h1 className="text-xl font-medium">Bienvenue sur GEAP</h1>;
  }

  return (
    <div className="relative">
      <Search className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="w-[30vw] pl-10 h-11"
        placeholder="Que recherchez-vous?"
      />
    </div>
  );
}
