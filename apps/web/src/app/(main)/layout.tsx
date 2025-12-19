import type { Metadata } from "next";
import React from "react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "CineHall - Movie Booking",
  description: "Book your favorite movies at CineHall",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
