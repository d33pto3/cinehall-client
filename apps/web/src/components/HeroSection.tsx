import React from "react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  title = "Experience Movies Like Never Before",
  subtitle,
}: HeroSectionProps) => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Content */}
      <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
        Now Streaming
      </span>
      <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground">
        {subtitle ||
          "Book tickets for the latest blockbusters in premium theaters near you. Enjoy crystal-clear visuals and immersive sound."}
      </p>
    </section>
  );
};

export default HeroSection;
