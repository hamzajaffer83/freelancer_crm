import { toast } from "sonner";
import Cookies from "js-cookie";
import api from "@/lib/api";

export const GetLoggedInUser = async () => {
  // 1️⃣ Check localStorage first
  if (typeof window !== "undefined") {
    const fetchLocalUser = localStorage.getItem("user");
    if (fetchLocalUser) {
      try {
        return JSON.parse(fetchLocalUser);
      } catch (err) {
        console.error("Failed to parse local user:", err);
      }
    }
  }

  // 2️⃣ Fetch user from API safely
  const fetchUser = async () => {
    const token = Cookies.get("token");
    if (!token) throw new Error("No auth token found");

    const response = await api.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response.data;

    // Save user to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  };

  try {
    // 3️⃣ Show toast while fetching
    const user = await toast.promise(fetchUser(), {
      loading: "Loading user...",
      success: (user) => `Welcome back, ${user.name || "User"}!`,
      error: "Failed to load user",
    });

    return user; // <-- Ensure the user object is returned
  } catch (err) {
    console.error("Error fetching user:", err);
    return null; // Return null if API fails
  }
};
