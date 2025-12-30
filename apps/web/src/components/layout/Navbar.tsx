"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { IconSearch, IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import UserDropdown from "./UserDropdown";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "Showtime", href: "/showtime" },
  { name: "Food & Drink", href: "/food-drink" },
];

function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsOpen(false);
    }
  };

  return (
    <nav className="text-white px-6 py-2 my-12 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/" className="relative z-10 block hover:opacity-90 transition-opacity">
            <Image
              src="/cinehall-logo.svg"
              alt="Cinehall Logo"
              width={180}
              height={60}
              className="w-auto h-12 sm:h-16 lg:h-20 object-contain"
              priority
            />
          </Link>

          {/* Search - Hidden on very small screens for better fit */}
          <div className="hidden sm:block">
            <Input
              type="text"
              placeholder="Search Movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="ml-2 sm:ml-4 px-3 py-5 rounded-[20px] bg-[#46444470] border-none w-full sm:w-64 md:w-80"
              icon={<IconSearch className="text-[#FAAA47] w-5 h-5" />}
            />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <UserDropdown />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#FAAA47] p-2 z-50"
          >
            {isOpen ? <IconX size={32} /> : <IconMenu2 size={32} />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-base text-[#CAC1C1] hover:text-gray-300 transition-colors font-semibold",
                pathname === link.href && "text-[#FAAA47]"
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* User Dropdown */}
          <UserDropdown />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out md:hidden",
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        )}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-2xl text-[#CAC1C1] hover:text-[#FAAA47] transition-colors font-bold",
                pathname === link.href && "text-[#FAAA47]"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="sm:hidden w-full px-8">
            <Input
              type="text"
              placeholder="Search Movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="px-3 py-5 rounded-[20px] bg-[#46444470] border-none w-full"
              icon={<IconSearch className="text-[#FAAA47] w-5 h-5" />}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
