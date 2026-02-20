import { z } from "zod";

export const agentSchema = z.object({
  id: z.string(),
  lastName: z.string(), // Added lastName
  firstName: z.string(), // Added firstName
  email: z.string().email(),
  matricule: z.string(),
  grade: z.string().optional(),
  completion: z.number().min(0).max(100),
  avatarUrl: z.string().optional(),

  // Detailed fields
  maidenName: z.string().optional(),
  gender: z.enum(["Masculin", "Féminin"]),
  birthDate: z.string(),
  birthPlace: z.string(),
  phoneNumber: z.string(),
  // Removed role, status(kept implicitly via dossierStatus?), lastActive
  // Wait, the user asked for "matricule, status des dossiers".
  // I should probably keep an "account status" if it's different from "dossier status", but the prompt implies "status des dossiers" is the main status of interest.
  // I will keep a generic "status" for the account activation if needed, but the prompt specifically asked for "status des dossiers".
  // Let's stick to the plan: Agent (Avatar, Name, Email), Matricule, Grade, Statut Dossier.
});

export type Agent = z.infer<typeof agentSchema>;
