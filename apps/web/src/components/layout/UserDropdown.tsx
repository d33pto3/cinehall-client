"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconUserCircle, IconUser, IconLogout, IconLogin } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <IconUserCircle
        size={24}
        className="ml-4 cursor-pointer text-[#CAC1C1] animate-pulse"
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ml-4 focus:outline-none">
          <IconUserCircle
            size={24}
            className="cursor-pointer text-[#CAC1C1] hover:text-[#FAAA47] transition-colors"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-[#2A2A2A] border-[#3A3A3A] text-white"
      >
        {isAuthenticated && user ? (
          <>
            <DropdownMenuLabel className="text-[#FAAA47]">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-[#CAC1C1] font-normal">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#3A3A3A]" />
            <DropdownMenuItem
              className="cursor-pointer hover:bg-[#3A3A3A] focus:bg-[#3A3A3A] focus:text-white"
              asChild
            >
              <Link href={`/profile/${user._id}`} className="flex items-center">
                <IconUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#3A3A3A]" />
            <DropdownMenuItem
              className="cursor-pointer hover:bg-[#3A3A3A] focus:bg-[#3A3A3A] focus:text-white"
              onClick={handleLogout}
            >
              <IconLogout className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-[#3A3A3A] focus:bg-[#3A3A3A] focus:text-white"
              asChild
            >
              <Link href="/login" className="flex items-center">
                <IconLogin className="mr-2 h-4 w-4" />
                <span>Login</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-[#3A3A3A] focus:bg-[#3A3A3A] focus:text-white"
              asChild
            >
              <Link href="/signup" className="flex items-center">
                <IconUser className="mr-2 h-4 w-4" />
                <span>Sign Up</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
