"use client";

import React from 'react';
import { Eye, ShieldAlert, Cpu, HeartPulse } from 'lucide-react';

const services = [
  {
    title: "Comprehensive Eye Examination",
    description: "Detailed evaluation of visual acuity, refractive errors, and eye health screen by certified optometrists.",
    icon: Eye,
    tag: "Clinical Care",
    color: "from-amber-400 to-amber-600",
  },
  {
    title: "Digital Blue-Cut Protection",
    description: "Specialized lenses designed to filter harmful blue-violet light from screens, preventing headaches and digital fatigue.",
    icon: Cpu,
    tag: "Digital Wellness",
    color: "from-blue-400 to-blue-600",
  },
  {
    title: "Contact Lens Consultation",
    description: "Personalized fittings for soft, toric, progressive, and cosmetic lenses, including custom training sessions.",
    icon: HeartPulse,
    tag: "Specialty Care",
    color: "from-emerald-400 to-emerald-600",
  },
  {
    title: "Frame Maintenance & Tuning",
    description: "Complimentary sizing, pad replacements, ultrasonic frame cleaning, and structural alignments for the perfect fit.",
    icon: ShieldAlert,
    tag: "Aftercare",
    color: "from-purple-400 to-purple-600",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-slate-900 py-24 relative overflow-hidden border-t border-slate-800">
      {/* Background visual element */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-500/5 blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-amber-500 font-bold uppercase tracking-wider text-sm">Professional Care</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Our Premium Optical Services
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed">
            We combine state-of-the-art diagnostic equipment with personalized service to keep your vision sharp and comfortable.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-slate-950/60 backdrop-blur-md border border-slate-800/80 p-8 rounded-2xl hover:border-amber-500/50 hover:bg-slate-950 transition-all duration-300 shadow-xl flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6"
            >
              {/* Icon Container */}
              <div className={`p-4 rounded-xl bg-gradient-to-br ${service.color} text-slate-950 shadow-lg group-hover:scale-110 transition-transform duration-300 shrink-0`}>
                <service.icon className="h-7 w-7" />
              </div>

              {/* Text content */}
              <div className="space-y-3">
                <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-amber-500/80 bg-amber-500/5 border border-amber-500/10 px-2.5 py-0.5 rounded-full">
                  {service.tag}
                </span>
                <h4 className="text-xl font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
