"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  FileText,
  Search,
} from "lucide-react";
import { agents } from "./data";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const getCompletionBadgeInfo = (completion: number) => {
  if (completion === 100) {
    return {
      className:
        "border-transparent bg-green-100 text-green-700 hover:bg-green-100/80 dark:bg-green-900/30 dark:text-green-400",
      label: "100% Complet",
    };
  }
  return {
    className:
      "border-transparent bg-red-100 text-red-700 hover:bg-red-100/80 dark:bg-red-900/30 dark:text-red-400",
    label: `${completion}% Incomplet`,
  };
};

export function AgentsTable() {
  const router = useRouter();

  return (
    <>
      <div className="relative w-[30%]">
        <Search className="absolute left-2.5 top-[50%] translate-y-[-50%] size-4.5 text-muted-foreground" />
        <Input
          placeholder="Rechercher un agent..."
          className="pl-[36px] h-10"
        />
      </div>
      <div className="rounded-md border h-[calc(100vh-260px)]">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[300px] font-semibold">Agent</TableHead>
              <TableHead className="font-semibold">Matricule</TableHead>
              <TableHead className="font-semibold">Grade</TableHead>
              <TableHead className="font-semibold">
                Status des dossiers
              </TableHead>
              <TableHead className="w-[50px] font-semibold "></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((agent) => (
              <TableRow
                key={agent.id}
                className="cursor-pointer hover:bg-muted/50 h-16"
                onClick={() => router.push(`/hr/agents/${agent.id}`)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={agent.avatarUrl} alt={agent.lastName} />
                      <AvatarFallback>
                        {agent.firstName[0].toUpperCase()}
                        {agent.lastName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm  leading-none">
                        {agent.firstName} {agent.lastName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {agent.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">
                  {agent.matricule}
                </TableCell>
                <TableCell>{agent.grade || "-"}</TableCell>
                <TableCell>
                  {(() => {
                    const badgeInfo = getCompletionBadgeInfo(agent.completion);
                    return (
                      <Badge
                        variant="secondary"
                        className={`rounded py-3.5 px-3 ${badgeInfo.className} font-normal`}
                      >
                        {badgeInfo.label}
                      </Badge>
                    );
                  })()}
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                      >
                        <span className="sr-only">Ouvrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[250px]">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => router.push(`/hr/agents/${agent.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                        Voir le profil
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4" />
                        Consulter le dossier
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <Trash className="h-4 w-4" />
                        Archiver
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
