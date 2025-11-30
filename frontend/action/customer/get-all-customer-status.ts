import { cookies } from "next/headers";
import api from "@/lib/api";

export const get_all_customer_status = async () => {
    try {
        // cookies() is now async — MUST await it
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            throw new Error("No auth token found");
        }

        const response = await api.get("/customer/status/all", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (err: any) {
        console.error("Error fetching customer statuses:", err);
        throw err;
    }
};
