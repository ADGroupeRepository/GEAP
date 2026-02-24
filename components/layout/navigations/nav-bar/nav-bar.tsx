import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "../icons";
import { NavSearch } from "./nav-search";
import { UserNav } from "./user-nav";

export async function Navbar() {
  return (
    <>
      <div className="min-h-[69px] w-20 sticky top-0"></div>
      <div
        style={{ width: "calc(100vw - 265px)" }}
        className="h-[69px] max-h-[69px] flex justify-between items-center border-b px-4 fixed top-0 z-40 bg-background"
      >
        <NavSearch />
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-11 w-11 rounded-full"
                >
                  <Icons.NotificationsFilled className="size-5" />
                  <span className="sr-only">Rappel</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <UserNav />
        </div>
      </div>
    </>
  );
}
