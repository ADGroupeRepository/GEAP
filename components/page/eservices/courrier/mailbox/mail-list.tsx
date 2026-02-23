"use client";

import { ComponentProps, useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMail } from "./use-mail";
import { Mail } from "../schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search, PlusCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function MailList({ items }: { readonly items?: Mail[] }) {
  const { mails, setSelectedMailId, filter, selectedMails, setSelectedMails } =
    useMail();
  const [openExpediteur, setOpenExpediteur] = useState(false);
  const [selectedExpediteur, setSelectedExpediteur] = useState<string | null>(
    null,
  );
  const [starredMails, setStarredMails] = useState<string[]>([]);

  const toggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (starredMails.includes(id)) {
      setStarredMails(starredMails.filter((mailId) => mailId !== id));
    } else {
      setStarredMails([...starredMails, id]);
    }
  };

  // Extract unique senders for the combobox
  const uniqueSenders = Array.from(new Set(mails.map((mail) => mail.sender)));

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

  const handleSelectAll = (checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedMails(filteredMails.map((m) => m.id));
    } else {
      setSelectedMails([]);
    }
  };

  const handleSelectMail = (id: string, checked: boolean | "indeterminate") => {
    if (checked === true) {
      setSelectedMails([...selectedMails, id]);
    } else {
      setSelectedMails(selectedMails.filter((mailId) => mailId !== id));
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-[11.5px] flex items-center justify-between gap-2 border-b">
        <div className="w-full flex flex-1 items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un courrier..."
              className="pl-8 h-9 lg:w-[30vw]"
            />
          </div>

          <div className="flex items-center gap-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <span className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Recherche avancée
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] p-0 gap-0">
                <DialogHeader className="px-6 py-5 pb-2">
                  <DialogTitle className="text-[22px] font-normal text-slate-800">
                    Recherche avancée
                  </DialogTitle>
                </DialogHeader>

                <div className="px-6 py-4 flex flex-col gap-5">
                  {/* Priorité */}
                  <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                    <label className="text-[14px] font-semibold ">
                      Niveau d&apos;urgence
                    </label>
                    <Select defaultValue="toute">
                      <SelectTrigger className="w-full sm:w-[350px] bg-white border-slate-300 shadow-none h-10">
                        <SelectValue placeholder="Niveau d'urgence" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="toute">Tout les niveaux</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                        <SelectItem value="tres-urgent">Très Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Expéditeur */}
                  <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                    <label className="text-[14px] font-semibold ">
                      Expéditeur
                    </label>
                    <div className="w-full sm:w-[350px]">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpenExpediteur(true)}
                        className={cn(
                          "w-full justify-start text-left font-normal border-slate-300 shadow-none h-10 text-[14px]",
                          !selectedExpediteur && "text-muted-foreground",
                        )}
                      >
                        {selectedExpediteur || "Sélectionner un expéditeur..."}
                      </Button>
                      <CommandDialog
                        open={openExpediteur}
                        onOpenChange={setOpenExpediteur}
                      >
                        <Command>
                          <CommandInput placeholder="Rechercher un expéditeur..." />
                          <CommandList>
                            <CommandEmpty>
                              Aucun expéditeur trouvé.
                            </CommandEmpty>
                            <CommandGroup heading="Suggestions">
                              {uniqueSenders.map((sender) => (
                                <CommandItem
                                  key={sender}
                                  value={sender}
                                  onSelect={() => {
                                    setSelectedExpediteur(
                                      sender === selectedExpediteur
                                        ? null
                                        : sender,
                                    );
                                    setOpenExpediteur(false);
                                  }}
                                >
                                  {sender}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </CommandDialog>
                    </div>
                  </div>

                  {/* Date de réception */}
                  <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                    <label className="text-[14px] font-semibold  text-left">
                      Date de réception
                    </label>
                    <Select defaultValue="n-importe">
                      <SelectTrigger className="w-full sm:w-[350px] bg-white border-slate-300 shadow-none h-10">
                        <SelectValue placeholder="N'importe quand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="n-importe">
                          N&apos;importe quand
                        </SelectItem>
                        <SelectItem value="aujourd-hui">
                          Aujourd&apos;hui
                        </SelectItem>
                        <SelectItem value="hier">Hier</SelectItem>
                        <SelectItem value="7-jours">
                          7 derniers jours
                        </SelectItem>
                        <SelectItem value="30-jours">
                          30 derniers jours
                        </SelectItem>
                        <SelectItem value="personnalise">
                          Personnalisé...
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Statut de lecture */}
                  <div className="grid grid-cols-[180px_1fr] items-center gap-4">
                    <label className="text-[14px] font-semibold  text-left">
                      Statut de lecture
                    </label>
                    <Select defaultValue="tous">
                      <SelectTrigger className="w-full sm:w-[350px] bg-white border-slate-300 shadow-none h-10">
                        <SelectValue placeholder="Tous" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tous">Tous</SelectItem>
                        <SelectItem value="non-lu">Non lu</SelectItem>
                        <SelectItem value="lu">Lu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter className="px-6 py-4 mt-2 border-t border-slate-200 flex flex-row sm:flex-row items-center justify-end sm:justify-end w-full">
                  <div className="flex items-center gap-2">
                    <DialogClose asChild>
                      <Button variant="ghost">Réinitialiser</Button>
                    </DialogClose>
                    <Button className="px-4">Rechercher</Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1 h-full min-h-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px] pl-4">
                <Checkbox
                  checked={
                    filteredMails.length > 0 &&
                    selectedMails.length === filteredMails.length
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Sélectionner tous les courriers"
                />
              </TableHead>
              <TableHead className="w-[200px] font-semibold">
                Expéditeur
              </TableHead>
              <TableHead className="pr-4 font-semibold pl-4">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMails.length > 0 ? (
              filteredMails.map((item) => (
                <TableRow
                  key={item.id}
                  className={cn(
                    "cursor-pointer hover:bg-muted/50 transition-colors h-14",
                    item.read ? " bg-sky-50" : "",
                  )}
                  onClick={() => setSelectedMailId(item.id)}
                >
                  <TableCell
                    className="w-[70px] pl-4 pr-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedMails.includes(item.id)}
                        className="cursor-pointer"
                        onCheckedChange={(checked) =>
                          handleSelectMail(item.id, checked)
                        }
                        aria-label={`Sélectionner le courrier de ${item.sender}`}
                      />
                      <button
                        type="button"
                        onClick={(e) => toggleStar(e, item.id)}
                        className="shrink-0 cursor-pointer"
                      >
                        <Star
                          className={cn(
                            "h-4 w-4 transition-colors stroke-[1.5]",
                            starredMails.includes(item.id)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground hover:text-muted-foreground/80",
                          )}
                        />
                      </button>
                    </div>
                  </TableCell>
                  <TableCell className="text-[13px] pl-2">
                    <div className="flex gap-x-2 w-[calc(100vw-720px)]">
                      <div className="flex items-center gap-x-2">
                        <Badge
                          variant={getBadgeVariantFromLabel(item.priority)}
                          className="text-[10px]"
                        >
                          {item.priority}
                        </Badge>
                        <div className="font-semibold">{item.sender}</div>
                      </div>
                      <div>-</div>
                      <div className="truncate w-full">{item.object}</div>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap pl-4 text-[13px]">
                    {format(new Date(item.receivedAt), "dd MMM yyyy", {
                      locale: fr,
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  Aucun courrier dans ce dossier.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
