import { agents } from "@/components/page/rh/agents/agents-table/data";
import { AgentDetailsView } from "@/components/page/rh/agents/agent-details/agent-details-view";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AgentDetailsPage({ params }: PageProps) {
  const { id } = await params;

  // Simulations fetch data
  const agent = agents.find((a) => a.id === id);

  if (!agent) {
    return notFound();
  }

  return (
    <div className="p-4 md:p-6">
      <AgentDetailsView agent={agent} />
    </div>
  );
}
