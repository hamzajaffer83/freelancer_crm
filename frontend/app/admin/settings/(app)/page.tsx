import { AppSetting } from "@/type/data";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Plus, PlusCircleIcon } from "lucide-react";

async function getData(): Promise<AppSetting[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      key: "Name",
      value: "Degvora Freelancer CRM",
      active: true,
    },
    {
      id: "728ed52f",
      key: "Name",
      value: "Degvora Freelancer CRM",
      active: true,
    },
    {
      id: "728ed52f",
      key: "Name",
      value: "Degvora Freelancer CRM",
      active: true,
    },
    {
      id: "728ed52f",
      key: "Name",
      value: "Degvora Freelancer CRM",
      active: true,
    },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between p-2 border-b">
        <h1 className="text-3xl font-medium" >App Settings</h1>
        <Button className="flex items-center bg-primary/10 hover:bg-primary/20 transition-colors duration-200 cursor-pointer" variant="outline"> <PlusCircleIcon className="h-5 w-5" /> Create New</Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
