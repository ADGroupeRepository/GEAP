"use client";

import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

import {
  Archive,
  ArrowLeft,
  Star,
  Clock,
  Forward,
  Trash2,
  Phone,
  Mail as MailIcon,
  UserPlus,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMail } from "./use-mail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const agents = [
  {
    id: "kone",
    name: "Agent Koné",
    grade: "Commissaire",
    avatar: "/homme01.png",
    initials: "AK",
  },
  {
    id: "sylla",
    name: "Agent Sylla",
    grade: "Officier",
    avatar: "/homme02.png",
    initials: "AS",
  },
  {
    id: "bamba",
    name: "Agent Bamba",
    grade: "Sous-Officier",
    avatar: "/femme01.png",
    initials: "AB",
  },
  {
    id: "coulibaly",
    name: "Agent Coulibaly",
    grade: "Inspecteur",
    avatar: "/homme03.png",
    initials: "AC",
  },
  {
    id: "diallo",
    name: "Agent Diallo",
    grade: "Commissaire",
    avatar: "/femme02.png",
    initials: "AD",
  },
  {
    id: "toure",
    name: "Agent Touré",
    grade: "Officier",
    avatar: "/homme01.png",
    initials: "AT",
  },
];

export function MailDisplay() {
  const { mails, selectedMailId, setSelectedMailId } = useMail();
  const mail = mails.find((item) => item.id === selectedMailId);
  const [imputerOpen, setImputerOpen] = useState(false);
  const [imputerService, setImputerService] = useState("");
  const [imputerAgent, setImputerAgent] = useState("");
  const [imputerPriority, setImputerPriority] = useState("");
  const [imputerInstructions, setImputerInstructions] = useState("");

  const handleImputerSubmit = () => {
    // TODO: Implement actual imputation logic
    console.log({
      service: imputerService,
      agent: imputerAgent,
      priority: imputerPriority,
      instructions: imputerInstructions,
    });
    setImputerOpen(false);
    setImputerService("");
    setImputerAgent("");
    setImputerPriority("");
    setImputerInstructions("");
  };

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
                <Button
                  variant="outline"
                  className="px-4"
                  onClick={() => setSelectedMailId(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour
                </Button>
              </TooltipTrigger>
              <TooltipContent>Retour</TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
                  <Star className="h-4 w-4" />
                  <span className="sr-only">Favori</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Favori</TooltipContent>
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
          <Separator orientation="vertical" className="mx-1 my-auto h-6" />
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

        <Dialog open={imputerOpen} onOpenChange={setImputerOpen}>
          <DialogTrigger asChild>
            <Button
              variant={"outline"}
              className="px-4 text-primary hover:text-primary ml-auto"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Imputer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Imputer le courrier</DialogTitle>
              <DialogDescription>
                Assignez ce courrier à un service et un agent pour traitement.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="imputer-service">Service destinataire</Label>
                <Select
                  value={imputerService}
                  onValueChange={setImputerService}
                >
                  <SelectTrigger id="imputer-service" className="w-full">
                    <SelectValue placeholder="Sélectionner un service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dgpn">
                      Direction Générale de la Police Nationale
                    </SelectItem>
                    <SelectItem value="drh">
                      Direction des Ressources Humaines
                    </SelectItem>
                    <SelectItem value="dst">
                      Direction de la Surveillance du Territoire
                    </SelectItem>
                    <SelectItem value="dcpj">
                      Direction Centrale de la Police Judiciaire
                    </SelectItem>
                    <SelectItem value="dsp">
                      Direction de la Sécurité Publique
                    </SelectItem>
                    <SelectItem value="logistique">
                      Direction Logistique
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="imputer-agent">Agent traitant</Label>
                <Select value={imputerAgent} onValueChange={setImputerAgent}>
                  <SelectTrigger
                    id="imputer-agent"
                    className="w-full h-auto py-2"
                  >
                    <SelectValue placeholder="Sélectionner un agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={agent.avatar} alt={agent.name} />
                            <AvatarFallback className="text-[10px]">
                              {agent.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col text-left justify-center">
                            <span className="font-medium leading-none mb-1">
                              {agent.name}
                            </span>
                            <span className="text-[10px] text-muted-foreground leading-none">
                              {agent.grade}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="imputer-priority">Niveau de priorité</Label>
                <Select
                  value={imputerPriority}
                  onValueChange={setImputerPriority}
                >
                  <SelectTrigger id="imputer-priority" className="w-full">
                    <SelectValue placeholder="Sélectionner la priorité" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="URGENT">Urgent</SelectItem>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                    <SelectItem value="FAIBLE">Faible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="imputer-instructions">Instructions</Label>
                <Textarea
                  id="imputer-instructions"
                  placeholder="Ajoutez des instructions ou remarques pour l'agent traitant..."
                  value={imputerInstructions}
                  onChange={(e) => setImputerInstructions(e.target.value)}
                  className="min-h-24"
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setImputerOpen(false)}>
                Annuler
              </Button>
              <Button
                onClick={handleImputerSubmit}
                disabled={!imputerService || !imputerAgent}
              >
                Confirmer l&apos;imputation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Separator orientation="vertical" className="mx-2 h-6 my-auto" />

        <Button className="px-4">Répondre</Button>
      </div>
      <Separator />
      {mail ? (
        <ScrollArea className="flex-1 h-full min-h-0">
          <div className="p-4 space-y-4">
            <div className="flex md:flex-row flex-col items-start justify-between gap-4">
              <div className="flex items-start gap-4 text-sm">
                <div className="grid gap-1.5">
                  <div className="font-semibold text-base">
                    {mail.officialName || mail.sender}
                  </div>
                  <div className="flex items-center gap-x-4 gap-y-2 text-xs text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-2">
                      {mail.senderType && (
                        <Badge
                          variant="secondary"
                          className="font-normal text-[10px] px-2 py-0 h-5"
                        >
                          {mail.senderType}
                        </Badge>
                      )}
                      {(mail.identificationNumber || mail.senderType) && (
                        <span>•</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {mail.phone || "N/A"}
                      </span>
                      <span className="flex items-center gap-1">
                        <MailIcon className="h-3 w-3" />
                        {mail.email || "N/A"}
                      </span>
                      {mail.emittedAt && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-foreground">
                            Émis le:
                          </span>{" "}
                          {format(new Date(mail.emittedAt), "PPpp", {
                            locale: fr,
                          })}
                        </span>
                      )}
                      {mail.receivedAt && (
                        <span className="flex items-center gap-1">
                          <span className="font-medium text-foreground">
                            Reçu le:
                          </span>{" "}
                          {format(new Date(mail.receivedAt), "PPpp", {
                            locale: fr,
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />
          <div className="flex items-start p-4 pb-4">
            <div className="w-full">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-4 text-sm w-full">
                  <div className="flex flex-wrap items-center gap-2">
                    <span>À</span>
                    <Badge
                      variant="outline"
                      className="gap-2 px-2 h-9 rounded-md"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">
                          {mail.recipientService.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">
                        {mail.recipientService}
                      </span>
                    </Badge>

                    <span className="mx-1">•</span>

                    <span>Cc</span>
                    <Badge
                      variant="outline"
                      className="gap-2 px-2 h-9 rounded-md"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/femme01.png" alt="Sophia" />
                        <AvatarFallback className="text-[10px]">
                          SO
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">Sophia</span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="gap-2 px-2 h-9 rounded-md"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/homme02.png" alt="Liam" />
                        <AvatarFallback className="text-[10px]">
                          LI
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-foreground">Liam</span>
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <span>Imputé à</span>
                    <Badge
                      variant="outline"
                      className="gap-2 px-2 h-9 rounded-md text-primary"
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/homme01.png" alt="Agent Traitant" />
                        <AvatarFallback className="text-[10px] text-primary">
                          AG
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">Agent Traitant</span>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="whitespace-pre-wrap p-4 text-sm">
            <div className="py-2 flex gap-2">
              <h1 className="text-xl font-medium mb-4">
                <span className="text-red-500 font-semibold text-xs bg-red-100 rounded-full px-2 py-1 relative bottom-0.5">
                  {mail.priority}
                </span>{" "}
                {mail.object}
              </h1>
            </div>
            <div className="space-y-4">
              <div className="border rounded-md bg-muted/20">
                <div className="h-[600px] w-full rounded-md flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900">
                  {mail.scanUrl ? (
                    <iframe
                      src={mail.scanUrl}
                      className="w-full h-full animate-in fade-in duration-500"
                      title="Aperçu du courrier"
                    />
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
        </ScrollArea>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          Aucun message sélectionné
        </div>
      )}
    </div>
  );
}
