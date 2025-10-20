"use client";

import React, { FC, useEffect, useState } from "react";

const Header: FC = () => {
  const [lenSmall, setLenSmall] = useState(0);
  const [lenMid, setLenMid] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const calculateItems = () => {
        const w = window.innerWidth;
        const calculatedLenSmall = Math.ceil(w / 6);
        const calculatedLenMid = Math.ceil(w / 24);
        setLenSmall(calculatedLenSmall);
        setLenMid(calculatedLenMid);
      };

      calculateItems();
      window.addEventListener("resize", calculateItems);
      return () => window.removeEventListener("resize", calculateItems);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="parent-container relative overflow-hidden bg-black py-1 flex flex-col gap-[2px]">
        {/* Top reel (faster) */}
        <div className="scroll-top flex w-max">
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex">
              {Array.from({ length: lenSmall }, (_, index) => (
                <div
                  key={`top-${loopIndex}-${index}`}
                  className="px-[2px] py-[2px] mx-[2px] bg-white rounded-[1px]"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Middle reel (slower, main blocks) */}
        <div className="scroll-middle flex w-max">
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex">
              {Array.from({ length: lenMid }, (_, index) => (
                <div
                  key={`mid-${loopIndex}-${index}`}
                  className="px-[12px] py-[8px] mx-[4px] bg-[#8F8F8F] rounded-[2px]"
                />
              ))}
            </div>
          ))}
        </div>

        {/* Bottom reel (faster again) */}
        <div className="scroll-bottom flex w-max">
          {[...Array(2)].map((_, loopIndex) => (
            <div key={loopIndex} className="flex">
              {Array.from({ length: lenSmall }, (_, index) => (
                <div
                  key={`bot-${loopIndex}-${index}`}
                  className="px-[2px] py-[2px] mx-[2px] bg-white rounded-[1px]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
