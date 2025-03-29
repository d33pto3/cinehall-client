"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { FC } from "react";
import { Button } from "../ui/button";

const Navbar: FC = ({}) => {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="flex flex-row-reverse justify-between items-center pt-3">
      <div>
        {user ? (
          <div className="flex items-center gap-2">
            <Link href={"/profile"}>Welcome, {user.username}</Link>
            <Button>Logout</Button>
          </div>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </div>
      <div className="font-bold text-4xl">CineHall</div>
    </div>
  );
};

export default Navbar;
