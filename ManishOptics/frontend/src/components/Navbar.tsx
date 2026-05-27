"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Glasses, Menu, X, Calendar, User } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-amber-500 hover:text-amber-400 transition-colors">
              <Glasses className="h-8 w-8" />
              <span className="font-extrabold text-xl tracking-wider text-slate-100">
                MANISH<span className="text-amber-500 font-medium">OPTICS</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#services" className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium">
              Services
            </Link>
            <Link href="#catalog" className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium">
              Catalog
            </Link>
            <Link href="#contact" className="text-slate-300 hover:text-amber-500 transition-colors text-sm font-medium">
              Contact
            </Link>
            <Link href="/admin" className="flex items-center space-x-1 text-slate-400 hover:text-amber-500 transition-colors text-sm font-medium">
              <User className="h-4 w-4" />
              <span>Admin</span>
            </Link>
            <Link
              href="#book"
              className="flex items-center space-x-2 bg-amber-500 text-slate-950 px-4 py-2 rounded-full font-bold text-sm hover:bg-amber-450 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 transition-all duration-150"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <Link
            href="#services"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-amber-500 hover:bg-slate-900 transition-colors"
          >
            Services
          </Link>
          <Link
            href="#catalog"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-amber-500 hover:bg-slate-900 transition-colors"
          >
            Catalog
          </Link>
          <Link
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-amber-500 hover:bg-slate-900 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-slate-400 hover:text-amber-500 hover:bg-slate-900 transition-colors"
          >
            <User className="h-4 w-4" />
            <span>Admin Portal</span>
          </Link>
          <Link
            href="#book"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center space-x-2 bg-amber-500 text-slate-950 mx-3 mt-4 py-2.5 rounded-full font-bold text-base hover:bg-amber-400 active:scale-95 transition-all"
          >
            <Calendar className="h-5 w-5" />
            <span>Book Appointment</span>
          </Link>
        </div>
      )}
    </nav>
  );
}
