import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, MessageCircleQuestion } from "lucide-react";
import { Icons } from "../icons";

export function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/homme01.png" alt="@bakayoko" />
            <AvatarFallback>BY</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col items-center justify-center p-2">
            <Avatar className="h-16 w-16 mb-4">
              <AvatarImage src="/homme01.png" alt="@bakayoko" />
              <AvatarFallback>BY</AvatarFallback>
            </Avatar>
            <p className="text-base font-semibold mb-1 text-black">
              Bakayoko Yaya
            </p>
            <p className="text-sm leading-none text-muted-foreground">
              yaya.bakayoko@adgroupe.io
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem>
            <Icons.ProfilUser className="h-5 w-5" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icons.Support className="w-4 h-4" />
            Support
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
            <LogOut className="h-5 w-5 text-red-500" />
            Se déconnecter
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
