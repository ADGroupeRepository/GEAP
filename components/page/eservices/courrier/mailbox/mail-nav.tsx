"use client";

import { cn } from "@/lib/utils";
import {
  Inbox,
  FileText,
  Send,
  Trash2,
  Archive,
  Star,
  Settings,
  Users,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import { useMail } from "./use-mail";

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
      title: "Favoris",
      label: "",
      icon: Star,
      variant: filter === "favorites" ? "default" : "ghost",
      onClick: () => setFilter("favorites"),
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
    {
      title: "Correspondant",
      label: "",
      icon: Users,
      variant: filter === "correspondent" ? "default" : "ghost",
      onClick: () => setFilter("correspondent"),
    },
    {
      title: "Discussions",
      label: "",
      icon: MessageSquare,
      variant: filter === "discussions" ? "default" : "ghost",
      onClick: () => setFilter("discussions"),
    },
  ];

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col flex-1 gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) => (
          <button
            key={index + "index"}
            onClick={link.onClick}
            className={cn(
              "flex items-center gap-x-2 rounded-lg w-full h-10 text-[13px] transition-colors cursor-pointer",
              link.variant === "default"
                ? "bg-slate-100 pl-1  dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                : "hover:bg-slate-100 pl-4 py-2 text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
            )}
          >
            {link.variant === "default" && (
              <div className="h-8 w-1 rounded bg-primary"></div>
            )}
            <link.icon className="h-4 w-4" />
            <span>{link.title}</span>
            {link.label && (
              <span
                className={cn(
                  "ml-auto mr-2 font-medium text-xs",
                  link.variant === "default"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400",
                )}
              >
                {link.label}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="mt-auto px-2">
        <button
          className={cn(
            "flex items-center gap-x-2 rounded-lg w-full text-[13px] transition-colors",
            "hover:bg-slate-100 pl-4 py-2 text-slate-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
          )}
        >
          <Settings className="h-4 w-4" />
          <span>Paramètres</span>
        </button>
      </div>
    </div>
  );
}
