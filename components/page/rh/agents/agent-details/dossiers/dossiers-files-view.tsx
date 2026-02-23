"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/layout/navigations/icons";
import { Search, Upload, Plus, MoreHorizontal } from "lucide-react";
import { Dossier, dossiersData } from "./dossiers-data";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DossiersFilesViewProps {
  dossier: Dossier;
}

export function DossiersFilesView({
  dossier,
}: Readonly<DossiersFilesViewProps>) {
  const [isDossierIncomplet, setIsDossierIncomplet] = useState(
    dossier.status === "Incomplet",
  );

  useEffect(() => {
    setIsDossierIncomplet(dossier.status === "Incomplet");
  }, [dossier]);

  const handleStatusToggle = (checked: boolean) => {
    setIsDossierIncomplet(checked);
    // Mutate the mock data object globally without modifying the prop directly
    const targetDossier = dossiersData.find((d) => d.id === dossier.id);
    if (targetDossier) {
      targetDossier.status = checked ? "Incomplet" : "Complet";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="relative w-[23vw]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Rechercher un fichier ou un dossier"
              className="pl-9 bg-white h-10"
            />
          </div>
          <Button
            variant="outline"
            className="text-primary hover:text-primary h-10 px-4"
          >
            <Upload className="h-4 w-4" />
            Charger
          </Button>
          <Button
            variant="outline"
            className="text-primary hover:text-primary h-10 px-4"
          >
            <Plus className="h-4 w-4" />
            Nouveau dossier
          </Button>
        </div>

        <label
          htmlFor="status-switch"
          className="flex items-center gap-4 bg-white border border-gray-200 px-4 py-2 h-10 rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700 select-none">
            Marquer le dossier comme incomplet
          </span>
          <Switch
            id="status-switch"
            checked={isDossierIncomplet}
            onCheckedChange={handleStatusToggle}
          />
        </label>
      </div>

      {/* Table */}
      <ScrollArea className="border rounded-md h-[calc(100vh-307px)]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b">
              <TableHead className="w-[35%] font-bold text-gray-900">
                Nom
              </TableHead>
              <TableHead className="w-[25%] font-bold text-gray-900">
                Dernière modification
              </TableHead>
              <TableHead className="w-[35%] font-bold text-gray-900">
                Téléversé par
              </TableHead>
              <TableHead className="w-[5%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dossier.files && dossier.files.length > 0 ? (
              dossier.files.map((file) => (
                <TableRow
                  key={file.id}
                  className="h-16 hover:bg-muted/50 transition-colors border-b"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {file.type === "pdf" ? (
                        <Icons.Pdf className="h-5 w-5 text-red-500" />
                      ) : (
                        <Icons.Doc className="h-5 w-5" />
                      )}
                      <span>{file.nom}</span>
                    </div>
                  </TableCell>
                  <TableCell>{file.lastModified}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="">
                          {file.televersePar?.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{file.televersePar?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-gray-600"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-12 text-muted-foreground"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Icons.Doc className="h-10 w-10 text-muted-foreground/30 mb-4" />
                    <p className="font-medium text-gray-900">
                      Ce dossier est vide.
                    </p>
                    <p className="text-sm">
                      Aucun fichier n&apos;a été rattaché à ce dossier.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
