"use client";

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Award, Eye } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 overflow-hidden py-20">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none"></div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading and description */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            {/* Tagline pill */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-xs font-semibold uppercase tracking-wider animate-bounce">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Premium Eye Care & Fashion Lenses</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-100 leading-tight">
              See the World in <br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                Perfect Clarity
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-xl text-lg text-slate-400 leading-relaxed">
              Experience the perfect fusion of clinical optical expertise and luxury eyewear fashion. Discover custom-fit lenses and premium frames curated just for you.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#book"
                className="inline-flex items-center justify-center space-x-2 bg-amber-500 text-slate-950 px-8 py-4 rounded-full font-bold text-base hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95 transition-all duration-150"
              >
                <span>Book Free Eye Test</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#catalog"
                className="inline-flex items-center justify-center space-x-2 bg-slate-900 text-slate-200 border border-slate-800 px-8 py-4 rounded-full font-bold text-base hover:bg-slate-800 hover:text-white active:scale-95 transition-all"
              >
                <span>Browse Catalog</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-900 w-full max-w-lg">
              <div className="flex flex-col items-center lg:items-start">
                <ShieldCheck className="h-5 w-5 text-amber-500 mb-1" />
                <span className="text-slate-200 font-bold text-sm">100% Genuine</span>
                <span className="text-slate-500 text-xs">Certified Frames</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Award className="h-5 w-5 text-amber-500 mb-1" />
                <span className="text-slate-200 font-bold text-sm">Expert Doctors</span>
                <span className="text-slate-500 text-xs">Optometrist Care</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Eye className="h-5 w-5 text-amber-500 mb-1" />
                <span className="text-slate-200 font-bold text-sm">Free Testing</span>
                <span className="text-slate-500 text-xs">With Frame Purchase</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual illustration */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[380px] sm:h-[450px]">
            {/* Outer Glowing Circle */}
            <div className="absolute w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] rounded-full border border-dashed border-amber-500/20 animate-[spin_60s_linear_infinite] flex items-center justify-center">
              <div className="w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] rounded-full border border-slate-800 flex items-center justify-center">
                <div className="w-12 h-12 bg-amber-500/20 rounded-full blur-md"></div>
              </div>
            </div>

            {/* Glassmorphic Prescription Card */}
            <div className="absolute top-10 left-6 sm:left-12 bg-slate-900/60 backdrop-blur-md border border-slate-800 p-4 rounded-2xl w-48 shadow-2xl hover:-translate-y-2 transition-transform duration-300 pointer-events-none">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-amber-500 font-semibold tracking-wide uppercase">Prescription</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
              <div className="space-y-1.5 font-mono">
                <div className="flex justify-between text-xs"><span className="text-slate-500">O.D. (Right)</span><span className="text-slate-200">-1.75 SPH</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">O.S. (Left)</span><span className="text-slate-200">-1.50 SPH</span></div>
                <div className="flex justify-between text-xs"><span className="text-slate-500">PD</span><span className="text-slate-200">63mm</span></div>
              </div>
            </div>

            {/* Glassmorphic Quality Badge */}
            <div className="absolute bottom-12 right-6 sm:right-12 bg-slate-900/60 backdrop-blur-md border border-slate-800 p-4.5 rounded-2xl w-52 shadow-2xl hover:translate-y-2 transition-transform duration-300 pointer-events-none">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Blue-Cut Lenses</h4>
                  <p className="text-[10px] text-slate-500">99.9% Digital Protection</p>
                </div>
              </div>
            </div>

            {/* Pure CSS Glasses Drawing */}
            <div className="relative w-64 h-32 flex items-center justify-between scale-110 sm:scale-125 select-none hover:rotate-2 transition-all duration-300 group">
              {/* Left Lens Frame */}
              <div className="w-24 h-24 rounded-full border-4 border-amber-500/80 bg-slate-900/30 backdrop-blur-xs relative flex items-center justify-center overflow-hidden shadow-lg shadow-amber-500/10">
                {/* Lens glare reflections */}
                <div className="absolute -top-12 -left-12 w-24 h-1 bg-white/20 rotate-45 group-hover:translate-x-12 group-hover:translate-y-12 transition-transform duration-1000"></div>
                <div className="absolute top-4 left-6 text-2xl font-light text-slate-700/30 font-serif">OD</div>
              </div>

              {/* Bridge */}
              <div className="w-12 h-2.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full border-t border-yellow-300/40 relative z-10 -mx-1 shadow-md"></div>

              {/* Right Lens Frame */}
              <div className="w-24 h-24 rounded-full border-4 border-amber-500/80 bg-slate-900/30 backdrop-blur-xs relative flex items-center justify-center overflow-hidden shadow-lg shadow-amber-500/10">
                {/* Lens glare reflections */}
                <div className="absolute -top-12 -left-12 w-24 h-1 bg-white/20 rotate-45 group-hover:translate-x-12 group-hover:translate-y-12 transition-transform duration-1000"></div>
                <div className="absolute top-4 left-6 text-2xl font-light text-slate-700/30 font-serif">OS</div>
              </div>

              {/* Temples (Left and Right arms popping back slightly) */}
              <div className="absolute top-1/2 -left-3 w-4 h-1 bg-amber-600 rounded-l-full rotate-[15deg]"></div>
              <div className="absolute top-1/2 -right-3 w-4 h-1 bg-amber-600 rounded-r-full rotate-[-15deg]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
