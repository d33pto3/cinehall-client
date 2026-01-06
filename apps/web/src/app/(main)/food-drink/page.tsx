"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Popcorn", "Snacks", "Drinks", "Desserts"];

const foodItems = [
  {
    id: 1,
    title: "Cinema Classic Popcorn",
    category: "Popcorn",
    price: 8.50,
    image: "https://images.unsplash.com/photo-1572177191856-3cde618dee1f?q=80&w=800&auto=format&fit=crop",
    description: "Authentic large tub of popcorn, perfectly buttered for that cinematic crunch."
  },
  {
    id: 2,
    title: "Golden Nachos",
    category: "Snacks",
    price: 15.50,
    image: "https://images.unsplash.com/photo-1680350681703-5879c3be90d3?q=80&w=800&auto=format&fit=crop",
    description: "Crispy tortilla chips served with warm, zesty cheese sauce and jalapeño slices."
  },
  {
    id: 3,
    title: "Signature Cola",
    category: "Drinks",
    price: 5.00,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
    description: "Ice-cold fountain drink, served in our signature 2025 CineHall cup."
  },
  {
    id: 4,
    title: "Warm Caramel Waffle",
    category: "Desserts",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1572336124661-f84d79b15136?q=80&w=800&auto=format&fit=crop",
    description: "Freshly baked waffle with sea-salted caramel drizzle and velvet cream."
  },
  {
    id: 5,
    title: "Truffle Crinkle Fries",
    category: "Snacks",
    price: 10.00,
    image: "https://images.unsplash.com/photo-1613000500312-a1acf5ee104d?q=80&w=800&auto=format&fit=crop",
    description: "Seasoned crinkle-cut fries infused with aromatic truffle oil and fine herbs."
  },
  {
    id: 6,
    title: "Citrus Sunrise",
    category: "Drinks",
    price: 9.50,
    image: "https://images.unsplash.com/photo-1607690506833-498e04ab3ffa?q=80&w=800&auto=format&fit=crop",
    description: "A refreshing mocktail of sun-ripened citrus and exotic flavor nodes."
  }
];

export default function FoodDrinkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const filteredItems = activeCategory === "All" 
    ? foodItems 
    : foodItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero entry animation
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Staggered grid animation
      const cards = gridRef.current?.querySelectorAll(".food-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(cards, 
          { 
            opacity: 0,
            scale: 0.9,
            y: 20
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }, gridRef);

    return () => ctx.revert();
  }, [activeCategory, filteredItems.length]);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 lg:px-16 overflow-x-hidden">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative h-[400px] md:h-[500px] rounded-[40px] overflow-hidden mb-16 flex items-center justify-center text-center"
      >
        <Image
          src="https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2000&auto=format&fit=crop"
          alt="Food & Drink Hero"
          fill
          className="object-cover opacity-50 contrast-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        
        <div className="z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-[#FAAA47] mb-4 tracking-tight drop-shadow-2xl">
            Savor the Show
          </h1>
          <p className="text-xl md:text-2xl text-[#CAC1C1] max-w-2xl mx-auto font-medium">
            Elevate your cinema experience with our curated gourmet menu. 
            From classic crunches to exotic sips.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 border-2",
              activeCategory === cat 
                ? "bg-[#FAAA47] text-black border-[#FAAA47] scale-105 shadow-[0_0_20px_rgba(250,170,71,0.4)]" 
                : "bg-transparent text-[#CAC1C1] border-[#46444470] hover:border-[#FAAA47]/50 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {filteredItems.map((item) => (
          <div 
            key={item.id}
            className="food-card group relative bg-[#46444430] backdrop-blur-md rounded-[30px] overflow-hidden border border-[#46444470] hover:border-[#FAAA47]/50 transition-all duration-500"
          >
            <div className="relative h-64 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-[#FAAA47] text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                ৳{item.price.toFixed(2)}
              </div>
            </div>
            
            <div className="p-6">
              <span className="text-xs uppercase tracking-widest text-[#FAAA47] font-bold mb-2 block">
                {item.category}
              </span>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FAAA47] transition-colors">
                {item.title}
              </h3>
              <p className="text-[#CAC1C1] text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              
              <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FAAA47] to-[#f08a0c] text-black font-extrabold uppercase tracking-wider hover:opacity-90 transform active:scale-95 transition-all shadow-[0_4px_15px_rgba(240,138,12,0.3)]">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Specialty Combos / Banner */}
      <div className="mt-24 relative rounded-[40px] overflow-hidden p-8 md:p-16 border-2 border-[#FAAA47]/20 bg-black/40 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic">
              The <span className="text-[#FAAA47]">Ultimate</span> <br /> Movie Combo
            </h2>
            <p className="text-[#CAC1C1] text-lg mb-8 leading-relaxed">
              Large Caramel Popcorn + 2 Cold Drinks + Classic Nachos. 
              Everything you need for a truly legendary movie marathon.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-5xl font-black text-[#FAAA47]">৳29.99</span>
              <button className="px-10 py-5 bg-white text-black font-black uppercase rounded-2xl hover:bg-[#FAAA47] transition-colors shadow-2xl">
                Grab the Deal
              </button>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px]">
             <Image
              src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1200&auto=format&fit=crop"
              alt="Ultimate Combo"
              fill
              className="object-cover rounded-3xl drop-shadow-[0_20px_50px_rgba(250,170,71,0.3)]"
             />
          </div>
        </div>
      </div>
    </div>
  );
}
