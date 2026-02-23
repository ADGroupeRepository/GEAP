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
import {
  Scan,
  UploadCloud,
  CheckCircle2,
  Printer,
  ArrowRight,
  ArrowLeft,
  FileText,
  X,
  User,
  Building2,
  Send,
} from "lucide-react";
import { mailSchema } from "../schema";
import { cn } from "@/lib/utils";

// ─── DATA: Services & Personnel ───
const SERVICES_DATA = [
  {
    id: "commissariat-central",
    name: "Commissariat Central",
    personnel: [
      { id: "p1", name: "Commissaire DIALLO Ibrahim" },
      { id: "p2", name: "Capitaine TOURE Mamadou" },
      { id: "p3", name: "Lieutenant KOFFI Jean" },
    ],
  },
  {
    id: "ressources-humaines",
    name: "Ressources Humaines",
    personnel: [
      { id: "p4", name: "Commandant BAMBA Adama" },
      { id: "p5", name: "Adjudant FOFANA Seydou" },
    ],
  },
  {
    id: "police-judiciaire",
    name: "Police Judiciaire",
    personnel: [
      { id: "p6", name: "Commissaire COULIBALY Drissa" },
      { id: "p7", name: "Capitaine N'GUESSAN Yao" },
      { id: "p8", name: "Lieutenant OUATTARA Lassina" },
    ],
  },
  {
    id: "secretariat",
    name: "Secrétariat",
    personnel: [
      { id: "p9", name: "Sergent KOUASSI Amoin" },
      { id: "p10", name: "Agent SYLLA Mariam" },
    ],
  },
  {
    id: "direction-logistique",
    name: "Direction Logistique",
    personnel: [
      { id: "p11", name: "Commandant TRAORE Moussa" },
      { id: "p12", name: "Capitaine KONAN Kouadio" },
    ],
  },
];

// Schema partiel pour le formulaire (sans les champs auto-générés)
const formSchema = mailSchema
  .pick({
    sender: true,
    senderOrganization: true,
    recipientService: true,
    object: true,
    priority: true,
    senderType: true,
    officialName: true,
    identificationNumber: true,
    phone: true,
    email: true,
  })
  .extend({
    recipientPerson: z.string().optional(),
  });

type FormData = z.infer<typeof formSchema>;

interface RegistrationFormProps {
  onCancel?: () => void;
}

