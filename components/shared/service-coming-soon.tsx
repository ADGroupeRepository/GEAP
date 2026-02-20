import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import Link from "next/link";

interface ServiceComingSoonProps {
  title?: string;
  description?: string;
  returnLink?: string;
  returnLabel?: string;
}

export function ServiceComingSoon({
  title = "Service à venir",
  description = "Ce module est en cours de développement. Revenez bientôt !",
  returnLink = "/hr/agents",
  returnLabel = "Retour au tableau de bord",
}: Readonly<ServiceComingSoonProps>) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-70px)] text-center p-8">
      <div className="bg-primary/10 p-6 rounded-full mb-6">
        <Construction className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight mb-3">{title}</h1>
      <p className="text-muted-foreground text-lg max-w-md mb-8">
        {description}
      </p>
      <Button asChild>
        <Link href={returnLink}>{returnLabel}</Link>
      </Button>
    </div>
  );
}
