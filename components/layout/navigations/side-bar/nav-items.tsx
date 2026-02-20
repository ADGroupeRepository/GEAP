"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";

interface SubLink {
  readonly name: string;
  readonly href: string;
}

interface MenuItemProps {
  readonly name: string;
  readonly href?: string;
  readonly icon: React.ElementType;
  readonly subLinks?: ReadonlyArray<SubLink>;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}

export default function NavMenuItem({
  name,
  href,
  icon: Icon,
  subLinks = [],
  isOpen,
  onToggle,
}: Readonly<MenuItemProps>) {
  const pathname = usePathname();
  const hasSubLinks = subLinks.length > 0;

  const isActive = href
    ? pathname === href ||
      subLinks.some((subLink) => pathname.startsWith(subLink.href))
    : subLinks.some((subLink) => pathname.startsWith(subLink.href));

  return (
    <div>
      {hasSubLinks ? (
        <button
          onClick={onToggle}
          className={clsx(
            "flex gap-x-2 items-center px-2 py-2.5 rounded-lg w-full text-[13px] hover:bg-slate-100 relative",
            { "bg-sky-100 text-sky-700": isActive },
          )}
        >
          <ChevronRight
            className={`absolute right-1 w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
          />
          <Icon className="w-5 stroke-[1.2]" />
          {name}
        </button>
      ) : (
        <Link
          href={href!}
          className={clsx(
            "flex gap-x-2 items-center px-2 py-2.5 rounded-lg text-[13px]",
            { "bg-sky-100 text-sky-800": isActive },
            { "hover:bg-slate-100": !isActive },
          )}
        >
          <Icon className="w-5 stroke-[1.2]" />
          {name}
        </Link>
      )}
      <AnimatePresence>
        {hasSubLinks && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
            }}
            className="pl-4 space-y-1 overflow-hidden"
          >
            <div className="h-1"></div>
            {subLinks.map((subLink) => {
              const isSubLinkActive = pathname.startsWith(subLink.href);
              return (
                <Link
                  key={subLink.name}
                  href={subLink.href}
                  className={clsx(
                    "flex gap-x-2 items-center rounded w-full text-[12px]",
                    { "bg-slate-100 pl-1 py-1": isSubLinkActive },
                    { "hover:bg-slate-100 pl-4 py-2": !isSubLinkActive },
                  )}
                >
                  {isSubLinkActive && (
                    <div className="h-7 w-1 rounded bg-primary"></div>
                  )}
                  {subLink.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
