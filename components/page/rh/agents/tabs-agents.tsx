import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AgentsTable } from "./agents-table/agents-table";

export default function TabsAgents() {
  return (
    <Tabs defaultValue="list" className="w-full">
      <TabsList className="w-[50%] group-data-horizontal/tabs:h-11">
        <TabsTrigger value="list" className="">
          Liste des agents
        </TabsTrigger>
        <TabsTrigger value="stats" className="">
          Statistiques
        </TabsTrigger>
      </TabsList>
      <TabsContent value="list" className="mt-2 space-y-4">
        <AgentsTable />
      </TabsContent>
      <TabsContent value="stats">Statistiques</TabsContent>
    </Tabs>
  );
}
