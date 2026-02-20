import { useSearchParams } from "next/navigation";
import { DossiersSearch } from "./dossiers-search";
import { DossiersTable } from "./dossiers-table";
import { DossiersFilesView } from "./dossiers-files-view";
import { dossiersData } from "./dossiers-data";

export function DossiersTabContent() {
  const searchParams = useSearchParams();
  const selectedDossierId = searchParams.get("dossier");

  const activeDossier = selectedDossierId
    ? dossiersData.find((d) => d.id === selectedDossierId)
    : null;

  return (
    <div className="w-full flex flex-col pt-4">
      {selectedDossierId ? (
        <div className="flex flex-col gap-4">
          {activeDossier && <DossiersFilesView dossier={activeDossier} />}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <DossiersSearch />
          <DossiersTable />
        </div>
      )}
    </div>
  );
}
