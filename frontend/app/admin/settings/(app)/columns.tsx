"use client";

import { AppSetting } from "@/type/data";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<AppSetting>[] = [
  {
    accessorKey: "key",
    header: "Key",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "active",
    header: "Active",
  },
];
