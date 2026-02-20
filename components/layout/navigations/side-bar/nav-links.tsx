"use client";

import { useState } from "react";
import { Icons } from "../icons";
import NavMenuItem from "./nav-items";
import { usePathname } from "next/navigation";

// Définition des types
interface SubLink {
  name: string;
  href: string;
  type?: string; // Ajout du type pour différencier les régions
}

interface NavLink {
  name: string;
  href: string;
  icon: React.ComponentType;
  subLinks: SubLink[];
}

// Définition des liens de navigation en haut
const linksTop: NavLink[] = [
  {
    name: "Tableau de bord",
    href: "/",
    icon: Icons.Home,
    subLinks: [],
  },
  {
    name: "Ressources Humaines",
    href: "",
    icon: Icons.People,
    subLinks: [
      {
        name: "Dossiers des agents",
        href: "/hr/agents",
      },
      {
        name: "Gestion des congés",
        href: "/hr/leaves",
      },
      {
        name: "Gestion des permissions",
        href: "/hr/permissions",
      },
    ],
  },
  {
    name: "E-Services",
    href: "",
    icon: Icons.Maximize,
    subLinks: [
      {
        name: "Services de courrier",
        href: "/eservices/courrier",
        type: "deconcentrated",
      },
    ],
  },
  {
    name: "Corbeille",
    href: "/trash",
    icon: Icons.Trash,
    subLinks: [],
  },
];

// Définition des liens de navigation en bas
const linksBottom: NavLink[] = [
  {
    name: "Utilisateurs",
    href: "/users",
    icon: Icons.ProfilUser,
    subLinks: [],
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  const getActiveMenu = (path: string) => {
    const activeLink = linksTop.find((link) =>
      link.subLinks.some((subLink) => path.startsWith(subLink.href)),
    );
    return activeLink ? activeLink.name : null;
  };

  const [openMenu, setOpenMenu] = useState<string | null>(() =>
    getActiveMenu(pathname),
  );
  const [prevPath, setPrevPath] = useState(pathname);

  if (pathname !== prevPath) {
    setPrevPath(pathname);
    const activeName = getActiveMenu(pathname);
    if (activeName) {
      setOpenMenu(activeName);
    }
  }

  const handleToggle = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  return (
    <div className="w-full flex flex-col justify-between h-full">
      <div className="space-y-2">
        {linksTop.map((link) => (
          <NavMenuItem
            key={link.name}
            {...link}
            isOpen={openMenu === link.name}
            onToggle={() => handleToggle(link.name)}
          />
        ))}
      </div>

      <div className="space-y-2">
        {linksBottom.map((link) => (
          <NavMenuItem
            key={link.name}
            {...link}
            isOpen={openMenu === link.name}
            onToggle={() => handleToggle(link.name)}
          />
        ))}
      </div>
    </div>
  );
}
