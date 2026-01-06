"use client";

import {
  IconBrandFacebookFilled,
  IconBrandGoogleFilled,
  IconBrandLinkedinFilled,
  IconBrandWhatsappFilled,
  IconBrandYoutubeFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

const Footer: FC = () => {
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
    <div>
      <div className="relative py-16 px-8 flex md:flex-row flex-col gap-4 md:gap-0 justify-between items-center border-t-[1px] border-[#d7a65e]">
        <div className="text-[#D7A65E] font-bold">
          <div className="leading-[1.1]">
            <p className="text-[48px]">Great MOVIES don&apos;t wait.</p>
            <p className="text-[48px]">Neither should you!</p>
          </div>
          <div className="text-[#CAC2C2] mt-2">
            <p>
              So Tap. Book. Watch. Let the silver screen write your next
              evening.
            </p>
            <p>Because moments on screen become memories off screen.</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={"/cinehall-logo.svg"}
            alt="cinehall-logo"
            width={160}
            height={80}
            className="w-auto h-16 sm:h-20 object-contain"
            priority
          />
          <div className="text-center text-[#CAC1C1] text-[16px] font-semibold">
            <p>Cine Hall Studios Ltd.</p>
            <div className="text-[12px]">
              <p>Ga-160, Baitun Gaffar,</p>
              <p>Mohakhali School Road,</p>
              <p>Dhaka-1206</p>
              <p>info@cinehall.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-8 pb-8 px-4 sm:px-8 flex flex-col-reverse md:flex-row-reverse justify-between items-center md:items-end gap-8 md:gap-4">
              {/* Footer Links */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center md:justify-start gap-8 sm:gap-12 md:gap-16 lg:gap-24 w-full md:w-auto">
                <div className="text-[#CAC1C1] text-[16px] font-semibold text-center sm:text-left">
                  <p className="mb-3">Movie Booking</p>
                  <div className="text-[12px] space-y-2 font-normal">
                    <p>Now Showing</p>
                    <p>Coming Soon</p>
                    <p>Book Tickets</p>
                    <p>Offers and Promotions</p>
                  </div>
                </div>
                <div className="text-[#CAC1C1] text-[16px] font-semibold text-center sm:text-left">
                  <p className="mb-3">My Account</p>
                  <div className="text-[12px] space-y-2 font-normal">
                    <p>Booking History</p>
                    <p>Sign In</p>
                    <p>Register</p>
                    <p>Favourites</p>
                  </div>
                </div>
                <div className="text-[#CAC1C1] text-[16px] font-semibold text-center sm:text-left">
                  <p className="mb-3">Policies</p>
                  <div className="text-[12px] space-y-2 font-normal">
                    <p>Terms and Conditions</p>
                    <p>Privacy Policy</p>
                    <p>Data Safety</p>
                  </div>
                </div>
              </div>

              {/* Social Icons & Copyright */}
              <div className="flex flex-col items-center md:items-end justify-end gap-4 md:h-full">
                <div className="flex gap-4 sm:gap-6">
                  <IconBrandGoogleFilled color="#D7A65E" className="w-5 h-5 sm:w-6 sm:h-6" />
                  <IconBrandFacebookFilled color="#D7A65E" className="w-5 h-5 sm:w-6 sm:h-6" />
                  <IconBrandLinkedinFilled color="#D7A65E" className="w-5 h-5 sm:w-6 sm:h-6" />
                  <IconBrandYoutubeFilled color="#D7A65E" className="w-5 h-5 sm:w-6 sm:h-6" />
                  <IconBrandWhatsappFilled color="#D7A65E" className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p className="text-[10px] sm:text-xs text-[#8F8F8F]">
                  2025 © CINEHALL
                </p>
              </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-50">
        <div className="parent-container-footer relative overflow-hidden bg-black py-1 flex flex-col gap-[2px]">
          {/* Top reel (faster) */}
          <div className="scroll-top-footer flex w-max">
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
          <div className="scroll-middle-footer flex w-max">
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
          <div className="scroll-bottom-footer flex w-max">
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
    </div>
  );
};

export default Footer;
