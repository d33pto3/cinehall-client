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
      <div className="w-full h-[228] lg:h-[328px] relative overflow-hidden">
        <Image
          src={"/footer-top.jpg"}
          alt="cinehall-footertop"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center 60%",
          }}
        />
        <div className="absolute left-[2%] bottom-[55%] lg:bottom-[115%] h-full w-[228px]  lg:w-auto">
          <Image
            src={"/popcorn.png"}
            alt="cinehall-popcorn"
            width={528}
            height={428}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="absolute lg:right-[10%] px-8 py-4 text-[26px] lg:text-[56px] text-[#FAAA47] font-bold leading-[1.1]">
          <h4>
            Some scenes stay with you.
            <br />
            So does our popcorn.
          </h4>
        </div>
        <div className="absolute bottom-[30%] right-[5%] text-[32px] text-[#ccc] leading-[1.1]">
          <h4>Pop it, Love it and Repeat....cause every scene</h4>
          <h4>needs a crunch !</h4>
        </div>
      </div>
      <div className="relative py-12 px-8 flex justify-between items-center">
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
            src={"/logo.png"}
            alt="cinehall-logo"
            width={120}
            height={120}
            className="object-contain"
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
      <div className="mb-8 pb-8 px-8 flex justify-between items-center">
        <div className="flex flex-col justify-end items-end text-[#D7A65E] font-bold min-h-[100px]">
          <div className="flex gap-6">
            <IconBrandGoogleFilled color="#D7A65E" />
            <IconBrandFacebookFilled color="#D7A65E" />
            <IconBrandLinkedinFilled color="#D7A65E" />
            <IconBrandYoutubeFilled color="#D7A65E" />
            <IconBrandWhatsappFilled color="#D7A65E" />
            <p className="text-[10px] text-[#8F8F8F] flex flex-col-reverse">
              2025 © CINEHALL
            </p>
          </div>
        </div>
        <div className="flex gap-24">
          <div className="text-[#CAC1C1] text-[16px] font-semibold">
            <p>Movie Booking</p>
            <div className="text-[12px]">
              <p>Now Showing</p>
              <p>Coming Soon</p>
              <p>Book Tickets</p>
              <p>Offers and Promotions</p>
            </div>
          </div>
          <div className="text-[#CAC1C1] text-[16px] font-semibold">
            <p>My Account</p>
            <div className="text-[12px]">
              <p>Booking History</p>
              <p>Sign In</p>
              <p>Register</p>
              <p>Favourites</p>
            </div>
          </div>
          <div className="text-[#CAC1C1] text-[16px] font-semibold">
            <p>Policies</p>
            <div className="text-[12px]">
              <p>Terms and Conditions</p>
              <p>Privacy Policy</p>
              <p>Data Safety</p>
            </div>
          </div>
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
