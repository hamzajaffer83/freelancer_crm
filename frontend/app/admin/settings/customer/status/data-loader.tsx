import { get_all_customer_status } from "@/action/customer/get-all-customer-status";
import CustomerStatusTable from "./table";
import { CustomerStatus } from "@/type/data";

const CustomerStatusTableLoader = async () => {
    const { data }: { data: CustomerStatus[] } = await get_all_customer_status();

    return <CustomerStatusTable data={data} />;
};

export default CustomerStatusTableLoader;
