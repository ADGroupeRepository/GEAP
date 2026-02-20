"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Agent } from "../agents-table/schema";
import { AgentHeader } from "./agent-header";
import { PersonalInfos } from "./personal-infos";

interface AgentDetailsViewProps {
  agent: Agent;
}

export function AgentDetailsView({ agent }: Readonly<AgentDetailsViewProps>) {
  return (
    <div className="space-y-6">
      <AgentHeader
        firstName={agent.firstName}
        lastName={agent.lastName}
        avatarUrl={agent.avatarUrl}
        matricule={agent.matricule}
      />

      <Tabs defaultValue="infos" className="w-full">
        <TabsList className="w-[50%] group-data-horizontal/tabs:h-11">
          <TabsTrigger value="infos">Identification du personnel</TabsTrigger>
          <TabsTrigger value="dossiers">Liste des dossiers</TabsTrigger>
        </TabsList>

        <TabsContent value="infos" className="mt-0">
          <PersonalInfos agent={agent} />
        </TabsContent>
        <TabsContent
          value="dossiers"
          className="min-h-[400px] flex items-center justify-center border rounded-lg border-dashed"
        >
          <p className="text-muted-foreground">Liste des dossiers vide</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
