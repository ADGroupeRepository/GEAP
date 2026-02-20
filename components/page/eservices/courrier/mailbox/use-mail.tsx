"use client";

import React, { createContext, useContext, useState } from "react";
import { mails, Mail } from "./data";

type MailContextType = {
  selectedMailId: string | null;
  setSelectedMailId: (id: string | null) => void;
  filter: "inbox" | "sent" | "drafts" | "trash" | "archive";
  setFilter: (
    filter: "inbox" | "sent" | "drafts" | "trash" | "archive",
  ) => void;
  mails: Mail[];
};

const MailContext = createContext<MailContextType | undefined>(undefined);

export function MailProvider({ children }: { children: React.ReactNode }) {
  const [selectedMailId, setSelectedMailId] = useState<string | null>(
    mails[0]?.id || null,
  );
  const [filter, setFilter] = useState<
    "inbox" | "sent" | "drafts" | "trash" | "archive"
  >("inbox");

  return (
    <MailContext.Provider
      value={{
        selectedMailId,
        setSelectedMailId,
        filter,
        setFilter,
        mails,
      }}
    >
      {children}
    </MailContext.Provider>
  );
}

export function useMail() {
  const context = useContext(MailContext);
  if (!context) {
    throw new Error("useMail must be used within a MailProvider");
  }
  return context;
}
