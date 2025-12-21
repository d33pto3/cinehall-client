"use client";

import Image from "next/image";
import React from "react";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

interface NewsItem {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Superman review – is it a bust? Is it a pain?",
    subtitle: "James Gunn's dim reboot is both",
    imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000&auto=format&fit=crop", // Placeholder
  },
  {
    id: 2,
    title: "Sorry, But James Gunn's Superman Is So Much Better Than Man Of Steel",
    subtitle: "",
    imageUrl: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000&auto=format&fit=crop", // Placeholder
  },
];

const FeaturingNews: React.FC = () => {
  return (
    <div className="px-6 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[2.25rem] font-medium text-[#FAAA47]">Featuring News</h2>
        <button className="text-[#FAAA47] hover:underline">See All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsData.map((news) => (
          <div key={news.id} className="group cursor-pointer">
            <div className="relative aspect-video rounded-3xl overflow-hidden mb-4">
              <Image
                src={news.imageUrl}
                alt={news.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                  <IconPlayerPlayFilled className="text-white w-6 h-6" />
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white line-clamp-2">
                {news.title}
              </h3>
              {news.subtitle && (
                <p className="text-[#CAC1C1] text-lg font-medium">
                  {news.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturingNews;
