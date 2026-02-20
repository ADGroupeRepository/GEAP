"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";

import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useMail } from "./use-mail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function MailDisplay() {
  const { mails, selectedMailId } = useMail();
  const mail = mails.find((item) => item.id === selectedMailId);

  if (!mail) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Aucun message sélectionné
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Archive className="h-4 w-4" />
                  <span className="sr-only">Archiver</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archiver</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <ArchiveX className="h-4 w-4" />
                  <span className="sr-only">Indésirable</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Indésirable</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Corbeille</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Corbeille</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Clock className="h-4 w-4" />
                  <span className="sr-only">Rappel</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rappel</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Reply className="h-4 w-4" />
                  <span className="sr-only">Répondre</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Répondre</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <ReplyAll className="h-4 w-4" />
                  <span className="sr-only">Répondre à tous</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Répondre à tous</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" disabled={!mail}>
                  <Forward className="h-4 w-4" />
                  <span className="sr-only">Transférer</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Transférer</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!mail}>
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Plus</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Marquer comme non lu</DropdownMenuItem>
            <DropdownMenuItem>Marquer comme important</DropdownMenuItem>
            <DropdownMenuItem>Ajouter un label</DropdownMenuItem>
            <DropdownMenuItem>Imprimer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {mail ? (
        <ScrollArea className="flex-1 h-full min-h-0">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail.sender} />
                <AvatarFallback>
                  {mail.sender
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{mail.sender}</div>
                <div className="line-clamp-1 text-xs">
                  {mail.senderOrganization} - {mail.reference}
                </div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Répondre à:</span> {mail.sender}
                </div>
              </div>
            </div>
            {mail.receivedAt && (
              <div className="ml-auto text-xs text-muted-foreground">
                {format(new Date(mail.receivedAt), "PPpp", { locale: fr })}
              </div>
            )}
          </div>
          <Separator />
          <div className="p-4 flex gap-2">
            <Badge variant="outline">{mail.type}</Badge>
            <Badge
              variant={mail.priority === "URGENT" ? "destructive" : "secondary"}
            >
              {mail.priority}
            </Badge>
            <Badge variant="secondary">{mail.confidentiality}</Badge>
          </div>
          <div className="whitespace-pre-wrap p-4 text-sm">
            <h1 className="text-xl font-bold mb-4">{mail.object}</h1>
            <div className="space-y-4">
              <p>
                <strong>Dossier référence:</strong> {mail.reference}
              </p>
              <div className="border p-4 rounded-md bg-muted/20">
                <p className="text-muted-foreground italic">
                  Contenu du courrier numérisé (Simulation de l&apos;OCR ou
                  prévisualisation PDF)
                </p>
                <div className="mt-4 h-64 bg-slate-100 dark:bg-slate-900 rounded border flex items-center justify-center">
                  {mail.scanUrl ? (
                    <span className="text-sm text-blue-600 underline cursor-pointer">
                      Voir le PDF numérisé ({mail.pageCount} pages)
                    </span>
                  ) : (
                    <span>Aucun scan associé</span>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold mb-2">Historique de traitement</h3>
                <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                  <li>
                    Enregistré par {mail.registeredBy} le{" "}
                    {format(new Date(mail.receivedAt), "dd/MM/yyyy HH:mm")}
                  </li>
                  {mail.status === "TRANSMIS" && (
                    <li>Transmis au service {mail.recipientService}</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Répondre à ${mail.sender}...`}
                />
                <div className="flex items-center">
                  <Label
                    htmlFor="mute"
                    className="flex items-center gap-2 text-xs font-normal"
                  >
                    <Switch id="mute" aria-label="Mute thread" /> Mettre en
                    sourdine
                  </Label>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    className="ml-auto"
                  >
                    Envoyer
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </ScrollArea>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          Aucun message sélectionné
        </div>
      )}
    </div>
  );
}
