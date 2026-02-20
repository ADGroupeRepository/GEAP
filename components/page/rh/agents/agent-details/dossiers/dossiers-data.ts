export interface DossierFile {
  id: string;
  nom: string;
  type: "pdf" | "image" | "word";
  status: "Complet" | "Incomplet";
  lastModified: string;
  size: string;
  televersePar: {
    name: string;
    initials: string;
  };
}

export interface Dossier {
  id: string;
  nom: string;
  status: "Complet" | "Incomplet";
  lastModified: string;
  files: DossierFile[];
}

const defaultUploader = { name: "KONAN Gbady Syka Joseline", initials: "KG" };

export const dossiersData: Dossier[] = [
  {
    id: "1",
    nom: "État civil et Identité",
    status: "Complet",
    lastModified: "12/01/2026 à 09:15",
    files: [
      {
        id: "f1-1",
        nom: "CNI_Recto_Verso.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "12/01/2026 à 09:10",
        size: "1.2 MB",
        televersePar: defaultUploader,
      },
      {
        id: "f1-2",
        nom: "Extrait_Acte_Naissance.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "12/01/2026 à 09:15",
        size: "850 KB",
        televersePar: defaultUploader,
      },
      {
        id: "f1-3",
        nom: "Photo_Identite_Officielle.image",
        type: "image",
        status: "Complet",
        lastModified: "12/01/2026 à 09:05",
        size: "2.1 MB",
        televersePar: defaultUploader,
      },
    ],
  },
  {
    id: "2",
    nom: "Recrutement et Formation Initiale",
    status: "Complet",
    lastModified: "05/09/2023 à 14:30",
    files: [
      {
        id: "f2-1",
        nom: "Arrete_Admission_Ecole_Police.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "05/09/2023 à 14:00",
        size: "3.4 MB",
        televersePar: defaultUploader,
      },
      {
        id: "f2-2",
        nom: "Diplome_Fin_Formation.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "15/07/2024 à 10:20",
        size: "1.8 MB",
        televersePar: defaultUploader,
      },
    ],
  },
  {
    id: "3",
    nom: "Affectations et Mutations",
    status: "Incomplet",
    lastModified: "20/02/2026 à 11:00",
    files: [
      {
        id: "f3-1",
        nom: "Decision_Affectation_Commissariat_Central.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "01/08/2024 à 08:45",
        size: "2.2 MB",
        televersePar: defaultUploader,
      },
    ],
  },
  {
    id: "4",
    nom: "Aptitude Physique et Armement",
    status: "Incomplet",
    lastModified: "18/02/2026 à 16:45",
    files: [
      {
        id: "f4-1",
        nom: "Certificat_Aptitude_Medicale_2026.pdf",
        type: "pdf",
        status: "Incomplet",
        lastModified: "18/02/2026 à 16:45",
        size: "920 KB",
        televersePar: defaultUploader,
      },
      {
        id: "f4-2",
        nom: "Habilitation_Port_Arme.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "10/01/2025 à 11:30",
        size: "1.5 MB",
        televersePar: defaultUploader,
      },
    ],
  },
  {
    id: "5",
    nom: "Carrière, Grades et Échelons",
    status: "Complet",
    lastModified: "01/01/2026 à 10:00",
    files: [
      {
        id: "f5-1",
        nom: "Arrete_Nomination_Titularisation.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "01/09/2024 à 09:20",
        size: "2.8 MB",
        televersePar: defaultUploader,
      },
      {
        id: "f5-2",
        nom: "Avis_Avancement_Echelon_2.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "01/01/2026 à 10:00",
        size: "1.1 MB",
        televersePar: defaultUploader,
      },
    ],
  },
  {
    id: "6",
    nom: "Évaluations et Notations Annuelles",
    status: "Incomplet",
    lastModified: "15/12/2025 à 15:20",
    files: [
      {
        id: "f6-1",
        nom: "Fiche_Notation_2024.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "15/12/2024 à 14:10",
        size: "1.6 MB",
        televersePar: defaultUploader,
      },
    ],
  },
  {
    id: "7",
    nom: "Médailles, Décorations et Récompenses",
    status: "Complet",
    lastModified: "14/07/2025 à 18:00",
    files: [
      {
        id: "f7-1",
        nom: "Lettre_Felicitation_Intervention.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "14/07/2025 à 18:00",
        size: "950 KB",
        televersePar: defaultUploader,
      },
    ],
  },
  {
    id: "8",
    nom: "Discipline",
    status: "Complet",
    lastModified: "01/01/2023 à 08:00",
    files: [],
  },
  {
    id: "9",
    nom: "Congés et Permissions",
    status: "Incomplet",
    lastModified: "19/02/2026 à 09:30",
    files: [
      {
        id: "f9-1",
        nom: "Demande_Conges_Annuels_2026.word",
        type: "word",
        status: "Incomplet",
        lastModified: "19/02/2026 à 09:30",
        size: "45 KB",
        televersePar: defaultUploader,
      },
    ],
  },
  {
    id: "10",
    nom: "Situation Financière (RIB, Primes)",
    status: "Complet",
    lastModified: "10/01/2026 à 14:15",
    files: [
      {
        id: "f10-1",
        nom: "RIB_Compte_Bancaire.pdf",
        type: "pdf",
        status: "Complet",
        lastModified: "10/01/2026 à 14:10",
        size: "500 KB",
        televersePar: defaultUploader,
      },
    ],
  },
];
