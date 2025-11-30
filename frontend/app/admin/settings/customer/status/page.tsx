import {Button} from "@/components/ui/button";
import {PlusCircleIcon} from "lucide-react";
import CustomerStatusTableLoader from "@/app/admin/settings/customer/status/data-loader";
import {Suspense} from "react";

const CustomerStatus = async () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="w-full flex justify-between p-2 border-b">
                <h1 className="text-3xl font-medium">Customer Status</h1>
                <Button
                    className="flex items-center bg-primary/10 hover:bg-primary/20 transition-colors duration-200 cursor-pointer"
                    variant="outline"> <PlusCircleIcon className="h-5 w-5"/> Create New
                </Button>
            </div>
            <Suspense fallback={<div className="p-4">Loading table...</div>}>
                <CustomerStatusTableLoader />
            </Suspense>
        </div>
    )
}

export default CustomerStatus;