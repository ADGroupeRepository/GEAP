"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent } from "../agents-table/schema";
import { AgentHeader } from "./agent-header";
import { PersonalInfos } from "./personal-infos";
import { DossiersTabContent } from "./dossiers/dossiers-tab-content";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface AgentDetailsViewProps {
  agent: Agent;
}

export function AgentDetailsView({ agent }: Readonly<AgentDetailsViewProps>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentTab = searchParams.get("tab") || "infos";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    // Supprimer le paramètre dossier si on quitte l'onglet dossiers
    if (value !== "dossiers") {
      params.delete("dossier");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <AgentHeader
        firstName={agent.firstName}
        lastName={agent.lastName}
        avatarUrl={agent.avatarUrl}
        matricule={agent.matricule}
      />

      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-[50%] group-data-horizontal/tabs:h-11">
          <TabsTrigger value="infos">Identification du personnel</TabsTrigger>
          <TabsTrigger value="dossiers">Liste des dossiers</TabsTrigger>
        </TabsList>

        <TabsContent value="infos" className="mt-0">
          <PersonalInfos agent={agent} />
        </TabsContent>
        <TabsContent value="dossiers" className="mt-0">
          <DossiersTabContent />
        </TabsContent>
      </Tabs>
    </div>
  );
}
