"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { FC } from "react";
import { Button } from "../ui/button";

const Navbar: FC = ({}) => {
  const { loading, user, logout } = useAuth();
  console.log(user);
  console.log("loading", loading);
  return (
    <div className="flex flex-row-reverse justify-between items-center pt-3">
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <Link href={"/profile"}>Welcome, {user.username}</Link>
            <Button className="hover:cursor-pointer" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </div>
      <Link
        href={"/"}
        className="font-bold text-[4.7rem] flex items-center justify-center"
      >
        {/* <TextHoverEffect text="CineHall" /> */}
        CineHall
      </Link>
    </div>
  );
};

export default Navbar;
