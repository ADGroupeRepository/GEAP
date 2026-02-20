"use client";

import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SecurityBadge } from "./security-badge";
import { Scan, UploadCloud, CheckCircle2, Printer } from "lucide-react";
import { mailSchema } from "../schema";

// Schema partiel pour le formulaire (sans les champs auto-générés)
const formSchema = mailSchema
  .pick({
    sender: true,
    senderOrganization: true,
    recipientService: true,
    object: true,
    type: true,
    priority: true,
  })
  .extend({
    // On ajoute des champs spécifiques au formulaire si besoin
  });

type FormData = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [step, setStep] = useState<"SCAN" | "DETAILS" | "SUCCESS">("SCAN");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedFile, setScannedFile] = useState<File | null>(null);
  const [generatedRef, setGeneratedRef] = useState<string | undefined>();
  const [showPdf, setShowPdf] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "COURRIER_ARRIVEE",
      priority: "NORMAL",
    },
  });

  const handleTriggerScan = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      // Simulation "Analyse & Sécurisation"
      setTimeout(() => {
        setIsScanning(false);
        setScannedFile(file);
        setStep("DETAILS");
        setTimeout(() => setShowPdf(true), 500); // Delay PDF rendering for smooth transition
      }, 1500);
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // Simulation d'envoi et génération ID
    setIsScanning(true); // Réutilisation pour le loader
    setTimeout(() => {
      setIsScanning(false);
      const uniqueId = `ARR-${format(new Date(), "yyyy-MM-dd")}-${Math.floor(
        Math.random() * 1000,
      )
        .toString()
        .padStart(4, "0")}`;
      setGeneratedRef(uniqueId);
      setStep("SUCCESS");
    }, 1500);
  };

  const resetForm = () => {
    setScannedFile(null);
    setShowPdf(false);
    setGeneratedRef(undefined);
    form.reset();
  };

  const previewContent = React.useMemo(() => {
    if (!scannedFile) return null;
    if (scannedFile.type !== "application/pdf") {
      return (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          Aperçu non disponible
        </div>
      );
    }
    if (showPdf) {
      return (
        <iframe
          src={URL.createObjectURL(scannedFile) + "#toolbar=0&navpanes=0"}
          className="w-full h-full animate-in fade-in duration-500"
          title="Aperçu"
        />
      );
    }
    return (
      <div className="flex h-full items-center justify-center">
        <Scan className="h-10 w-10 text-slate-300 animate-pulse" />
      </div>
    );
  }, [scannedFile, showPdf]);

  if (step === "SUCCESS") {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="h-20 w-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-center">
          Courrier Enregistré !
        </h2>
        <p className="text-muted-foreground text-center max-w-md">
          Le courrier a été numérisé, horodaté et sécurisé avec succès. Il est
          prêt à être transmis.
        </p>

        <SecurityBadge reference={generatedRef} />

        <div className="flex gap-4 pt-4">
          <Button variant="outline" className="gap-2" onClick={resetForm}>
            <Scan className="h-4 w-4" />
            Nouveau courrier
          </Button>
          <Button className="gap-2">
            <Printer className="h-4 w-4" />
            Imprimer Récépissé
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Colonne Gauche : Zone de Document (Upload ou Preview) */}
      <div
        className={`${
          scannedFile ? "w-1/2" : "w-full"
        } transition-all duration-500 ease-in-out bg-slate-50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 flex flex-col relative group`}
      >
        {scannedFile ? (
          // Mode Preview (Full Height, No Header)
          <div className="flex-1 bg-slate-200 dark:bg-slate-950 relative">
            {previewContent}

            {/* Petit overlay technique discret en bas */}
            <div className="absolute bottom-0 inset-x-0 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] p-2 flex justify-between items-center px-4 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>{scannedFile.name}</span>
              <span>{(scannedFile.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
          </div>
        ) : (
          // Mode Upload
          <button
            onClick={handleTriggerScan}
            className="flex-1 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors p-8 text-center"
          >
            <div className="h-32 w-32 bg-white dark:bg-slate-900 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-8 group-hover:scale-105 transition-transform duration-300">
              {isScanning ? (
                <Scan className="h-12 w-12 text-primary animate-spin" />
              ) : (
                <UploadCloud className="h-12 w-12 text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors" />
              )}
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {isScanning ? "Numérisation..." : "Numériser un courrier"}
            </h3>
            <p className="text-sm text-slate-500 max-w-xs">
              Cliquez ici pour scanner ou déposer un fichier PDF entrant.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </button>
        )}
      </div>

      {/* Colonne Droite : Formulaire */}
      <div
        className={`${
          scannedFile
            ? "w-1/2 opacity-100"
            : "w-0 opacity-0 overflow-hidden pointer-events-none"
        } transition-all duration-500 ease-in-out flex flex-col bg-white dark:bg-slate-950`}
      >
        <div className="h-16 flex items-center px-8 border-b">
          <h2 className="font-semibold text-lg">Enregistrement du courrier</h2>
        </div>

        <div
          className={`flex-1 overflow-y-auto pt-8 ${
            scannedFile ? "" : "opacity-50 pointer-events-none grayscale"
          } transition-all duration-500`}
        >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" mx-auto h-full relative"
          >
            <div className="px-8 space-y-10">
              <div className="space-y-1.5">
                <Label>Expéditeur</Label>
                <Input
                  placeholder="Nom complet"
                  {...form.register("sender")}
                  className="h-11"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Organisation</Label>
                <Input
                  placeholder="Structure"
                  {...form.register("senderOrganization")}
                  className="h-11"
                />
              </div>

              <div className="space-y-1.5">
                <Label>Destination</Label>
                <Select
                  onValueChange={(val) =>
                    form.setValue("recipientService", val)
                  }
                >
                  <SelectTrigger className="w-full data-[size=default]:h-11">
                    <SelectValue placeholder="Service..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Commissariat Central">
                      Commissariat Central
                    </SelectItem>
                    <SelectItem value="Ressources Humaines">
                      Ressources Humaines
                    </SelectItem>
                    <SelectItem value="Police Judiciaire">
                      Police Judiciaire
                    </SelectItem>
                    <SelectItem value="Secrétariat">Secrétariat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label>Objet</Label>
                <Textarea
                  className="min-h-[120px]"
                  placeholder="Objet du courrier..."
                  {...form.register("object")}
                />
              </div>
            </div>

            <div className="pt-6 pb-4 px-8 flex items-center gap-4 absolute bottom-0 w-full border-t">
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12"
                onClick={resetForm}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-2 h-12"
                disabled={isScanning || !scannedFile}
              >
                {isScanning ? "Traitement..." : "Valider l'enregistrement"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
