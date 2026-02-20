import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Agent } from "../agents-table/schema";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PersonalInfosProps {
  agent: Agent;
}

export function PersonalInfos({ agent }: Readonly<PersonalInfosProps>) {
  return (
    <div className="space-y-8 p-6 rounded-lg border mt-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Informations Personnelles</h2>
        <Button variant="secondary" className="text-primary px-4 h-10">
          <Pencil className="size-4.5" />
          Modifier les informations de l&apos;agent
        </Button>
      </div>

      <div className="">
        {/* Photo Section */}
        <div className="flex items-center gap-4 mb-10">
          <Avatar className="h-36 w-36">
            <AvatarImage src={agent.avatarUrl} alt={agent.lastName} />
            <AvatarFallback>
              {agent.firstName[0].toUpperCase()}
              {agent.lastName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <p className="text-lg font-medium">Photo de l&apos;agent</p>
        </div>

        {/* Inputs Section */}
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="lastName"
                className="font-semibold text-foreground"
              >
                Nom
              </Label>
              <Input
                id="lastName"
                value={agent.lastName}
                readOnly
                className="bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 font-medium text-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="font-semibold text-foreground"
              >
                Prénom
              </Label>
              <Input
                id="firstName"
                value={agent.firstName}
                readOnly
                className="bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 font-medium text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="maidenName"
                className="font-semibold text-foreground"
              >
                Nom de jeune fille
              </Label>
              <Input
                id="maidenName"
                value={agent.maidenName || "Nom de jeune fille"}
                readOnly
                className="bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 font-medium text-gray-400 dark:text-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender" className="font-semibold text-foreground">
                Genre
              </Label>
              <Input
                id="gender"
                value={agent.gender}
                readOnly
                className="bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 font-medium text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="birthDate"
                className="font-semibold text-foreground"
              >
                Date de naissance
              </Label>
              <Input
                id="birthDate"
                value={agent.birthDate}
                readOnly
                className="bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 font-medium text-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="birthPlace"
                className="font-semibold text-foreground"
              >
                Lieu de naissance
              </Label>
              <Input
                id="birthPlace"
                value={agent.birthPlace}
                readOnly
                className="bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 font-medium text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-foreground">
                Email
              </Label>
              <Input
                id="email"
                value={agent.email}
                readOnly
                className="bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 font-medium text-gray-700 dark:text-gray-300"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="phoneNumber"
                className="font-semibold text-foreground"
              >
                Numéro de téléphone
              </Label>
              <Input
                id="phoneNumber"
                value={agent.phoneNumber}
                readOnly
                className="bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 font-medium text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Informations Professionnelles</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="matricule" className="font-semibold text-foreground">
            Matricule
          </Label>
          <Input
            id="matricule"
            value={agent.matricule}
            readOnly
            className="bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 font-medium text-gray-700 dark:text-gray-300"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="grade" className="font-semibold text-foreground">
            Grade
          </Label>
          <Input
            id="grade"
            value={agent.grade || "-"}
            readOnly
            className="bg-gray-50/50 border-gray-100 dark:bg-gray-800/50 dark:border-gray-800 font-medium text-gray-700 dark:text-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
