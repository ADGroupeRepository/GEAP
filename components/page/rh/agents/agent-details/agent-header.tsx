"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { dossiersData } from "./dossiers/dossiers-data";

interface AgentHeaderProps {
  lastName: string;
  firstName: string;
  avatarUrl?: string;
  matricule: string;
}

export function AgentHeader({
  lastName,
  firstName,
  avatarUrl,
  matricule,
}: Readonly<AgentHeaderProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const dossierId = searchParams.get("dossier");
  const activeDossier = dossierId
    ? dossiersData.find((d) => d.id === dossierId)
    : null;

  const handleBackToDossiers = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("dossier");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 shrink-0"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={avatarUrl} alt={lastName} />
            <AvatarFallback>
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">
                {firstName} {lastName}
              </h1>
              <Badge variant="secondary">{matricule}</Badge>
            </div>

            {activeDossier && (
              <div className="flex items-center gap-2 text-sm mt-0.5">
                <span className="text-muted-foreground font-medium">/</span>
                <button
                  onClick={handleBackToDossiers}
                  className="font-medium text-muted-foreground hover:text-foreground hover:underline transition-colors"
                >
                  Dossiers
                </button>
                <span className="text-muted-foreground font-medium">/</span>
                <span className="font-medium text-foreground">
                  {activeDossier.nom}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button variant="ghost" size="icon" className="rounded-full shrink-0">
        <MoreHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
}
