"use client";

import { ComponentProps } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMail } from "./use-mail";
import { Mail } from "../schema";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function MailList({ items }: { readonly items?: Mail[] }) {
  const { mails, selectedMailId, setSelectedMailId, filter } = useMail();

  // Filter mails locally for now based on the selected filter
  const filteredMails = mails.filter((item) => {
    if (filter === "inbox")
      return item.status === "EN_TRAITEMENT" || item.status === "ENREGISTRE";
    if (filter === "sent") return item.status === "TRANSMIS";
    if (filter === "trash") return false; // Mock
    if (filter === "archive")
      return item.status === "ARCHIVE" || item.status === "CLOTURE";
    if (filter === "drafts") return false; // Mock
    return true;
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pt-0">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher..." className="pl-8" />
        </div>
      </div>
      <ScrollArea className="flex-1 h-full min-h-0">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {filteredMails.map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
                selectedMailId === item.id && "bg-accent",
              )}
              onClick={() => setSelectedMailId(item.id)}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{item.sender}</div>
                    {!item.read && ( // Mock read status
                      <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "ml-auto text-xs",
                      selectedMailId === item.id
                        ? "text-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {formatDistanceToNow(new Date(item.receivedAt), {
                      addSuffix: true,
                      locale: fr,
                    })}
                  </div>
                </div>
                <div className="text-xs font-medium">{item.object}</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {item.object.substring(0, 300)}...
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getBadgeVariantFromLabel(item.priority)}>
                  {item.priority}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {item.reference}
                </Badge>
              </div>
            </button>
          ))}
          {filteredMails.length === 0 && (
            <div className="p-8 text-center text-muted-foreground text-sm">
              Aucun courrier dans ce dossier.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  if (["URGENT", "TRES_URGENT"].includes(label)) {
    return "destructive";
  }
  if (["NOTE_INTERNE"].includes(label)) {
    return "default";
  }
  return "secondary";
}
