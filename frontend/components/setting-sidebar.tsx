"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { settingSideBarData } from "@/contants/setting-sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SettingSideBar = () => {
  const pathname = usePathname();
  const [search, setSearch] = React.useState("");

  // Filter logic
  const filteredItems = settingSideBarData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="w-1/5 h-[87vh] rounded-2xl shadow-md border bg-white p-2 flex flex-col">
      <Input
        placeholder="Search settings..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-lg mb-2"
      />

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-2">
          <div className="flex flex-col gap-1 pb-4">
            {filteredItems.length === 0 && (
              <p className="text-muted-foreground text-sm px-3 py-2">
                No results found
              </p>
            )}

            {filteredItems.map((item, index) => {
              const active = pathname === item.url;
              return (
                <Link key={index} href={item.url}>
                  <div
                    className={cn(
                      "cursor-pointer px-3 py-2 rounded-r-sm text-sm font-medium transition-colors",
                      active
                        ? "bg-primary/10 border-l-2 border-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    {item.title}
                  </div>
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </Card>
  );
};

export default SettingSideBar;
