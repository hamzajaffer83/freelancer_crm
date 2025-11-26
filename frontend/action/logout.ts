import Cookies from "js-cookie";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const handleLogout = async () => {
  try {
    const token = Cookies.get("token");
    await api.delete("/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Cookies.remove("token");
    localStorage.removeItem("user");

    return true;
  } catch (err: any) {
    console.error("Logout failed:", err);
    toast.error("Logout failed. Please try again.");

    return null;
  }
};
