"use client";

import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { handleLogout } from "@/action/logout";
import { GetLoggedInUser } from "@/action/get-logged-in-user";

// Skeleton loader
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded bg-gray-300 ${className}`} />
);

type User = {
  name: string;
  email: string;
  avatar: string;
};

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Logout handler
  const handleLogoutClick = async () => {
    const response = await handleLogout();
    if (response != null) router.push("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      // 1️⃣ Load cached user immediately
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("user");
        if (cached) {
          try {
            setUser(JSON.parse(cached));
          } catch (err) {
            console.error("Failed to parse cached user:", err);
          }
        }
      }

      // 2️⃣ Fetch latest user from server
      try {
        const fetchedUser = await GetLoggedInUser();
        if (fetchedUser) setUser(fetchedUser); // update state with server data
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Show skeleton only if no cached user and loading
  const showSkeleton = loading && !user;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {showSkeleton ? (
                <div className="flex items-center gap-2 w-full">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-2 w-16" />
                  </div>
                </div>
              ) : (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="rounded-lg">
                        {user?.name?.[0] || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {!showSkeleton && (
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="rounded-lg">
                        {user?.name?.[0] || "U"}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogoutClick}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
