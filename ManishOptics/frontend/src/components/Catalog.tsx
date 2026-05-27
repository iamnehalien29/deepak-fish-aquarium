"use client";

import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag } from 'lucide-react';

const categories = ["All", "Men", "Women", "Unisex"];

const frames = [
  {
    name: "Classic Aviator Gold",
    category: "Unisex",
    price: "$149",
    shape: "Aviator",
    material: "Titanium Alloy",
    description: "Ultra-lightweight gold-tone double bridge frame with adjustable silicone nose pads.",
    svgPath: (
      <svg className="w-full h-full text-amber-500/80" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Left lens */}
        <path d="M15 10 C15 10, 20 5, 38 7 C45 8, 43 28, 30 32 C15 36, 12 20, 15 10 Z" />
        {/* Right lens */}
        <path d="M85 10 C85 10, 80 5, 62 7 C55 8, 57 28, 70 32 C85 36, 88 20, 85 10 Z" />
        {/* Bridge */}
        <path d="M38 12 Q50 8 62 12" />
        <path d="M40 17 Q50 14 60 17" />
        {/* Temples */}
        <path d="M13 15 L3 17 Q1 17 1 21" />
        <path d="M87 15 L97 17 Q99 17 99 21" />
      </svg>
    )
  },
  {
    name: "Black Acetate Round",
    category: "Men",
    price: "$129",
    shape: "Round",
    material: "Hand-polished Acetate",
    description: "Classic circular silhouette in rich glossy black acetate, perfect for smart-casual wear.",
    svgPath: (
      <svg className="w-full h-full text-slate-300" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        {/* Left lens */}
        <circle cx="28" cy="20" r="13" />
        {/* Right lens */}
        <circle cx="72" cy="20" r="13" />
        {/* Bridge */}
        <path d="M41 18 Q50 24 59 18" strokeWidth="3" />
        {/* Temples */}
        <path d="M15 17 Q5 17 3 23" strokeWidth="2" />
        <path d="M85 17 Q95 17 97 23" strokeWidth="2" />
      </svg>
    )
  },
  {
    name: "Vintage Tortoiseshell Cat-Eye",
    category: "Women",
    price: "$159",
    shape: "Cat-Eye",
    material: "Premium Acetate",
    description: "Elegant upswept frame edges in warm brown tortoiseshell tones, adding retro glamour.",
    svgPath: (
      <svg className="w-full h-full text-amber-700/90" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Left lens */}
        <path d="M10 13 Q25 5 42 16 Q38 31 23 29 Q12 27 10 13 Z" />
        {/* Right lens */}
        <path d="M90 13 Q75 5 58 16 Q62 31 77 29 Q88 27 90 13 Z" />
        {/* Bridge */}
        <path d="M42 20 Q50 25 58 20" strokeWidth="2.5" />
        {/* Temples */}
        <path d="M10 13 L2 14" strokeWidth="2" />
        <path d="M90 13 L98 14" strokeWidth="2" />
      </svg>
    )
  },
  {
    name: "Titanium Matte Square",
    category: "Unisex",
    price: "$179",
    shape: "Square",
    material: "Beta-Titanium",
    description: "Sleek slate-grey rectangular frames offering high flexibility, resilience, and minimalist style.",
    svgPath: (
      <svg className="w-full h-full text-slate-400" viewBox="0 0 100 40" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Left lens */}
        <rect x="15" y="10" width="26" height="20" rx="4" />
        {/* Right lens */}
        <rect x="59" y="10" width="26" height="20" rx="4" />
        {/* Bridge */}
        <path d="M41 18 L59 18" strokeWidth="2.5" />
        {/* Temples */}
        <path d="M15 15 L4 17" strokeWidth="2" />
        <path d="M85 15 L96 17" strokeWidth="2" />
      </svg>
    )
  }
];

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredFrames = activeCategory === "All"
    ? frames
    : frames.filter(f => f.category === activeCategory);

  return (
    <section id="catalog" className="bg-slate-950 py-24 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="space-y-4 max-w-xl mb-8 md:mb-0">
            <h2 className="text-amber-500 font-bold uppercase tracking-wider text-sm">Designer Showcase</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
              Browse Premium Eyewear
            </h3>
            <p className="text-slate-400 text-base leading-relaxed">
              Discover lightweight comfort and high durability from our hand-picked titanium and acetate frame catalog.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex bg-slate-900 p-1.5 rounded-full border border-slate-800 self-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Frames Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredFrames.map((frame, index) => (
            <div
              key={index}
              className="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-amber-500/30 hover:bg-slate-900/70 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image / Vector Container */}
              <div className="bg-slate-900 p-8 h-48 flex items-center justify-center relative overflow-hidden group-hover:bg-slate-950/80 transition-colors duration-300">
                {/* Visual grid behind frames */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
                
                {/* SVG Visual */}
                <div className="relative w-40 h-20 transition-transform duration-500 group-hover:scale-110">
                  {frame.svgPath}
                </div>

                {/* Badges */}
                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-amber-500 border border-slate-800 px-2 py-0.5 rounded-md">
                  {frame.shape}
                </span>

                <button className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 text-slate-400 hover:text-red-500 transition-colors">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg text-slate-200 group-hover:text-amber-400 transition-colors duration-300">
                      {frame.name}
                    </h4>
                    <span className="font-extrabold text-amber-400 text-lg">{frame.price}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">{frame.material} • {frame.category}</p>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {frame.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900/60 flex items-center space-x-3">
                  <a
                    href="#book"
                    className="flex-1 inline-flex items-center justify-center space-x-2 bg-amber-500 text-slate-950 py-2.5 rounded-full font-bold text-xs hover:bg-amber-400 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Try In-Store</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
