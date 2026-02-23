"use client";

import { useState } from "react";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MailProvider } from "./use-mail";
import { MailNav } from "./mail-nav";
import { Separator } from "@/components/ui/separator";
import { MailList } from "./mail-list";
import { MailDisplay } from "./mail-display";

export function MailLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <MailProvider>
      <div className="flex h-full flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-[250px] border-r flex flex-col h-full overflow-hidden min-h-0 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="p-4 flex items-center justify-between">
            <span className="font-bold text-lg tracking-tight">Messagerie</span>
          </div>
          <div className="px-4 pb-4">
            <Button asChild className="w-full gap-2 font-semibold shadow-sm">
              <Link href="/eservices/courrier/register">
                <PlusCircle className="h-4 w-4" />
                Nouveau Courrier
              </Link>
            </Button>
          </div>
          <Separator />
          <MailNav isCollapsed={isCollapsed} />
        </div>

        {/* Mail List */}
        <div className="w-[350px] border-r flex flex-col h-full overflow-hidden min-h-0 bg-white dark:bg-slate-950">
          <div className="p-4 py-3 border-b">
            <h2 className="text-xl font-bold">Boîte de réception</h2>
          </div>
          <MailList />
        </div>

        {/* Mail Display */}
        <div className="flex-1 flex flex-col h-full overflow-hidden min-h-0 bg-white dark:bg-slate-950">
          <MailDisplay />
        </div>
      </div>
    </MailProvider>
  );
}
