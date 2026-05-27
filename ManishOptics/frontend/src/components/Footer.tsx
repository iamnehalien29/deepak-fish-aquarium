"use client";

import React from 'react';
import Link from 'next/link';
import { Glasses, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center space-x-2 text-amber-500 hover:text-amber-400 transition-colors">
              <Glasses className="h-7 w-7" />
              <span className="font-extrabold text-lg tracking-wider text-slate-100">
                MANISH<span className="text-amber-500 font-medium">OPTICS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Providing professional optical checkups and premium designer frames. Ensuring perfect clarity for your eyes.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#services" className="hover:text-amber-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#catalog" className="hover:text-amber-500 transition-colors">
                  Frame Catalog
                </Link>
              </li>
              <li>
                <Link href="#book" className="hover:text-amber-500 transition-colors">
                  Book Slot
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-500 transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Working Hours</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2.5">
                <Clock className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 font-semibold">Monday - Saturday</p>
                  <p className="text-xs text-slate-500">10:00 AM - 08:30 PM</p>
                </div>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-300 font-semibold">Sunday</p>
                  <p className="text-xs text-slate-500">11:30 AM - 05:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-widest">Store Address</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Shop No. 12, Main Optical Plaza,<br />
                  Kharar Road, Mohali, Punjab
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                <span className="text-slate-300">+91 98765-43210</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                <span className="text-slate-300">info@manishoptics.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Manish Optics. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Premium Optical Eye Care Clinic
          </p>
        </div>
      </div>
    </footer>
  );
}