export function RegistrationForm({
  onCancel,
}: Readonly<RegistrationFormProps>) {
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scannedFile, setScannedFile] = useState<File | null>(null);
  const [generatedRef, setGeneratedRef] = useState<string | undefined>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: "NORMAL",
    },
  });

  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setScannedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer?.files?.[0];
    if (file?.type === "application/pdf") setScannedFile(file);
  };

  const handleNextStep = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      setStep(2);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const service = SERVICES_DATA.find((s) => s.id === serviceId);
    if (service) {
      form.setValue("recipientService", service.name);
      form.setValue("recipientPerson", "");
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log(data, scannedFile);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const uniqueId = `ARR-${format(new Date(), "yyyy-MM-dd")}-${Math.floor(
        Math.random() * 1000,
      )
        .toString()
        .padStart(4, "0")}`;
      setGeneratedRef(uniqueId);
      setShowSuccess(true);
    }, 1500);
  };

  const resetForm = () => {
    setScannedFile(null);
    setGeneratedRef(undefined);
    setShowSuccess(false);
    setStep(1);
    setSelectedServiceId("");
    form.reset();
  };

  // ─── SUCCESS SCREEN ───
  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
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
    <div className="flex flex-col h-full">
      {/* Header with stepper */}
      <div className="px-6 py-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg">Nouveau Courrier</h2>
          <div className="flex items-center gap-2">
            {step === 1 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                  className="gap-1.5"
                >
                  Annuler
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="gap-1.5"
                  onClick={handleNextStep}
                >
                  Suivant
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => setStep(1)}
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Retour
                </Button>
                <Button
                  type="button"
                  size="sm"
                  className="gap-1.5"
                  disabled={isSubmitting || !scannedFile}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {isSubmitting ? "Traitement..." : "Valider"}
                  {!isSubmitting && <CheckCircle2 className="h-3.5 w-3.5" />}
                </Button>
              </>
            )}
          </div>
        </div>
        {/* Stepper */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                step >= 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              1
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                step >= 1 ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Informations
            </span>
          </div>
          <div className="h-px flex-1 bg-border" />
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-7 w-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors",
                step >= 2
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground",
              )}
            >
              2
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                step >= 2 ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Document PDF
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {step === 1 ? (
          /* ─── STEP 1: FORM INPUTS ─── */
          <div className="p-6 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* ── Section: Expéditeur ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <User className="h-4 w-4" />
                Expéditeur
              </div>

              <div className="space-y-1.5">
                <Label>Nom de l&apos;expéditeur *</Label>
                <Input
                  placeholder="Nom complet"
                  {...form.register("sender")}
                  className="h-11"
                />
                {form.formState.errors.sender && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.sender.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Type de structure</Label>
                  <Select
                    onValueChange={(val) =>
                      form.setValue("senderType", val as FormData["senderType"])
                    }
                  >
                    <SelectTrigger className="w-full data-[size=default]:h-11">
                      <SelectValue placeholder="Sélectionner..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PERSONNE">Personne</SelectItem>
                      <SelectItem value="ENTREPRISE">Entreprise</SelectItem>
                      <SelectItem value="ADMINISTRATION">
                        Administration
                      </SelectItem>
                      <SelectItem value="ONG">ONG</SelectItem>
                      <SelectItem value="AUTRE">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label>Nom officiel</Label>
                  <Input
                    placeholder="Nom officiel de la structure"
                    {...form.register("officialName")}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Numéro d&apos;identification</Label>
                <Input
                  placeholder="Ex: RCCM, NCC, CNI..."
                  {...form.register("identificationNumber")}
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Téléphone</Label>
                  <Input
                    type="tel"
                    placeholder="+225 XX XX XX XX XX"
                    {...form.register("phone")}
                    className="h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="email@exemple.com"
                    {...form.register("email")}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Organisation</Label>
                <Input
                  placeholder="Structure / Organisation"
                  {...form.register("senderOrganization")}
                  className="h-11"
                />
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* ── Section: Destinataire ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <Send className="h-4 w-4" />
                Destinataire
              </div>

              <div className="space-y-1.5">
                <Label>Service destinataire *</Label>
                <Select onValueChange={handleServiceChange}>
                  <SelectTrigger className="w-full data-[size=default]:h-11">
                    <SelectValue placeholder="Choisir un service..." />
                  </SelectTrigger>
                  <SelectContent>
                    {SERVICES_DATA.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.recipientService && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.recipientService.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label>Personne destinataire</Label>
                <Select
                  disabled={!selectedServiceId}
                  onValueChange={(val) => form.setValue("recipientPerson", val)}
                >
                  <SelectTrigger className="w-full data-[size=default]:h-11">
                    <SelectValue
                      placeholder={
                        selectedServiceId
                          ? "Choisir une personne..."
                          : "Sélectionnez d'abord un service"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      <span className="font-medium">👥 Tout le service</span>
                    </SelectItem>
                    {selectedService?.personnel.map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* ── Section: Courrier ── */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <Building2 className="h-4 w-4" />
                Courrier
              </div>

              <div className="space-y-1.5">
                <Label>Objet *</Label>
                <Textarea
                  className="min-h-[100px]"
                  placeholder="Objet du courrier..."
                  {...form.register("object")}
                />
                {form.formState.errors.object && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.object.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Priorité</Label>
                {(() => {
                  const currentPriority = form.watch("priority") || "NORMAL";
                  const options = [
                    {
                      value: "NORMAL",
                      label: "Normal",
                      color:
                        "bg-slate-100 border-slate-300 text-slate-700 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-300",
                    },
                    {
                      value: "URGENT",
                      label: "Urgent",
                      color:
                        "bg-orange-50 border-orange-300 text-orange-700 dark:bg-orange-950 dark:border-orange-700 dark:text-orange-300",
                    },
                    {
                      value: "TRES_URGENT",
                      label: "Très Urgent",
                      color:
                        "bg-red-50 border-red-300 text-red-700 dark:bg-red-950 dark:border-red-700 dark:text-red-300",
                    },
                  ];
                  return (
                    <div className="flex items-center gap-3">
                      {options.map((option) => {
                        const isSelected = currentPriority === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                              form.setValue(
                                "priority",
                                option.value as FormData["priority"],
                              )
                            }
                            className={cn(
                              "flex-1 h-11 rounded-lg border-2 text-sm font-medium transition-all",
                              isSelected
                                ? option.color +
                                    " ring-2 ring-offset-1 ring-primary/30"
                                : "bg-background border-border text-muted-foreground hover:border-primary/40",
                            )}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        ) : (
          /* ─── STEP 2: PDF UPLOAD ─── */
          <div className="p-6 space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
            {scannedFile ? (
              <div className="space-y-4">
                {/* File info card */}
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border">
                  <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {scannedFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(scannedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setScannedFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* PDF Preview */}
                {scannedFile.type === "application/pdf" && (
                  <div className="border rounded-lg overflow-hidden bg-white dark:bg-slate-900">
                    <iframe
                      src={
                        URL.createObjectURL(scannedFile) +
                        "#toolbar=0&navpanes=0"
                      }
                      className="w-full h-[400px] animate-in fade-in duration-500"
                      title="Aperçu"
                    />
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors min-h-[300px]"
              >
                <div className="h-20 w-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                  <UploadCloud className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-base font-semibold mb-2">
                  Déposer le fichier PDF ici
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ou cliquez pour parcourir vos fichiers
                </p>
                <p className="text-xs text-muted-foreground">
                  Format accepté : PDF uniquement
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
        )}
      </div>
    </div>
  );
}
