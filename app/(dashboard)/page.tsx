"use client";

import { BoxReveal } from "@/components/magicui/box-reveal";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(time);
  const displayDate =
    formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  const getDynamicGreeting = (hour: number, name: string) => {
    if (hour >= 5 && hour < 12) {
      return `Bonjour ${name} 🌞`;
    } else if (hour >= 12 && hour < 14) {
      return `Bon appétit ${name} 🍽️`;
    } else if (hour >= 14 && hour < 18) {
      return `Bon après-midi ${name} ☕`;
    } else if (hour >= 18 && hour < 22) {
      return `Bonsoir ${name} 🌆`;
    } else {
      return `Bonne nuit ${name} 🌙`;
    }
  };

  const greetingMessage = getDynamicGreeting(time.getHours(), "Bakayoko");

  return (
    <div>
      <div className="absolute w-[calc(100vw-270px)] h-[250px]">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "mask-[radial-gradient(800px_circle_at_center,white,transparent)] opacity-70",
          )}
        />
      </div>

      <div className="flex flex-col items-center pt-20 pb-16">
        <BoxReveal duration={0.5}>
          <span suppressHydrationWarning className="text-muted-foreground">
            {displayDate}
          </span>
        </BoxReveal>

        <div className="pb-5 pt-2 text-4xl font-medium text-center">
          <BoxReveal duration={0.5}>
            <span suppressHydrationWarning>{greetingMessage}</span>
          </BoxReveal>
        </div>

        <div className="relative">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Rechercher un agent ou un courrier..."
              className="bg-background w-[50vw] h-[55px] text-lg pl-14 rounded-full"
            />
            <SearchIcon className="absolute top-[50%] translate-y-[-50%] left-5 w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
}
