"use client";

import React, { FC, useEffect, useState } from "react";
import Link from "next/link";

const Navbar: FC = () => {
  const [len, setLen] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const calculateItems = () => {
        // Use window.innerWidth instead of container width
        const calculatedLen = Math.ceil(window.innerWidth / 40) + 2;
        setLen(calculatedLen);
      };

      calculateItems();
      window.addEventListener("resize", calculateItems);
      return () => window.removeEventListener("resize", calculateItems);
    }
  }, []);

  return (
    <div className="">
      <div className="parent-container relative overflow-hidden bg-black px-2 py-4">
        <div className="animate-infinite-scroll flex gap-[26px] px-[12px] w-max">
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex gap-[26px]">
              {Array.from({ length: len }, (_, index) => (
                <div
                  key={`${loopIndex}-${index}`}
                  className="px-[7px] py-[11px] bg-[#8F8F8F] rounded-[6px]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/"
        className="font-bold text-[4.7rem] flex items-center justify-center"
      >
        CineHall
      </Link>
    </div>
  );
};

export default Navbar;
