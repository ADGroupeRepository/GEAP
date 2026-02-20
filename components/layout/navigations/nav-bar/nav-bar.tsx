import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export async function Navbar() {
  return (
    <>
      <div className="h-[69px] sticky top-0"></div>
      <div
        style={{ width: "calc(100vw - 265px)" }}
        className="h-[69px] flex justify-between items-center border-b px-4 fixed top-0 z-40 bg-background"
      >
        <div className="relative">
          <Search className="size-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="w-[30vw] pl-10 h-11"
            placeholder="Que recherchez-vous?"
          />
        </div>
        <div>
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
}
