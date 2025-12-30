"use client";

import Image from "next/image";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

interface Member {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
}

const castData: Member[] = [
  { id: 1, name: "James Gunn", role: "Director", imageUrl: "/images/cast/james_gunn.jpg" },
  { id: 2, name: "David Corenswet", role: "Superman", imageUrl: "/images/cast/david_corenswet.jpg" },
  { id: 3, name: "Rachel Brosnahan", role: "Lois Lane", imageUrl: "/images/cast/rachel_brosnahan.jpg" },
  { id: 4, name: "Nicholas Hoult", role: "Lex Luthor", imageUrl: "/images/cast/nicholas_hoult.jpg" },
  { id: 5, name: "Edi Gathegi", role: "Mr. Terrific", imageUrl: "/images/cast/edi_gathegi.jpg" },
  { id: 6, name: "Anthony Carrigan", role: "Metamorpho", imageUrl: "/images/cast/anthony_carrigan.jpeg" },
  { id: 7, name: "Nathan Fillion", role: "Guy Gardner", imageUrl: "/images/cast/nathan_fillion.jpeg" },
  { id: 8, name: "Isabela Merced", role: "Hawkgirl", imageUrl: "/images/cast/isabela_merced.jpeg" },
  { id: 9, name: "Skyler Gisondo", role: "Jimmy Olsen", imageUrl: "/images/cast/skyler_gisondo.jpeg" },
  { id: 10, name: "Sara Sampaio", role: "Eve Teschmacher", imageUrl: "/images/cast/sara_sampaio.jpg" },
];

const CastAndCrew: React.FC = () => {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",

  });

  return (
    <div className="px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[2.25rem] font-medium text-[#FAAA47]">Cast and Crew</h2>
        <button className="text-[#FAAA47] hover:underline">See All</button>
      </div>

      <div className="embla overflow-hidden no-scrollbar" ref={emblaRef}>
        <div className="embla__container flex gap-2 pb-4">
          {castData.map((member) => (
            <div
              key={member.id}
              className="min-w-[150px] flex flex-col items-center flex-shrink-0 text-center space-y-3"
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#FAAA47] bg-gray-800">
                <div className="absolute inset-0 flex items-center justify-center text-[#FAAA47] text-xs">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="space-y-0.5">
                <p className="text-white font-bold text-sm leading-tight">{member.name}</p>
                <p className="text-[#CAC1C1] text-[10px]">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CastAndCrew;