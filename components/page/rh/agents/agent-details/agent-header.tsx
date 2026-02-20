"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl} alt={lastName} />
            <AvatarFallback>
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold">
                {firstName} {lastName}
              </h1>
              <Badge variant="secondary">{matricule}</Badge>
            </div>
          </div>
        </div>
      </div>

      <Button variant="ghost" size="icon" className="rounded-full">
        <MoreHorizontal className="h-5 w-5" />
      </Button>
    </div>
  );
}
