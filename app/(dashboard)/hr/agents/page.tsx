import TabsAgents from "@/components/page/rh/agents/tabs-agents";

export default function AgentsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Dossiers des agents</h1>
      <TabsAgents />
    </div>
  );
}
