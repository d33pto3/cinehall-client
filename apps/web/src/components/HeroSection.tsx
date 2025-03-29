import Image from "next/image";
import React, { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Play } from "lucide-react";

type HeroSectionProps = object;

const HeroSection: FC<HeroSectionProps> = ({}) => {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {/* Content */}
      <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        Now Streaming
      </span>
      {/* TODO: ADD CAROUSEL HERE */}
      <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl">
        Experience Movies Like Never Before
      </h1>
      <p className="text-lg text-muted-foreground">
        Book tickets for the latest blockbusters in premium theaters near you.
        Enjoy crystal-clear visuals and immersive sound.
      </p>
    </section>
  );
};

export default HeroSection;
