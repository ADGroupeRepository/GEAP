import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/components/layout/navigations/icons";
import { dossiersData } from "./dossiers-data";
import { ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export function DossiersTable() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSelectDossier = (id: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", "dossiers");
    params.set("dossier", id);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ScrollArea className="border rounded-md h-[calc(100vh-300px)]">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[50%] font-semibold">Nom</TableHead>
            <TableHead className="font-semibold">Status du dossier</TableHead>
            <TableHead className="font-semibold">
              Dernière modification
            </TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dossiersData.map((dossier) => (
            <TableRow
              key={dossier.id}
              className="h-14 cursor-pointer hover:bg-muted/50 transition-colors group"
              onClick={() => handleSelectDossier(dossier.id)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Icons.Doc className="h-5 w-5" />
                  <span className="font-normal">{dossier.nom}</span>
                </div>
              </TableCell>
              <TableCell>
                {dossier.status === "Incomplet" ? (
                  <Badge
                    variant="destructive"
                    className="bg-red-50 text-red-600 border-none font-normal h-6 rounded-md px-3 group-hover:bg-red-100 transition-colors"
                  >
                    {dossier.status}
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="bg-green-50 text-green-700 border-none font-normal h-6 rounded-md px-3 group-hover:bg-green-100 transition-colors"
                  >
                    {dossier.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{dossier.lastModified}</TableCell>
              <TableCell>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
