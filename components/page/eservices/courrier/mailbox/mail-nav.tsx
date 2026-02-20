"use client";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Inbox,
  FileText,
  Send,
  Trash2,
  Archive,
  Users2,
  AlertCircle,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { useMail } from "./use-mail";
import { Separator } from "@/components/ui/separator";

interface MailNavProps {
  isCollapsed: boolean;
}

export function MailNav({ isCollapsed }: Readonly<MailNavProps>) {
  const { filter, setFilter } = useMail();

  const links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    onClick: () => void;
  }[] = [
    {
      title: "Boîte de réception",
      label: "128",
      icon: Inbox,
      variant: filter === "inbox" ? "default" : "ghost",
      onClick: () => setFilter("inbox"),
    },
    {
      title: "Brouillons",
      label: "9",
      icon: FileText,
      variant: filter === "drafts" ? "default" : "ghost",
      onClick: () => setFilter("drafts"),
    },
    {
      title: "Envoyés",
      label: "",
      icon: Send,
      variant: filter === "sent" ? "default" : "ghost",
      onClick: () => setFilter("sent"),
    },
    {
      title: "Corbeille",
      label: "",
      icon: Trash2,
      variant: filter === "trash" ? "default" : "ghost",
      onClick: () => setFilter("trash"),
    },
    {
      title: "Archives",
      label: "",
      icon: Archive,
      variant: filter === "archive" ? "default" : "ghost",
      onClick: () => setFilter("archive"),
    },
  ];

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={link.onClick}
            className={cn(
              buttonVariants({ variant: link.variant, size: "sm" }),
              link.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start",
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && (
              <span
                className={cn(
                  "ml-auto",
                  link.variant === "default" &&
                    "text-background dark:text-white",
                )}
              >
                {link.label}
              </span>
            )}
          </button>
        ))}
      </nav>
      <Separator />
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        <span className="px-4 text-xs font-semibold text-muted-foreground my-2">
          Dossiers
        </span>
        <button
          onClick={() => {}}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "justify-start",
          )}
        >
          <Users2 className="mr-2 h-4 w-4" />
          Social
        </button>
        <button
          onClick={() => {}}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "justify-start",
          )}
        >
          <AlertCircle className="mr-2 h-4 w-4" />
          Urgent
        </button>
        <button
          onClick={() => {}}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "justify-start",
          )}
        >
          <MessagesSquare className="mr-2 h-4 w-4" />
          Interne
        </button>
      </nav>
    </div>
  );
}
