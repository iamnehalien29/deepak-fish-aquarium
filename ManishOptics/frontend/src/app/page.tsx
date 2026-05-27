import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Catalog from '../components/Catalog';
import BookingForm from '../components/BookingForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      {/* Header / Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />

        {/* Services Showcase */}
        <Services />

        {/* Eyewear Catalog */}
        <Catalog />

        {/* Booking Form Scheduler */}
        <BookingForm />
      </main>

      {/* Contact & Map Footer */}
      <Footer />
    </div>
  );
}
