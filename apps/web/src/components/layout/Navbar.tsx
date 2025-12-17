"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Input } from "../ui/input";
import { IconSearch } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import UserDropdown from "./UserDropdown";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "Showtime", href: "/showtime" },
  { name: "Food & Drink", href: "/food-drink" },
];

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="text-white px-6 py-2 my-12 flex items-center justify-between">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="relative">
          <Image
            src="/logo.png"
            alt="Cinehall Logo"
            width={180}
            height={90}
            className="object-contain"
          />
        </Link>

        {/* Search */}
        <Input
          type="text"
          placeholder="Search Movies..."
          className="ml-2 sm:ml-4 px-3 py-5 rounded-[20px] bg-[#46444470] border-none w-full sm:w-64 md:w-80"
          icon={<IconSearch className="text-[#FAAA47] w-5 h-5" />}
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm sm:text-base text-[#CAC1C1] hover:text-gray-300 transition-colors font-semibold ${
              pathname === link.href ? "text-[#FAAA47]" : ""
            }`}
          >
            {link.name}
          </Link>
        ))}

        {/* User Dropdown */}
        <UserDropdown />
      </div>
    </nav>
  );
}

export default Navbar;
